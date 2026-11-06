# RESPONSIVE BEHAVIOR & INTERACTION AUDIT REPORT
**Project:** Shri Haridutt Ayurvedic Medical College & Hospital  
**Audit Scope:** Viewport scaling, touch interactions, mobile drawer, desktop multi-column dropdowns  
**Date:** November 5, 2026  

---

## 1. VIEWPORT BREAKPOINT TESTING MATRIX

| Breakpoint | Devices Tested | Layout Behavior | Dropdown / Menu State | Status |
| :--- | :--- | :--- | :--- | :---: |
| **Mobile (< 640px)** | iPhone 14/15, Pixel 8, Galaxy S23 | Single-column fluid cards; text wraps cleanly without horizontal overflow | Hamburger button triggers full off-canvas drawer with accordion menus | ✅ **PASS** |
| **Tablet (640px – 1024px)** | iPad Air, iPad Mini, Galaxy Tab | 2-column grids; cards adapt padding and typography | Hamburger button active; compact touch targets | ✅ **PASS** |
| **Small Laptop (1024px – 1280px)** | MacBook Air 13", ThinkPad 14" | 2/3-column grids; announcement bar hides shloka to prioritize ticker | Hamburger menu handles navigation gracefully | ✅ **PASS** |
| **Desktop (1280px – 1440px)** | 1080p Desktop Monitors | Full horizontal 9-pillar navigation visible (`xl:flex`) | Hover triggers multi-column dropdowns; rightmost items anchored `right-0` | ✅ **PASS** |
| **Ultra-wide (> 1440px)** | 1440p / 4K Monitors | Max-width bounded at `1440px`; centered margin | Subtitle and full university affiliation tagline displayed | ✅ **PASS** |

---

## 2. INTERACTION & ACCESSIBILITY AUDIT

- **Dropdown Hover & Click:** Dropdown menus open smoothly with Framer Motion transitions (`opacity: 1`, `y: 0`).
- **Right Viewport Boundary Protection:** Dropdowns for `News & Events`, `Examination`, and `Miscellaneous` use `right-0` alignment to prevent horizontal page scrolling.
- **Escape Key Behavior:** In the Campus Gallery (`/gallery`), pressing `Escape` closes the lightbox modal; left/right arrow keys navigate between photographs.
- **Touch Target Sizing:** Mobile navigation links feature minimum `44px` touch targets with generous tap padding.
- **Contrast Ratios:** White and antique gold (`#C5A46D`) text against deep navy (`#0B2B4A`) and ayurvedic green (`#173D32`) achieves minimum `4.5:1` contrast ratio complying with WCAG 2.1 AA guidelines.
