# 🧱 Open Trade Solutions - Ecommerce Platform Overview

This project is an ecommerce platform currently under active development. It is structured into three main layers:

---

## 1. Catalog Frontend (Astro SSR)

The catalog is built using Astro and focuses on SEO-optimized server-side rendered pages.

It includes:

- Product listings
- Category and brand pages
- Localization and currency handling
- SEO-friendly routing and metadata
- Server-driven context (language, currency, locale)

This layer is responsible for content discovery and marketing pages.

---

## 2. Cart & Checkout (SPA)

The cart and checkout experience will be implemented as a separate Single Page Application (SPA), built with React.

This layer is responsible for:

- Cart state management
- Checkout flow
- Payment integration
- User interaction-heavy workflows

It communicates with the backend exclusively through API endpoints and is fully decoupled from the Astro frontend.

---

## 3. Admin Panel (SPA)

A separate React-based SPA for store administration, including:

- Product and category management
- Order processing
- Inventory control
- Store configuration

This layer is also API-driven and independent from the storefront implementation.

---

## 🔌 API Layer

The backend is exposed through a set of API endpoints (currently implemented within Astro `/api` routes). These serve as the contract between:

- Catalog frontend
- Checkout SPA
- Admin SPA

The API layer is designed to remain framework-agnostic over time.

---

## 📌 Design Principles

- Separation of concerns between content, interaction, and administration
- API-first communication between layers
- Server-rendered catalog for SEO performance
- Decoupled SPA-based transactional systems
- Centralized localization and currency handling at request level

## Other notes

- Upgraded to Astro 7.3
- Fix for featured listing of products.
- Added separate initial select for featured.
