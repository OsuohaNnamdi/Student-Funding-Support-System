# Syntechtic Scholars — Frontend

A from-scratch, premium-styled rebuild of the scholarship funding platform
(student applications, sponsor-offered scholarships, admin review, and
Stripe-powered contributions) — Create React App, wired to the same backend
endpoints the previous version was already calling.

## Design
Custom design system (no sweetalert2/react-spinners layered UI), consistent
with the rest of this rebuild series — a distinct deep teal/emerald + gold
"funding meets education" palette, light/dark toggle, custom toast and
confirm-dialog components instead of SweetAlert2 popups.

## Roles
- **Student** — browse scholarships, apply via a guided 4-step form, track
  application status
- **Sponsor** (registered as "Funder" — matches the previous UI's wording)
  — offer new scholarships, manage existing ones
- **Admin** — review and accept/reject student applications, manage
  scholarships platform-wide, manage funding plans shown on Pricing. Not
  self-registrable — same as the previous version, there's no "Admin" option
  on the sign-up form.

## Real bugs fixed from the previous version
- **Dashboard could never show a student's own applications.** `Dashboard.jsx`
  hardcoded `const matricNo = 'your-matric-no'` and never replaced it with
  the actual logged-in user's identifier — so the endpoint was always called
  with a literal placeholder string. The `AppliedScholarships.jsx` screen
  right next to it did this correctly, using `profile.email`. Both screens
  did the same thing (fetch and display a student's applications), so
  they're now one `MyApplicationsPage`, built on the pattern that actually
  worked.
- **Three separate, never-reused localStorage role flags.** Login wrote
  `TYPE` (admin), `TYPES` (sponsor), or `TYPESS` (student) depending on
  role — but nothing in the rest of the app ever read any of them back.
  The actual role check everywhere was on `profile.accountType` from the
  stored profile object. Replaced with a single source of truth
  (`AuthContext`), and role-aware navigation now actually hides links a
  given role can't use — the old nav showed every admin/sponsor/student
  link to everyone, regardless of role.
- **Raw axios calls bypassing the shared instance.** `Login.jsx`,
  `RegisterStudent.jsx`, and `PaymentForm.jsx` each built their own
  `axios.post('http://localhost:8080/...')` call instead of using
  `axiosInstance` — meaning the JWT header was never attached on login,
  registration, or payment requests. All three now go through
  `src/api/client.js`.
- **Hardcoded Stripe placeholder key.** `Pricing.jsx` called
  `loadStripe('your-publishable-key-here')` — a literal string that would
  fail at runtime. Now reads `REACT_APP_STRIPE_PUBLISHABLE_KEY` from the
  environment.
- **Duplicate About page.** Two components (`components/about/About.jsx`,
  routed at `/about`, and `components/common/About.jsx`, unused/dead) had
  overlapping but different content, plus broken image paths
  (`'path/to/john-doe.jpg'`). Merged into one `AboutPage` with real content
  from both, using initials-based avatars instead of broken image links.

## Kept as-is, flagged rather than guessed
- **`/api/payment` vs `/api/v1/...`.** Every other endpoint in the previous
  app went through `axiosInstance`'s `/api/v1` base — except payments, which
  posted directly to `http://localhost:8080/api/payment` (no `/v1`). That
  might be a deliberate separate route group on the backend, or it might
  have been a mistake. Rather than silently "fixing" it to `/api/v1/payment`
  and possibly breaking a real, different backend route, it's kept as its
  own configurable base (`REACT_APP_PAYMENT_BASE_URL`) — point it wherever
  the real endpoint lives.
- **Sponsors see every scholarship, not just their own.** `SponsorshipTable.jsx`
  fetched `GET /sponsorships` with no owner filter, so any sponsor account
  could see and edit every scholarship on the platform, not just ones they
  created. Kept that same behavior (`ManageScholarshipsPage` is shared
  between the Sponsor and Admin routes) since there's no backend field to
  filter by owner yet — worth asking the backend team for one if
  multi-tenant sponsor accounts matter.

## Removed
- `sweetalert2`, `react-spinners` — replaced by the custom toast/confirm/
  spinner components used across this rebuild, for visual consistency.
- `dummydata.js` and the unused `Testimonal` component — generic
  course-marketplace template filler content (icons8 stock icons, "Far far
  away, behind the word mountains…" placeholder copy) that had nothing to
  do with the actual scholarship product and was never wired into any real
  page.

## Full endpoint list (base `REACT_APP_API_BASE_URL`, default `/api/v1`)
```
POST   /login                     { email, password } -> { token, profileDTO }
POST   /register                  { name, email, password, organization?, faculty?, department?, gender?, accountType }

GET    /applications/:email       -> Application[] (a student's own applications)
GET    /applications               -> Application[] (admin — every application)
POST   /applications/add          multipart: name, email, guardianName, gpa, matricNo, financialNeed,
                                   statement, companyName, companyImage, documents, document2
PUT    /applications/approve/:id
PUT    /applications/reject/:id

GET    /sponsorships              -> Scholarship[]
POST   /sponsorships/add          multipart: donorName, email, numStudents, totalAmount, paymentMethod, comments, document
PUT    /sponsorships/:id
DELETE /sponsorships/:id

GET    /fund                      -> FundingPlan[]
POST   /fund/add                  { name, contact, amount, description }
PUT    /fund/:id
DELETE /fund/:id
```
```
# Base REACT_APP_PAYMENT_BASE_URL, default http://localhost:8080/api — see note above
POST   /payment                   { amount, paymentMethodId } -> { success }
```

## Setup
```bash
cp .env.example .env      # confirm base URLs + set a real Stripe publishable key
npm install
npm start                  # http://localhost:3000
```

`.env.example` also sets `DISABLE_ESLINT_PLUGIN=true` — react-scripts 5's
bundled ESLint webpack plugin currently crashes on a fresh install under
modern npm (unrelated to this project's code). Lint separately with
`npx eslint src` if you want it.

## Structure
```
src/
  api/            client.js (two axios instances — main + payment — with a shared token interceptor)
                  + one file per domain: authApi, applicationApi, scholarshipApi, fundApi, paymentApi
  constants/      roles.js (role enum + the faculty/department taxonomy)
  context/        AuthContext, ThemeContext, ToastContext, ConfirmContext
  components/     Layout (role-aware topbar nav), Avatar, EmptyState, Spinner, ProtectedRoute
  pages/
    auth/         LoginPage, RegisterPage (student/funder role switch, matching the previous UI)
    HomePage, AboutPage, NotFoundPage
    scholarships/ ScholarshipsPage (browse + apply), ApplicationForm (the 4-step form)
    student/      MyApplicationsPage (tracker + detail modal)
    pricing/      PricingPage, PaymentForm (Stripe)
    admin/        ManageScholarshipsPage (shared with Sponsor route), ManageFundsPage, ApplicationsReviewPage
```

## Known gaps / next steps
- No password-reset flow exists in the previous version or this one — worth
  adding if the backend supports it.
- `ManageScholarshipsPage` has no owner scoping for sponsors (see note
  above) — it's a straight port of the previous behavior, not a new gap.
- The Stripe payment result only checks `response.data.success` — if the
  backend's payment endpoint returns richer error detail, `PaymentForm`
  could surface more specific failure reasons than a generic message.
