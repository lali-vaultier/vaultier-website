# Vaultier Website

An interactive, responsive private-invitation experience for Vaultier, designed to feel like a piece of tactile luxury stationery.

The website is built as a standalone Next.js application and is ready for deployment on Vercel.

## Features

- Scroll-driven invitation reveal using GSAP ScrollTrigger
- Blind-debossed VLTR impression using the supplied brand artwork
- Responsive desktop and mobile compositions
- Vertical VLTR arrangement on mobile
- Textured buttercream cardstock and the approved deep-teal textile imagery
- Final printed invitation with a working application CTA
- Two scroll-revealed editorial chapters on the deep-teal textile
- Private Enquiry, Privacy Policy and Terms of Use routes
- Private enquiry form with its existing fields and submission handling preserved
- Server-side form validation
- Webhook-ready submission endpoint
- Local font and image assets
- Reduced-motion support
- Vercel-compatible production configuration

## Technology

- [Next.js](https://nextjs.org/)
- React
- TypeScript
- Tailwind CSS
- GSAP and ScrollTrigger
- Vercel

## Requirements

- Node.js 20.9 or later
- npm

Check your Node.js version:

```bash
node --version
```

## Local Development

Clone or download the project, then open its directory:

```bash
cd vaultier-private-invitation
```

Install the dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Available Commands

```bash
npm run dev
```

Starts the local development server.

```bash
npm run lint
```

Runs ESLint.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Runs the production build locally after `npm run build`.

## Routes

| Route | Purpose |
|---|---|
| `/` | Interactive Vaultier invitation |
| `/private-enquiry` | Public enquiry form |
| `/request-invitation` | Redirects legacy links to `/private-enquiry` |
| `/privacy` | Draft Privacy Policy placeholder pending approved legal copy |
| `/terms` | Vaultier Terms of Use |
| `/api/request-invitation` | Server-side form submission endpoint |

## Content Status

The approved editorial copy is part of the homepage invitation experience: two chapters appear over the deep-teal textile as the visitor scrolls, followed by the final cardstock invitation. The supplied Terms of Use is published at `/terms` with its legal placeholders retained for completion; the Privacy Policy remains a clearly labelled draft placeholder until its approved copy is integrated.

## Environment Variables

Create `.env.local` for local development. Do not commit this file.

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

INVITATION_FORM_WEBHOOK_URL=
INVITATION_FORM_API_KEY=
```

### Variable Reference

| Variable | Required | Description |
|---|---:|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Public URL of the website |
| `INVITATION_FORM_WEBHOOK_URL` | For live submissions | Secure server endpoint that receives applications |
| `INVITATION_FORM_API_KEY` | Optional | Bearer token sent to the configured webhook |

Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

`INVITATION_FORM_API_KEY` and other private credentials must remain server-side.

## Form Submission Behaviour

The Private Enquiry form submits JSON to the existing endpoint:

```text
POST /api/request-invitation
```

The server validates:

- Full name
- Email address
- Applicant type
- Collection value range
- Country of residence

When `INVITATION_FORM_WEBHOOK_URL` is configured, the application is securely forwarded from the server to that endpoint.

If `INVITATION_FORM_API_KEY` is present, it is sent as a bearer token:

```http
Authorization: Bearer YOUR_API_KEY
```

The success message is only displayed after the server confirms that the receiving endpoint accepted the application.

### Preview Mode

If `INVITATION_FORM_WEBHOOK_URL` is not configured, the form operates in preview mode.

In preview mode:

- Validation still runs.
- The form can demonstrate its interaction and confirmation state.
- Application data is not stored.
- Application data will not be available after the page is refreshed.

Configure a persistent backend before accepting real applications.

## Current Backend Status

The public invitation website and server-side form endpoint are implemented.

The following systems are not yet implemented:

- Persistent application database
- Supabase integration
- Vaultier HQ at `/hq`
- Staff authentication
- Multifactor authentication
- Role-based access control
- Application-management dashboard
- Status history
- Internal notes
- Follow-up activity
- Audit logging
- Database Row Level Security policies
- Production rate limiting
- Spam protection
- Duplicate-submission safeguards

Until a persistent webhook or database is configured, the website should not be treated as a production application-management system.

## Recommended Production Backend

The intended lean production architecture is:

```text
Public application form
        ↓
Next.js server endpoint
        ↓
Supabase PostgreSQL
        ↓
Authenticated Vaultier HQ
```

A production implementation should include:

- Supabase PostgreSQL for persistent storage
- Supabase Auth for staff accounts
- Administrator-controlled staff invitations
- Multifactor authentication
- Row Level Security
- Server-side authorization
- Audit logging
- Rate limiting
- Spam and duplicate-submission protection

Never expose a Supabase service-role key or other privileged credential through a `NEXT_PUBLIC_` variable.

## Brand Assets

The visible website uses only the approved Vaultier assets:

```text
public/brand/vaultier-abbreviation.svg
public/brand/vaultier-logomark.svg
```

The original SVG proportions and paths should be preserved.

The VLTR abbreviation is used as the exact geometry of the opening invitation’s blind-debossed impression.

## Local Font

The Editor’s Note Hairline Italic font is stored locally:

```text
app/fonts/editors-note-hairline-italic.otf
```

It is loaded through the Next.js local font system and does not rely on a third-party font service.

## Image Assets

Invitation textures and textile assets are stored in:

```text
public/images/
```

Important current assets include:

```text
public/images/vaultier-buttercream-fine-cardstock.jpg
public/images/vaultier-deep-teal-textile.jpg
```

Keep production images compressed and appropriately sized to avoid unnecessary loading time.

## Colour Palette

| Colour | Value |
|---|---|
| Deep Teal Blue | `#0F2A36` |
| Olive Green | `#6B6F3A` |
| Wild Brown | `#42331F` |
| Murky Grey | `#ADA797` |
| Butter Cream | `#EFE9DF` |
| Charcoal | `#141412` |
| Off-white | `#F6F4F2` |

Shared colours should be maintained through the project’s CSS design tokens.

## Responsive Behaviour

### Desktop

The opening invitation displays the original horizontal VLTR abbreviation.

### Mobile

The letters are arranged vertically:

```text
V
L
T
R
```

Each letter remains upright and uses the supplied SVG geometry. The scroll-driven reveal continues to expose the textile through the letter openings.

## Accessibility and Motion

- Interactive links and controls remain keyboard accessible.
- The invitation CTA includes a visible keyboard focus treatment.
- Form fields use accessible labels.
- Reduced-motion preferences are respected.
- Decorative visual layers do not replace meaningful HTML content.

## Vercel Deployment

### 1. Add the project to Git

Commit the project to a GitHub, GitLab or Bitbucket repository.

### 2. Import the repository

In Vercel:

1. Select **Add New Project**.
2. Import the repository.
3. Allow Vercel to detect Next.js.
4. Keep the standard Next.js build settings.

The production build command is:

```bash
npm run build
```

### 3. Configure environment variables

In **Project Settings → Environment Variables**, add:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
INVITATION_FORM_WEBHOOK_URL=https://your-secure-endpoint.com
INVITATION_FORM_API_KEY=your-secret-key
```

Add private variables to the Production environment and any Preview environments that require live submission testing.

### 4. Deploy

Select **Deploy**.

After assigning a custom domain, update `NEXT_PUBLIC_SITE_URL` to the final production URL and redeploy.

## Pre-deployment Checklist

Before launching:

- Run `npm run lint`.
- Run `npm run build`.
- Test the complete desktop scroll experience.
- Test the vertical mobile VLTR layout.
- Test with reduced-motion enabled.
- Test all required form fields.
- Confirm invalid email addresses are rejected.
- Confirm the configured webhook receives applications.
- Confirm failed submissions do not show a success state.
- Confirm secrets are not included in client-side code.
- Confirm real applications are stored persistently.
- Confirm the production domain is set in `NEXT_PUBLIC_SITE_URL`.

## Security Notes

- Never commit `.env.local`.
- Never expose database credentials in browser code.
- Never prefix private keys with `NEXT_PUBLIC_`.
- Keep all privileged database operations on the server.
- Validate all data again on the server, even when the browser has already validated it.
- Use HTTPS-only production endpoints.
- Do not launch Vaultier HQ with demo accounts, public registration or permissive database policies.

## Project Status

The public invitation experience is operational and ready for visual testing or Vercel deployment.

Persistent application storage and the authenticated Vaultier HQ management portal remain a separate implementation phase.
