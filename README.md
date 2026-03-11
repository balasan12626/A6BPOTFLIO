# AB Startup Website (React + Firebase)

Modern, professional startup website for **AB** software development company.

## Features
- Pages: Home, About, Services, Technologies, Pricing, Blog, Contact
- Light/Dark mode toggle
- Firebase Firestore integration:
  - `blogs` collection for Blog page
  - `contact_submissions` collection for Contact form
- Firebase Analytics initialized in the frontend
- Floating AI chatbot UI assistant
- SEO meta tags (title, description, keywords, Open Graph, Twitter)
- `sitemap.xml` and `robots.txt`

## Install & Run
```bash
npm install
npm run dev
```

## Firebase Setup
Firebase SDK is installed with:
```bash
npm install firebase
```

The web app is already configured in `src/firebase.js` using your project:
- projectId: `a6bpotfolio`
- analytics measurement ID: `G-55C8LQ0139`

## Firestore collections
- `blogs`
  - `title` (string)
  - `description` (string)
  - `image` (string URL)
  - `date` (string)
- `contact_submissions`
  - `name`, `email`, `message`, `projectDetails`, `createdAt`

## Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase use a6bpotfolio
npm run build
firebase deploy
```

## Google Search Console
1. Add your deployed domain as a property in Google Search Console.
2. Verify domain ownership.
3. Submit sitemap: `https://yourdomain.com/sitemap.xml`.
