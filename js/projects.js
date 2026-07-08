// Project case-study data for portfolio modals
window.PROJECTS = {
    speed_reader_app: {
        title: 'Speed Reader App',
        subtitle: 'Distraction-free speed reading in the browser.',
        problem:
            'Reading long content can be slow and distracting. I wanted a simple tool that helps users focus and control pacing.',
        solution:
            'Built a fast, responsive web app that displays text in a focused reader view, with adjustable settings and a clean UX.',
        impact: [
            'Shipped a polished live demo suitable for recruiters to try immediately.',
            'Prioritized UX clarity and performance for a smooth reading experience.'
        ],
        stack: ['TypeScript', 'Vite', 'Web'],
        role: 'Solo developer',
        links: {
            demo: 'https://speed-reader-app-magicalmongoose.vercel.app/',
            code: 'https://github.com/DrewLickman/Speed-Reader-App'
        }
    },
    mtg_deck_analyzer: {
        title: 'MTG Deck Analyzer',
        subtitle: 'Commander deck analysis powered by Scryfall data.',
        problem:
            'Evaluating a Commander deck by hand is slow—mana curves, role coverage, and synergy are hard to assess at a glance.',
        solution:
            'Built a Next.js web app that imports Moxfield decklists and analyzes mana curves, color pips, card roles, synergy clusters, and upgrade suggestions using Scryfall.',
        impact: [
            'Shipped a live demo for instant deck review via Moxfield URL.',
            'Surfaces actionable insights like ramp/draw gaps and strategy groupings.'
        ],
        stack: ['Next.js', 'React', 'Web'],
        role: 'Solo developer',
        links: {
            demo: 'https://mtg-deck-analyzer-magicalmongoose.vercel.app/',
            code: 'https://github.com/DrewLickman/MTG-Deck-Analyzer'
        }
    },
    bitcoin_trader: {
        title: 'Bitcoin Trader',
        subtitle: 'Real-time decision support for Kalshi BTC markets.',
        problem:
            'Short-duration Bitcoin prediction markets move quickly, making it difficult to combine market prices, momentum indicators, and risk checks consistently.',
        solution:
            'Built a FastAPI and React dashboard that monitors Kalshi and Coinbase data, calculates technical indicators and confidence scores, and supports configurable paper-trading and manual-signal workflows.',
        impact: [
            'Consolidates live market data, technical indicators, confidence scores, and trade history in one dashboard.',
            'Supports safer strategy iteration with paper trading, manual signal review, and configurable thresholds.'
        ],
        stack: ['Python', 'FastAPI', 'React', 'TypeScript'],
        role: 'Solo developer',
        links: {
            code: 'https://github.com/DrewLickman/Bitcoin-Trader'
        }
    },
    random_generator_app: {
        title: 'Random Generator App',
        subtitle: 'Coins, dice, cards, and wheels in one tool.',
        problem:
            'I wanted a single, convenient utility for common randomization tasks (games, decisions, quick testing).',
        solution:
            'Implemented multiple random generators with a consistent UI and straightforward controls for quick use.',
        impact: [
            'Created a practical tool with multiple randomization modes.',
            'Built and deployed a working demo for immediate evaluation.'
        ],
        stack: ['JavaScript', 'HTML/CSS', 'Web'],
        role: 'Solo developer',
        links: {
            demo: 'https://random-generator-app-magicalmongoose.vercel.app/',
            code: 'https://github.com/DrewLickman/Random-Generator-App'
        }
    },
    nlp_pipelines: {
        title: 'NLP Pipeline Project',
        subtitle: 'Text preprocessing and analysis pipeline.',
        problem:
            'Text data needs consistent preprocessing to be useful for downstream NLP tasks and analysis.',
        solution:
            'Created an NLP pipeline that standardizes preprocessing steps and supports analysis workflows.',
        impact: [
            'Shows practical NLP foundations and pipeline thinking.',
            'Highlights ability to structure reusable processing steps.'
        ],
        stack: ['Python', 'NLP', 'AI'],
        role: 'Solo developer',
        links: {
            code: 'https://github.com/DrewLickman/NLP/tree/main/Projects/Project_7_Pipelines'
        }
    },
    ngram_language_model: {
        title: 'N-Gram Language Model',
        subtitle: 'Shakespearean text generation using NLTK.',
        problem:
            'I wanted hands-on experience building probabilistic language models and tuning them for better output quality.',
        solution:
            'Implemented an n-gram model with NLTK and optimized for performance and accuracy on the dataset.',
        impact: [
            'Demonstrates ML/NLP fundamentals (probabilistic modeling).',
            'Focus on both correctness and runtime performance.'
        ],
        stack: ['Python', 'NLTK', 'NLP'],
        role: 'Solo developer',
        links: {
            code: 'https://github.com/DrewLickman/NLP/tree/main/Projects/Project_2_N-gram_Text_Generator'
        }
    },
    code_runner: {
        title: 'Code Runner',
        subtitle: 'Unity 2D platformer built with a 5-person team.',
        problem:
            'Deliver a complete game project with teamwork, scoped features, and solid core mechanics.',
        solution:
            'Led a 5-person team and implemented core gameplay mechanics in Unity, coordinating work and delivery.',
        impact: [
            'Team leadership experience on a shipped game project.',
            'Built core mechanics and contributed to overall delivery.'
        ],
        stack: ['Unity', 'C#', 'Game Dev'],
        role: 'Team lead / programmer',
        links: {
            code: 'https://github.com/DrewLickman/Code-Runner'
        }
    },
    magical_minigames: {
        title: 'Magical Minigames',
        subtitle: 'A web minigame suite for group party play.',
        problem:
            'For group events, it is useful to have quick, browser-based party games that are easy to launch and play together.',
        solution:
            'Built a lightweight Next.js web app with small multiplayer-style minigames like Codenames and Imposter for me and my friends.',
        impact: [
            'Provides a practical party-ready game hub that runs in the browser.',
            'Shows end-to-end delivery from concept to hosted demo with continuous iteration.'
        ],
        stack: ['Next.js', 'HTML', 'CSS', 'Game Dev'],
        role: 'Solo developer',
        links: {
            demo: 'https://magical-minigames.vercel.app/',
            code: 'https://github.com/DrewLickman/Magical-Minigames'
        }
    }
};
