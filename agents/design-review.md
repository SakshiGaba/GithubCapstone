# Design Review

## Reviewed Document
architecture.md

## Risks & Gaps Identified

1. **No input validation specified on the server.**
   - Risk: Empty or overly long item names could be saved, or cause unexpected errors.
   - Decision: Server must reject empty/whitespace-only names and cap length (e.g. 200 characters).

2. **No error handling strategy for the database layer.**
   - Risk: If `app.db` is locked, corrupted, or missing permissions, the app may crash instead of failing gracefully.
   - Decision: Wrap all DB calls in try/catch; return a 500 with a generic error message on failure (per requirements.md's reliability requirement).

3. **No handling for deleting a non-existent item.**
   - Risk: `DELETE /api/items/:id` with a bad/missing id could throw an unhandled error.
   - Decision: Return a 404 with a clear "Not Found" message if the id doesn't exist.

4. **Single SQLite file with no concurrency handling.**
   - Risk: SQLite can have write-lock contention under concurrent writes (not a big issue for single-user, but worth noting).
   - Decision: Acceptable for this project's scope (single-user, low traffic) — no action needed, but documented as a known limitation.

5. **No CORS configuration mentioned.**
   - Risk: If client (port 3000) and server (port 5000) are on different origins, browser requests may be blocked.
   - Decision: Confirm CORS middleware is enabled on the Express server for local development.

## Updates Made to architecture.md
- Added a note under "Server" responsibilities: input validation and error handling (400/404/500 responses) are the server's job, not just "talks to the database."

## Sign-off
Architecture approved for implementation planning, with the above risks tracked and decisions applied.