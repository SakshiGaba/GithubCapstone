# Implementation Plan

Derived from: architecture.md, design-review.md

## Tasks (in dependency order)

### 1. Add input validation on server (POST /api/items)
- **Depends on:** nothing (can start immediately)
- **Files:** `server/index.js`
- Reject empty/whitespace-only item names.
- Reject names longer than 200 characters.
- Return 400 with a clear error message on invalid input.

### 2. Add "Not Found" handling (DELETE /api/items/:id)
- **Depends on:** nothing (can start immediately)
- **Files:** `server/index.js`
- Check if the item exists before deleting.
- Return 404 with a clear message if the id doesn't exist.

### 3. Add error handling around database calls
- **Depends on:** Task 1 and 2 (touches the same file, do after to avoid merge conflicts)
- **Files:** `server/index.js`, `server/db/`
- Wrap DB calls in try/catch.
- Return 500 with a generic error message on failure (never leak raw DB errors to the client).

### 4. Confirm CORS is enabled
- **Depends on:** nothing (independent, quick check)
- **Files:** `server/index.js`
- Verify `cors` middleware is set up so client (port 3000) can call server (port 5000) locally.

### 5. Update client to show friendly error messages
- **Depends on:** Tasks 1–4 (server must return proper error responses first)
- **Files:** `client/src/`
- Catch failed API calls and show a simple message in the UI (e.g., "Something went wrong, please try again") instead of a blank/broken screen.

### 6. Add/extend Playwright tests for new behavior
- **Depends on:** Tasks 1–5 (needs the actual behavior in place to test against)
- **Files:** `tests/app.spec.js`
- Test: adding an empty item is rejected.
- Test: deleting a non-existent item returns "Not Found".
- Test: happy path (add, view, delete) still works end-to-end.

## Blocked Tasks
- Task 3 is blocked until Tasks 1 & 2 are merged (same file).
- Task 5 is blocked until Tasks 1–4 are done (client needs real server error responses to handle).
- Task 6 is blocked until Tasks 1–5 are done (tests need real behavior to verify).