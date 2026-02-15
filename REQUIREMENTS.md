# Property Manager Finder (PM Finder)
## Requirements Specification Document - Prototype v1.0

---

## 📋 Project Overview

**PM Finder** is a web-based platform prototype designed to help **Overseas Filipino Workers (OFWs)** and **foreign investors** find trusted, active property managers in the Philippines. The platform enables users to search for property managers by location, view their portfolios, and establish contact for property management services.

**Design Foundation:** Built on IBM Carbon Design System principles with custom brand integration

---

## 🎯 Target Users

### Primary Users
1. **Overseas Filipino Workers (OFWs)**
   - Filipinos working abroad who own properties in the Philippines
   - Need reliable property managers to maintain, rent out, or oversee their properties

2. **Foreign Investors**
   - International investors with real estate holdings in the Philippines
   - Looking for professional property management services

### Secondary Users
3. **Property Managers**
   - Licensed/experienced property managers offering their services
   - Want to showcase their portfolio and credentials

---

## 🚀 Prototype Features (MVP Scope)

### 1. User Authentication (Basic)

#### 1.1 Registration
| User Type | Required Fields |
|-----------|-----------------|
| **Property Owner** | Email, Password, Full Name, Contact Number, Current Country |
| **Property Manager** | Email, Password, Full Name/Business Name, Contact Number, Service Location |

**Prototype Scope:**
- ✅ Email + Password registration only
- ✅ Basic form validation
- ✅ Email format validation
- ❌ ~~Social login (Google, Facebook)~~ - *Future phase*
- ❌ ~~OTP/SMS verification~~ - *Future phase*
- ❌ ~~Two-factor authentication (2FA)~~ - *Future phase*
- ❌ ~~Multi-factor authentication (MFA)~~ - *Future phase*

#### 1.2 Login
- Email + Password login
- "Remember me" checkbox
- Password recovery via email link
- Session-based authentication

#### 1.3 User Roles (Prototype)
| Role | Permissions |
|------|-------------|
| **Property Owner** | Search PMs, view profiles/portfolios, send inquiries |
| **Property Manager** | Create/edit profile, upload portfolio, respond to inquiries |
| **Admin** | Verify PMs, manage users, view all data |

---

### 2. Property Manager Finder

#### 2.1 Location-Based Search
- **Search Bar** with location autocomplete
- **Search Hierarchy:**
  - Province (e.g., Cebu)
  - City/Municipality (e.g., Cebu City)
  - Barangay (e.g., Lahug)

- **Google Maps Integration (Prototype):**
  - Interactive map displaying PM locations
  - Clickable map markers with PM info popup
  - Radius-based filtering (5km, 10km, 25km)
  - Service area visualization

#### 2.2 Search Filters (Basic)
| Filter | Options |
|--------|---------|
| **Service Type** | Residential, Commercial, Condo, Vacation Rental |
| **Rating** | 1-5 stars |
| **Verified Status** | Verified only toggle |
| **Availability** | Active/Available |

#### 2.3 Search Results Display
- **Split View:** Map (left) + List (right)
- **PM Card Shows:**
  - Profile photo/avatar
  - Name/Business name
  - Rating (stars) + review count
  - Primary service area
  - Verified badge (if applicable)
  - "View Profile" button

---

### 3. Property Manager Profile & Portfolio

#### 3.1 Profile Information
```
┌─────────────────────────────────────────────────────┐
│  [Avatar]  John Doe Property Management             │
│            ★★★★☆ (24 reviews) ✓ Verified            │
│            📍 Cebu City, Lahug                      │
│            📞 +63 XXX XXX XXXX (visible after login)│
├─────────────────────────────────────────────────────┤
│  ABOUT                                              │
│  [Bio/Description text]                             │
├─────────────────────────────────────────────────────┤
│  SERVICES                                           │
│  • Tenant Screening    • Rent Collection            │
│  • Property Maintenance • Financial Reporting       │
├─────────────────────────────────────────────────────┤
│  SERVICE AREAS                                      │
│  [Map showing coverage area]                        │
│  Cebu City: Lahug, Banilad, IT Park                │
└─────────────────────────────────────────────────────┘
```

#### 3.2 Portfolio Section
- **Photo Gallery:** Properties managed (grid layout)
- **Property Cards:**
  - Property image
  - Property type tag
  - Location
  - Brief description

#### 3.3 Reviews Section
- Overall rating display
- Individual review cards:
  - Reviewer name (partial)
  - Star rating
  - Review text
  - Date posted

---

### 4. Communication System (Prototype)

#### 4.1 Inquiry Form
When clicking "Contact" on a PM profile:
```
┌─────────────────────────────────────────┐
│  Send Inquiry to [PM Name]              │
├─────────────────────────────────────────┤
│  Subject: [________________________]    │
│                                         │
│  Property Type: [Dropdown v]            │
│  Property Location: [_______________]   │
│                                         │
│  Message:                               │
│  [                                  ]   │
│  [                                  ]   │
│                                         │
│  [Cancel]              [Send Inquiry]   │
└─────────────────────────────────────────┘
```

#### 4.2 Messaging (Simple)
- Inbox view for both users
- Threaded conversation view
- Basic text messaging
- Read/unread status

---

### 5. Dashboards

#### 5.1 Property Owner Dashboard
```
┌─────────────────────────────────────────────────────┐
│  Welcome, [Name]!                                   │
├─────────────────────────────────────────────────────┤
│  QUICK STATS                                        │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐             │
│  │ Sent    │  │ Active  │  │ Saved   │             │
│  │ 3       │  │ 2       │  │ 5       │             │
│  │Inquiries│  │ Chats   │  │ PMs     │             │
│  └─────────┘  └─────────┘  └─────────┘             │
├─────────────────────────────────────────────────────┤
│  RECENT ACTIVITY                                    │
│  • PM John replied to your inquiry - 2h ago        │
│  • New PM available in your area - 1d ago          │
├─────────────────────────────────────────────────────┤
│  SAVED PROPERTY MANAGERS                            │
│  [PM Card 1] [PM Card 2] [PM Card 3]               │
└─────────────────────────────────────────────────────┘
```

#### 5.2 Property Manager Dashboard
```
┌─────────────────────────────────────────────────────┐
│  Welcome, [PM Name]!                                │
├─────────────────────────────────────────────────────┤
│  QUICK STATS                                        │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐             │
│  │ New     │  │ Profile │  │ Total   │             │
│  │ 5       │  │ 47      │  │ 12      │             │
│  │Inquiries│  │ Views   │  │ Reviews │             │
│  └─────────┘  └─────────┘  └─────────┘             │
├─────────────────────────────────────────────────────┤
│  NEW INQUIRIES                                      │
│  [Inquiry 1] [Inquiry 2] [Inquiry 3]               │
├─────────────────────────────────────────────────────┤
│  RECENT REVIEWS                                     │
│  ★★★★★ "Great service!" - Maria L. - 1d ago       │
└─────────────────────────────────────────────────────┘
```

#### 5.3 Admin Dashboard
- User management (list, verify, suspend)
- PM verification queue
- Basic analytics (user counts, inquiry counts)

---

## 🗺️ Google Maps Integration (Prototype)

### Required APIs
- Google Maps JavaScript API
- Google Places API (autocomplete)
- Google Geocoding API

### Features for Prototype
| Feature | Description |
|---------|-------------|
| **Map Display** | Show interactive map with PM markers |
| **Markers** | Custom markers for each PM location |
| **Info Windows** | Popup with PM summary on marker click |
| **Autocomplete** | Location search with suggestions |
| **Service Area** | Circle overlay showing PM service radius |

---

## 🎨 Design Implementation

### Theme Selection
- **Primary:** Light mode (client-facing)
- **Secondary:** Dark mode option

### Brand Colors
```css
--amber-gold: #F5A623;        /* Primary CTA */
--amber-gold-light: #FFB84D;  /* Hover states */
--amber-gold-dark: #E59400;   /* Active states */
```

### Key UI Components (Carbon)
- `@carbon/react` components
- `Button` - Primary actions with Golden Amber
- `Tile` - PM cards and stat cards
- `DataTable` - List views
- `Modal` - Inquiry forms
- `ComboBox` - Location search
- `Tag` - Status badges

### Layout Structure
```
┌─────────────────────────────────────────┐
│ Header (72px)                           │
│ Logo | Nav Links | User Menu            │
├─────────────────────────────────────────┤
│                                         │
│ Main Content                            │
│                                         │
├─────────────────────────────────────────┤
│ Footer                                  │
└─────────────────────────────────────────┘
```

---

## 📊 Database Schema (Prototype)

### Core Tables

```sql
-- Users table (both owners and PMs)
users
├── id (PK)
├── email (unique)
├── password (hashed)
├── role (enum: owner, pm, admin)
├── first_name
├── last_name
├── phone
├── country
├── avatar_url
├── is_active
├── email_verified_at
├── created_at
└── updated_at

-- Property Manager profiles
property_managers
├── id (PK)
├── user_id (FK -> users)
├── business_name
├── bio
├── years_experience
├── is_verified
├── verified_at
├── latitude
├── longitude
├── service_radius_km
├── rating_average
├── review_count
├── profile_views
├── created_at
└── updated_at

-- PM Service Areas
pm_service_areas
├── id (PK)
├── pm_id (FK -> property_managers)
├── province
├── city
├── barangay
└── is_primary

-- PM Services Offered
pm_services
├── id (PK)
├── pm_id (FK -> property_managers)
├── service_name
├── description
└── price_info

-- Portfolio Items
pm_portfolios
├── id (PK)
├── pm_id (FK -> property_managers)
├── title
├── description
├── property_type
├── location
├── image_url
├── is_featured
├── created_at
└── updated_at

-- Inquiries
inquiries
├── id (PK)
├── owner_id (FK -> users)
├── pm_id (FK -> property_managers)
├── subject
├── property_type
├── property_location
├── message
├── status (enum: pending, responded, closed)
├── created_at
└── updated_at

-- Messages
messages
├── id (PK)
├── inquiry_id (FK -> inquiries)
├── sender_id (FK -> users)
├── message
├── read_at
├── created_at
└── updated_at

-- Reviews
reviews
├── id (PK)
├── pm_id (FK -> property_managers)
├── reviewer_id (FK -> users)
├── rating (1-5)
├── comment
├── created_at
└── updated_at

-- Saved PMs (Favorites)
saved_pms
├── id (PK)
├── owner_id (FK -> users)
├── pm_id (FK -> property_managers)
└── created_at
```

---

## 📱 Page Structure

### Public Pages
1. **Homepage** - Hero + Search + Featured PMs
2. **Search Results** - Map + PM List
3. **PM Profile** - Public view (limited info)
4. **Login Page**
5. **Registration Page** (Owner / PM tabs)

### Protected Pages (Property Owner)
1. **Owner Dashboard**
2. **My Inquiries**
3. **Messages/Inbox**
4. **Saved PMs**
5. **My Profile/Settings**

### Protected Pages (Property Manager)
1. **PM Dashboard**
2. **My Profile** (Edit mode)
3. **Portfolio Management**
4. **Inquiries/Leads**
5. **Messages/Inbox**
6. **Reviews**

### Admin Pages
1. **Admin Dashboard**
2. **User Management**
3. **PM Verification Queue**
4. **System Settings**

---

## ✅ Prototype Acceptance Criteria

### Authentication
- [ ] Users can register with email/password
- [ ] Users can login and logout
- [ ] Password reset via email works
- [ ] Session persists across page refreshes
- [ ] Protected routes redirect to login

### PM Finder
- [ ] Search bar with location autocomplete works
- [ ] Google Maps displays with PM markers
- [ ] Clicking marker shows PM info popup
- [ ] Search filters narrow down results
- [ ] Results list syncs with map view

### PM Profiles
- [ ] PM profile page shows all public info
- [ ] Portfolio gallery displays correctly
- [ ] Reviews section shows ratings
- [ ] Contact button opens inquiry form (logged in users)

### Communication
- [ ] Inquiry form submits successfully
- [ ] PMs receive notification of new inquiries
- [ ] Basic messaging between users works
- [ ] Inbox shows all conversations

### Dashboards
- [ ] Owner dashboard shows relevant stats
- [ ] PM dashboard shows leads and activity
- [ ] Admin can verify/manage PMs

---

## � Media Uploads & Portfolio Management (Phase 1.5)

### 6.1 Profile Picture Upload
- Property managers can upload a **profile picture/avatar**
- Displayed on: PM profile page, search results, PM cards, PM listings
- Accepted formats: JPEG, PNG, WebP (max 2MB)
- Images are stored in `storage/app/public/avatars/`
- Automatic fallback to letter-initial avatar when no photo is uploaded

### 6.2 Property Image Uploads
- Each property in the portfolio can have a **cover image**
- Displayed in the portfolio section of the PM profile
- Accepted formats: JPEG, PNG, WebP (max 5MB)
- Stored in `storage/app/public/properties/`

### 6.3 Gallery Images
- Property managers can upload **multiple gallery images** to showcase their work
- Gallery appears as a dedicated section on the PM profile page
- Lightbox-style viewing with click-to-enlarge
- Accepted formats: JPEG, PNG, WebP (max 5MB each, up to 20 images)
- Stored in `storage/app/public/gallery/`
- Manageable from the Edit Profile page (add/remove)

### 6.4 Database Schema

```sql
-- New table for gallery images
gallery_images
├── id (PK)
├── property_manager_id (FK -> property_managers)
├── image_path (string) -- path in storage
├── caption (string, nullable)
├── sort_order (integer, default 0)
├── created_at
└── updated_at

-- Existing columns used:
-- property_managers.avatar (string, nullable) -- profile picture path
-- properties.image (string, nullable) -- property cover image path
```

### 6.5 Upload Endpoints
| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/property-managers` | Create PM with avatar |
| PUT/POST | `/property-managers/{id}` | Update PM with avatar |
| POST | `/property-managers/{id}/gallery` | Upload gallery images |
| DELETE | `/property-managers/{id}/gallery/{image}` | Remove gallery image |

### 6.6 Acceptance Criteria
- [ ] PM can upload a profile picture during profile creation
- [ ] PM can change/remove profile picture during profile editing
- [ ] Profile picture shows in search results instead of letter avatar
- [ ] Profile picture shows on PM profile page header
- [ ] PM can upload a cover image for each property
- [ ] PM can upload multiple gallery images
- [ ] PM can remove gallery images
- [ ] Gallery displays as a grid on the PM profile page
- [ ] Images are properly validated (type, size)
- [ ] Fallback to letter avatar when no photo exists

---

## �🚧 Out of Scope (Future Phases)

| Feature | Phase |
|---------|-------|
| Social login (Google, Facebook) | Phase 2 |
| OTP/SMS verification | Phase 2 |
| Two-factor authentication | Phase 2 |
| Video call booking | Phase 2 |
| AI-powered matching | Phase 3 |
| Payment integration | Phase 3 |
| Mobile apps | Phase 3 |
| Multi-language support | Phase 3 |

---

## 📅 Estimated Timeline

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| **Setup & Auth** | 3-4 days | Project setup, DB, basic auth |
| **PM Finder Core** | 4-5 days | Search, maps, filters |
| **Profiles & Portfolio** | 3-4 days | PM profiles, portfolio CRUD |
| **Communication** | 2-3 days | Inquiries, messaging |
| **Dashboards** | 2-3 days | Owner, PM, Admin dashboards |
| **Polish & Testing** | 2-3 days | UI polish, bug fixes |
| **Total** | ~3 weeks | Working prototype |

---

*Document Version: 1.0 (Prototype)*  
*Created: February 2026*  
*Last Updated: February 2026*
