# Gokul Das KM AI Portfolio

Standalone Next.js portfolio designed for Vercel.

## Run locally
```bash
npm install
npm run dev
```

## Add your video files
Put these files in `public/videos/`:
- showreel.mp4
- cannazo.mp4
- pet-project.mp4
- rumik.mp4
- adukale.mp4
- social-catfish.mp4
- tripsniper.mp4
- cheater-scanner.mp4

The project already references the exact filenames.

## Deploy to Vercel
1. Create a GitHub repository.
2. Upload this project.
3. Import the repository into Vercel.
4. Framework: Next.js.
5. Build command: `npm run build`.
6. Deploy.

Note: large video files can make GitHub/Vercel builds heavy. For production, use Vercel Blob, Cloudflare R2, Bunny Stream, or another video CDN and change the video `src` paths in `app/portfolio.tsx`.
