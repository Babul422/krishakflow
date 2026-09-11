KisanFlow

Intelligent Crop Procurement, Slot Booking & Queue Management Platform

SIH Problem Statement: SIH26032
Document: Product Requirements Document (PRD)
Version: 1.0
Status: Proposed Solution

---

1. Executive Summary

KisanFlow is a digital platform designed to improve the government crop procurement experience for farmers and procurement-centre officials.

The platform addresses major problems faced during crop procurement, including:

- Long physical queues
- Uncertainty about procurement schedules
- Lack of real-time queue information
- Unpredictable waiting times
- Congestion at procurement centres
- Lack of transparency in procurement status
- Lack of visibility into payment status
- Difficulty accessing digital services in areas with poor connectivity

KisanFlow introduces a unified system consisting of:

1. Farmer registration
2. Procurement-centre discovery
3. Smart slot booking
4. Digital token generation
5. Real-time queue management
6. Dynamic waiting-time estimation
7. Procurement lifecycle tracking
8. Payment-status tracking
9. Notifications
10. Procurement-centre management
11. Government analytics
12. Congestion prediction
13. Offline-first functionality
14. Multilingual and assisted-access support

The objective is to transform crop procurement from a largely physical queue-based process into a predictable, transparent and data-driven process.

---

2. Problem Statement

Farmers visiting government procurement centres often experience long waiting times and uncertainty regarding:

- Whether procurement is taking place
- When they should arrive
- How many farmers are ahead of them
- How long they will have to wait
- Whether their crop has passed quality inspection
- Whether their procurement has been completed
- Whether payment has been initiated
- Whether payment has been credited

At the same time, procurement-centre officials have limited tools for:

- Managing queues
- Controlling daily capacity
- Distributing farmers across centres
- Predicting congestion
- Monitoring processing times
- Tracking pending payments
- Analysing centre performance

KisanFlow aims to solve these problems through a centralized digital platform.

---

3. Product Vision

«"Make government crop procurement predictable, transparent and accessible for every farmer."»

KisanFlow should allow a farmer to know:

Where to go → When to go → How long to wait → What is happening with their crop → When their payment will arrive.

---

4. Product Goals

4.1 Primary Goals

Goal 1 — Reduce waiting time

Reduce unnecessary physical waiting by introducing:

- Advance slot booking
- Digital tokens
- Live queue tracking
- Dynamic ETA

Goal 2 — Reduce procurement-centre congestion

Distribute farmers based on:

- Centre capacity
- Current queue
- Available slots
- Historical workload
- Predicted congestion

Goal 3 — Increase transparency

Provide real-time visibility into:

- Booking
- Queue
- Weighing
- Quality inspection
- Procurement
- Payment

Goal 4 — Improve government administration

Provide dashboards containing:

- Centre performance
- Procurement volume
- Queue size
- Waiting time
- Processing time
- Pending payments
- Predicted congestion

Goal 5 — Ensure accessibility

Support:

- Mobile application
- Web/PWA
- SMS
- Multilingual interface
- Assisted registration
- Offline operation

---

5. Non-Goals

The first version of KisanFlow will NOT attempt to:

- Replace government procurement systems
- Directly control bank transactions
- Directly determine government MSP
- Replace quality inspectors
- Replace procurement-centre staff
- Provide financial advice
- Create a new government identity system
- Automatically approve/reject crops using AI without human verification

The platform should integrate with existing government systems through APIs when such integration is authorized.

---

6. Target Users

6.1 Farmer

The primary user.

Needs to:

- Register
- Find procurement centres
- Book slots
- Receive token
- Track queue
- Receive notifications
- Track procurement
- Track payment

---

6.2 Procurement Centre Official

Responsible for:

- Managing daily capacity
- Managing farmer queues
- Calling farmers
- Recording arrival
- Recording weighing
- Recording quality inspection
- Updating procurement
- Updating payment status

---

6.3 Government Administrator

Needs:

- District-level analytics
- Centre-level analytics
- Procurement statistics
- Congestion information
- Payment information
- Performance monitoring

---

6.4 Assisted-Service Operator

A staff member who helps farmers who cannot independently use the application.

Can:

- Register farmers
- Book slots
- Generate tokens
- Check status

---

7. User Personas

Persona 1 — Farmer

Name: Ramesh
Age: 45
Technical literacy: Basic

Problems

- Does not want to wait for several hours
- May not have reliable internet
- Wants information in local language
- Wants to know when payment arrives

Needs

«"Tell me when I should come and what is happening with my crop."»

---

Persona 2 — Centre Official

Name: Procurement Officer

Problems

- Large number of farmers
- Difficult queue management
- Manual records
- Congestion during peak periods

Needs

«"Give me one dashboard where I can manage today's entire procurement operation."»

---

Persona 3 — Government Administrator

Problems

- Limited real-time visibility
- Difficult to compare centres
- Difficult to predict congestion

Needs

«"Show me where the bottlenecks are before they become problems."»

---

8. Core User Journey

Farmer Journey

Registration
     ↓
Select Crop
     ↓
Enter Quantity
     ↓
Find Procurement Centre
     ↓
View Centre Capacity
     ↓
Select Slot
     ↓
Receive Token
     ↓
Arrive at Centre
     ↓
Join Digital Queue
     ↓
Receive Call Notification
     ↓
Weighing
     ↓
Quality Inspection
     ↓
Procurement
     ↓
Payment Processing
     ↓
Payment Completed

---

9. Functional Requirements

FR-01 — Farmer Registration

The system shall allow farmers to create an account.

Required information

- Name
- Mobile number
- Location
- Village
- District
- Preferred language
- Optional farmer identification details depending on implementation requirements

Acceptance Criteria

- Valid mobile number required
- Duplicate registration should be detected
- OTP verification should be supported in production
- Farmer should receive a unique farmer ID

---

FR-02 — Farmer Profile

Farmer should be able to view and update:

- Name
- Phone number
- Location
- Preferred language
- Crop information

---

FR-03 — Crop Selection

Farmer should be able to select:

- Crop
- Approximate quantity
- Expected procurement date

The system should validate reasonable values.

---

FR-04 — Procurement Centre Discovery

The system should display available procurement centres.

Each centre should show:

- Name
- Distance
- Current queue
- Estimated waiting time
- Available slots
- Current congestion level

Example:

Centre A
Distance: 3.2 km
Queue: 72
Estimated wait: 2h 10m
Status: HIGH CONGESTION

---

FR-05 — Smart Centre Recommendation

The system should recommend suitable centres based on:

- Distance
- Queue size
- Capacity
- Available slots
- Estimated waiting time

The system should prioritize overall convenience rather than simply recommending the nearest centre.

---

FR-06 — Slot Booking

Farmers should be able to select available time slots.

Each slot should have:

- Date
- Start time
- End time
- Maximum capacity
- Current bookings

Example:

10:00–11:00
Capacity: 20
Booked: 15
Available: 5

---

FR-07 — Token Generation

After successful booking, the system should generate a unique token.

Example:

Token: B42
Centre: Centre B
Date: 15 September
Time: 11:00–12:00

---

FR-08 — Queue Management

The system shall maintain a real-time digital queue.

Queue states:

- Booked
- Arrived
- Waiting
- Called
- Processing
- Completed
- Cancelled
- No-show

---

FR-09 — Dynamic ETA

The system should calculate estimated waiting time using:

- Farmers ahead
- Average processing time
- Active counters
- Current processing speed
- Centre workload

Example:

Farmers ahead = 10
Average processing = 7 minutes

Estimated waiting time ≈ 70 minutes

The system should update ETA dynamically.

---

FR-10 — Queue Notifications

Notifications should be generated when:

- Booking is confirmed
- Slot is approaching
- Queue position changes
- Farmer is near their turn
- Farmer is called
- Procurement status changes
- Payment status changes

---

FR-11 — Arrival Verification

Officials should be able to mark a farmer as:

«ARRIVED»

The farmer's token should then enter the active queue.

---

FR-12 — Weighing Management

Officials should enter:

- Crop
- Measured quantity
- Unit
- Timestamp

Example:

Crop: Wheat
Measured quantity: 420 kg

---

FR-13 — Quality Inspection

Officials should record:

- Quality status
- Inspection result
- Optional remarks
- Inspector
- Timestamp

Possible states:

Pending
Approved
Rejected
Requires Review

---

FR-14 — Procurement Recording

Officials should record:

- Accepted quantity
- Crop
- Procurement status
- Procurement date
- Reference number

---

FR-15 — Payment Tracking

The platform should maintain payment status.

Possible states:

Pending
Verified
Approved
Processing
Credited
Failed

The prototype should simulate payment updates where real government payment APIs are unavailable.

---

FR-16 — Farmer Procurement Timeline

Farmer should see:

✓ Booking confirmed
✓ Arrived
✓ Weighing completed
✓ Quality approved
✓ Procurement completed
● Payment processing
○ Payment credited

---

FR-17 — Procurement Centre Dashboard

The centre dashboard should show:

- Today's bookings
- Current queue
- Completed farmers
- Waiting farmers
- Active counters
- Average waiting time
- Average processing time
- Pending cases
- No-shows

---

FR-18 — Queue Control

Officials should have actions:

- Call next farmer
- Skip farmer
- Recall farmer
- Mark arrived
- Start processing
- Complete processing
- Cancel token

All actions should be logged.

---

FR-19 — Government Dashboard

The administrator dashboard should provide:

KPIs

- Total farmers
- Total procurement
- Total quantity
- Average waiting time
- Average processing time
- Pending payments
- Centre utilization

Visualizations

- Centre-wise workload
- Crop-wise procurement
- District-wise procurement
- Waiting-time trends
- Daily procurement trends

---

FR-20 — Congestion Prediction

The system should predict future congestion.

Possible inputs:

- Historical farmer volume
- Day of week
- Time
- Centre capacity
- Number of counters
- Current bookings
- Historical processing time

Output:

Expected farmers: 1,840
Expected congestion: HIGH
Peak period: 10 AM–1 PM

---

FR-21 — Operational Recommendation

The system may recommend:

- Opening additional counter
- Increasing staff
- Redistributing slots
- Redirecting farmers to nearby centres
- Extending operating hours

Example:

«"Open Counter 4 between 10 AM and 1 PM to reduce predicted waiting time."»

Recommendations should be advisory and not automatically alter government operations.

---

FR-22 — Multilingual Support

The application should support multiple languages.

Initial prototype:

- English
- Hindi

Architecture should allow additional Indian languages.

---

FR-23 — SMS Support

Important events should be available through SMS.

Example:

«Your token is B42. Please reach Centre B between 11:00 AM and 12:00 PM.»

---

FR-24 — Offline Support

The farmer/centre application should retain essential information when connectivity is temporarily unavailable.

For centre operations:

- Queue data
- Today's bookings
- Farmer details
- Local updates

should be cached.

Data should synchronize when connectivity returns.

---

FR-25 — Audit Logging

Important actions should be logged.

Example:

Officer: O102
Action: QUALITY_APPROVED
Farmer: F201
Time: 11:42 AM

This improves accountability.

---

10. Non-Functional Requirements

Performance

- API response target: < 500 ms for normal requests
- Dashboard should load within a few seconds under normal conditions
- Queue updates should be near real-time

Availability

The production system should aim for high availability.

Scalability

Architecture should support:

- Multiple centres
- Multiple districts
- Large numbers of farmers

Security

- Authentication
- Role-based access
- HTTPS
- Password/credential protection
- Secure session handling
- Input validation
- Audit logging

Privacy

Only required farmer information should be collected.

Sensitive information should not be unnecessarily exposed to other users.

Accessibility

- Simple UI
- Large buttons
- Local language
- Low-bandwidth design
- Assisted-service mode

---

11. Success Metrics

The success of KisanFlow should be measured using:

Primary metrics

- Reduction in average waiting time
- Reduction in physical queue length
- Increase in advance slot bookings
- Reduction in centre congestion
- Reduction in farmer repeat visits

Secondary metrics

- Average processing time
- No-show rate
- Centre utilization
- Payment-status visibility
- Farmer satisfaction

---

12. MVP Scope

For the SIH prototype, implement:

Must Have

- Farmer registration
- Login
- Centre listing
- Slot booking
- Token generation
- Live queue
- ETA
- Centre dashboard
- Procurement status
- Payment status
- Government dashboard

Differentiators

- Smart centre recommendation
- Congestion prediction
- Dynamic ETA
- Offline mode
- Multilingual UI

Future

- IVR
- Real SMS integration
- Government API integration
- Advanced ML
- IoT-based weighing integration
- Aadhaar/eKYC integration if officially authorized
- Advanced fraud detection

---

13. MVP Acceptance Criteria

The prototype will be considered successful if a judge can perform this complete flow:

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
See Live Queue
      ↓
See ETA
      ↓
Officer Calls Farmer
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

The government dashboard should simultaneously reflect the operational changes.

---

14. Product Differentiation

KisanFlow is not simply an appointment application.

Its core differentiators are:

1. Dynamic queue estimation
2. AI-based congestion prediction
3. Smart centre recommendation
4. Operational recommendations
5. Offline-first design
6. Multilingual accessibility
7. Complete procurement-to-payment visibility

---

15. Future Roadmap

Phase 1

Digital registration + slot booking

Phase 2

Queue management + notifications

Phase 3

Procurement + payment tracking

Phase 4

AI prediction

Phase 5

Government-system integration

Phase 6

Nationwide scalability

---

16. Final Product Statement

KisanFlow transforms government crop procurement into a predictable and transparent digital journey.

Instead of:

«"Go to the centre and wait."»

KisanFlow enables:

«"Book → Arrive at the right time → Track your queue → Complete procurement → Track your payment."»