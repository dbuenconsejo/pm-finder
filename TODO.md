# PM Finder - TODO List

## ✅ Completed Features

### Authentication & Authorization
- [x] Email + Password registration
- [x] Email + Password login
- [x] Remember me checkbox
- [x] Password recovery via email link
- [x] Session-based authentication
- [x] Role-based access (Owner, Manager, Admin)
- [x] Authorization policies

### Property Manager Finder
- [x] Location-based search (text input)
- [x] Service type filter
- [x] Rating filter
- [x] Verified status filter
- [x] PM cards with avatar, name, rating, location
- [x] Search results list view

### PM Profile & Portfolio
- [x] Profile information display
- [x] Bio/description section
- [x] Services offered section
- [x] Service areas section
- [x] Reviews section with ratings
- [x] Verified badge display
- [x] Save PM functionality

### Communication System
- [x] Inquiry form (subject, type, location, message)
- [x] Inbox view for both users
- [x] Threaded conversation view
- [x] Basic text messaging
- [x] Read/unread status
- [x] Real-time notifications (polling)
- [x] Toast notifications for new messages
- [x] Notification bell in header
- [x] Chat bubble UI (own vs others)

### Dashboards
- [x] Property Owner dashboard with stats
- [x] Property Manager dashboard with stats
- [x] Admin dashboard
- [x] Quick stats widgets
- [x] Recent activity (clickable)
- [x] Saved PMs section
- [x] Online PMs widget
- [x] Online status indicators

### Admin Features
- [x] PM verification queue
- [x] User management (list/edit)
- [x] Role management

### Design & UI
- [x] IBM Carbon Design inspired theme
- [x] Golden Amber (#F5A623) branding
- [x] Dark mode support (class-based toggle)
- [x] Theme toggle in header
- [x] Responsive mobile navigation
- [x] Custom favicon (SVG)

### Technical Features
- [x] Last active tracking middleware
- [x] Online/offline status detection
- [x] Database seeders (8 sample PMs)
- [x] Docker development environment

---

## ⬜ Pending Features (Future Phases)

### Google Maps Integration — PM Search
- [ ] Embed interactive Google Map on the PM search/finder page
- [ ] Plot PM locations as markers based on search results
- [ ] Clickable markers showing PM info popup (name, avatar, rating, verified badge)
- [ ] Radius-based filtering (5km, 10km, 25km, 50km) from a chosen location
- [ ] Service area polygon/circle visualization on map
- [ ] Location autocomplete in search bar (Google Places API)
- [ ] Map ↔ list view sync (highlight card when marker clicked, vice-versa)
- [ ] Cluster markers when zoomed out
- [ ] "Search this area" button when user pans the map

### Google Maps Integration — PM Property Portfolio Map
- [ ] Map on PM profile page showing all properties they manage
- [ ] Each property plotted as a pin/marker on the map
- [ ] Hover/click on marker shows info card overlay:
  - [ ] Property name & address
  - [ ] Property type (condo, house, apartment, etc.)
  - [ ] Thumbnail images carousel/gallery preview
  - [ ] Status indicator (active, vacant, etc.)
- [ ] Smooth card popup with image(s), address, and quick details
- [ ] Click info card to navigate to full property detail (if applicable)
- [ ] Fit map bounds to show all property markers
- [ ] Responsive map sizing (full-width on mobile, side panel on desktop)

### Photo Gallery & Portfolio
- [ ] Photo gallery for properties managed
- [ ] Property cards with images
- [ ] Image upload functionality
- [ ] Portfolio grid layout

### PM Onboarding Workflow
- [ ] Multi-step onboarding wizard for new Property Managers
  - [ ] Step 1: Personal Info — name, contact, profile photo
  - [ ] Step 2: Business Details — company name, years of experience, bio
  - [ ] Step 3: Services & Areas — select service types, define service areas
  - [ ] Step 4: Verification — upload required documents:
    - [ ] Government-issued ID
    - [ ] Business permit / DTI registration
    - [ ] Proof of address or office
    - [ ] Professional license (if applicable)
  - [ ] Step 5: Review & Submit — summary of all info before submission
- [ ] Progress indicator (step bar / progress percentage)
- [ ] Save draft & resume later functionality
- [ ] "Pending Verification" status after submission
- [ ] Admin verification queue — review documents, approve/reject with reason
- [ ] Email notification on approval/rejection
- [ ] Post-approval guided tour ("What's next" tips — add properties, complete portfolio)
- [ ] Onboarding completion percentage on PM dashboard

### Help Center, FAQ & Guides
- [ ] Help center page (`/help`) with searchable topics
- [ ] FAQ section with expandable accordion items:
  - [ ] General: What is PM Finder? How does it work?
  - [ ] For Property Owners: How to find a PM, how to send inquiries, how reviews work
  - [ ] For Property Managers: How to create a profile, verification process, managing inquiries
  - [ ] Account & Security: Password reset, account settings, privacy
- [ ] Getting Started guides:
  - [ ] Property Owner guide — searching, saving PMs, sending inquiries, leaving reviews
  - [ ] Property Manager guide — onboarding, completing profile, responding to inquiries
- [ ] Contextual help tooltips throughout the app
- [ ] "Need help?" floating button or link in footer/header
- [ ] Contact support form (or link to inquiry with admin)
- [ ] Help articles / knowledge base with categories
- [ ] Video tutorials or walkthrough GIFs (future)

### Enhanced Authentication
- [ ] Social login (Google, Facebook)
- [ ] OTP/SMS verification
- [ ] Two-factor authentication (2FA)

### Advanced Communication
- [ ] Real-time WebSocket messaging (replace polling)
- [ ] File/image attachments in messages
- [ ] Email notifications for new messages

### Additional Features
- [ ] PM availability calendar
- [ ] Booking/appointment scheduling
- [ ] Payment integration (for premium listings)
- [ ] Advanced analytics dashboard
- [ ] Email verification on registration
- [ ] Mobile app (React Native)

### Performance & DevOps
- [ ] API rate limiting
- [ ] Caching optimization
- [ ] CDN for static assets
- [ ] Automated testing (CI/CD)
- [ ] Production deployment scripts

---

## 🔧 Known Issues / Improvements

- [ ] Review dark mode contrast in edge cases
- [ ] Add loading states to all async operations
- [ ] Improve error handling UX
- [ ] Add form validation feedback
- [ ] Optimize database queries (eager loading)

---

## 📝 Notes

### Test Accounts
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@pmfinder.test | password |
| Owner | test@example.com | password |
| Manager | maria.santos@pmfinder.test | password |

### Tech Stack
- Laravel 12.49.0 (PHP 8.4.17)
- React 19.2.4
- MySQL 8.4.8
- Redis 7.4.7
- Node.js 22.22.0
- Tailwind CSS + Vite
- Docker multi-container

---

*Last Updated: February 15, 2026*
