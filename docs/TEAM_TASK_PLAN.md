# KisanFlow — Team Task Plan

**Status:** Planning
**Prepared by:** Team Leader
**Based on:** `docs/PRD.md` (verified), `docs/DEVELOPMENT.md`

This document assigns implementation ownership, defines dependencies, and identifies work that can proceed in parallel.

All work must trace to a functional requirement (FR) in `docs/PRD.md`.
No feature may be implemented that is not present in the PRD.
The TRD must be approved before implementation begins on any area.

---

## Team

| Role | Area |
|------|------|
| **Team Leader** | Architecture, governance, integration, review, demo |
| **Member 1** | Backend / Supabase |
| **Member 2** | Farmer Mobile App |
| **Member 3** | Officer App + Operator Mode + Admin Dashboard |

---

## Phase 0 — Foundation (Prerequisite for All Implementation)

> Phase 0 must complete before any feature branch implementation begins.
> Member 1 owns Phase 0. All other members are blocked on Phase 0 unless noted.

| Task | Owner | Branch | PRD FR | Notes |
|------|-------|--------|--------|-------|
| TRD finalisation | Team Leader | `docs/update-trd` | All | Unlocks all implementation |
| Supabase project provisioning | Member 1 | `infra/supabase-setup` | All | Required before any DB work |
| PostgreSQL schema design | Member 1 + Team Leader | `infra/db-schema` | FR-01 to FR-25 | Must be reviewed by TL |
| Expo project scaffold | Member 2 | `infra/expo-scaffold` | All | Can start in parallel with DB design |
| Next.js dashboard scaffold | Member 3 | `infra/nextjs-scaffold` | FR-17, FR-19 | Can start in parallel with DB design |
| Shared TypeScript service layer structure | Member 1 | `infra/service-layer` | All | Unblocks Member 2 and 3 |
| `.env.example` and `.gitignore` | Member 1 | `docs/team-task-plan` | — | ✅ Done in this task |

---

## Member 1 — Backend / Supabase

**Owner:** Member 1
**Dependency gate:** Team Leader must approve TRD and database schema before any Supabase objects are created.

### 1.1 — Database Architecture & Schema

| Task | Branch | PRD FR | Depends On | Parallelizable |
|------|--------|--------|-----------|---------------|
| Users / roles / profiles table | `feature/db-users-roles` | FR-01, FR-02, FR-03 | TRD approval | ❌ Blocked on TRD |
| Procurement centre + slots schema | `feature/db-centres-slots` | FR-04, FR-05, FR-06 | TRD approval | ❌ Blocked on TRD |
| Token + queue schema | `feature/db-queue-tokens` | FR-07, FR-08, FR-09 | Users + centres schema | ❌ Blocked on above |
| Procurement + weighing + quality schema | `feature/db-procurement` | FR-12, FR-13, FR-14 | Queue schema | ❌ Blocked on queue |
| Payment tracking schema | `feature/db-payments` | FR-15 | Procurement schema | ❌ Blocked on above |
| Audit log schema | `feature/db-audit-log` | FR-25 | Users schema | ✅ Can run alongside roles |
| Notification events schema | `feature/db-notifications` | FR-10, FR-23 | Users schema | ✅ Can run alongside |

### 1.2 — Authentication & Role Model

| Task | Branch | PRD FR | Depends On | Parallelizable |
|------|--------|--------|-----------|---------------|
| Supabase Auth setup (email/phone) | `feature/auth-setup` | FR-01, FR-02 | Supabase project live | ✅ Can start with Phase 0 |
| Role model (farmer / officer / admin / operator) | `feature/auth-roles` | FR-01 to FR-03 | Auth setup | ❌ Blocked on auth setup |
| Session handling and JWT claims | `feature/auth-jwt-claims` | FR-01, FR-03 | Role model | ❌ Blocked on roles |

### 1.3 — Row Level Security (RLS)

> RLS is mandatory on every table exposed to the application. See `docs/DEVELOPMENT.md` §16.

| Task | Branch | PRD FR | Depends On | Parallelizable |
|------|--------|--------|-----------|---------------|
| RLS — users/profiles | `feature/rls-users` | FR-01 to FR-03 | Schema + auth | ❌ Blocked on schema |
| RLS — centres/slots | `feature/rls-centres` | FR-04, FR-05, FR-06 | Schema | ❌ Blocked on schema |
| RLS — queue/tokens | `feature/rls-queue` | FR-07, FR-08, FR-09 | Schema | ❌ Blocked on schema |
| RLS — procurement | `feature/rls-procurement` | FR-12 to FR-15 | Schema | ❌ Blocked on schema |
| RLS — payments | `feature/rls-payments` | FR-15 | Schema | ❌ Blocked on schema |
| RLS — audit log | `feature/rls-audit` | FR-25 | Schema | ❌ Blocked on schema |

### 1.4 — Supabase Realtime

| Task | Branch | PRD FR | Depends On | Parallelizable |
|------|--------|--------|-----------|---------------|
| Realtime publication — queue table | `feature/realtime-queue` | FR-08, FR-09, FR-10 | Queue schema + RLS | ❌ Blocked on RLS |
| Realtime publication — procurement status | `feature/realtime-procurement` | FR-16 | Procurement schema + RLS | ❌ Blocked on RLS |
| Realtime publication — payment status | `feature/realtime-payments` | FR-15 | Payment schema + RLS | ❌ Blocked on RLS |

### 1.5 — Seed / Demo Data

| Task | Branch | PRD FR | Depends On | Parallelizable |
|------|--------|--------|-----------|---------------|
| Demo farmers, officers, admin accounts | `feature/seed-users` | FR-01 to FR-03 | All schema + RLS done | ❌ Blocked on all schema |
| Demo procurement centres + slots | `feature/seed-centres` | FR-04, FR-05, FR-06 | Centres schema | ❌ Blocked on schema |
| Demo SIH flow data (wheat end-to-end) | `feature/seed-sih-demo` | All flow FRs | All schema + seed users | ❌ Last step |

### 1.6 — Shared Service Layer

| Task | Branch | PRD FR | Depends On | Parallelizable |
|------|--------|--------|-----------|---------------|
| Supabase client singleton | `feature/service-supabase-client` | All | Phase 0 scaffold | ✅ Early — unblocks Members 2 and 3 |
| Auth service contract | `feature/service-auth` | FR-01 to FR-03 | Auth setup | ✅ Can run with auth setup |
| Queue service contract | `feature/service-queue` | FR-08, FR-09 | Queue schema | ❌ Blocked on schema |
| Booking service contract | `feature/service-booking` | FR-06, FR-07 | Centres schema | ❌ Blocked on schema |
| Procurement service contract | `feature/service-procurement` | FR-12 to FR-15 | Procurement schema | ❌ Blocked on schema |

---

## Member 2 — Farmer Mobile App

**Owner:** Member 2
**Technology:** React Native + Expo + Expo Router
**Key dependency:** Member 1 must deliver the Supabase client and auth service contracts before Member 2 can integrate real data. However, UI screens can be built with mock/local data before backend is ready.

### 2.1 — Registration & Authentication

| Task | Branch | PRD FR | Depends On | Can Start Before Backend |
|------|--------|--------|-----------|--------------------------|
| Farmer registration screen | `feature/farmer-registration` | FR-01 | Expo scaffold | ✅ UI can be built with mock data |
| Farmer login screen | `feature/farmer-login` | FR-02 | Expo scaffold | ✅ UI only until auth service ready |
| Farmer profile screen | `feature/farmer-profile` | FR-03 | Auth integration | ✅ UI only |
| Auth integration (Supabase Auth) | `feature/farmer-auth-integration` | FR-01, FR-02 | Member 1: auth service contract | ❌ Blocked on backend |

### 2.2 — Crop Selection & Centre Discovery

| Task | Branch | PRD FR | Depends On | Can Start Before Backend |
|------|--------|--------|-----------|--------------------------|
| Crop selection screen | `feature/farmer-crop-selection` | FR-01, FR-04 | Farmer profile | ✅ UI with local crop list |
| Procurement centre listing | `feature/farmer-centre-listing` | FR-04 | Centres schema + RLS | ✅ UI with mock data |
| Centre map/list view with congestion status | `feature/farmer-centre-map` | FR-04 | Centre listing | ✅ UI with mock data |
| Smart centre recommendation | `feature/farmer-smart-recommendation` | FR-05 | Centres + queue data live | ❌ Logic depends on live data |

### 2.3 — Slot Booking & Token

| Task | Branch | PRD FR | Depends On | Can Start Before Backend |
|------|--------|--------|-----------|--------------------------|
| Slot selection screen | `feature/farmer-slot-booking` | FR-06 | Centre listing | ✅ UI with mock slots |
| Booking confirmation screen | `feature/farmer-booking-confirm` | FR-06, FR-07 | Booking service | ✅ UI only |
| Token display screen | `feature/farmer-token` | FR-07 | Token schema | ✅ UI only |
| Booking integration (Supabase) | `feature/farmer-booking-integration` | FR-06, FR-07 | Member 1: booking service | ❌ Blocked on backend |

### 2.4 — Queue & ETA

| Task | Branch | PRD FR | Depends On | Can Start Before Backend |
|------|--------|--------|-----------|--------------------------|
| Live queue screen | `feature/farmer-live-queue` | FR-08 | Queue schema + Realtime | ✅ UI with mock queue |
| Dynamic ETA display | `feature/farmer-eta` | FR-09 | Queue live + ETA logic | ✅ UI, logic blocked on backend |
| Queue realtime integration | `feature/farmer-queue-realtime` | FR-08, FR-09 | Member 1: realtime-queue | ❌ Blocked on backend |

### 2.5 — Notifications

| Task | Branch | PRD FR | Depends On | Can Start Before Backend |
|------|--------|--------|-----------|--------------------------|
| In-app notification list | `feature/farmer-notifications` | FR-10 | Notification schema | ✅ UI only |
| Push notification integration | `feature/farmer-push-notifications` | FR-10 | Notification service | ❌ Blocked on backend |
| SMS notification awareness | `feature/farmer-sms-status` | FR-23 | Backend SMS service | ❌ Blocked on backend |

### 2.6 — Procurement & Payment Status

| Task | Branch | PRD FR | Depends On | Can Start Before Backend |
|------|--------|--------|-----------|--------------------------|
| Procurement timeline screen | `feature/farmer-procurement-timeline` | FR-16 | Procurement schema + Realtime | ✅ UI with mock states |
| Payment status screen | `feature/farmer-payment-status` | FR-15 | Payment schema | ✅ UI with mock states |
| Procurement + payment realtime integration | `feature/farmer-status-realtime` | FR-15, FR-16 | Member 1: realtime-procurement | ❌ Blocked on backend |

### 2.7 — History

| Task | Branch | PRD FR | Depends On | Can Start Before Backend |
|------|--------|--------|-----------|--------------------------|
| Booking/procurement history screen | `feature/farmer-history` | FR-16 | Procurement schema | ✅ UI only |

---

## Member 3 — Officer App + Operator Mode + Admin Dashboard

**Owner:** Member 3
**Technologies:** React Native + Expo (Officer/Operator) · Next.js (Admin Dashboard)
**Key dependency:** Officer screens require queue schema and RLS from Member 1. Admin dashboard requires procurement + payment data. UI can begin with mock data.

### 3.1 — Procurement Officer — Dashboard & Queue

| Task | Branch | PRD FR | Depends On | Can Start Before Backend |
|------|--------|--------|-----------|--------------------------|
| Officer login/auth | `feature/officer-auth` | FR-02, FR-03 | Auth service | ✅ UI only |
| Officer dashboard (today's bookings, queue summary) | `feature/officer-dashboard` | FR-17 | Queue schema + RLS | ✅ UI with mock data |
| Live queue view | `feature/officer-live-queue` | FR-08, FR-17 | Queue Realtime | ✅ UI with mock queue |
| Queue control actions (call next, skip, recall, cancel) | `feature/officer-queue-control` | FR-18 | Queue schema + RLS | ✅ UI only; actions blocked on backend |
| Arrival verification (mark ARRIVED) | `feature/officer-arrival` | FR-11 | Queue schema | ❌ Blocked on backend |
| Queue control integration | `feature/officer-queue-integration` | FR-18 | Member 1: queue schema + RLS | ❌ Blocked on backend |

### 3.2 — Procurement Officer — Processing

| Task | Branch | PRD FR | Depends On | Can Start Before Backend |
|------|--------|--------|-----------|--------------------------|
| Weighing entry screen | `feature/officer-weighing` | FR-12 | Procurement schema | ✅ UI only |
| Quality inspection screen | `feature/officer-quality` | FR-13 | Procurement schema | ✅ UI only |
| Procurement recording screen | `feature/officer-procurement` | FR-14 | Procurement schema | ✅ UI only |
| Payment status management | `feature/officer-payment` | FR-15 | Payment schema | ✅ UI only |
| Full officer flow integration | `feature/officer-flow-integration` | FR-11 to FR-15 | Member 1: procurement + RLS | ❌ Blocked on backend |

### 3.3 — Assisted-Service Operator Mode

| Task | Branch | PRD FR | Depends On | Can Start Before Backend |
|------|--------|--------|-----------|--------------------------|
| Operator login / role switch | `feature/operator-auth` | FR-03 | Auth + roles | ✅ UI only |
| Assisted farmer registration | `feature/operator-farmer-registration` | FR-01 | Farmer registration feature | ✅ Builds on Member 2 work |
| Farmer lookup | `feature/operator-farmer-lookup` | FR-03 | Users schema | ✅ UI with mock data |
| Assisted slot booking | `feature/operator-booking` | FR-06 | Booking service | ❌ Blocked on backend |
| Token/queue assistance view | `feature/operator-queue-view` | FR-07, FR-08 | Queue schema | ✅ UI only |

### 3.4 — Government Administrator Dashboard (Next.js)

| Task | Branch | PRD FR | Depends On | Can Start Before Backend |
|------|--------|--------|-----------|--------------------------|
| Admin login / auth | `feature/admin-auth` | FR-03 | Auth service | ✅ UI only |
| KPI overview (total farmers, procurement, quantities, wait times) | `feature/admin-kpi-overview` | FR-19 | Procurement + payment data | ✅ UI with mock KPIs |
| Centre-wise workload visualisation | `feature/admin-centre-workload` | FR-19 | Queue + centre data | ✅ UI with mock data |
| Crop-wise procurement visualisation | `feature/admin-crop-analytics` | FR-19 | Procurement data | ✅ UI with mock data |
| District-wise procurement visualisation | `feature/admin-district-analytics` | FR-19 | Procurement data | ✅ UI with mock data |
| Waiting-time trends | `feature/admin-wait-trends` | FR-19 | Queue history data | ✅ UI with mock data |
| Congestion prediction display | `feature/admin-congestion-prediction` | FR-20 | Prediction logic + data | ✅ UI only |
| Operational recommendations display | `feature/admin-recommendations` | FR-21 | Prediction logic | ✅ UI only |
| Pending payments visibility | `feature/admin-payments` | FR-19 | Payment schema | ✅ UI with mock data |
| Centre management | `feature/admin-centre-management` | FR-04 | Centres schema | ✅ UI with mock data |
| Admin dashboard data integration | `feature/admin-data-integration` | FR-19 to FR-21 | Member 1: all schemas + RLS | ❌ Blocked on backend |

---

## Team Leader Responsibilities

| Responsibility | When |
|----------------|------|
| Finalise and approve TRD | Before Phase 0 implementation |
| Approve PostgreSQL schema design | Before any Supabase objects are created |
| Review and approve all Supabase RLS policies | Before merge of any DB feature |
| Review all Pull Requests | Ongoing throughout development |
| Resolve architecture decisions and cross-member conflicts | On demand |
| Coordinate cross-feature integration (e.g. queue data shared by Member 2 and 3) | Sprint planning + review |
| Maintain `docs/PRD.md` as sole editor | Ongoing |
| Maintain `docs/TRD.md` governance | Ongoing |
| Design and rehearse SIH demo flow | Before demo |
| Coordinate final integration testing | Post feature-complete |
| Coordinate APK build and release | Before SIH submission |

---

## Dependency Summary

```
TRD Approval (Team Leader)
        │
        ▼
Phase 0 — Supabase provisioning + schema (Member 1)
        │
        ├──── Auth service contract (Member 1)
        │           │
        │           ├── Farmer auth integration (Member 2)
        │           └── Officer/Operator/Admin auth (Member 3)
        │
        ├──── Centres + slots schema (Member 1)
        │           │
        │           ├── Slot booking integration (Member 2)
        │           └── Officer dashboard integration (Member 3)
        │
        ├──── Queue + token schema + RLS + Realtime (Member 1)
        │           │
        │           ├── Live queue realtime (Member 2)
        │           └── Officer queue control (Member 3)
        │
        ├──── Procurement + payment schema + RLS + Realtime (Member 1)
        │           │
        │           ├── Farmer procurement/payment status (Member 2)
        │           ├── Officer processing flow (Member 3)
        │           └── Admin dashboard data integration (Member 3)
        │
        └──── Seed / demo data (Member 1) — Last step before SIH demo
```

## Parallelizable Work (Can Start Before Backend is Complete)

| Who | What |
|-----|------|
| Member 2 | All UI screens (registration, crop selection, centre listing, slot booking, token, queue, ETA, timeline, payment status) using mock/local data |
| Member 3 | All officer UI screens, operator UI screens, Next.js admin dashboard layout and visualisations using mock data |
| Member 1 | Expo scaffold and Next.js scaffold can be set up independently; service layer contracts can be documented early |
| All | Documentation PRs, branch creation, setting up local dev environments |

## Dependency-Blocked Work (Cannot Start Without Backend)

| Who | What | Blocked On |
|-----|------|-----------|
| Member 2 | Auth integration, booking integration, queue realtime, procurement/payment realtime | Member 1: auth + schema + RLS + Realtime |
| Member 3 | Queue control actions (backend), arrival verification, officer flow integration, admin data integration | Member 1: all schemas + RLS |
| Member 1 | RLS, Realtime, seed data | TRD approval → schema first |
| All | Any implementation | TRD approval (Phase 0 gate) |

---

## Multilingual Support

| Task | Owner | Branch | PRD FR | Notes |
|------|-------|--------|--------|-------|
| i18n setup (English + Hindi) | Member 2 (mobile) + Member 3 (admin) | `feature/i18n-setup` | FR-22 | Architecture must support additional languages |
| English string files | Both | Within respective feature branches | FR-22 | Alongside UI screens |
| Hindi translation | Both | `feature/i18n-hindi` | FR-22 | Can follow English strings |

---

## Offline Support

| Task | Owner | Branch | PRD FR | Notes |
|------|-------|--------|--------|-------|
| Local data caching (queue, bookings, farmer details) | Member 2 + Member 3 | `feature/offline-cache` | FR-24 | Requires schema finalized |
| Sync on reconnection | Member 1 (service) + Member 2/3 (client) | `feature/offline-sync` | FR-24 | Blocked on backend |

---

*This plan is based on `docs/PRD.md` (verified) and `docs/DEVELOPMENT.md`.
No feature may be implemented that is not present in the PRD.
The TRD must be approved before any implementation begins.*
