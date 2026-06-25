# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## MERN Setup

This project now uses an Express + MongoDB backend for destination data, while keeping the current UI unchanged.

### Run locally

1. Copy `.env.example` to `.env`.
2. Set `MONGODB_URI` to your MongoDB connection string.
3. Run `npm run dev:full` to start both the Vite frontend and the API server.

### Notes

- The frontend uses the API when available and falls back to local data if the server is offline.
- Images now resolve to local bundled assets so the UI no longer depends on fragile external image URLs.

### Editing destination images

1. Put the new image file into [src/img](D:/Currently%20Working/ViewFinder/src/img).
2. Open [src/data/destinationImages.js](D:/Currently%20Working/ViewFinder/src/data/destinationImages.js).
3. Import the new image and swap it into the matching destination pool.
4. If you want a different hero or banner image for a destination, edit the pool order for that slug.

That keeps all image changes in one place and avoids touching the page components.
