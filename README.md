# markitABLE

markitABLE is a browser-local workspace for turning raw notes into marketing strategy, messaging, tactical assets, and podcast outreach.

## Scope

- Browser-local project storage with `localStorage`
- Inline image storage for note attachments
- Server-side Gemini endpoints for strategy generation

## Local Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Fill in `GEMINI_API_KEY`.
4. Run `npm run dev`.

## Deployment Notes

- Mirror `GEMINI_API_KEY` in your hosting provider.
- User content is stored per browser, not in a shared cloud database.
- Large embedded images will count against browser storage limits.

## Constraints

- No login, sync, or cross-device persistence is included in this mode.
- Clearing browser storage will remove locally saved projects.
