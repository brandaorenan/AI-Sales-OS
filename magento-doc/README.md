# Magento 1.9 API — Knowledge Base

A structured Markdown knowledge base for integrating with **Magento 1.9 Community Edition** (and OpenMage LTS) via its SOAP and REST APIs. Designed as a reference for AI agents.

---

## Sources

| Source | URL |
|---|---|
| OpenMage Developer Docs (canonical) | <https://devdocs-openmage.org/guides/m1x/> |
| Mirror (r-martins) | <https://r-martins.github.io/m1docs/guides/m1x/> |
| GitHub source repository | <https://github.com/OpenMage/devdocs> |
| Magenteiro blog (PT-BR) | <https://www.magenteiro.com/blog/magento-1/desenvolvimento/backend/consumindo-api-magento-com-exemplos/> |

All SOAP and REST API pages were extracted from the OpenMage devdocs repository (Jekyll HTML sources) and consolidated into topic-based Markdown files. Each section links back to its original HTML page.

---

## Quick Start for an AI Agent

**Read this first:** `integration-guide-ai-agents.md`

That file contains everything you need to get started: protocol choice (SOAP vs REST), authentication, setup, common flows with code examples (PHP and Python), error handling, and a quick-reference table mapping tasks to files.

---

## File Map

### Guides

| File | Purpose |
|---|---|
| `integration-guide-ai-agents.md` | **Start here.** Practical integration guide with code examples, flows, and gotchas. |
| `external/magenteiro-consuming-magento-api.md` | PT-BR blog post on consuming the Magento API (overview only; code examples were email-gated). |

### SOAP API Reference (`soap-api/`)

Derived from ~170 HTML pages covering the full SOAP API (v1 and v2).

| File | What it covers |
|---|---|
| `01-introduction-authentication.md` | Protocols, WSDL endpoints, session auth, v1 vs v2, global faults |
| `02-catalog-category.md` | Category tree, CRUD, product assignment, category attributes (18 methods) |
| `03-catalog-product.md` | Product CRUD, listing, special prices (10 methods) |
| `04-product-attributes-sets.md` | Attribute CRUD, attribute sets, groups, product types (22 methods) |
| `05-product-media-options-links.md` | Images, custom options, downloadable links, related/up-sell/cross-sell links, tags, tier prices (41 methods) |
| `06-inventory.md` | Stock item list and update (3 methods) |
| `07-customer.md` | Customer CRUD, customer groups, addresses (13 methods) |
| `08-sales-order.md` | Order list/info, comments, hold/unhold, cancel (8 methods) |
| `09-invoice-shipment-creditmemo.md` | Invoice, shipment, and credit memo CRUD + comments and tracking (21 methods) |
| `10-checkout-cart.md` | **Full cart/checkout flow** — the only way to create orders via API (25 methods) |
| `11-directory-store.md` | Country/region lists, store info, Magento info (7 methods) |
| `12-custom-api-wsi.md` | How to create your own API endpoints + WS-I compliance (2 pages) |

### REST API Reference (`rest-api/`)

Derived from 25 HTML pages covering the REST API with OAuth.

| File | What it covers |
|---|---|
| `01-introduction.md` | Overview, capabilities, resources, PHP examples |
| `02-authentication-oauth.md` | Full OAuth 1.0a flow with PHP code and admin config screenshots |
| `03-http-methods-filters-status-codes.md` | HTTP verbs, query filters, status codes |
| `04-permissions-settings.md` | REST roles, resource permissions, attribute access config |
| `05-products.md` | Products CRUD, categories, images, website assignments |
| `06-orders.md` | Orders read-only: list, detail, items, addresses, comments |
| `07-customers.md` | Customers and customer addresses CRUD |
| `08-inventory-formats-testing.md` | Stock items, JSON/XML response formats, testing with REST client |

---

## Agent Decision Guide

``n```
I need to create an order
  → SOAP only. See integration-guide-ai-agents.md "Flow 2: Create an Order"
  → Details: soap-api/10-checkout-cart.md

I need to list/get products or customers
  → SOAP or REST. SOAP is simpler (no OAuth setup).
  → REST: rest-api/05-products.md or rest-api/07-customers.md
  → SOAP: soap-api/03-catalog-product.md or soap-api/07-customer.md

I need to update stock
  → SOAP or REST.
  → SOAP: soap-api/06-inventory.md
  → REST: rest-api/08-inventory-formats-testing.md

I need to manage invoices, shipments, or credit memos
  → SOAP only. soap-api/09-invoice-shipment-creditmemo.md

I need to filter/search orders
  → See integration-guide-ai-agents.md "Filtering and Pagination"
  → SOAP: soap-api/08-sales-order.md (filter examples)
  → REST: rest-api/03-http-methods-filters-status-codes.md + rest-api/06-orders.md

I need to upload a product image
  → SOAP only. soap-api/05-product-media-options-links.md

I need to set up REST OAuth
  → rest-api/02-authentication-oauth.md

I need to create a custom API endpoint
  → soap-api/12-custom-api-wsi.md
```

---

## Scope and Limitations

- **Magento version:** 1.x (specifically 1.9 CE), as documented by the OpenMage LTS project.
- **Enterprise-only resources excluded:** Gift cards, customer balance/store credit, and gift messages (`enterprise_*` in the source) are **not included** because they require Magento Enterprise Edition. OpenMage LTS (CE) does not support them.
- **Installation, theming, and general development guides are not included** — this KB focuses exclusively on API integration.
- **Code examples** are preserved from the original documentation (mostly PHP). The integration guide adds Python equivalents.
- The **Magenteiro article** is a PT-BR overview; its 16 PHP code examples were delivered by email and are not publicly available.

---

## Generated

- **Date:** 2026-08-25
- **Source commit:** OpenMage/devdocs@main (2024-01-30)
- **Pages converted:** ~195 HTML pages → 20 consolidated Markdown files
- **Toolchain:** Python 3 + pandoc 3.10.2 (HTML → GFM)
