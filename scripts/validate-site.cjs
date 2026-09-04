const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const projectsPath = path.join(root, 'js', 'projects.js');
const index = fs.readFileSync(indexPath, 'utf8');
const projects = fs.readFileSync(projectsPath, 'utf8');
const failures = [];

function expect(condition, message) {
    if (!condition) failures.push(message);
}

expect(index.includes('AI Automation & Interactive Entertainment Engineer'), 'site title must use the dual-role positioning');
expect(index.includes('AI Automation Engineer') && index.includes('Interactive Entertainment Engineer'), 'metadata must name both engineering roles');
expect(!index.includes('data-category='), 'project cards must use data-categories');
expect(!index.includes('https://github.com/DrewLickman/Bitcoin-Trader'), 'private Bitcoin Trader card must not expose a broken public code link');

const cardMatches = [...index.matchAll(/data-project-id="([^"]+)"\s+role="button"/g)];
const projectIds = cardMatches.map((match) => match[1]);
expect(projectIds.length === 10, `expected 10 project cards, found ${projectIds.length}`);
expect(new Set(projectIds).size === projectIds.length, 'project card IDs must be unique');

for (const projectId of projectIds) {
    expect(new RegExp(`\\b${projectId}:\\s*\\{`).test(projects), `missing modal data for ${projectId}`);
}

for (const match of index.matchAll(/<img\s+[^>]*src="([^"]+)"/g)) {
    const source = match[1];
    if (/^(https?:|data:)/.test(source)) continue;
    expect(fs.existsSync(path.join(root, source)), `missing local image: ${source}`);
}

const ids = [...index.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
expect(new Set(ids).size === ids.length, 'HTML IDs must be unique');

if (failures.length) {
    console.error('Site validation failed:');
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
}

console.log(`Site validation passed: ${projectIds.length} project cards and ${ids.length} unique IDs checked.`);
