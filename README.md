# markitABLE

markitABLE is a Firebase-backed workspace for turning raw notes into marketing strategy, messaging, tactical assets, and podcast outreach.

## Scope

- Google sign-in with Firebase Authentication
- Per-user project storage in Firestore
- Optional image uploads to Firebase Storage
- Server-side Gemini endpoints for strategy generation

## Local Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Fill in `GEMINI_API_KEY` and the `VITE_FIREBASE_*` values from your own Firebase project.
4. Run `npm run dev`.

## Deployment Notes

- Enable the Google provider in Firebase Authentication.
- Add every deployed hostname to Firebase Authentication authorized domains.
- Prefer the default Firestore database unless you intentionally created a named database and set `VITE_FIREBASE_DATABASE_ID`.
- Mirror the same env vars in your hosting provider.

## Constraints

- This repo should not depend on AI Studio-generated Firebase identity or config long-term.
- If login works locally but fails after deploy, check Firebase authorized domains before debugging app code.
