# DINE HUB - Technical Documentation
## Restaurant Reservation Management System

---

**Document Version:** 1.0  
**Last Updated:** July 2026  
**Author:** [Your Name]  
**Project:** Dine Hub - Feed Your Cravings

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Overview](#2-system-overview)
3. [Functional Requirements](#3-functional-requirements)
4. [Non-Functional Requirements](#4-non-functional-requirements)
5. [User Interface Design](#5-user-interface-design)
6. [Component Documentation](#6-component-documentation)
7. [API Specification (Proposed)](#7-api-specification-proposed)
8. [Database Design](#8-database-design)
9. [Deployment Guide](#9-deployment-guide)
10. [Troubleshooting](#10-troubleshooting)
11. [Appendices](#11-appendices)

---

## 1. Executive Summary

Dine Hub is a comprehensive Restaurant Reservation Management System designed to bridge the gap between traditional restaurant operations and modern digital expectations. This document provides complete technical documentation for the frontend implementation, including system architecture, component details, user flows, and future integration points.

**Target Audience:** Developers, Project Supervisors, Technical Reviewers

---

## 2. System Overview

### 2.1 Purpose

To provide a unified digital platform for:
- Customers to discover, book, and order from restaurants
- Restaurant owners to manage their business operations
- Administrators to oversee platform activities

### 2.2 System Context

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Customer   │     │    Owner     │     │    Admin     │
└──────┬───────┘     └──────┬───────┘     └──────┬───────┘
       │                    │                    │
       └────────────────────┼────────────────────┘
                            │
              ┌─────────────▼──────────────┐
              │    Dine Hub Frontend       │
              │    (React.js + Vite)       │
              └─────────────┬──────────────┘
                            │
              ┌─────────────▼──────────────┐
              │   Future Backend Layer     │
              │  (Node.js + MongoDB + JWT) │
              └────────────────────────────┘
```

### 2.3 Technology Stack Details

#### Frontend Layer
| Technology | Version | Purpose |
|------------|---------|---------|
| React.js | 18.2.0 | UI component library |
| React DOM | 18.2.0 | DOM rendering |
| React Router DOM | 6.20.0 | Client-side routing |
| Vite | 5.0.8 | Build tool & dev server |
| Tailwind CSS | 3.3.6 | Utility-first CSS framework |
| PostCSS | 8.4.32 | CSS processing |
| Autoprefixer | 10.4.16 | CSS vendor prefixes |

#### UI Libraries
| Technology | Version | Purpose |
|------------|---------|---------|
| Lucide React | 0.294.0 | Icon library |
| Recharts | 2.10.0 | Chart components |

#### Fonts
| Font | Source | Usage |
|------|--------|-------|
| Playfair Display | Google Fonts | Headings, brand text |
| Inter | Google Fonts | Body text, UI elements |

---

## 3. Functional Requirements

### 3.1 Customer Module

#### FR-C-001: Restaurant Discovery
- **Description:** Customers can browse and search restaurants
- **Priority:** High
- **Acceptance Criteria:**
  - Display restaurant cards with image, name, cuisine, rating, location
  - Search by name or cuisine
  - Filter by cuisine type, location, price range
  - Sort by rating, price, relevance

#### FR-C-002: Restaurant Detail View
- **Description:** View detailed information about a restaurant
- **Priority:** High
- **Acceptance Criteria:**
  - Display hero image, name, cuisine, rating, location, timing
  - Show about section with description
  - Display contact information
  - Show popular menu items preview
  - Display customer reviews
  - Link to full menu and reservation

#### FR-C-003: Menu Browsing & Ordering
- **Description:** View menu and add items to cart
- **Priority:** High
- **Acceptance Criteria:**
  - Display menu items by category
  - Add/remove quantity from cart
  - Real-time cart total calculation
  - Display item images, descriptions, prices

#### FR-C-004: Table Reservation
- **Description:** Book a table at a restaurant
- **Priority:** High
- **Acceptance Criteria:**
  - Select date, time, number of guests
  - Enter contact information
  - Add special requests
  - Receive confirmation
  - View reservation history

#### FR-C-005: Order History
- **Description:** View past orders
- **Priority:** Medium
- **Acceptance Criteria:**
  - List all orders with status
  - Display order details (items, total, date)
  - Track order status

#### FR-C-006: Blog & Vlog Access
- **Description:** Access food-related content
- **Priority:** Medium
- **Acceptance Criteria:**
  - Browse blog articles by category
  - Browse vlog videos by category
  - Search content
  - View featured content

### 3.2 Owner Module

#### FR-O-001: Dashboard Overview
- **Description:** View business metrics at a glance
- **Priority:** High
- **Acceptance Criteria:**
  - Display statistics cards (reservations, orders, revenue, customers)
  - Show revenue trends chart
  - Show reservation patterns
  - Display recent activity feed

#### FR-O-002: Restaurant Profile Management
- **Description:** Update restaurant information
- **Priority:** High
- **Acceptance Criteria:**
  - Edit name, cuisine, location, phone, timing
  - Upload restaurant photo
  - Update description
  - Save changes

#### FR-O-003: Menu Management
- **Description:** Manage menu items
- **Priority:** High
- **Acceptance Criteria:**
  - Add new menu items
  - Edit existing items
  - Delete items
  - Toggle availability status
  - Search items

#### FR-O-004: Table Management
- **Description:** Track table status
- **Priority:** High
- **Acceptance Criteria:**
  - View all tables with status
  - Change status (Available → Occupied → Reserved)
  - Add new tables
  - Visual status indicators

#### FR-O-005: Reservation Management
- **Description:** View and manage bookings
- **Priority:** High
- **Acceptance Criteria:**
  - List all reservations
  - Approve/reject pending reservations
  - View reservation details
  - Filter by status

#### FR-O-006: Order Management
- **Description:** Track customer orders
- **Priority:** High
- **Acceptance Criteria:**
  - List all orders
  - Update order status
  - View order details
  - Filter by status

#### FR-O-007: Analytics
- **Description:** View business insights
- **Priority:** Medium
- **Acceptance Criteria:**
  - Revenue by category (pie chart)
  - Daily orders (bar chart)
  - Key metrics (total revenue, orders, customers, rating)

### 3.3 Admin Module

#### FR-A-001: Platform Dashboard
- **Description:** Overview of entire platform
- **Priority:** High
- **Acceptance Criteria:**
  - Display platform statistics
  - User growth chart
  - Recent users table
  - Key metrics (users, restaurants, orders, revenue)

#### FR-A-002: User Management
- **Description:** Manage platform users
- **Priority:** High
- **Acceptance Criteria:**
  - List all users
  - Search users
  - Ban/unban users
  - View user details

#### FR-A-003: Restaurant Management
- **Description:** Approve and manage restaurants
- **Priority:** High
- **Acceptance Criteria:**
  - List all restaurants
  - Approve pending restaurants
  - Reject restaurants
  - View restaurant details

#### FR-A-004: Platform Analytics
- **Description:** View overall platform performance
- **Priority:** Medium
- **Acceptance Criteria:**
  - User & restaurant growth charts
  - Weekly order volume
  - Key performance indicators

#### FR-A-005: Reports
- **Description:** Generate and download reports
- **Priority:** Medium
- **Acceptance Criteria:**
  - List available reports
  - Download reports as PDF
  - Generate custom reports

---

## 4. Non-Functional Requirements

### 4.1 Performance
- **NFR-001:** Page load time < 3 seconds
- **NFR-002:** Smooth animations at 60fps
- **NFR-003:** Responsive to user input within 100ms

### 4.2 Usability
- **NFR-004:** Intuitive navigation requiring minimal training
- **NFR-005:** Consistent UI patterns across all pages
- **NFR-006:** Clear error messages and feedback

### 4.3 Reliability
- **NFR-007:** No critical crashes during normal usage
- **NFR-008:** Graceful handling of missing data

### 4.4 Compatibility
- **NFR-009:** Support for Chrome, Firefox, Edge, Safari (latest versions)
- **NFR-010:** Responsive design for mobile, tablet, desktop

### 4.5 Security (Future)
- **NFR-011:** Secure authentication with JWT
- **NFR-012:** Input validation and sanitization
- **NFR-013:** HTTPS communication

---

## 5. User Interface Design

### 5.1 Design System

#### Color Palette
| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Primary | #C41E1E | rgb(196, 30, 30) | Buttons, links, active states |
| Primary Light | #E84545 | rgb(232, 69, 69) | Hover states |
| Primary Dark | #8B0000 | rgb(139, 0, 0) | Pressed states |
| Gold | #D4A017 | rgb(212, 160, 23) | Highlights, badges |
| Gold Light | #F0C94E | rgb(240, 201, 78) | Hover highlights |
| Gold Dark | #B8860B | rgb(184, 134, 11) | Dark accents |
| Dark | #1A1A1A | rgb(26, 26, 26) | Text, footer |
| Cream | #FFF8F0 | rgb(255, 248, 240) | Page background |
| White | #FFFFFF | rgb(255, 255, 255) | Card backgrounds |

#### Typography
| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 | Playfair Display | 48px | Bold (700) |
| H2 | Playfair Display | 36px | Bold (700) |
| H3 | Playfair Display | 24px | Bold (700) |
| Body | Inter | 16px | Regular (400) |
| Small | Inter | 14px | Medium (500) |
| Caption | Inter | 12px | Regular (400) |

#### Spacing Scale
| Token | Value |
|-------|-------|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |
| 3xl | 64px |

#### Border Radius
| Token | Value |
|-------|-------|
| sm | 8px |
| md | 12px |
| lg | 16px |
| xl | 24px |
| full | 9999px |

#### Shadows
| Token | Value |
|-------|-------|
| sm | 0 1px 2px rgba(0,0,0,0.05) |
| md | 0 4px 6px rgba(0,0,0,0.1) |
| lg | 0 10px 15px rgba(0,0,0,0.1) |
| xl | 0 20px 25px rgba(0,0,0,0.15) |

### 5.2 Page Layouts

#### Main Layout
```
┌─────────────────────────────────────┐
│              Navbar                 │
├─────────────────────────────────────┤
│                                     │
│            Main Content             │
│         (Outlet / Children)         │
│                                     │
├─────────────────────────────────────┤
│              Footer                 │
└─────────────────────────────────────┘
```

#### Dashboard Layout
```
┌──────────┬──────────────────────────┐
│          │                          │
│ Sidebar  │      Dashboard Content   │
│  (Fixed) │      (Scrollable)        │
│          │                          │
└──────────┴──────────────────────────┘
```

#### Auth Layout
```
┌─────────────────────────────────────┐
│                                     │
│         Centered Auth Card          │
│         (Login / Register)          │
│                                     │
└─────────────────────────────────────┘
```

### 5.3 Component Specifications

#### Card Component
- Background: White (#FFFFFF)
- Border Radius: 16px (rounded-2xl)
- Shadow: md (hover: xl)
- Border: 1px solid #F3F4F6
- Padding: 24px
- Transition: all 300ms ease

#### Button Primary
- Background: Primary (#C41E1E)
- Text: White
- Padding: 12px 24px
- Border Radius: 12px
- Hover: Primary Dark (#8B0000)
- Shadow: lg
- Transition: all 300ms

#### Button Gold
- Background: Gold (#D4A017)
- Text: White
- Padding: 12px 24px
- Border Radius: 12px
- Hover: Gold Dark (#B8860B)
- Shadow: lg
- Transition: all 300ms

#### Input Field
- Background: White
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 12px 16px
- Focus: Border Primary, Ring Primary/20
- Transition: all 300ms

---

## 6. Component Documentation

### 6.1 Navbar

**File:** `src/components/Navbar/Navbar.jsx`

**Props:** None (uses AuthContext)

**State:**
- `isOpen`: Mobile menu toggle
- `dropdownOpen`: User dropdown toggle

**Features:**
- Responsive design with hamburger menu
- Dynamic auth buttons (Login/Register vs User dropdown)
- Role-based dashboard links
- Logo with hover animation
- Mobile slide-out menu

**Dependencies:** `lucide-react`, `react-router-dom`, `AuthContext`

### 6.2 Sidebar

**File:** `src/components/Sidebar/Sidebar.jsx`

**Props:** None (uses AuthContext + useLocation)

**State:**
- `mobileOpen`: Mobile sidebar toggle

**Features:**
- Role-specific navigation links
- Active route highlighting
- Mobile overlay and toggle
- Logout functionality
- Collapsible on mobile

**Link Configuration:**
```javascript
const customerLinks = [
  { to: '/customer/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/customer/reservations', icon: Calendar, label: 'My Reservations' },
  { to: '/customer/orders', icon: ShoppingBag, label: 'My Orders' },
]

const ownerLinks = [
  { to: '/owner/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/owner/restaurant', icon: Building2, label: 'Restaurant' },
  { to: '/owner/menu', icon: UtensilsCrossed, label: 'Menu' },
  // ... more links
]
```

### 6.3 StatCard

**File:** `src/components/StatCard/StatCard.jsx`

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | string | Yes | Card title |
| value | string/number | Yes | Display value |
| change | number | Yes | Percentage change |
| icon | Component | Yes | Lucide icon component |
| color | string | Yes | Tailwind color class |

**Example:**
```jsx
<StatCard 
  title="Total Revenue" 
  value="Rs. 110K" 
  change={18} 
  icon={DollarSign} 
  color="bg-green-500" 
/>
```

### 6.4 ChartComponent

**File:** `src/components/ChartComponent/ChartComponent.jsx`

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| type | string | Yes | 'line', 'bar', 'pie', 'area' |
| data | array | Yes | Chart data array |
| xKey | string | Conditional | X-axis data key |
| yKey | string | Conditional | Y-axis data key |
| dataKey | string | Conditional | Pie chart value key |
| nameKey | string | Conditional | Pie chart label key |

**Colors:** `['#C41E1E', '#D4A017', '#8B0000', '#E84545', '#F0C94E', '#B8860B']`

### 6.5 DataTable

**File:** `src/components/DataTable/DataTable.jsx`

**Props:**
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| columns | array | Yes | - | Column definitions |
| data | array | Yes | - | Table data |
| itemsPerPage | number | No | 5 | Pagination size |

**Column Definition:**
```javascript
const columns = [
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status', render: (row) => <span>{row.status}</span> },
]
```

### 6.6 AuthContext

**File:** `src/contexts/AuthContext.jsx`

**Provider:** `AuthProvider`

**Hook:** `useAuth()`

**Context Value:**
| Property | Type | Description |
|----------|------|-------------|
| user | object/null | Current user data |
| role | string/null | Current user role |
| login | function | (userData, role) => void |
| logout | function | () => void |

**Storage:** localStorage (keys: `dinehub_user`, `dinehub_role`)

---

## 7. API Specification (Proposed)

### 7.1 Authentication Endpoints

```
POST /api/auth/register
  Body: { name, email, password, role }
  Response: { token, user }

POST /api/auth/login
  Body: { email, password }
  Response: { token, user }

POST /api/auth/logout
  Headers: { Authorization: Bearer <token> }
  Response: { message }

GET /api/auth/me
  Headers: { Authorization: Bearer <token> }
  Response: { user }
```

### 7.2 Restaurant Endpoints

```
GET /api/restaurants
  Query: { search, cuisine, location, sort, page, limit }
  Response: { restaurants[], total, page }

GET /api/restaurants/:id
  Response: { restaurant, menuItems[], reviews[] }

POST /api/restaurants
  Headers: { Authorization: Bearer <token> }
  Body: { name, cuisine, location, phone, description, image }
  Response: { restaurant }

PUT /api/restaurants/:id
  Headers: { Authorization: Bearer <token> }
  Body: { ...fields }
  Response: { restaurant }

PATCH /api/restaurants/:id/status
  Headers: { Authorization: Bearer <token> } (Admin only)
  Body: { status: 'Approved' | 'Rejected' | 'Pending' }
  Response: { restaurant }
```

### 7.3 Menu Endpoints

```
GET /api/restaurants/:id/menu
  Response: { menuItems[] }

POST /api/restaurants/:id/menu
  Headers: { Authorization: Bearer <token> } (Owner only)
  Body: { name, category, price, description, image }
  Response: { menuItem }

PUT /api/menu/:itemId
  Headers: { Authorization: Bearer <token> } (Owner only)
  Body: { ...fields }
  Response: { menuItem }

DELETE /api/menu/:itemId
  Headers: { Authorization: Bearer <token> } (Owner only)
  Response: { message }
```

### 7.4 Reservation Endpoints

```
POST /api/reservations
  Headers: { Authorization: Bearer <token> }
  Body: { restaurantId, date, time, guests, name, phone, specialRequests }
  Response: { reservation }

GET /api/reservations
  Headers: { Authorization: Bearer <token> }
  Query: { status, page, limit }
  Response: { reservations[], total }

PUT /api/reservations/:id/status
  Headers: { Authorization: Bearer <token> }
  Body: { status: 'Confirmed' | 'Cancelled' | 'Completed' }
  Response: { reservation }
```

### 7.5 Order Endpoints

```
POST /api/orders
  Headers: { Authorization: Bearer <token> }
  Body: { restaurantId, items[], total }
  Response: { order }

GET /api/orders
  Headers: { Authorization: Bearer <token> }
  Query: { status, page, limit }
  Response: { orders[], total }

PUT /api/orders/:id/status
  Headers: { Authorization: Bearer <token> } (Owner/Admin)
  Body: { status: 'Pending' | 'Preparing' | 'Delivered' }
  Response: { order }
```

### 7.6 Admin Endpoints

```
GET /api/admin/users
  Headers: { Authorization: Bearer <token> } (Admin only)
  Query: { search, role, status, page, limit }
  Response: { users[], total }

PUT /api/admin/users/:id/status
  Headers: { Authorization: Bearer <token> } (Admin only)
  Body: { status: 'Active' | 'Banned' | 'Inactive' }
  Response: { user }

GET /api/admin/analytics
  Headers: { Authorization: Bearer <token> } (Admin only)
  Response: { users, restaurants, orders, revenue, growth }

GET /api/admin/reports
  Headers: { Authorization: Bearer <token> } (Admin only)
  Response: { reports[] }
```

---

## 8. Database Design

### 8.1 Entity Relationship Diagram

```
Users ||--o{ Restaurants : owns
Users ||--o{ Reservations : makes
Users ||--o{ Orders : places
Users ||--o{ Reviews : writes
Restaurants ||--o{ MenuItems : has
Restaurants ||--o{ Tables : has
Restaurants ||--o{ Reservations : receives
Restaurants ||--o{ Orders : receives
Restaurants ||--o{ Reviews : gets
```

### 8.2 Collection Schemas (MongoDB)

#### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String, // hashed
  role: String, // 'customer' | 'owner' | 'admin'
  status: String, // 'Active' | 'Inactive' | 'Banned'
  avatar: String, // URL
  phone: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### Restaurants Collection
```javascript
{
  _id: ObjectId,
  name: String,
  ownerId: ObjectId, // ref: Users
  cuisine: String,
  location: String,
  address: String,
  phone: String,
  timing: String,
  description: String,
  image: String, // URL
  priceRange: String, // '$' | '$$' | '$$$' | '$$$$'
  rating: Number,
  status: String, // 'Pending' | 'Approved' | 'Rejected'
  createdAt: Date,
  updatedAt: Date
}
```

#### MenuItems Collection
```javascript
{
  _id: ObjectId,
  restaurantId: ObjectId, // ref: Restaurants
  name: String,
  category: String,
  price: Number,
  description: String,
  image: String,
  isAvailable: Boolean,
  isPopular: Boolean,
  createdAt: Date
}
```

#### Tables Collection
```javascript
{
  _id: ObjectId,
  restaurantId: ObjectId,
  number: String,
  capacity: Number,
  status: String, // 'available' | 'occupied' | 'reserved'
  createdAt: Date
}
```

#### Reservations Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  restaurantId: ObjectId,
  tableId: ObjectId,
  date: Date,
  time: String,
  guests: Number,
  name: String,
  phone: String,
  specialRequests: String,
  status: String, // 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed'
  createdAt: Date
}
```

#### Orders Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  restaurantId: ObjectId,
  items: [{
    menuItemId: ObjectId,
    name: String,
    price: Number,
    quantity: Number
  }],
  total: Number,
  status: String, // 'Pending' | 'Preparing' | 'Delivered'
  date: Date,
  createdAt: Date
}
```

#### Reviews Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  restaurantId: ObjectId,
  rating: Number, // 1-5
  comment: String,
  likes: Number,
  createdAt: Date
}
```

---

## 9. Deployment Guide

### 9.1 Development Environment

**Prerequisites:**
- Node.js v18+ 
- npm v9+ or yarn v1.22+
- Git

**Setup Steps:**
```bash
# 1. Clone repository
git clone [repository-url]
cd dine-hub-react

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Access application
# http://localhost:5173
```

### 9.2 Production Build

```bash
# Create optimized production build
npm run build

# Output directory: dist/
# Static files ready for deployment
```

### 9.3 Deployment Options

#### Option A: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Option B: Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### Option C: Static Hosting
Upload `dist/` folder contents to:
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting
- Any static web server

### 9.4 Environment Variables

Create `.env` file for future backend integration:
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Dine Hub
VITE_APP_VERSION=1.0.0
```

---

## 10. Troubleshooting

### 10.1 Common Issues

#### Issue: "Failed to resolve import"
**Cause:** Missing file or incorrect path
**Solution:** 
- Verify file exists in specified path
- Check for typos in import statements
- Ensure file extension matches (.jsx)

#### Issue: "Module not found"
**Cause:** Dependency not installed
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

#### Issue: "Port 5173 already in use"
**Cause:** Another process using the port
**Solution:**
```bash
# Kill process or use different port
npm run dev -- --port 3000
```

#### Issue: "Tailwind styles not applying"
**Cause:** PostCSS configuration issue
**Solution:**
- Verify `tailwind.config.js` content paths
- Ensure `postcss.config.js` is correct
- Restart dev server

#### Issue: "Charts not rendering"
**Cause:** Recharts dependency issue
**Solution:**
```bash
npm install recharts
```

### 10.2 Browser Console Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `Cannot read property of undefined` | Missing data | Add null checks |
| `404 on /logo.png` | Logo not in public folder | Verify public/logo.png exists |
| `React hooks error` | Invalid hook call | Ensure React version compatibility |

---

## 11. Appendices

### Appendix A: File Structure Reference

```
dine-hub-react/
├── public/                          # Static assets
│   ├── logo.png                     # Brand logo (120x120px)
│   └── favicon.ico                  # Browser favicon
│
├── src/
│   ├── components/                  # Reusable components
│   │   ├── Navbar/                  # Navigation bar
│   │   │   └── Navbar.jsx
│   │   ├── Footer/                  # Page footer
│   │   │   └── Footer.jsx
│   │   ├── Sidebar/                 # Dashboard sidebar
│   │   │   └── Sidebar.jsx
│   │   ├── RestaurantCard/          # Restaurant display card
│   │   │   └── RestaurantCard.jsx
│   │   ├── MenuItemCard/            # Menu item card with cart
│   │   │   └── MenuItemCard.jsx
│   │   ├── StatCard/                # Statistics display card
│   │   │   └── StatCard.jsx
│   │   ├── ReviewCard/              # Customer review card
│   │   │   └── ReviewCard.jsx
│   │   ├── SearchBar/               # Search input component
│   │   │   └── SearchBar.jsx
│   │   ├── FilterDropdown/          # Filter dropdown component
│   │   │   └── FilterDropdown.jsx
│   │   ├── DataTable/               # Paginated table component
│   │   │   └── DataTable.jsx
│   │   ├── ChartComponent/          # Recharts wrapper
│   │   │   └── ChartComponent.jsx
│   │   └── VlogCard/                # Video card component
│   │       └── VlogCard.jsx
│   │
│   ├── pages/                       # Route pages
│   │   ├── LandingPage.jsx          # Home page
│   │   ├── RestaurantListingPage.jsx # Restaurant search
│   │   ├── RestaurantDetailPage.jsx # Restaurant details
│   │   ├── MenuPage.jsx             # Menu & ordering
│   │   ├── BlogListingPage.jsx      # Blog articles
│   │   ├── VlogListingPage.jsx      # Video content
│   │   ├── LoginPage.jsx            # User login
│   │   ├── RegisterPage.jsx         # User registration
│   │   ├── customer/                # Customer portal
│   │   │   ├── CustomerDashboard.jsx
│   │   │   ├── MyReservations.jsx
│   │   │   ├── MyOrders.jsx
│   │   │   └── ReservationPage.jsx
│   │   ├── owner/                   # Owner portal
│   │   │   ├── OwnerDashboard.jsx
│   │   │   ├── ManageRestaurant.jsx
│   │   │   ├── ManageMenu.jsx
│   │   │   ├── ManageTables.jsx
│   │   │   ├── OwnerReservations.jsx
│   │   │   ├── OwnerOrders.jsx
│   │   │   └── OwnerAnalytics.jsx
│   │   └── admin/                   # Admin portal
│   │       ├── AdminDashboard.jsx
│   │       ├── ManageUsers.jsx
│   │       ├── ManageRestaurants.jsx
│   │       ├── AdminAnalytics.jsx
│   │       └── AdminReports.jsx
│   │
│   ├── layouts/                     # Page layouts
│   │   ├── MainLayout.jsx           # Navbar + Footer wrapper
│   │   ├── AuthLayout.jsx           # Centered auth pages
│   │   └── DashboardLayout.jsx      # Sidebar + Content wrapper
│   │
│   ├── contexts/                    # Global state
│   │   └── AuthContext.jsx          # Authentication state
│   │
│   ├── App.jsx                      # Main router configuration
│   ├── main.jsx                     # Application entry point
│   └── index.css                    # Global styles & Tailwind
│
├── index.html                       # HTML entry point
├── package.json                     # Dependencies & scripts
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind theme config
├── postcss.config.js                # PostCSS plugins
├── requirements.txt                 # Python-style requirements
├── README.md                        # Project readme
├── Project_Report.md                # Academic project report
└── Documentation.md                 # This technical documentation
```

### Appendix B: Package.json Scripts

| Script | Command | Description |
|--------|---------|-------------|
| dev | `vite` | Start development server |
| build | `vite build` | Create production build |
| preview | `vite preview` | Preview production build |

### Appendix C: Tailwind Custom Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#C41E1E', light: '#E84545', dark: '#8B0000' },
        gold: { DEFAULT: '#D4A017', light: '#F0C94E', dark: '#B8860B' },
        dark: '#1A1A1A',
        cream: '#FFF8F0',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
}
```

### Appendix D: Git Workflow (Recommended)

```bash
# Initialize repository
git init

# Add remote
git remote add origin [your-repo-url]

# Daily workflow
git add .
git commit -m "feat: descriptive message"
git push origin main

# Branching for features
git checkout -b feature/menu-page
# ... make changes ...
git add .
git commit -m "feat: add menu page with cart"
git checkout main
git merge feature/menu-page
```

### Appendix E: VS Code Extensions (Recommended)

| Extension | Purpose |
|-----------|---------|
| ES7+ React snippets | React code snippets |
| Tailwind CSS IntelliSense | Autocomplete for Tailwind |
| Prettier | Code formatting |
| ESLint | Code linting |
| Auto Rename Tag | Auto rename paired tags |
| Bracket Pair Colorizer | Bracket matching |

---

**End of Documentation**

---

*This document serves as the complete technical reference for the Dine Hub project. For questions or updates, contact the development team.*
