# 🎭 Eventful

A modern event management platform built with Next.js, GraphQL, and TypeScript. Eventful connects artists with event managers and provides comprehensive tools for managing bookings, artist profiles, and event coordination.

## 🌟 Features

- **Artist Management**: Complete artist profiles with portfolios, skills, and availability
- **Booking System**: Streamlined booking process between artists and event managers
- **Manager Dashboard**: Comprehensive dashboard for event managers to track bookings and artists
- **Artist Onboarding**: Multi-step registration process for new artists
- **Responsive Design**: Mobile-first design with sidebar navigation
- **Real-time Data**: GraphQL-powered real-time data synchronization

## 🛠️ Tech Stack

### Frontend

- **Next.js 15.3.4** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS framework
- **Shadcn/ui** - High-quality UI components
- **Lucide React** - Icon library

### Backend & Data

- **GraphQL** - Query language and runtime
- **Apollo Client** - GraphQL client with caching
- **Apollo Server** - GraphQL server implementation
- **@graphql-tools** - GraphQL schema building and merging

### Forms & Validation

- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation integration

### UI Components & Interactions

- **Radix UI** - Headless UI primitives
- **Class Variance Authority** - Component variants
- **Embla Carousel** - Carousel component
- **Sonner** - Toast notifications
- **Recharts** - Data visualization

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (routes)/                 # Route groups
│   │   ├── artists/              # Artist-related pages
│   │   ├── manager/              # Manager dashboard
│   │   └── layout.tsx            # Main layout with header/footer
│   ├── api/                      # API routes
│   │   └── graphql/              # GraphQL endpoint
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout
├── components/                   # React components
│   ├── global/                   # Feature-specific components
│   │   ├── artists/              # Artist-related components
│   │   └── manager/              # Manager-related components
│   ├── shared/                   # Shared utility components
│   ├── ui/                       # Shadcn/ui components
│   └── widgets/                  # Layout components (header, footer)
├── graphql/                      # GraphQL setup
│   ├── resolvers/                # GraphQL resolvers
│   ├── schemas/                  # GraphQL type definitions
│   ├── queries/                  # GraphQL query definitions
│   ├── resolvers.ts              # Combined resolvers
│   └── schema.ts                 # Combined schema
├── hooks/                        # Custom React hooks
├── lib/                          # Utility libraries
├── providers/                    # React context providers
└── constants/                    # Application constants
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd eventful
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📜 Available Scripts

| Script          | Description                             |
| --------------- | --------------------------------------- |
| `npm run dev`   | Start development server with Turbopack |
| `npm run build` | Build the application for production    |
| `npm run start` | Start the production server             |
| `npm run lint`  | Run ESLint for code quality checks      |

## 🎨 UI Components

This project uses [Shadcn/ui](https://ui.shadcn.com/) components with the following configuration:

- **Style**: New York
- **Framework**: React Server Components (RSC)
- **TypeScript**: Enabled
- **Base Color**: Neutral
- **CSS Variables**: Enabled

### Available Components

- **Layout**: Accordion, Aspect Ratio, Breadcrumb, Carousel, Collapsible, Resizable, Scroll Area, Separator, Sidebar, Tabs
- **Navigation**: Context Menu, Dropdown Menu, Hover Card, Menubar, Navigation Menu, Popover, Tooltip
- **Forms**: Button, Checkbox, Form, Input, Input OTP, Label, Radio Group, Select, Slider, Switch, Textarea, Toggle
- **Feedback**: Alert, Alert Dialog, Badge, Card, Dialog, Drawer, Progress, Skeleton, Sonner (Toast)
- **Data Display**: Avatar, Calendar, Chart, Pagination, Table

## 📊 GraphQL Schema

The application uses a modular GraphQL schema with the following entities:

### Core Types

- **User**: System users (managers, admins)
- **Artist**: Performer profiles with skills and portfolios
- **Booking**: Event booking management

### Features

- **Artist Genres**: Rock, Pop, Jazz, Classical, Electronic, Hip-Hop, Country, Blues, Reggae, Folk, Comedy, Magic, Dance, Theater
- **Multi-step Onboarding**: Guided artist registration process
- **Relationship Management**: Artists linked to managers, bookings to both entities

## 🎯 Key Features Deep Dive

### Artist Management

- **Profile Creation**: Comprehensive artist profiles with media portfolios
- **Skill Tracking**: Multiple genres and performance types
- **Availability Management**: Calendar integration for booking availability
- **Portfolio Showcase**: Image and video portfolio management

### Booking System

- **Request Management**: Artists can receive and manage booking requests
- **Status Tracking**: Real-time booking status updates
- **Communication**: Integrated messaging between artists and managers

### Manager Dashboard

- **Artist Overview**: Comprehensive view of managed artists
- **Booking Analytics**: Performance metrics and booking statistics
- **Quick Actions**: Fast access to common management tasks

### Mobile Experience

- **Responsive Design**: Optimized for all device sizes
- **Sidebar Navigation**: Mobile-friendly navigation with smooth animations
- **Touch Interactions**: Gesture-based interactions for mobile users

## 🔧 Development Guidelines

### Code Style

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Automated code formatting
- **Component Structure**: Organized by feature and shared components

### Best Practices

- **Component Composition**: Reusable and composable UI components
- **Custom Hooks**: Encapsulated business logic in custom hooks
- **GraphQL Best Practices**: Efficient queries and proper error handling
- **Responsive Design**: Mobile-first approach with progressive enhancement

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Deployment Options

- **Vercel** (Recommended): Zero-configuration deployment
- **Netlify**: Git-based deployment with continuous integration
- **Docker**: Containerized deployment for any cloud provider

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [GraphQL Documentation](https://graphql.org/learn/)
- [Shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
