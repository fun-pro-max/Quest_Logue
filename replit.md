# Overview

This is a gamified task management application called "Quest Log" that transforms everyday tasks into RPG-style adventures. Users can create tasks categorized as boss fights, quests, or training sessions, complete them to earn XP, and unlock achievements. The application features a medieval fantasy theme with custom styling and interactive UI components.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom medieval fantasy theme using CSS variables
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with JSON responses
- **Data Storage**: In-memory storage with Map data structures (MemStorage class)
- **Schema Validation**: Zod for runtime type checking and validation
- **Development Server**: Custom Vite middleware integration for seamless full-stack development

## Database Schema
The application uses Drizzle ORM for type-safe database operations with PostgreSQL:

### Tasks Table
- `id`: UUID primary key
- `title`: Task name
- `description`: Task details
- `category`: 'boss', 'quest', or 'training'
- `xpReward`: Integer XP points (default 100)
- `createdAt`: Timestamp

### Achievements Table
- `id`: UUID primary key
- `title`: Achievement name
- `description`: Achievement details
- `icon`: Emoji or icon representation
- `xpEarned`: XP points earned
- `completedAt`: Timestamp

## Key Design Patterns
- **Repository Pattern**: Storage interface abstraction for data operations
- **Component Composition**: Reusable UI components with variant props
- **Type Safety**: Full TypeScript coverage with shared types between client/server
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints

## API Endpoints
- `GET /api/tasks` - Retrieve all tasks
- `POST /api/tasks` - Create new task
- `POST /api/tasks/:id/complete` - Complete task and create achievement for boss fights
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/achievements` - Retrieve all achievements

## Theme System
Custom medieval fantasy theme with:
- Parchment-style backgrounds using CSS variables
- Medieval fonts (Cinzel for headings, Roboto for body)
- Color palette inspired by medieval manuscripts
- Custom CSS classes for different task categories (boss-fight-card, quest-card, training-card)

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless driver for database connectivity
- **drizzle-orm**: Type-safe ORM for PostgreSQL with migration support
- **@tanstack/react-query**: Server state management and caching
- **express**: Node.js web framework for REST API
- **wouter**: Lightweight React router

## UI and Styling
- **@radix-ui/***: Comprehensive collection of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for creating variant-based component APIs
- **lucide-react**: Icon library for consistent iconography

## Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **drizzle-kit**: Database migration and schema management

## Form Handling and Validation
- **react-hook-form**: Performant form library
- **@hookform/resolvers**: Form validation resolvers
- **zod**: Runtime type validation and schema definition

## Database and Session Management
- **connect-pg-simple**: PostgreSQL session store for Express
- **date-fns**: Date utility library for formatting and manipulation

The application is configured to work with Neon Database for PostgreSQL hosting and includes full TypeScript support across the entire stack.