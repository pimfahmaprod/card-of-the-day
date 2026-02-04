# 🚀 Quick Start Guide

## Get Running in 3 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Open Browser
Open [http://localhost:3000](http://localhost:3000)

That's it! 🎉

---

## What You'll See

1. **Landing Screen** - Choose "โสด" (single) or "มีคู่" (in relationship)
2. **Instruction Screen** - Countdown timer (auto-advances)
3. **Carousel Screen** - Tap any card you feel drawn to
4. **Reveal Screen** - Watch your card flip (auto-advances)
5. **Result Screen** - Read your interpretation and share!

---

## Project Structure Overview

```
📁 app/
  ├── globals.css      ← Global styles
  ├── layout.tsx       ← Root layout
  └── page.tsx         ← Main app (START HERE)

📁 components/
  ├── LandingScreen.tsx     ← Step 1
  ├── InstructionScreen.tsx ← Step 2
  ├── InfiniteCarousel.tsx  ← Step 3 (THE MAGIC ✨)
  ├── RevealScreen.tsx      ← Step 4
  └── ResultScreen.tsx      ← Step 5

📁 lib/
  └── tarotAdapter.ts  ← Data transformation

📁 types/
  └── tarot.ts         ← TypeScript types

📁 images/tarot/      ← 78 card images
tarot_cards.json      ← Card data
```

---

## Key Files to Understand

### 1. `app/page.tsx` (Main Orchestrator)
- Manages screen state
- Handles user flow
- Passes data between screens

### 2. `components/InfiniteCarousel.tsx` (Core Feature)
- Triple buffer infinite loop
- Auto-scrolling animation
- Randomized card offsets
- **Read ARCHITECTURE.md for details!**

### 3. `lib/tarotAdapter.ts` (Data Layer)
- Converts raw JSON to typed data
- Splits interpretations by relationship status
- Extracts share quotes

---

## Common Tasks

### Change Carousel Speed
```typescript
// In components/InfiniteCarousel.tsx
const SCROLL_SPEED = 0.5; // Increase for faster, decrease for slower
```

### Modify Color Scheme
```typescript
// In tailwind.config.ts
valentine: {
  pink: '#FFB6C1',     // ← Change these
  hotpink: '#FF69B4',
  gold: '#FFD700',
  // ...
}
```

### Add New Screen
1. Create component in `components/`
2. Add to screen type in `app/page.tsx`
3. Add to AnimatePresence in render
4. Add state handler function

### Update Card Data
Edit `tarot_cards.json` - changes reflect immediately!

---

## Debugging Tips

### Carousel Not Infinite?
- Check `tripleCards` array is being created
- Verify `CARD_WIDTH` matches actual card width
- Check offset boundaries in `checkInfiniteLoop`

### Images Not Loading?
- Verify image paths match `card_name` in JSON
- Check `/images/tarot/` directory
- Try absolute paths: `/images/tarot/${cardName}.png`

### Animations Janky?
- Check browser DevTools Performance tab
- Reduce `SCROLL_SPEED` if needed
- Ensure using CSS transforms, not position

### TypeScript Errors?
```bash
npm run build
```
This will show all type errors at once

---

## Performance Tips

- Images are lazy-loaded automatically
- Animations use GPU acceleration
- Only one screen rendered at a time
- No unnecessary re-renders

---

## Next Steps

1. ✅ Get it running locally
2. 📖 Read [README.md](./README.md) for full overview
3. 🏗 Read [ARCHITECTURE.md](./ARCHITECTURE.md) for deep dive
4. 🎨 Customize colors and content
5. 🚀 Deploy to Vercel (see below)

---

## Deploy to Production

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Option 2: Static Export
```bash
npm run build
# Upload 'out' folder to any static host
```

---

## Need Help?

- 📖 Read the full [README.md](./README.md)
- 🏗 Check [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
- 🐛 Check browser console for errors
- 🔍 Use React DevTools to inspect state

---

**Happy coding! May your cards be ever in your favor.** 🔮✨
