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

### Google Maps Integration
- [ ] Interactive map displaying PM locations
- [ ] Clickable map markers with PM info popup
- [ ] Radius-based filtering (5km, 10km, 25km)
- [ ] Service area visualization
- [ ] Location autocomplete in search bar

### Photo Gallery & Portfolio
- [ ] Photo gallery for properties managed
- [ ] Property cards with images
- [ ] Image upload functionality
- [ ] Portfolio grid layout

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

*Last Updated: February 4, 2026*
