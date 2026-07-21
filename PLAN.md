# Tzaneen Chamber of Commerce — Website Plan (Phase 1)

Status: DRAFT — awaiting approval. No implementation until this is signed off.

## 0. Assumptions & open questions (please confirm/answer)

1. ~~**Content source**~~ — **Mostly resolved**: you sent screenshots of the old site (Home, About Us, COO, Contact, part of the Membership Application form). Full transcription is in `content/old-site-content.md` — that's now the source of truth for real copy, and I will not invent chamber history, figures, or claims beyond what's written there. Still outstanding:
   - **Awards content**: the old site has no dedicated Awards page — just a homepage banner ("Annual Award Ceremony | 25 March 2026" + "Nominate Now"). No award categories, criteria, or history exist anywhere I've seen. Since your Phase 1 scope explicitly wants an Awards *page*, I need real content for it (categories, criteria, how nomination works, past winners if any) — otherwise it launches as a near-empty page.
   - **Articles**: nav item exists on the old site but no article content was in the screenshots. Confirm this launches empty (client populates via Firestore going forward) or send examples.
   - **Rest of the Membership Application form**: captured fields cut off after "VAT Number" — there's at least one more required field below. Please send a screenshot further down that form.
   - **eCOO SmartAdmin URL**: the COO page's "Apply Now" buttons link to an external platform called "eCOO SMART ADMIN" — I have the label but not the actual URL. Need the real link.
   - **Logo file**: the old site uses a circular "Tzaneen Chamber / Sakekamer" seal logo — need the actual image asset, not a recreation.
   - **Social profile URLs**: Facebook/Instagram/Twitter/YouTube/LinkedIn icons appear but actual profile links weren't captured.
2. **Photography**: No stock/AI imagery per your instruction. Every image slot will be flagged as `[NEEDS PHOTO: description]` and left as a simple placeholder (background color + label) until real photos are supplied. This includes homepage hero, About Us, and Awards imagery.
3. ~~**Domain/hosting**~~ — **Resolved**: Next.js app deployed on Vercel, Firestore (via Firebase) as the data backend. Implication: Firebase project's client config (API key, project ID, etc.) will be added as Vercel environment variables; Firestore security rules are managed separately in the Firebase console (Vercel has no role there).
4. ~~**Certificate of Origin (COO)**~~ — **Resolved**: informational page only, matching the old site. COO applications are NOT built by us — the whole application + payment (R200 members / R300 non-members) happens on the external eCOO SmartAdmin platform. Our COO page is content + FAQ + an "Apply Now" button linking out. This keeps us clear of the "no payment logic" constraint entirely, since payment never touches our stack.
5. **Email notifications on form submit**: Out of scope unless you want it — Firestore-only capture as stated. Confirming: no email-on-submit (e.g. via Cloud Function) in Phase 1? That's a cost/complexity item (Cloud Functions = Blaze plan required), so flagging explicitly.
6. **Firebase project**: New Firebase project needed — will require you (or me with credentials) to create it in the Firebase console. I cannot provision a Firebase project on your behalf without access.
7. **New finding — two separate "contact" forms on the old site**: a "Call Back Request" widget on the homepage (Name, Phone) AND a full Contact form on /contact (Name, Email, Message). Both are captured in the schema below as one flexible collection — confirm that's fine, or if you'd rather keep them as visibly distinct forms in the UI (they'd still share one collection either way).
8. **MyGuideTZN promo block**: the old homepage has a "Put Your Business Where Locals Search!" section promoting a separate business-directory product/site (myguidetzn.co.za), powered by the chamber. This looks out of scope for the chamber's own Phase 1 site — I'm planning to leave it out unless you want it included as a simple promo/link block.
9. **Old site nav has no Awards item**: confirming you still want Awards as its own page (per your original scope) even though the old site treats it as a homepage banner only.

## 1. Cost/scope flags

- **Firestore on Spark (free) plan** is sufficient for Phase 1 read/write volumes (content feed + form submissions). No Cloud Functions, no server-side email sending, no paid tier needed *unless* you want email notifications on new submissions (see Q5) — that would need Blaze (pay-as-you-go, but free tier covers low volume).
- Static/SSG rendering for content pages (Next.js) keeps hosting cheap regardless of provider.
- No third-party form/email services (e.g. SendGrid, Resend) included unless requested — adding one is a scope decision, not assumed here.

## 2. Route / page structure

```
/                     Home
/about                About Us
/articles              Articles / news listing (monthly "what's happening" feed)
/articles/[slug]       Single article/update detail
/certificate-of-origin Certificate of Origin (informational)
/awards                Awards
/contact               Contact + call-back request form
/apply                 New member application form
```

Notes:
- `/articles` doubles as the "what's happening" public feed described in scope item 2 — same content type, listing + detail view.
- Flat, shallow routing — no nested member areas, consistent with Phase 1 scope.
- Header/nav component will be built with a `navLinks` config array so a future "Member Login" link is a one-line addition, not a redesign (Phase 2 hook, per your instruction).

## 3. Firestore schema

Project: single Firestore database, top-level collections. Kept simple per instruction but not so minimal it can't gain fields later.

### `articles` (the "what's happening" feed)
```
articles/{articleId}
  title: string
  slug: string              // url-safe, unique
  date: timestamp
  body: string               // markdown or rich text (TBD — see note below)
  imageUrl: string | null    // optional
  published: boolean         // default true; lets you unpublish without deleting
  createdAt: timestamp
```
- **Note**: `body` as plain markdown string is simplest to implement and lets you edit via any means (console, later CMS) without new tooling. Rendered client-side with a markdown renderer. Flagging as the default — say if you'd rather have plain text or HTML.
- No `author` field in Phase 1 (chamber-level content, not bylined) — easy to add later.

### `memberApplications` (new member applications)

Updated to match the real old-site form fields (see `content/old-site-content.md`) instead of my earlier generic guess:
```
memberApplications/{id}
  firstName: string
  surname: string
  companyAddress: string
  companyPhone: string
  companyEmail: string
  vatNumber: string | null    // optional, matches old form
  // [PENDING] at least one more required field exists below the fold on the
  // old form (label cut off in the screenshot) — schema will be extended
  // once you send the rest of that form.
  submittedAt: timestamp
  // Phase 2 ready, NOT built now:
  // status: string          — field intentionally omitted, easy to add later
  //                           (schema has no conflicting field, no migration needed)
```
- Deliberately no `status` field now (per "no approval workflow"), but nothing else needs to change structurally to add one later — new field, default value, done.

### `contactRequests` (contact form + homepage call-back request)

The old site actually has two separate forms — a homepage "Call Back Request" (Name, Phone) and a full Contact Us form (Name, Email, Message). Modeled as one collection with optional fields, tagged by source so it stays simple but distinguishable:
```
contactRequests/{id}
  name: string
  email: string | null        // required on Contact page form, absent on homepage call-back widget
  phone: string | null        // required on homepage call-back widget, absent on Contact page form
  message: string | null      // Contact page only
  source: "contact_page" | "callback_widget"
  submittedAt: timestamp
```

No `users`, no `auth`-linked fields anywhere — confirmed no Authentication in Phase 1.

## 4. Component structure

```
app/
  layout.tsx                 Root layout — header, footer, mobile-first shell
  page.tsx                   Home
  about/page.tsx
  articles/page.tsx          Feed listing
  articles/[slug]/page.tsx   Feed detail
  certificate-of-origin/page.tsx
  awards/page.tsx
  contact/page.tsx
  apply/page.tsx

components/
  layout/
    Header.tsx                Nav, mobile menu, logo — navLinks config-driven
    Footer.tsx                Includes required "Powered by GLS Technologies" credit, links to gls-technologies.co.za
  ui/
    Button.tsx
    Card.tsx
    ImagePlaceholder.tsx      Visible placeholder for any [NEEDS PHOTO] slot — not a stock image
  articles/
    ArticleCard.tsx
    ArticleList.tsx
  forms/
    MemberApplicationForm.tsx  Client component → writes to memberApplications
    ContactForm.tsx             Client component → writes to contactRequests
    FormStatusMessage.tsx       Shared success/error state UI

lib/
  firebase.ts                 Firebase client init (Firestore only, no auth SDK imported)
  firestore/
    articles.ts                getArticles(), getArticleBySlug()
    applications.ts            submitApplication()
    contactRequests.ts         submitContactRequest()
```

- Forms use client-side Firestore writes directly (no API routes needed) since there's no auth/validation server logic required in Phase 1 — simplest thing that works. Basic client-side validation (required fields, email format) before write.
- Firestore security rules: public `create` allowed on `memberApplications` and `contactRequests` (write-only, no public read of submissions), public `read` on `articles` where `published == true`. Will include a `firestore.rules` file — flagging this as something I'll draft but you should review before going live, since form-spam protection (e.g. rate limiting/reCAPTCHA) is not in scope unless requested.

## 5. What's explicitly NOT being built (confirming understanding)

- No Firebase Auth, no login, no member status, no admin dashboard, no members-only gating, no payment fields — matches your list exactly.
- No email-on-submit unless you confirm you want it (Q5 above).

---

**Waiting for your go-ahead before writing any code.** Please confirm or correct the open questions in section 0, then I'll proceed with scaffolding.
