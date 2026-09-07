# Code Review

Reviewed against requirements.md and the capstone checklist.

## Correctness
Does each component behave as specified in requirements.md?
- ✅ View, add, delete items — all working (server + client tested manually).
- ✅ Data persists via SQLite (survives server restarts).

## Security
Are secrets excluded from output? Is user input validated?
- ✅ No secrets/API keys in this project (no auth, no external services).
- ✅ Server validates: empty name rejected, max length (200 chars) enforced.
- ⚠️ No sanitization against script injection in item names (low risk here since this is a plain-text list with no HTML rendering of user input, but worth noting).

## Error Handling
Are all API failures, missing files, and empty repos handled gracefully?
- ✅ Server returns 400 (bad input), 404 (not found), 500 (server/db error) appropriately.
- ✅ Client shows a friendly error message on failed add/delete/load instead of failing silently.
- ✅ Manually verified: stopping the server shows the error message in the UI.

## Test Coverage
Do tests cover the happy path AND the "Not Found"/missing-field edge cases?
- ✅ Manually tested via curl: empty name (400), delete non-existent id (404), normal add (success).
- ❌ Not yet covered by automated Playwright tests — planned in impl-plan.md Task 6 (not yet done).

## Code Clarity
Are function names self-explanatory? Is logic easy to follow without comments?
- ✅ Function names are clear: `loadItems`, `addItem`, `deleteItem`.
- ✅ Logic is short and readable without needing comments.

## DRY Principle
Is there duplicated logic that could be refactored into a shared function?
- ⚠️ `addItem` and `deleteItem` both repeat the same try/catch + error-setting pattern. Could be refactored into a shared helper, but current duplication is minimal (2 instances) and still readable — low priority.

## Dependency Safety
Does Copilot flag any known-vulnerable package versions?
Ran `npm audit` in root, server, and client. [Paste summary here — e.g., "0 vulnerabilities found" or list any found with severity.]
## Summary
Core functionality is correct and error handling works end-to-end. Main gap: automated test coverage (Task 6, not yet done). Minor: could DRY up client error handling, and dependency versions haven't been audited yet.