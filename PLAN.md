# Tzaneen Chamber of Commerce — Website Plan (Phase 1)

Status: DRAFT — awaiting approval. No implementation until this is signed off.

## 0. Assumptions & open questions (please confirm/answer)

These need real answers before or during build — flagging now so nothing gets fabricated:

1. **Content source**: I don't have the current site's copy, awards history, contact details, logo, or COO process description. I'll build the templates/structure with clearly marked placeholders (`[NEEDS CONTENT: ...]`) — please supply real text/images, or point me at the live site to copy from if that's acceptable.
2. **Photography**: No stock/AI imagery per your instruction. Every image slot will be flagged as `[NEEDS PHOTO: description]` and left as a simple placeholder (background color + label) until real photos are supplied.
3. **Domain/hosting**: Deploying where — Firebase Hosting, Vercel, or something else? Affects a couple of config choices (not blocking the plan, but affects Phase 1 setup).
4. **Certificate of Origin (COO)**: Is this page just informational (what it is, how to apply, contact/process), or does it need a submission form too? Your scope list doesn't mention a COO form, so I've planned it as an informational page only — flag if that's wrong.
5. **Email notifications on form submit**: Out of scope unless you want it — Firestore-only capture as stated. Confirming: no email-on-submit (e.g. via Cloud Function) in Phase 1? That's a cost/complexity item (Cloud Functions = Blaze plan required), so flagging explicitly.
6. **Firebase project**: New Firebase project needed — will require you (or me with credentials) to create it in the Firebase console. I cannot provision a Firebase project on your behalf without access.

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
```
memberApplications/{id}
  businessName: string
  contactName: string
  email: string
  phone: string
  message: string             // optional notes from applicant
  submittedAt: timestamp
  // Phase 2 ready, NOT built now:
  // status: string          — field intentionally omitted, easy to add later
  //                           (schema has no conflicting field, no migration needed)
```
- Deliberately no `status` field now (per "no approval workflow"), but nothing else needs to change structurally to add one later — new field, default value, done.

### `contactRequests` (contact form / call-back requests)
```
contactRequests/{id}
  name: string
  email: string
  phone: string | null
  message: string
  requestCallback: boolean    // matches "call-back request" from old site
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
