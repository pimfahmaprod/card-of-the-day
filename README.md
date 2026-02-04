# 💕 Valentine Tarot - ไพ่ทาโรต์วาเลนไทน์

A beautiful, ritual-like Valentine's Day tarot web app that allows users to draw ONE tarot card from the full deck using an infinite looping carousel interaction. Designed for emotional engagement and social sharing.

## ✨ Features

### Core Experience
- **Infinite Looping Carousel**: Smooth auto-scrolling horizontal carousel with seamless infinite loop
- **Randomized Card Positions**: Each card has a unique vertical offset for visual interest
- **Ritual-like Flow**: Carefully crafted user journey from intention to revelation
- **Beautiful Animations**: Framer Motion for smooth, magical transitions
- **Mobile-First Design**: Optimized for mobile devices with responsive layouts

### User Journey
1. **Landing Screen** - Choose relationship status (single/in relationship)
2. **Ritual Instruction** - Mindful guidance on how to select a card
3. **Card Selection** - Infinite carousel of face-down cards auto-scrolling
4. **Reveal Animation** - Smooth card flip with mystical effects
5. **Result Screen** - Personalized interpretation based on relationship status
6. **Social Sharing** - Generate beautiful share images for TikTok, Facebook, IG Story
7. **LINE Tie-in** - Soft upsell to deeper readings (no hard selling)

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Image Generation**: html-to-image
- **Font**: Sarabun (Thai-optimized)

## 📁 Project Structure

```
love-tarot/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Main app orchestrator
├── components/
│   ├── LandingScreen.tsx     # Relationship status selection
│   ├── InstructionScreen.tsx # Ritual guidance
│   ├── InfiniteCarousel.tsx  # Auto-scrolling card carousel
│   ├── RevealScreen.tsx      # Card flip animation
│   └── ResultScreen.tsx      # Interpretation & sharing
├── lib/
│   └── tarotAdapter.ts       # Data transformation utilities
├── types/
│   └── tarot.ts              # TypeScript type definitions
├── images/
│   └── tarot/                # Tarot card images (78 cards)
├── tarot_cards.json          # Tarot card data
└── public/                   # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Design Philosophy

### Mobile-First
- Touch-optimized interactions
- Responsive layouts that work on all screen sizes
- Performance-optimized for social media traffic

### Ritual-like Experience
- Slow, intentional animations
- Mystical visual effects
- Gender-neutral, warm, reflective copy
- No rushing or urgency

### Social Sharing
- Auto-generate 9:16 vertical share images
- Platform-specific optimizations
- Beautiful quote highlights
- Easy one-tap sharing

## 🔄 Infinite Carousel Logic

The carousel creates a seamless infinite loop by:

1. **Triple the Cards**: Render 3 copies of the card array [Set1][Set2][Set3]
2. **Start at Middle**: Initialize position at the start of Set2
3. **Continuous Scroll**: Auto-scroll slowly from right to left
4. **Seamless Reset**: When scrolling past Set2 boundaries, instantly reset to equivalent position
5. **No Visual Jump**: The reset is imperceptible due to identical card sets

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed technical explanation.

## 📊 Data Structure

### TarotCard Interface
```typescript
{
  card_id: string;           // "Card_Tarot_00"
  card_name: string;         // "THE FOOL"
  image_path: string;        // "/images/tarot/THE FOOL.png"
  interpretations: {
    single: string;          // For single people
    in_relationship: string; // For people in relationships
  };
  share_quote: string;       // Highlighted quote for sharing
}
```

### Existing Data Adaptation
The app adapts the existing `tarot_cards.json` structure:
- Splits `love` reading into single/relationship contexts
- Extracts share quotes from interpretations
- Maps card names to image paths
- Handles missing or incomplete data gracefully

## 🎯 Key Components

### InfiniteCarousel
- Auto-scrolls at 0.5px per frame (~60fps)
- Each card has randomized vertical offset (-20px to +20px)
- Stops immediately when user taps a card
- Seamless infinite loop with no visible reset

### RevealScreen
- 3D card flip animation (1.2s duration)
- Sparkle effects on reveal
- Transition text fades in
- Auto-advances to result screen

### ResultScreen
- Displays interpretation based on relationship status
- Share image generation (1080x1920 vertical)
- Platform-specific share buttons
- Soft LINE upsell (no pricing, no urgency)

## 🌐 Localization

All user-facing text is in Thai:
- Warm, reflective tone
- Gender-neutral language
- Culturally appropriate for Thai audience
- No sales pressure or urgency

## 📱 Performance Considerations

- Image optimization with Next.js Image component
- Lazy loading for off-screen cards
- CSS transforms for smooth animations
- Minimal re-renders with proper React patterns
- ~2MB bundle size (optimized for mobile)

## 🔮 Future Enhancements

- [ ] Add ambient sound effects
- [ ] Save reading history locally
- [ ] Add more card interpretation contexts
- [ ] Implement proper LINE integration
- [ ] A/B test different carousel speeds
- [ ] Analytics for card selection patterns
- [ ] PWA support for offline use

## 📄 License

This project is private and proprietary.

## 🙏 Credits

- Tarot card images: Traditional Rider-Waite-Smith deck
- Font: Sarabun by Cadson Demak
- Design & Development: Built with ❤️ for Valentine's Day

---

**Note**: This is a ritual experience, not a game. The magic is in the intention, not the outcome. 💫
