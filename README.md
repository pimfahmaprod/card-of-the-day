# Card of the Day

A daily tarot card reading web app with 78 cards, multi-language support, and social sharing features.

## Quick Start

```bash
# Local development
npx serve .
# or
python -m http.server 8000
```

Open `http://localhost:8000` in browser.

## Features

- 78 Tarot cards (22 Major + 56 Minor Arcana)
- 6 languages (TH, EN, CN, TW, KO, JA)
- Save images for Instagram Story/Post, Facebook
- Comment system with replies
- Card popularity rankings
- Background music

## Project Structure

```
├── index.html          # Single page app
├── css/styles.css      # All styles
├── js/
│   ├── app.js          # Main logic
│   ├── translations.js # UI translations
│   ├── card-interpretations.js  # Card meanings
│   └── counter.js      # Firebase
├── images/tarot/       # Card images
└── CLAUDE.md           # AI context file
```

## For AI Assistants

See [CLAUDE.md](CLAUDE.md) for detailed project context, file descriptions, and common tasks.

## Tech Stack

- Vanilla JS (no framework)
- Firebase Realtime Database
- html2canvas for image generation
- GitHub Pages hosting

## License

Private project by Pimfahmaprod
