# 🚀 Product Feedback App – MVP Roadmap

A development roadmap for building a full-featured Product Feedback App using **Next.js**, **TypeScript**, **Tailwind CSS**, and accessibility best practices.

---

## ✅ Phase 1: Foundation Setup

**Goal:** Get the core app skeleton running with routing, theme toggle, and global state.

- [ ] Scaffold Next.js App Router project with Tailwind & TypeScript
- [ ] Set up global styles and Tailwind theme (light/dark)
- [ ] Add persistent dark mode toggle
- [ ] Create layout: `Header`, navigation, responsive container
- [ ] Define `Feedback` and `Comment` TypeScript types
- [ ] Set up `FeedbackProvider` using Zustand or Context API + useReducer

---

## 📋 Phase 2: Core Feedback Features

**Goal:** Display and manage the feedback list, filtering, and voting.

- [ ] Create `FeedbackCard` UI component
- [ ] Implement `UpvoteButton` logic (local or global state)
- [ ] Build category filter (e.g. All, UI, UX, Bug, etc.)
- [ ] Create sort dropdown (e.g. Most Upvotes, Least Comments)
- [ ] Implement `FeedbackList` page (`/feedback`)

---

## ✍️ Phase 3: Add & View Feedback

**Goal:** Allow users to submit and view individual feedback items.

- [ ] Create `FeedbackForm` with validation using `react-hook-form` + `zod`
- [ ] Add "Add Feedback" page (`/feedback/new`)
- [ ] Build `FeedbackDetail` page (`/feedback/[id]`)
  - [ ] Show description, upvote, and comments
  - [ ] Optional: nested comment replies
- [ ] Handle invalid `id` with fallback UI

---

## 🧪 Phase 4: Testing & Polish

**Goal:** Ensure usability, accessibility, and test coverage.

- [ ] Add unit tests (form logic, voting, sorting/filtering)
- [ ] Add E2E tests (add/view feedback, comment, upvote, toggle theme)
- [ ] Enable full keyboard navigation
- [ ] Add ARIA roles and accessibility labels
- [ ] Refine responsive layout, animations, empty states
- [ ] Write a detailed `README.md` and deploy to Vercel

---

## 💡 Stretch Goals (Post-MVP)

- [ ] Edit feedback page (`/feedback/edit/[id]`)
- [ ] Drag-and-drop roadmap columns (e.g. `react-beautiful-dnd`)
- [ ] Add user authentication and gating
- [ ] Store feedback/comments in backend (Firebase, Supabase, etc.)
- [ ] Add user profiles with feedback history

---

## 🔖 Portfolio Deliverables

- [x] Deployed live demo (Vercel)
- [x] GitHub repository with code + README
- [x] Screenshots or demo GIFs
- [ ] Optional: blog post or case study
