KisanFlow — Technical Requirements Document

Project: KisanFlow (KrishakFlow)
SIH Problem Statement: SIH26032
Version: 1.0
Status: Technical Baseline for Implementation
Source: docs/PRD.md

1. Purpose

This TRD translates the KisanFlow PRD into an implementation-ready technical baseline. It covers the farmer mobile app, procurement officer app, assisted-service operator app, government admin dashboard, centralized Supabase backend, realtime queue, procurement/payment tracking, offline support, multilingual support, security and deployment.

2. Architecture

KisanFlow uses one centralized, role-based architecture:

Farmer Mobile ───────┐
Officer Mobile ──────┤
Operator Mobile ─────┼──> Supabase ──> Future authorized APIs
Admin Web ───────────┘

Core decision: one Supabase project and one PostgreSQL database for all roles. Access is controlled by authentication, role-based authorization and Row Level Security (RLS).

3. Applications

Mobile — apps/mobile

React Native

Expo

Expo Router

TypeScript

One mobile binary

Role route groups:

/(farmer)

/(officer)

/(operator)

Farmer: registration/login, profile, crop, centre discovery, smart recommendation, slot booking, token, live queue, ETA, notifications, procurement/payment/history.

Officer: centre dashboard, bookings, queue, call next, arrival, processing, weighing, quality, procurement, payment, queue controls and statistics.

Operator: assisted registration, farmer lookup, slot booking, token generation and status lookup.

Admin — apps/admin

Next.js

TypeScript

Provides centre/district analytics, procurement statistics, queue/waiting/processing metrics, payments, utilization, congestion prediction and operational recommendations.

4. Repository Structure

krishakflow/
├── apps/
│   ├── mobile/
│   │   └── app/
│   │       ├── (farmer)/
│   │       ├── (officer)/
│   │       └── (operator)/
│   └── admin/
├── packages/
│   └── shared/
│       ├── types/
│       ├── constants/
│       ├── validation/
│       └── services/
├── supabase/
│   ├── migrations/
│   ├── seed/
│   └── config/
├── docs/
│   ├── PRD.md
│   ├── TRD.md
│   ├── DEVELOPMENT.md
│   └── TEAM_TASK_PLAN.md
├── .env.example
├── .gitignore
├── package.json
└── README.md

Use npm workspaces initially. Turborepo is not required.

5. Shared Package

packages/shared contains genuinely shared TypeScript types, role definitions, status constants, validation contracts, service interfaces and common utilities.

UI/platform-specific code stays inside its application.

6. Supabase Backend

Use:

PostgreSQL

Supabase Auth

Row Level Security

Supabase Realtime

Realtime is required for near-real-time queue changes and appropriate procurement/payment/dashboard updates.

The prototype uses Supabase as the primary backend. A separate FastAPI server is not required initially.

7. Logical Data Model

The following are domain entities; exact columns/constraints will be implemented through reviewed migrations:

User / Auth account

Farmer Profile

Staff Profile

Procurement Centre

Crop

Slot

Booking / Token

Queue Event / Queue State

Weighing Record

Quality Inspection

Procurement Record

Payment

Notification

Audit Log

Congestion Prediction

Operational Recommendation

Core relationship:

Farmer → Crop → Centre → Slot → Booking/Token → Queue
                                           ↓
                                      Procurement
                                           ↓
                                        Payment

8. Queue

Queue states:

Booked → Arrived → Waiting → Called → Processing → Completed

Additional states: Cancelled, No-show.

Officer actions:

Call next

Skip

Recall

Mark arrived

Start processing

Complete processing

Cancel token

Important queue actions must be logged. Queue transitions must be validated server-side.

9. Dynamic ETA

ETA uses:

Farmers ahead

Average processing time

Active counters

Current processing speed

Current workload

Example:

Farmers ahead: 4
Estimated wait: 28 minutes

ETA is an estimate and must update as queue conditions change.

10. Procurement

Workflow:

Booking → Arrival → Queue → Weighing → Quality → Procurement → Payment

Weighing

Record crop, measured quantity, unit, timestamp and responsible staff reference.

Quality

States:

Pending

Approved

Rejected

Requires Review

AI must never automatically approve/reject crops without human verification.

Procurement

Record accepted quantity, crop, status, date and reference.

11. Payment

States:

Pending → Verified → Approved → Processing → Credited
                         ↘ Failed

Where real government payment APIs are unavailable, the SIH prototype may simulate status updates.

KisanFlow must not directly control bank transactions.

12. Authentication and RBAC

Roles:

FARMER
OFFICER
OPERATOR
ADMIN

Supabase Auth handles identity/session management.

RLS/backend authorization must enforce access; the client cannot be trusted as the authorization layer.

Farmer: own profile, bookings, queue/token, procurement and payment.

Officer: authorized centre operations.

Operator: authorized assisted-service operations.

Admin: authorized centre/district analytics.

Farmers must never access another farmer's private data.

13. RLS

RLS is mandatory before real application data is used.

Rules:

Default access is restrictive.

Farmer data is limited to the owner.

Officer access is limited to authorized centres.

Operator access is limited to authorized assisted operations.

Admin access is limited to authorized administrative scope.

Sensitive fields are not unnecessarily exposed.

RLS must be tested for every role.

14. Service Layer

UI screens should not scatter raw database queries.

Planned services:

authService
farmerService
cropService
centreService
bookingService
queueService
procurementService
paymentService
notificationService
analyticsService
congestionService

Services should use stable contracts so a future FastAPI layer can be introduced without major UI rewrites.

15. Notifications

Events include:

Booking confirmation

Slot approaching

Queue update

Near turn

Farmer called

Procurement update

Payment update

Use a notification abstraction:

Notification Service
├── In-app
└── SMS adapter

Initial implementation may simulate SMS where a real provider is unavailable.

16. Offline

Essential information should be cached for temporary connectivity loss.

Centre operations may cache:

Queue data

Today's bookings

Farmer details

Local updates

Offline writes use a local sync queue and synchronize when connectivity returns.

Conflicts must be handled explicitly; offline data must not silently overwrite newer server data.

17. Multilingual

Initial languages:

English

Hindi

All user-facing strings must be externalized. Architecture must allow additional Indian languages later.

18. Smart Centre Recommendation

Recommendation inputs:

Distance

Current queue

Centre capacity

Available slots

ETA

Historical workload

Predicted congestion

Recommendation is advisory; it must not silently force a centre choice.

19. Congestion Prediction

Possible inputs:

Historical farmer volume

Day of week

Time

Centre capacity

Number of counters

Current bookings

Historical processing time

Example:

Expected farmers: 1,840
Congestion: HIGH
Peak: 10 AM–1 PM

Predictions are advisory.

20. Operational Recommendations

Possible recommendations:

Open additional counter

Increase staff

Redistribute slots

Redirect farmers

Extend operating hours

The system must not automatically change government operations.

21. Audit Logging

Important actions must capture:

Actor

Role

Action

Entity

Entity ID

Timestamp

Relevant metadata

Example:

Officer: O102
Action: QUALITY_APPROVED
Farmer: F201
Time: 11:42 AM

Normal users must not casually edit audit records.

22. Security

Required:

HTTPS/TLS

Supabase Auth

Secure sessions

RBAC

RLS

Input validation

Server-side authorization

Audit logging

Least privilege

Minimal farmer-data collection

Client-side public Supabase key is allowed.

SUPABASE_SERVICE_ROLE_KEY is server-only and must never be placed in mobile/browser code, Git, chat or .env.example with a real value.

23. Environment

Mobile:

EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=

Admin:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

Server-only/future:

SUPABASE_SERVICE_ROLE_KEY=

If the Supabase dashboard calls the client key a Publishable Key, use that public client key.

Real credentials remain in ignored local environment files.

24. Performance

PRD targets:

Normal API requests: under 500 ms

Dashboard: load within a few seconds under normal conditions

Queue updates: near real-time

Use pagination and appropriate database indexes as the schema grows. Avoid unbounded reads and unnecessary repeated queries.

25. Scalability

Architecture must support:

Multiple centres

Multiple districts

Large farmer volumes

Concurrent queue activity

Centre/district analytics

26. Accessibility

The implementation must support:

Simple UI

Large touch targets

Local language

Low-bandwidth use

Assisted-service mode

Clear loading/error/empty states

Visible offline status where relevant

27. Testing

Unit

ETA

Queue calculations

Validation

Recommendation logic

Status transitions

Integration

Auth

RLS

Booking

Queue

Realtime

Procurement

Payment

Security

Verify:

Farmer → own data: ALLOWED
Farmer → another farmer: DENIED

Officer → assigned centre: ALLOWED
Officer → unauthorized centre: DENIED

Operator → authorized assisted actions: ALLOWED

Admin → authorized scope: ALLOWED

End-to-end SIH flow

Create Farmer
↓
Select Wheat
↓
Select Centre
↓
Book Slot
↓
Receive Token
↓
Live Queue
↓
ETA
↓
Officer Calls
↓
Record Weight
↓
Approve Quality
↓
Complete Procurement
↓
Update Payment
↓
Farmer Sees Payment

Government dashboard must reflect operational changes.

28. Deployment

Mobile

Expo development and Android APK build through EAS when required for SIH.

Admin

Next.js web deployment. Hosting provider can be selected later.

Backend

Hosted Supabase project.

29. CI/CD

PR checks should eventually run:

TypeScript

Lint

Unit tests

Build validation

Git workflow follows docs/DEVELOPMENT.md.

30. Team Ownership

Team Leader: architecture, PRD/TRD governance, integration, Supabase review, PR review, security review, final testing, SIH demo and release.

Member 1 — Backend/Supabase: schema, migrations, Auth, roles, RLS, Realtime, seed data, service contracts.

Member 2 — Farmer Mobile: farmer registration/login, profile, crop, centre discovery, recommendation, booking, token, queue, ETA, notifications, procurement/payment/history UI.

Member 3 — Operations/Admin: officer app, operator app, queue controls, weighing, quality, procurement, payment updates, government dashboard.

31. Implementation Phases

Phase 0 — Foundation

Monorepo, Expo, Next.js, shared package, routing, env templates, build verification.

Phase 1 — Supabase Foundation

Schema, Auth, roles, RLS, Realtime setup, seed/demo data.

Phase 2 — Farmer Core

Registration/login, profile, crop, centre, recommendation, booking, token.

Phase 3 — Queue

Officer queue, arrival, call next, processing, Realtime, ETA.

Phase 4 — Procurement/Payment

Weighing, quality, procurement, payment and farmer timeline.

Phase 5 — Admin/Intelligence

Government dashboard, analytics, congestion prediction and recommendations.

Phase 6 — Reliability/Accessibility

Hindi, offline support, SMS abstraction, errors and performance.

Phase 7 — SIH Release

End-to-end test, security review, demo data, APK, admin deployment and final demo.

32. Deferred Decisions

Not fixed by this TRD:

Real SMS provider

Government API integration

Exact hosting provider

Advanced ML model

IoT weighing integration

Aadhaar/eKYC (only if officially authorized)

Advanced fraud detection

Nationwide production infrastructure

33. Guardrails

KisanFlow will not:

Replace government procurement systems

Control bank transactions

Determine MSP

Replace quality inspectors/staff

Provide financial advice

Create an unauthorized government identity system

Auto approve/reject crops using AI without human verification

34. Technical Foundation Definition of Done

Foundation is ready when:

Mobile app starts

Admin app starts

Workspace installs

Role routes exist

Shared package works

Environment template exists

No real secrets are committed

Supabase is ready for reviewed schema work

Documentation is consistent

TypeScript/lint/build checks pass where configured

No unfinished feature is represented as complete

35. Final Architecture Principle

PREDICT
   ↓
SCHEDULE
   ↓
QUEUE
   ↓
PROCURE
   ↓
PAY
   ↓
ANALYZE
   ↺

The technical architecture must keep this journey secure, reliable, observable, scalable and extensible while operational authority remains with authorized government staff.

Next step: Phase 0 — Basic Architecture Foundation.
