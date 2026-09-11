# KisanFlow — Development & Git Workflow

This document defines the development process and Git workflow for the KisanFlow team.
All team members — human and AI — must follow this process without exception.

---

## 1. Project Development Principles

- **Documentation first.** No code is written before the relevant PRD section and TRD specification exist.
- **Main is always stable.** The `main` branch must always build and run correctly.
- **Small, focused commits.** Each commit should do one thing and be easy to review.
- **No direct pushes to `main`.** All changes enter `main` through a reviewed Pull Request.
- **Review before merge.** Every PR requires at least one team member review and approval.
- **Transparency.** Commit messages, PR descriptions, and branch names must clearly communicate intent.
- **Respect the PRD.** `docs/PRD.md` is the authoritative product document. No feature may contradict it.
- **AI agents follow team rules.** AI coding agents such as Antigravity are bound by this document and must not deviate.

---

## 2. Branching Strategy

| Branch type | Purpose | Protected? |
|-------------|---------|------------|
| `main` | Stable, production-ready code | ✅ Yes |
| `feature/...` | New features and functionality | ❌ No |
| `fix/...` | Bug fixes | ❌ No |
| `docs/...` | Documentation changes only | ❌ No |
| `refactor/...` | Code refactoring without behaviour change | ❌ No |

### Branch naming conventions

```
feature/<short-description>
fix/<short-description>
docs/<short-description>
refactor/<short-description>
```

**Examples:**

```
feature/farmer-slot-booking
feature/queue-realtime-updates
feature/government-analytics-dashboard
fix/token-generation-duplicate
fix/eta-calculation-off-by-one
docs/update-trd-phase-1
refactor/supabase-client-singleton
```

Rules:
- Use lowercase letters only.
- Use hyphens (`-`) to separate words. No underscores or spaces.
- Keep the description short and meaningful.
- Do not use personal names or dates in branch names.

---

## 3. Branch Creation Workflow

Always create a new branch from an up-to-date `main`.

```bash
# Step 1 — Switch to main
git checkout main

# Step 2 — Pull the latest changes
git pull origin main

# Step 3 — Create and switch to your new branch
git checkout -b feature/your-feature-name
```

Never branch off another feature branch unless explicitly approved by the team leader.

---

## 4. Commit Message Conventions

All commit messages must follow the **Conventional Commits** standard.

### Format

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

### Types

| Type | When to use |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test` | Adding or updating tests |
| `chore` | Tooling, config, dependency updates |
| `style` | Formatting changes only (no logic change) |
| `perf` | Performance improvements |

### Scope (optional)

The scope identifies the area of the codebase being changed.

**Examples:** `farmer`, `officer`, `admin`, `queue`, `auth`, `booking`, `payment`, `notifications`

### Examples

```
feat(farmer): add slot booking screen with real-time availability
fix(queue): correct ETA calculation when active counters change
docs: update TRD with Phase 1 database schema
refactor(auth): extract Supabase session logic into shared hook
test(booking): add unit tests for token generation
chore: upgrade Expo SDK to 52
```

### Rules

- Short description must be in **lowercase**, **imperative mood** ("add", not "added" or "adds").
- Short description must be **under 72 characters**.
- Do not end the short description with a period.
- Use the body to explain *why*, not *what*, when the commit is complex.

---

## 5. Push Workflow

```bash
# Push your branch to GitHub for the first time
git push -u origin feature/your-feature-name

# Subsequent pushes on the same branch
git push
```

Rules:
- **Never force-push** to `main` or to a branch with an open PR unless explicitly directed by the team leader.
- Push frequently to back up your work remotely.
- Do not push broken or non-compiling code.

---

## 6. Pull Request Workflow

### Opening a PR

1. Push your branch to GitHub.
2. Open a Pull Request from your branch into `main` on GitHub.
3. Fill in the PR description using this template:

```
## What does this PR do?
<Short summary of the change.>

## Related PRD section / FR
<List the FR numbers this PR addresses, e.g., FR-06, FR-07.>

## How to test
<Step-by-step instructions for a reviewer to verify the change.>

## Screenshots / recordings (if UI change)
<Attach screenshots or a screen recording.>

## Checklist
- [ ] Code is self-reviewed
- [ ] No console.log / debug statements left
- [ ] Tests added or updated
- [ ] Documentation updated if required
- [ ] Branch is up to date with main
```

4. Assign at least one team member as reviewer.
5. Link the PR to any relevant GitHub Issue if one exists.

### PR Title

PR titles must follow the same Conventional Commits format as commit messages.

```
feat(farmer): add slot booking screen
fix(queue): correct ETA when counters change
```

---

## 7. Code Review Expectations

### For reviewers

- Review within **24 hours** of being assigned.
- Read the PR description before reviewing the code.
- Check that the implementation aligns with the relevant PRD functional requirements.
- Verify that no undocumented behaviour has been introduced.
- Comment with **specific, actionable feedback**. Avoid vague comments like "this is wrong."
- Use **GitHub suggestion blocks** for small, clear code fixes so the author can accept them directly.
- Approve only when you are satisfied the PR is correct, safe, and tested.

### For authors

- Respond to all review comments before requesting re-review.
- Do not merge your own PR without at least one approval (unless explicitly permitted by the team leader for documentation-only changes).
- Do not dismiss reviewer requests without discussion.

---

## 8. Merge Rules

- A PR may only be merged into `main` after:
  - ✅ At least **1 approval** from a team member (other than the author).
  - ✅ All review comments are resolved.
  - ✅ The branch is up to date with `main`.
  - ✅ All automated checks pass (if configured).
- Use **Squash and Merge** for feature branches to keep `main` history clean.
- Use **Merge Commit** only for significant milestones when full history must be preserved (team leader discretion).
- **Delete the feature branch after merge.**

---

## 9. Keeping Feature Branches Synchronized with `main`

While working on a long-lived feature branch, regularly synchronize with `main` to avoid large conflicts.

```bash
# Switch to main and pull the latest
git checkout main
git pull origin main

# Switch back to your feature branch
git checkout feature/your-feature-name

# Rebase your branch on top of the updated main
git rebase main
```

Push the rebased branch:

```bash
git push --force-with-lease
```

> `--force-with-lease` is safer than `--force`: it will refuse to push if someone else has pushed to your branch since your last fetch.

Alternatively, if rebasing is not appropriate, merge `main` into your branch:

```bash
git merge main
```

Rebase is preferred to keep a clean, linear history. Use merge only when rebase would be too disruptive. Check with the team leader if unsure.

---

## 10. Conflict Resolution Guidance

If you encounter merge or rebase conflicts:

1. Do not panic. Read each conflicting file carefully.
2. Understand *both* sides of the conflict before resolving it.
3. Do not blindly accept "ours" or "theirs" — resolve with the correct logic.
4. After resolving, run and test the application locally to confirm the resolution is correct.
5. If the conflict involves a file you did not write, consult the original author before resolving.
6. Mark the conflict as resolved and continue:

```bash
git add <resolved-file>
git rebase --continue   # or git merge --continue
```

7. If you are stuck, abort and ask the team:

```bash
git rebase --abort   # or git merge --abort
```

---

## 11. Team Responsibilities

| Role | Responsibilities |
|------|-----------------|
| **Team Leader** | Maintains `main`, approves architecture decisions, resolves escalated conflicts, sets sprint priorities, approves deviation from this document |
| **Developer** | Creates feature branches, writes code, writes tests, opens PRs, reviews peers' PRs, keeps branch in sync with `main` |
| **AI Coding Agent** | Follows all rules in this document, acts only within the approved task scope, stages only the specified files, never pushes directly to `main`, reports actions taken |

---

## 12. Rules for AI Coding Agents (e.g. Antigravity)

AI coding agents assisting on this project must comply with the following rules at all times:

1. **Never push directly to `main`.** All changes must be on a correctly named feature branch.
2. **Never force-push** unless explicitly instructed by the team leader.
3. **Stage only the files relevant to the current task.** Do not stage unrelated changes.
4. **Never modify `docs/PRD.md`** under any circumstances.
5. **Never invent requirements.** All implementation must trace to an FR in `docs/PRD.md` or an approved TRD specification.
6. **Never start implementation beyond the approved scope.** Stop and report after completing the assigned task.
7. **Commit messages must follow Conventional Commits.** No free-form commit messages.
8. **Report all Git actions taken** (branch created, files staged, commit hash, push result) after completing a task.
9. **Ask before resolving conflicts** that involve files the agent did not create.
10. **Do not install dependencies** not specified in the approved TRD or task instruction.
11. **Do not create database tables or migrations** without explicit instruction referencing the approved TRD.

---

## 13. Documentation-First Development

KisanFlow follows a strict documentation-first policy:

1. **PRD is the source of truth for product requirements.**
   No feature may be built that is not present in `docs/PRD.md`.

2. **TRD must be approved before implementation begins.**
   Technical decisions (database schema, API design, architecture) must be documented in `docs/TRD.md` before any implementation starts.

3. **Implementation phases are gated.**
   Each phase of development starts only after the team leader confirms the documentation for that phase is complete and approved.

4. **Documentation changes use `docs/` branches.**
   Updates to `docs/PRD.md`, `docs/TRD.md`, or `docs/DEVELOPMENT.md` are made on a `docs/...` branch and go through a PR.
   Exception: `docs/PRD.md` may only be modified by the team leader.

5. **Code must not outpace documentation.**
   If implementation reveals a gap in the TRD, stop, document the gap, get approval, then continue.

---

## 14. Testing Before Merging

No PR may be merged into `main` without adequate testing.

### Minimum requirements before opening a PR

- [ ] The application builds without errors.
- [ ] The changed feature works end-to-end in a local development environment.
- [ ] No regressions in existing flows that the change could affect.
- [ ] Any new logic has corresponding unit tests where feasible.
- [ ] UI changes have been visually verified on at least one device/emulator.

### Testing levels

| Level | Who runs it | When |
|-------|-------------|------|
| **Local build check** | Author | Before every push |
| **Feature test** | Author | Before opening PR |
| **Peer review test** | Reviewer | During code review |
| **Integration test** | Author + Reviewer | Before merge, for cross-cutting changes |

### Notes

- Tests are written alongside features, not as an afterthought.
- If a bug is fixed, a test must be added that would have caught that bug.
- Test coverage is not a vanity metric — write tests for real failure paths.
- If automated CI is configured, all checks must be green before merge.

---

*This document is maintained by the KisanFlow team leader.
All team members and AI agents must follow this workflow without exception.*

---

## 15. Security Rules

Security is a shared responsibility. Every team member and AI agent must follow these rules on every task.

### Never commit secrets

- API keys, passwords, tokens, service-role keys, and private credentials must **never** appear in any committed file.
- Before staging files, always check for accidental secret inclusion:
  ```bash
  git diff --staged
  ```
- If a secret is accidentally committed, treat it as **compromised immediately** — rotate it before doing anything else.

### Never expose credentials

- Do not hard-code credentials in source code, configuration files, or comments.
- Do not log credentials to the console, crash reporters, or analytics.
- Do not share credentials in PR descriptions, commit messages, or GitHub Issues.

### Secure authentication and session handling

- Authentication must use the project's approved auth provider (Supabase Auth).
- Session tokens must be stored securely and never exposed to unintended parties.
- Implement token refresh and session expiry correctly.
- Never store credentials in `AsyncStorage` in plain text on mobile.

### Input validation

- Validate all user-supplied input on both the client and the server/database layer.
- Do not trust client-sent data for security-sensitive decisions.
- Use parameterised queries or the ORM layer — never construct raw SQL with user input.

### Least-privilege access

- Each role (farmer, officer, admin) must only be able to access the data and operations it requires.
- Row Level Security (RLS) policies must enforce this at the database layer.
- Service-role credentials must not be used where anon or authenticated credentials are sufficient.

### HTTPS / TLS for all network communication

- All network requests to Supabase, external APIs, and any backend must use HTTPS.
- Do not disable certificate verification in any environment, including development.

### Review security-sensitive changes

- Changes involving authentication, authorisation, RLS policies, payment status, or PII must receive a **dedicated security-focused review** from at least one other team member before merge.
- Security review comments must be resolved — they may not be dismissed without team leader sign-off.

---

## 16. Supabase and MCP Safety Rules

Supabase MCP may be used by authorised development agents to inspect and modify the database. The following rules are mandatory.

### Supabase MCP usage is authorised for agents

- AI coding agents may use Supabase MCP tools when explicitly instructed by the team leader.
- Agents must not initiate Supabase changes speculatively or beyond the approved task scope.

### Inspect before modifying

- Before making any schema or data change, the agent or developer must read the current state first (list tables, view existing policies, read existing migrations).
- Never assume the current schema matches an earlier design document without verifying.

### Database changes must be intentional

- Every table creation, column addition, policy change, or data mutation must be explicitly requested by the team leader or specified in an approved TRD section.
- Agents must report what they intend to change and receive confirmation before executing destructive or irreversible operations.

### Never perform destructive changes without explicit approval

Destructive operations include, but are not limited to:
- `DROP TABLE`
- `TRUNCATE`
- `DELETE` without a `WHERE` clause
- Removing columns from existing tables
- Dropping RLS policies

These must never be executed without explicit written instruction from the team leader.

### RLS is mandatory for all exposed application tables

- Every table accessible by the mobile or web client must have Row Level Security enabled.
- A table with RLS disabled is a security vulnerability and must not be merged.
- RLS policies must be reviewed alongside the schema change that introduces the table.

### Never expose service-role or secret keys to mobile or browser clients

- The Supabase **service-role key** and **secret key** must remain exclusively on trusted server-side environments.
- Mobile apps and browser clients must use the **anon/public key** only, with RLS enforcing access control.
- Any PR that includes a service-role key in client-side code will be rejected immediately.

### Migrations and schema changes must be reviewable

- Schema changes must be expressed as migration files so they are version-controlled and reviewable.
- Ad-hoc schema changes made directly in the Supabase Studio without a corresponding migration are not permitted in production.

### Verify database changes after implementation

- After applying a migration or schema change, verify the result by listing tables and checking RLS policies.
- Report the verification result before considering the task complete.

---

## 17. Secrets and Environment Variables

### `.env` files containing secrets must not be committed

- Add all `.env` files that contain real credentials to `.gitignore` immediately when the project is initialised.
- If a `.env` file is accidentally committed, rotate all credentials it contained without delay.

### Use `.env.example` for configuration templates

- Maintain a `.env.example` file at the repository root that lists every required environment variable with a placeholder value and a brief description.
- `.env.example` must **never** contain real credentials.
- Example:
  ```
  # Supabase
  EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
  EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

  # SMS provider (server-side only)
  SMS_API_KEY=your-sms-api-key-here
  ```

### Supabase service-role and secret keys must remain server-side

- Service-role keys grant full database access bypassing RLS.
- They must only be used in trusted server-side code (Edge Functions, backend services).
- They must never appear in mobile app bundles, browser JavaScript, or client-side configuration.

### Public client configuration must use public credentials only

- The Supabase **anon key** and **project URL** are designed to be public.
- They may be included in mobile and browser client configuration.
- Access control must be enforced by RLS policies, not by keeping the anon key secret.

### Rotate exposed credentials immediately

- If any credential is accidentally exposed (committed, logged, shared in a PR, or included in a screenshot), it must be treated as compromised.
- Rotation steps:
  1. Invalidate / regenerate the credential in the provider dashboard immediately.
  2. Update all environments that use the credential.
  3. Notify the team leader.
  4. Document the incident in the PR or a GitHub Issue.

---

## 18. Definition of Done

A feature or task is considered **Done** only when all of the following criteria that apply to it are satisfied:

| Criterion | Required |
|-----------|----------|
| Implementation is complete and matches the scope defined in the task | Always |
| Requirements align with `docs/PRD.md` and the approved `docs/TRD.md` | Always |
| All automated tests pass | When tests exist |
| Lint and type checks pass with no errors | Always |
| Security considerations have been reviewed (auth, RLS, secrets, input validation) | Always for backend/auth changes |
| Documentation is updated where the change affects existing docs | When applicable |
| No secrets, credentials, or sensitive data are committed | Always |
| Changes have been submitted through a Pull Request | Always |
| At least one peer review approval has been received | Always |
| All CI checks are green | When CI is configured |
| Feature has been approved and the PR has been merged into `main` | Always |

A task is **not Done** if:
- It is only implemented locally and not merged.
- It passes locally but CI fails.
- It is merged without a review.
- It introduces a known security issue deferred for "later."
- Documentation that was supposed to be updated was left stale.

---

## Documentation Governance

| Document | Role | Who may modify |
|----------|------|----------------|
| `docs/PRD.md` | Product source of truth — defines what KisanFlow must do | Team leader only |
| `docs/TRD.md` | Technical source of truth — defines how KisanFlow is built (once finalised) | Team leader (with team input) |
| `docs/DEVELOPMENT.md` | Team development workflow | Team leader |

### Conflict resolution between documents

- If `docs/PRD.md`, `docs/TRD.md`, and `docs/DEVELOPMENT.md` appear to conflict, **stop work immediately**.
- Do not silently invent a resolution or pick one document over another without discussion.
- Raise the conflict with the team leader and wait for an explicit decision before continuing.
- The resolution must be documented as an update to the appropriate document through the normal PR process.

### AI agents must follow approved documentation

- AI coding agents must implement only what is specified in the approved `docs/PRD.md` and `docs/TRD.md`.
- AI agents must not invent requirements, infer undocumented behaviour, or implement features not explicitly requested.
- If an agent encounters an ambiguity or gap in the documentation, it must stop and report it rather than resolve the ambiguity independently.
