# PM Finder Design Standards
**Version 2.1 - shadcn/ui Implementation**

---

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Components](#components)
6. [Button Patterns](#button-patterns)
7. [Dark Mode](#dark-mode)
8. [Best Practices](#best-practices)

---

## Overview

PM Finder uses **shadcn/ui** design system with **Tailwind CSS** for styling. The design focuses on:

- **Trust & Credibility** - Professional, modern interface
- **Accessibility** - WCAG AA compliant, proper contrast ratios
- **Dual Theme** - Full light and dark mode support
- **Consistency** - Single source of truth for colors via CSS variables

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| CSS Framework | Tailwind CSS 3.x |
| Design System | shadcn/ui (HSL-based theming) |
| Font | Inter (Google Fonts) |
| Icons | Lucide React |
| Build Tool | Vite + PostCSS |

### Build Pipeline

```
app.css → PostCSS → Tailwind CSS → Final CSS
         ↓
    postcss.config.cjs (plugins: tailwindcss, autoprefixer)
         ↓
    tailwind.config.cjs (theme, colors, plugins)
```

**PostCSS** transforms CSS using JavaScript plugins:
- **tailwindcss** - Generates utility classes from config
- **autoprefixer** - Adds vendor prefixes for browser compatibility

---

## Color System

All colors use **HSL format** via CSS custom properties. This enables seamless light/dark mode switching.

### CSS Variables (defined in app.css)

```css
/* Light Mode (:root) */
--background: 0 0% 100%;           /* White */
--foreground: 240 10% 3.9%;        /* Near black */
--card: 0 0% 100%;                 /* White */
--card-foreground: 240 10% 3.9%;   /* Near black */
--primary: 262 83% 58%;            /* Purple #8B5CF6 */
--primary-foreground: 0 0% 100%;   /* White */
--secondary: 240 4.8% 95.9%;       /* Light gray */
--secondary-foreground: 240 5.9% 10%;
--muted: 240 4.8% 95.9%;           /* Light gray */
--muted-foreground: 240 3.8% 46.1%; /* Gray text */
--accent: 262 83% 58%;             /* Purple (same as primary) */
--accent-foreground: 0 0% 100%;    /* White */
--destructive: 0 84.2% 60.2%;      /* Red */
--destructive-foreground: 0 0% 100%;
--border: 240 5.9% 90%;            /* Light border */
--input: 240 5.9% 90%;             /* Input border */
--ring: 262 83% 58%;               /* Focus ring (purple) */

/* Status Colors */
--success: 142 76% 36%;            /* Green */
--warning: 38 92% 50%;             /* Amber */
--error: 0 84% 60%;                /* Red */
--info: 217 91% 60%;               /* Blue */

/* Dark Mode (.dark) */
--background: 240 10% 3.9%;        /* Near black */
--foreground: 0 0% 98%;            /* Near white */
--primary: 263 70% 50%;            /* Purple (adjusted) */
/* ... other dark mode values */
```

### Using Colors in Components

```jsx
// ✅ Correct - Use Tailwind semantic classes
<div className="bg-background text-foreground">
<div className="bg-card text-card-foreground">
<div className="text-muted-foreground">
<div className="border-border">
<div className="bg-primary text-white">

// ❌ Avoid - Hardcoded colors (won't respond to theme)
<div className="bg-white text-black">
<div style={{ color: '#000' }}>
```

---

## Typography

### Font Family

```css
font-family: 'Inter', system-ui, sans-serif;
```

### Text Classes

| Purpose | Class | Example |
|---------|-------|---------|
| Page headings | `text-foreground font-bold` | Dashboard title |
| Body text | `text-foreground` | Paragraphs |
| Secondary text | `text-muted-foreground` | Descriptions, hints |
| Card content | `text-card-foreground` | Card body text |

---

## Components

### Card

```jsx
<div className="rounded-2xl border border-border bg-card p-6">
  <h3 className="text-lg font-semibold text-foreground">Title</h3>
  <p className="text-muted-foreground">Description</p>
</div>
```

### Stat Card (Custom Component)

```jsx
<div className="stat-card">
  <span className="stat-label">Label</span>
  <div className="stat-value">42</div>
  <div className="stat-change positive">+5%</div>
</div>
```

### Input Fields

```jsx
<input
  type="text"
  className="w-full rounded-xl border border-border bg-background text-foreground 
             px-4 py-2.5 placeholder:text-muted-foreground
             focus:border-primary focus:ring-2 focus:ring-primary/20"
/>
```

### Badge

```jsx
// Success
<span className="badge badge-success">Active</span>

// Warning  
<span className="badge badge-warning">Pending</span>

// Destructive
<span className="badge badge-destructive">Error</span>
```

---

## Button Patterns

### Primary Button (Gradient)

For buttons with gradient backgrounds, **always use `text-white`** instead of `text-primary-foreground`:

```jsx
// ✅ Correct - Use text-white for gradient buttons
<button className="bg-gradient-to-r from-primary to-purple-600 text-white font-semibold 
                   rounded-xl px-5 py-2.5 shadow-lg shadow-primary/25
                   hover:shadow-xl hover:ring-2 hover:ring-primary/30">
  Click Me
</button>

// ✅ For icons inside gradient buttons, use inline style
<button className="bg-gradient-to-r from-primary to-purple-600 text-white">
  <Search className="w-4 h-4" style={{ color: '#ffffff' }} />
  Search
</button>
```

### Secondary Button

```jsx
<button className="rounded-xl border-2 border-border bg-card px-5 py-2.5 
                   text-foreground font-semibold
                   hover:border-primary hover:bg-primary/5 hover:text-primary">
  Secondary
</button>
```

### Danger Button

```jsx
<button className="bg-gradient-to-r from-red-500 to-rose-600 text-white 
                   font-semibold rounded-xl px-5 py-2.5 
                   shadow-lg shadow-red-500/25">
  Delete
</button>
```

### Ghost Button

```jsx
<button className="text-muted-foreground hover:text-primary hover:bg-accent/80 
                   rounded-xl p-2.5 transition-colors">
  <Icon className="w-5 h-5" />
</button>
```

---

## Dark Mode

### Implementation

Dark mode uses Tailwind's `class` strategy. The `.dark` class on `<html>` activates dark theme.

```js
// tailwind.config.cjs
module.exports = {
  darkMode: 'class',
  // ...
}
```

### Theme Toggle (ThemeContext)

```jsx
const { darkMode, toggleDarkMode } = useTheme();

// Toggle button
<button onClick={toggleDarkMode}>
  {darkMode ? <Sun /> : <Moon />}
</button>
```

### How It Works

1. CSS variables change based on `.dark` class
2. All `bg-*`, `text-*`, `border-*` classes automatically use new values
3. No need to write `dark:` variants for semantic colors

---

## Best Practices

### ✅ DO

1. **Use semantic color classes:**
   ```jsx
   className="bg-card text-foreground border-border"
   ```

2. **Use `text-white` for gradient buttons:**
   ```jsx
   className="bg-gradient-to-r from-primary to-purple-600 text-white"
   ```

3. **Use inline styles for icons in colored backgrounds:**
   ```jsx
   <Icon style={{ color: '#ffffff' }} />
   ```

4. **Use consistent border radius:**
   - Cards: `rounded-2xl`
   - Buttons: `rounded-xl`
   - Inputs: `rounded-xl`
   - Badges: `rounded-full`

5. **Use shadow utilities for elevation:**
   ```jsx
   className="shadow-lg shadow-primary/25"
   ```

### ❌ DON'T

1. **Don't use hardcoded colors:**
   ```jsx
   // Bad
   className="bg-white text-black"
   style={{ backgroundColor: '#fff' }}
   ```

2. **Don't use old variable syntax:**
   ```jsx
   // Bad - these don't work
   className="text-[foreground]"
   className="bg-[var(--layer-01)]"
   ```

3. **Don't use `text-primary-foreground` on gradient buttons:**
   ```jsx
   // Bad - may not render correctly in light mode
   className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground"
   ```

---

## File Structure

```
resources/
├── css/
│   └── app.css          # CSS variables, base styles, components
├── js/
│   ├── Components/      # Reusable React components
│   ├── Contexts/        # ThemeContext for dark mode
│   ├── Layouts/         # AuthenticatedLayout, GuestLayout
│   └── Pages/           # Page components
tailwind.config.cjs      # Tailwind configuration
postcss.config.cjs       # PostCSS plugins config
```

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Color contrast | 4.5:1 minimum for text |
| Focus indicators | `focus:ring-2 focus:ring-primary/20` |
| Keyboard navigation | All interactive elements focusable |
| Screen readers | Semantic HTML, ARIA labels |

---

*Version: 2.1*  
*Last Updated: February 2026*
