# KisanFlow

**Smart Procurement. Less Waiting. More Transparency.**

> Repository: `KrishakFlow` · Product: `KisanFlow`

---

## Project Overview

Millions of farmers travel to government procurement centres every season and spend hours — sometimes entire days — waiting in physical queues with no reliable information about when they will be served, whether their crop will be accepted, or when they will be paid.

**KisanFlow** is an intelligent crop procurement, slot booking, and queue management platform designed to make government crop procurement predictable, transparent, and accessible for every farmer.

### The problem

| Problem | Impact |
|---------|--------|
| Long physical queues | Farmers lose entire days waiting at centres |
| No waiting-time visibility | Farmers cannot plan their arrival |
| Procurement uncertainty | Unclear whether crop will be accepted |
| No payment status transparency | Farmers do not know when payment will arrive |
| Centre congestion | Resources are unevenly distributed across centres |
| Poor connectivity | Rural farmers may have limited internet access |

---

## Vision

> *"Make government crop procurement predictable, transparent and accessible for every farmer."*

---

## What KisanFlow Does

KisanFlow transforms the procurement journey into a clear, digital flow:

```
Book → Arrive at the right time → Track queue → Complete procurement → Track payment
```

| Step | What happens |
|------|-------------|
| **Farmer registration** | Farmer creates an account with basic profile details |
| **Crop selection** | Farmer selects the crop they intend to sell |
| **Procurement centre discovery** | Farmer sees nearby centres with availability and congestion status |
| **Smart centre recommendation** | System recommends the most convenient centre based on distance, queue size, capacity, available slots, and estimated waiting time |
| **Slot booking** | Farmer selects an available date and time slot at the chosen centre |
| **Token generation** | System issues a unique token confirming the booking (e.g. Token B42, Centre B, 11:00–12:00) |
| **Live queue tracking** | Farmer tracks real-time queue position after arrival |
| **Dynamic ETA** | System continuously calculates and updates estimated waiting time based on farmers ahead, average processing time, and active counters |
| **Notifications** | Alerts sent at booking confirmation, slot approach, queue position changes, when called, and on procurement and payment updates |
| **Weighing** | Official records crop, quantity, and timestamp at the weighing counter |
| **Quality status** | Official records quality inspection result (Approved / Rejected / Requires Review) |
| **Procurement status** | Official records accepted quantity, procurement date, and reference number |
| **Payment tracking** | Farmer tracks payment status through Pending → Verified → Approved → Processing → Credited |

---

## User Roles

| Role | Description |
|------|-------------|
| **Farmer** | Registers, selects crop, discovers centres, books slots, tracks queue position, and monitors procurement and payment status through the mobile app |
| **Procurement Centre Official** | Manages the day's queue, marks arrivals, records weighing and quality inspection, completes procurement, and operates the centre dashboard |
| **Government Administrator** | Monitors system-wide KPIs, procurement volumes, centre utilisation, waiting-time trends, and congestion predictions through the analytics dashboard |
| **Assisted-Service Operator** | Supports farmers who cannot use the app independently by performing actions on their behalf through an assisted-access mode |

---

## Key Capabilities

- **Smart procurement centre recommendation** — recommends centres by distance, queue size, capacity, and estimated waiting time
- **Slot booking** — advance time-slot reservations with capacity management
- **Token-based queue management** — unique tokens with defined queue states (Booked → Arrived → Called → Processing → Completed)
- **Near-real-time queue visibility** — farmers and officials see live queue status
- **Dynamic ETA calculation** — continuously updated estimated waiting time
- **Procurement lifecycle tracking** — full visibility from arrival through weighing, quality, and procurement completion
- **Payment tracking** — status visibility from Pending through Credited
- **Centre operational dashboard** — daily bookings, active queue, completed and waiting counts, average processing metrics
- **Government analytics dashboard** — system-wide KPIs, crop-wise and district-wise procurement, trend visualisations
- **Congestion prediction** — forecasts future centre congestion from historical and current data
- **Operational recommendations** — advisory suggestions such as opening additional counters or redistributing slots (not automatic)
- **English + Hindi support** — with architecture ready for additional Indian languages
- **Offline-first support** — essential data cached locally; synchronises when connectivity returns
- **Assisted access** — operator-assisted mode for farmers who need support

---

## Product Flow

```
Farmer Registration
        ↓
   Crop Selection
        ↓
  Centre Discovery
        ↓
Smart Recommendation
        ↓
    Slot Booking
        ↓
  Token Generation
        ↓
      Arrival
        ↓
    Live Queue
        ↓
     Weighing
        ↓
     Quality
        ↓
   Procurement
        ↓
 Payment Tracking
```

---

## High-Level Architecture

| Layer | Technology |
|-------|-----------|
| Mobile application | React Native + Expo |
| Role-based experience | Farmer app · Officer app (role-separated views) |
| Admin dashboard | Next.js |
| Backend | Supabase |
| Database | PostgreSQL (via Supabase) |
| Authentication | Supabase Auth |
| Real-time updates | Supabase Realtime |
| Shared service layer | Shared TypeScript service modules |
| Future integrations | API-ready architecture for government system integration |

---

## Technology Stack

| Area | Technology |
|------|-----------|
| Mobile | React Native, Expo |
| Web dashboard | Next.js |
| Backend-as-a-service | Supabase |
| Database | PostgreSQL |
| Auth | Supabase Auth |
| Real-time | Supabase Realtime |
| Language | TypeScript |
| Multilingual | i18n — English, Hindi (extensible) |

---

## Documentation

| Document | Purpose |
|----------|---------|
| [`docs/PRD.md`](docs/PRD.md) | Product Requirements Document — authoritative product source of truth |
| [`docs/TRD.md`](docs/TRD.md) | Technical Requirements Document — technical source of truth (being finalised) |
| [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) | Team development and Git workflow |

---

## Project Status

| Item | Status |
|------|--------|
| Documentation foundation | ✅ Established |
| PRD | ✅ Complete and verified |
| Development workflow | ✅ Established |
| TRD | 🔄 Being finalised |
| Application implementation | 🔲 Not started |

---

## Development Principles

This project follows a documentation-first development approach:

- All features must trace to a requirement in `docs/PRD.md`
- Technical decisions are documented in `docs/TRD.md` before implementation begins
- Development happens on **feature branches** — never directly on `main`
- All changes enter `main` through a reviewed **Pull Request**
- At least one peer **code review** is required before merge
- **Testing** is required before a feature is considered done
- **AI coding agents** must follow the approved documentation and must not invent requirements

See [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) for the full team workflow.

---

## Future Direction

The following are identified as future possibilities and are **not implemented features**:

- IVR (Interactive Voice Response) for feature-phone access
- Real SMS gateway integration
- Government payment API integrations
- Advanced machine learning models
- IoT-based weighing machine integration

---

*KisanFlow — transforming government crop procurement into a predictable and transparent digital journey.*
