# Idle Counter

Idle Counter is a small browser idle game built with React, TypeScript, and Vite. You click buttons to earn points, unlock stronger buttons, automate them for passive income, and then upgrade automated buttons to increase their value over time.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will print a local URL in the terminal, usually `http://localhost:5173`.

## Available Scripts

`npm run dev`
Starts the local development server.

`npm run build`
Builds the app for production.

`npm run preview`
Serves the production build locally for a quick verification pass.

`npm run lint`
Runs ESLint across the project.

## How It Works

You begin with a basic click button that generates points.

As your total increases, you can unlock stronger buttons with larger point values.

Each unlocked button can be automated to generate points every second.

Once a button is automated, you can buy upgrades for it to increase the value of each click and each automation tick.
