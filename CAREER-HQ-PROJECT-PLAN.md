# Career HQ — Shareable Codex Job Application Workspace

## Agent handoff

Build a new, standalone project named **Career HQ**. It should package a private job-application tracker, analysis dashboard, applicant onboarding workflow, and truthful résumé generator into a project that another person can clone, open in Codex, and use without receiving any data from the source user's workspace.

Treat this document as the product plan and implementation brief. Inspect the new project's actual state before implementing, preserve the privacy requirements below, and verify every release criterion before calling the project complete.

## Product outcome

Career HQ should let a new user:

1. Clone or download a clean project.
2. Open the folder as a Codex project.
3. Run a project-scoped Career HQ skill.
4. Answer a guided applicant questionnaire in small batches.
5. Import existing résumés and verify extracted career facts.
6. Evaluate jobs and build truthful, tailored résumés.
7. Track application stages, follow-ups, and next actions in a polished dashboard.

The distributed project must contain only application code, reusable workflows, neutral templates, and fictional demonstration data.

## Recommended release shape

Create a separate Git repository or GitHub template instead of publishing Career HQ from an existing personal website repository.

The first release should have two distinct surfaces:

| Surface | Purpose | Data policy |
|---|---|---|
| Public demo | Show the dashboard and explain the workflow | Fictional data only |
| Cloned Codex project | Run onboarding, résumé generation, and tracking | Private local data |

The hosted demo is a product preview. It must not imply that a static public website can execute local Codex skills or access a user's private workspace.

## Codex packaging model

Use a repository-scoped skill so Codex discovers the workflow when the project folder is opened.

```text
career-hq/
├── AGENTS.md
├── .agents/
│   └── skills/
│       └── career-hq/
│           ├── SKILL.md
│           ├── agents/
│           │   └── openai.yaml
│           ├── scripts/
│           ├── references/
│           └── assets/
├── dashboard/
├── templates/
├── sample-data/
├── scripts/
├── README.md
└── .gitignore
```

Use these surfaces intentionally:

- `AGENTS.md` defines project-wide conventions, privacy boundaries, validation commands, and release requirements.
- `.agents/skills/career-hq/` contains the reusable Codex workflow.
- `dashboard/` contains the visual application tracker.
- `templates/` contains neutral résumé and cover-letter templates.
- `sample-data/` contains one clearly fictional applicant and fictional job applications.

After the project workflow is stable, optionally package the skill as a **Career HQ Codex plugin** for easier installation outside this repository. The plugin is a later distribution step, not an MVP requirement.

## Private runtime workspace

Initialize a workspace-local `.job-search/` folder on first use.

```text
.job-search/
├── applicant-profile.json
├── applications.json
├── postings/
├── materials/
├── review-packets/
└── generated-dashboard-data/
```

The entire `.job-search/` directory must be excluded from version control. It may contain private applicant details and must never be included in the public build, example data, deployment archive, screenshots, test fixtures, or release package.

## Required user journey

### 1. Start the project

The README should give the user one obvious first action:

```text
$career-hq Set up my job search
```

The skill should initialize the private tracker, inspect available résumé sources, and explain what it will ask before beginning intake.

### 2. Build the verified applicant profile

Inspect existing profile data and résumés first. Ask only unanswered questions and never ask more than five questions in one message.

Run intake in these passes:

1. **Search direction:** target roles, avoided roles, geography, commute, work arrangement, travel, schedule, compensation, and employment type.
2. **Career evidence:** résumé versions, corrected dates and titles, accomplishments, approved metrics, portfolios, projects, and the context in which each skill was used.
3. **Application defaults:** contact preferences, availability, salary strategy, reason-for-leaving language, and reference policy.
4. **Sensitive answers:** work authorization, sponsorship, clearance, disclosures, licenses, and binding declarations only when relevant.
5. **Tracking preferences:** desired pipeline stages, follow-up timing, reminders, conversation notes, and optional prior-application imports.

Store answers as structured values with a source and verification date. User corrections override older résumé data when the correction is explicit. Preserve unresolved conflicts instead of guessing.

### 3. Add and evaluate jobs

Support both workflows:

- The user supplies a job URL or posting text.
- The user asks Codex to find current roles matching their profile.

For every job:

1. Confirm that the listing is current and comes from a credible source.
2. Save a verbatim, immutable posting snapshot.
3. Record title, employer, location, work arrangement, compensation, requirements, and URL.
4. Compare the job against verified profile claims.
5. Show fit, strongest match, largest gap, major risk, and one next action.

Use fit labels such as `strong-match`, `reasonable-stretch`, `low-probability-stretch`, and `not-recommended`. Missing preferred qualifications should not automatically disqualify a role.

### 4. Build application materials

Generate role-specific materials only from verified profile claims and the complete posting.

The résumé workflow must:

1. Reorder and rephrase verified experience for relevance.
2. Use posting terminology naturally without keyword stuffing.
3. Quantify impact only with supplied or approved numbers.
4. Distinguish professional, educational, freelance, and personal-project experience.
5. Produce versioned DOCX and PDF outputs and record their filenames and hashes.

Codex must never invent technologies, credentials, titles, dates, degrees, responsibilities, or achievements. Any uncertain material claim must be confirmed before it appears in a generated document.

Use the available document and PDF capabilities to render and visually verify résumé output. Do not treat source-text generation alone as proof that the document layout is usable.

### 5. Review and track

Creating application materials does not authorize submission.

Before an application could be submitted, Career HQ must present a review packet containing:

- Employer and role
- Exact material versions
- Important form answers
- Compensation and work-authorization responses
- Unresolved questions or uncertainties

Final submission must always require explicit authorization for the specific application. A record may enter `submitted` only when confirmation evidence exists. Use `submission-unconfirmed` when an attempt lacks proof.

## Dashboard requirements

Preserve the strong visual direction of the prototype: dark navigation, warm neutral workspace, bright green highlights, serif editorial headings, compact metrics, and high information density without visual clutter.

The dashboard must include:

1. **Overview:** applications sent, active pipeline, ready-to-apply count, and next follow-up.
2. **Pipeline health:** counts for research, ready, applied, assessment, interview, offer, and terminal stages.
3. **Priority queue:** the three most important next actions.
4. **Application tracker:** search, status filters, fit, location, next action, and detail view.
5. **Insights:** strongest role lane, match distribution, recurring gaps, and follow-up timing.

The interface must be responsive and usable by keyboard, touch, and screen readers. Application details should remain readable on mobile without requiring a desktop-width table.

## Privacy and safety requirements

### Never distribute

- A real applicant profile or application ledger
- Real names, contact information, addresses, or account identifiers
- Source résumé PDFs or generated personal résumés
- Real application URLs, company decisions, review packets, or submission evidence
- Local absolute paths, credentials, tokens, cookies, or browser data

### Required safeguards

1. Ignore `.job-search/`, generated materials, local environment files, and temporary browser/build artifacts.
2. Generate the public demo from a separate fictional fixture, never from a redacted copy of real data.
3. Add a pre-release privacy scanner for personal names, emails, phone numbers, local user paths, and tracked résumé files.
4. Fail the public build when private runtime files appear in the build input or output.
5. Make the local/private boundary visible in the UI and documentation.

Do not store passwords, one-time codes, government identifier numbers, financial details, or medical information anywhere in Career HQ.

## Publishing and sharing

### MVP distribution

Publish two deliverables:

1. A public dashboard demo using fictional sample data.
2. A GitHub template repository that a friend can clone and open as a Codex project.

The README should explain that the real workflow runs from the cloned Codex project and stores its data locally. It should include setup, the first prompt, privacy behavior, dashboard launch instructions, and how to refresh the tracker.

### Later distribution

After the project passes real-world testing, package the Career HQ skill and reusable assets as a Codex plugin. Consider an MCP-backed application only if the product later needs authenticated cloud storage or browser-only résumé generation.

A fully hosted version is a separate product phase because it requires authentication, secure per-user storage, deletion/export controls, and a clear privacy policy.

## Implementation phases

### Phase 1 — Extract and sanitize

Estimated time: **half a day**.

- Create the standalone repository.
- Rebuild the dashboard shell without copying private runtime data.
- Create a fictional applicant and fictional job fixtures.
- Establish ignore rules and the privacy scan.

### Phase 2 — Package the Codex workflow

Estimated time: **one to two days**.

- Create the project-scoped Career HQ skill.
- Add applicant-profile and application-ledger schemas.
- Add deterministic initialization and tracker scripts.
- Implement question batching, provenance, conflict handling, and approval gates.

### Phase 3 — Add résumé generation

Estimated time: **one to two days**.

- Add neutral résumé templates.
- Generate versioned DOCX and PDF materials.
- Add document rendering and visual verification.
- Record file fingerprints and source provenance.

### Phase 4 — Complete onboarding and dashboard integration

Estimated time: **half a day to one day**.

- Add the one-prompt onboarding flow.
- Connect tracker data to the dashboard generator.
- Add refresh and launch helpers.
- Verify desktop and mobile behavior.

### Phase 5 — Audit and publish

Estimated time: **half a day to one day**.

- Test from a clean clone with no pre-existing user profile.
- Run privacy, schema, syntax, and document-layout checks.
- Publish the fictional dashboard demo.
- Create the shareable GitHub template release.

Expected MVP effort: **four to six focused working days**.

## Acceptance criteria

The project is complete only when all of the following are proven:

### Clean installation

- A new user can clone the repository and open it as a Codex project.
- Codex discovers the Career HQ skill from `.agents/skills/`.
- The first setup prompt initializes a private `.job-search/` workspace.

### Guided onboarding

- The skill inspects existing sources before asking questions.
- It asks no more than five unanswered questions at once.
- It records provenance, verification dates, and unresolved conflicts.

### Résumé creation

- A fictional user can select a fictional job and generate tailored DOCX and PDF résumés.
- Every résumé statement can be traced to verified profile evidence.
- Rendered outputs are visually inspected and usable.

### Tracking

- The application appears in the dashboard with the correct status, fit, and next action.
- Search, filtering, responsive layout, keyboard access, and the detail view work.
- Follow-up dates and terminal statuses behave correctly.

### Privacy and release

- The repository and public build contain no private source-user data.
- `.job-search/` and generated personal materials remain ignored.
- The privacy scanner passes on the exact release contents.
- The public demo contains only clearly fictional data.

## Non-goals for the MVP

- Public multi-user accounts
- Cloud synchronization of private applicant data
- Browser-only Codex execution
- Automatic job submission without specific approval
- Automated CAPTCHAs, MFA, e-signatures, or monitored assessments

## Recommended first implementation action

Create a new sibling repository named `career-hq`, add the proposed directory skeleton and privacy rules, and prove with a clean search that no source-user personal data entered the new repository before implementing additional features.
