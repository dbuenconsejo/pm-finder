# PM Finder Design Standards
**Design Specifications v2.0**

Built on **shadcn/ui** component library with custom purple brand integration

---

## Table of Contents

1. [Overview](#overview)
2. [Design Foundation](#design-foundation)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Components](#components)
6. [Layout](#layout)
7. [Dark Mode](#dark-mode)

---

## Overview

### Application Purpose

PM Finder is a web-based platform designed to help property owners find trusted property managers in the Philippines. The design focuses on:

- **Trust & Credibility** - Professional, confidence-inspiring interface
- **Ease of Use** - Clean, intuitive navigation
- **Accessibility** - WCAG compliant, readable in all conditions
- **Responsiveness** - Mobile-first, works on all devices

### Design Philosophy

- Clean, modern aesthetic
- High readability and contrast
- Consistent component patterns
- Smooth transitions and interactions
- Both light and dark mode support

---

## Design Foundation

### Core Framework: shadcn/ui + Tailwind CSS

**Why shadcn/ui:**
- Modern, accessible components built on Radix UI
- Copy-paste components (no external dependency)
- Tailwind CSS native styling
- HSL-based theming system
- Easy customization
- Battle-tested accessibility (WCAG AA+)
- Professional aesthetic

### Technology Stack

- **CSS Framework:** Tailwind CSS
- **Component Library:** shadcn/ui (Radix UI primitives)
- **Fonts:** Inter
- **Icons:** Lucide React
- **Build Tool:** Vite

---

## Color System

### Brand Colors

**Primary - Modern Purple:**
```css
/* Light mode */
--primary: 262 83% 58%;           /* #8B5CF6 - Vibrant purple */
--primary-foreground: 0 0% 100%;  /* White text on primary */

/* Dark mode */
--primary: 263 70% 50%;           /* Slightly adjusted for dark */
--primary-foreground: 0 0% 100%;
```

**Usage:**
- Primary action buttons
- Active navigation states
- Focus indicators
- Brand elements and accents

### Light Mode Palette

```css
/* Background Layers */
--background: #f4f4f4;        /* Page background */
--layer-1: #ffffff;           /* Card/container background */
--layer-2: #f4f4f4;           /* Raised surfaces */
--layer-3: #e0e0e0;           /* Borders, dividers */

/* Text Hierarchy */
--text-primary: #161616;      /* Headings, important text */
--text-secondary: #525252;    /* Body text */
--text-tertiary: #6f6f6f;     /* Supporting text */
--text-muted: #8d8d8d;        /* Placeholders, disabled */

/* Status Colors */
--success: #198038;           /* Success states */
--warning: #F1C21B;           /* Warning states */
--error: #DA1E28;             /* Error states */
--info: #0043CE;              /* Information states */
```

### Dark Mode Palette

```css
/* Background Layers */
--background: #0a0e14;        /* Page background */
--layer-1: #141820;           /* Card/container background */
--layer-2: #1a1f28;           /* Raised surfaces */
--layer-3: #1f2530;           /* Borders, dividers */

/* Text Hierarchy */
--text-primary: #ffffff;      /* Headings, important text */
--text-secondary: #e3e8ef;    /* Body text */
--text-tertiary: #9ba3af;     /* Supporting text */
--text-muted: #6b7280;        /* Placeholders, disabled */

/* Status Colors */
--success: #3fb950;           /* Success states */
--warning: #f59e0b;           /* Warning states */
--error: #f85149;             /* Error states */
--info: #60a5fa;              /* Information states */
```

---

## Typography

### Font Family

```css
--font-sans: 'IBM Plex Sans', sans-serif;
--font-mono: 'IBM Plex Mono', monospace;
```

### Type Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 2.5rem (40px) | 600 | 1.2 |
| H2 | 2rem (32px) | 600 | 1.25 |
| H3 | 1.5rem (24px) | 600 | 1.3 |
| H4 | 1.25rem (20px) | 500 | 1.4 |
| Body | 1rem (16px) | 400 | 1.5 |
| Small | 0.875rem (14px) | 400 | 1.5 |
| Caption | 0.75rem (12px) | 400 | 1.4 |

### Usage Guidelines

- **Headings:** IBM Plex Sans, semi-bold (600)
- **Body text:** IBM Plex Sans, regular (400)
- **Labels:** IBM Plex Sans, medium (500)
- **Code/data:** IBM Plex Mono, regular (400)

---

## Components

### Stat Cards

The stat-card component is used for displaying key metrics and statistics on dashboards.

```css
.stat-card {
    background-color: hsl(var(--card));
    color: hsl(var(--card-foreground));
    border-radius: 1rem;
    border: 1px solid hsl(var(--border));
    padding: 1.25rem;
    transition: all 0.2s ease;
}

.stat-card:hover {
    border-color: hsl(var(--primary) / 0.3);
    box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1);
}

.stat-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: hsl(var(--muted-foreground));
}

.stat-value {
    font-size: 1.875rem;
    font-weight: 700;
    color: hsl(var(--foreground));
    margin-top: 0.5rem;
    line-height: 1;
}

.stat-change {
    font-size: 0.75rem;
    margin-top: 0.25rem;
    color: hsl(var(--muted-foreground));
}

.stat-change.positive {
    color: hsl(var(--success));
}

.stat-change.negative {
    color: hsl(var(--error));
}
```

**Usage Example (JSX):**
```jsx
<div className="stat-card">
    <div className="flex items-center justify-between">
        <span className="stat-label">New Inquiries</span>
        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
            <MessageSquare className="w-6 h-6" />
        </div>
    </div>
    <div className="stat-value">0</div>
    <div className="stat-change">Awaiting response</div>
</div>
```

**Icon Color Options:**
- Blue: `bg-blue-500/10 text-blue-500`
- Cyan: `bg-cyan-500/10 text-cyan-500`
- Purple: `bg-purple-500/10 text-purple-500`
- Primary: `bg-primary/10 text-primary`
- Emerald: `bg-emerald-500/10 text-emerald-500`

### Buttons

**Primary Button (Golden Amber)**
```css
.btn-primary {
    background: var(--amber-gold);
    color: #000000;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    transition: all 0.2s;
}

.btn-primary:hover {
    background: var(--amber-gold-light);
    transform: translateY(-1px);
}
```

**Secondary Button**
```css
.btn-secondary {
    background: transparent;
    color: var(--text-primary);
    border: 1px solid var(--layer-3);
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
}
```

### Cards

```css
.card {
    background: var(--layer-1);
    border: 1px solid var(--layer-3);
    border-radius: 0.75rem;
    overflow: hidden;
}

.card:hover {
    border-color: var(--amber-gold);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
```

### Form Inputs

```css
.input {
    background: var(--layer-1);
    border: 1px solid var(--layer-3);
    color: var(--text-primary);
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
}

.input:focus {
    border-color: var(--amber-gold);
    outline: none;
    box-shadow: 0 0 0 2px rgba(245, 166, 35, 0.2);
}
```

### Badges

```css
.badge-success {
    background: rgba(var(--success-rgb), 0.1);
    color: var(--success);
}

.badge-warning {
    background: rgba(var(--warning-rgb), 0.1);
    color: var(--warning);
}

.badge-info {
    background: rgba(var(--info-rgb), 0.1);
    color: var(--info);
}
```

---

## Layout

### Grid System

- **Max width:** 1280px (7xl)
- **Gutters:** 1rem (16px) mobile, 1.5rem (24px) desktop
- **Columns:** 12-column grid

### Spacing Scale

| Token | Value |
|-------|-------|
| xs | 0.25rem (4px) |
| sm | 0.5rem (8px) |
| md | 1rem (16px) |
| lg | 1.5rem (24px) |
| xl | 2rem (32px) |
| 2xl | 3rem (48px) |

### Breakpoints

| Name | Min Width |
|------|-----------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

---

## Dark Mode

### Implementation

Dark mode is implemented using Tailwind's `class` strategy:

```js
// tailwind.config.js
module.exports = {
    darkMode: 'class',
    // ...
}
```

### Toggle Mechanism

Theme preference is stored in localStorage and applied via React Context:

```jsx
// ThemeContext.jsx
const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
});

useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
}, [darkMode]);
```

### Considerations

1. **Contrast:** Ensure 4.5:1 minimum contrast ratio
2. **Images:** Consider dimming or adjusting for dark mode
3. **Shadows:** Use lighter, more diffuse shadows in dark mode
4. **Borders:** May need to be more visible in dark mode

---

## Accessibility

### Standards

- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators visible

### Color Contrast

- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

### Focus States

All interactive elements must have visible focus indicators:

```css
:focus-visible {
    outline: 2px solid var(--amber-gold);
    outline-offset: 2px;
}
```

---

*Document Version: 1.0*  
*Created: February 2026*  
*Last Updated: February 2026*
