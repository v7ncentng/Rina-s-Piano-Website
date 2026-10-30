# Rina Law Piano Lessons

A responsive, single-page piano lessons website built with React, TypeScript, Vite, plain CSS, and Framer Motion.

## Run locally

1. Install Node.js 20.19+ or 22.12+.
2. From the project directory, install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Open the local URL printed by Vite (usually `http://localhost:5173`).

Run `npm run build` to create the deployable static site in `dist/`. Run `npm run lint` and `npm run typecheck` for checks.

## Replace the photo placeholder

Add Rina’s image to `public/` (for example, `public/rina-at-piano.jpg`), then set `about.photoSrc` in `src/content.ts` to `/rina-at-piano.jpg`. The Polaroid placeholder is shown while the value is empty.

## Deploy

- **Vercel:** Import the GitHub repository, use `npm run build` as the build command, and `dist` as the output directory.
- **Netlify:** Import the GitHub repository, use `npm run build` as the build command, and `dist` as the publish directory.
