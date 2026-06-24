# Wyze Security Bundle Builder

A multi-step bundle builder prototype with a live review panel, built with React, TypeScript, Tailwind CSS, and Vite.

## Getting Started

### Installation

1. Clone the repo
2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
bundle-builder/
├── public/
│   └── images/
│       ├── icons/
│       └── products/
├── src/
│   ├── components/
│   │   ├── builder/
│   │   ├── review/
│   │   └── shared/
│   ├── constants/
│   ├── data/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── types.ts
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

## Features

- **4-step accordion builder**
- **Product cards with variants, quantities, and discounts**
- **Live review panel** that updates in real-time
- **LocalStorage persistence** for saving the bundle
- **Responsive design** for all screen sizes

## Key Decisions

- **Data-driven UI:** All products, plans, and steps are defined in `src/data/products.ts` and `src/data/steps.ts`
- **Reusable components:** Review items, product cards, and accordion steps are all modular
- **Centralized state:** Custom hooks manage the cart and accordion state

## Future Improvements

- Add selected state styling for variant chips
- Add animations for smoother accordion transitions
- Implement a proper checkout flow
