# Requirements

## Source
Derived from: user-story.md

## Functional Requirements
1. User can view a list of all items.
2. User can add a new item (plain text name).
3. User can delete an existing item.
4. Items persist between sessions (stored in a database, not just memory).

## Non-Functional Requirements
1. **Performance:** List should load in under 1 second for typical use (small number of items).
2. **Security:** No authentication required (single-user app); input should be validated to prevent empty/malicious entries.
3. **Reliability:** If the server or database is unavailable, the app should show a friendly error message instead of crashing.
4. **Data Persistence:** Data must survive app/server restarts (SQLite database file).

## Assumptions
- Single-user app, no login/accounts.
- Items have no fields beyond a text name (no categories, due dates, etc.).
- Deployment/hosting is out of scope for this capstone.