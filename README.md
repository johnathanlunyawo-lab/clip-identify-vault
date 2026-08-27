# Scenfier

You are building a serious startup MVP.

Your role is NOT to create a fictional entertainment website.

Your role is to build a clean, production-ready frontend foundation that will later connect to real APIs and backend systems.

Follow instructions exactly.

DO NOT improvise.

DO NOT add features unless explicitly requested.

DO NOT generate fake content.

DO NOT create fictional movies, fictional series, fictional actors, fictional posters, fictional streaming providers, or fake search results.

DO NOT use AI-generated images.

DO NOT create fake Netflix-style content libraries.

Use empty states, structured placeholders, and realistic UI components only.

This is an MVP product interface, not a design concept.

---

PRODUCT:

An AI-powered movie and series identification platform.

User uploads:

- video clip

- screenshot

- image

The future backend will identify:

- movie/series title

- year

- actors

- episode information

- streaming availability

- recommendations

For this Lovable build, focus primarily on:

FRONTEND EXPERIENCE

and creating the correct application structure.

---

MAIN OBJECTIVE:

Build the frontend for a fintech-quality consumer application.

The product involves:

- user accounts

- paid credits

- transactions

- usage limits

- search history

The UI should feel:

- trustworthy

- secure

- premium

- minimal

- reliable

Reference feeling:

Modern banking application + premium technology platform.

NOT:

- gaming website

- entertainment blog

- movie streaming website

- generic AI landing page

---

DESIGN RULES:

Avoid common AI-generated designs.

DO NOT USE:

- purple AI gradients

- excessive glowing effects

- floating glass cards everywhere

- random illustrations

- fake screenshots

- fake testimonials

- fake user numbers

- fake reviews

Use:

- strong typography

- clean spacing

- professional layouts

- clear hierarchy

- simple animations only when useful

The product should look like a company handling customer payments.

---

AUTHENTICATION IS REQUIRED:

Users must have accounts.

Build:

- signup

- login

- password reset

- email verification placeholder flow

- account settings

No guest mode.

No anonymous searches.

---

CORE USER FLOW:

Build only this:

1. User lands on website.

2. User creates account.

3. User enters dashboard.

4. User sees:

- available credits

- search history

- upload button

- account information

5. User uploads a clip.

6. User sees processing state.

7. User sees a structured result page.

The result page must contain EMPTY STRUCTURES only.

Example:

Movie Title:

[Awaiting API result]

Release Year:

[Awaiting API result]

Actors:

[Awaiting API result]

Streaming:

[Awaiting API result]

Recommendations:

[Awaiting API result]

Do not fill these with fake information.

---

CREDIT SYSTEM UI:

Create:

User credit balance.

Example:

Credits remaining:

8 searches

Purchase credits button.

Transaction history.

Payment history.

Do not process payments yet.

Prepare the frontend for Stripe integration later.

---

PAGES REQUIRED:

ONLY CREATE THESE:

1. Landing page

Purpose:

Explain the problem and product.

No fake statistics.

No fake customers.

No fake testimonials.

Use clear copy.

Example:

"Identify movies and series from clips."

---

2. Authentication pages

Signup/login.

---

3. Dashboard

Include:

- credit balance

- upload button

- recent searches

- account settings

---

4. Upload page

Include:

- drag/drop upload

- supported file types

- upload progress

- processing state

---

5. Search result page

Empty API-ready structure.

---

6. Pricing page

Only show:

Example:

One credit package:

$4 = 8 searches

Do not create multiple plans.

Do not add subscriptions.

---

7. Account page

Include:

- profile

- payment history

- search history

- security settings

---

DATABASE/UI PREPARATION:

Create components ready for:

Users

Credits

Payments

Search History

Results

Do not create fake database records.

---

TECHNICAL REQUIREMENTS:

Prioritize:

- clean reusable components

- maintainable code

- responsive design

- mobile-first experience

- accessibility

Do not overbuild.

Do not add unnecessary animations.

Do not create extra features.

---

FINAL RULE:

If information is unavailable:

Leave it empty.

Do NOT invent.

If an image is needed:

Use placeholders.

Do NOT generate fictional posters.

If data is needed:

Create the structure, not the content.

Build the foundation that a backend engineer can connect to real AI, movie databases, streaming APIs, and payment systems.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a8cb1d1e-afd1-4e1a-a11d-11a7d69a9ce0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
