# Tractor Store - Vue 3 Module Federation

A modern e-commerce application built with Vue 3 and Module Federation, demonstrating micro-frontend architecture for a tractor store. This project showcases how to build scalable, maintainable web applications using independent, deployable microfrontends.

## 🏗️ Architecture Overview

This application consists of four main parts:
- **Host Application** - Shell application managing routing and layout
- **Explore Microfrontend** - Product browsing and navigation
- **Decide Microfrontend** - Product details and decision making  
- **Checkout Microfrontend** - Shopping cart and purchase flow

```mermaid
graph TD
    %% Host Application (Shell)
    Host["🏠 Host Application<br/>Port: 3001<br/>Router & Layout"]
    
    %% Microfrontends
    Explore["🔍 Explore Microfrontend<br/>Port: 3004"]
    Decide["🤔 Decide Microfrontend<br/>Port: 5175"]
    Checkout["🛒 Checkout Microfrontend<br/>Port: 3003"]
    
    %% Host consumes from remotes
    Host -->|Consumes| Explore
    Host -->|Consumes| Decide
    Host -->|Consumes| Checkout
    
    %% Explore exposed components
    Explore --> ExploreComponents["📦 Exposed Components:<br/>• HomePage<br/>• CategoryPage<br/>• StoresPage<br/>• Header<br/>• Footer<br/>• Recommendations<br/>• StorePicker"]
    
    %% Decide exposed components
    Decide --> DecideComponents["📦 Exposed Components:<br/>• ProductPage"]
    
    %% Checkout exposed components
    Checkout --> CheckoutComponents["📦 Exposed Components:<br/>• CartPage<br/>• Checkout<br/>• Thanks<br/>• AddToCart<br/>• MiniCart"]
    
    %% Shared dependencies
    SharedDeps["🔗 Shared Dependencies<br/>• Vue (singleton)<br/>• Vue Router (singleton)<br/>• Canvas Confetti"]
    
    Host -.->|Shares| SharedDeps
    Explore -.->|Shares| SharedDeps
    Decide -.->|Shares| SharedDeps
    Checkout -.->|Shares| SharedDeps
    
    %% Cross-microfrontend dependencies
    Decide -.->|Uses Header/Footer| Explore
    Decide -.->|Uses AddToCart| Checkout
    Explore -.->|Uses MiniCart| Checkout
    
    %% Routing
    Routes["🛣️ Routes<br/>/ → HomePage<br/>/products → CategoryPage<br/>/stores → StoresPage<br/>/product/:id → ProductPage<br/>/checkout/* → Checkout Pages"]
    Host --> Routes
    
    %% Styling
    classDef host fill:#e1f5fe
    classDef microfrontend fill:#f3e5f5
    classDef components fill:#e8f5e8
    classDef shared fill:#fff3e0
    classDef routes fill:#fce4ec
    
    class Host host
    class Explore,Decide,Checkout microfrontend
    class ExploreComponents,DecideComponents,CheckoutComponents components
    class SharedDeps shared
    class Routes routes
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Development

```bash
# Install dependencies for all applications
npm run install:all

# Start all microfrontends in development mode
npm run start
# or
./start.sh

# Stop all applications
npm run stop
# or
./stop-all.sh
```

The applications will be available at:
- **Host**: http://localhost:3001 (Main application)
- **Explore**: http://localhost:3004 (Standalone development)
- **Decide**: http://localhost:5175 (Standalone development)
- **Checkout**: http://localhost:3003 (Standalone development)

### Individual Development

Start individual microfrontends for focused development:

```bash
# Start specific applications
npm run start:host    # Host only
npm run start:explore # Explore microfrontend only
npm run start:decide  # Decide microfrontend only
```

## 📁 Project Structure

```
├── host/                    # Shell application (port 3001)
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout.vue   # Shared layout with Header/Footer
│   │   ├── router/          # Vue Router configuration
│   │   ├── utils/           # Remote component utilities
│   │   └── remotes.ts       # Module Federation setup
│   └── rsbuild.config.ts    # Build configuration
│
├── explore/                 # Product browsing (port 3004)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── data/           # Mock data
│   │   ├── Header.vue      # Global header component
│   │   ├── Footer.vue      # Global footer component
│   │   ├── HomePage.vue    # Landing page
│   │   ├── CategoryPage.vue # Product listing
│   │   └── StoresPage.vue  # Store locations
│   └── rsbuild.config.ts
│
├── decide/                  # Product details (port 5175)
│   ├── src/
│   │   ├── components/     # Product-specific components
│   │   ├── composables/    # Vue 3 composition utilities
│   │   └── ProductPage.vue # Product detail page
│   └── rsbuild.config.ts
│
├── checkout/                # Shopping cart (port 3003)
│   ├── src/
│   │   ├── components/     # Cart-related components
│   │   ├── stores/         # Local storage cart management
│   │   ├── CartPage.vue    # Shopping cart
│   │   ├── Checkout.vue    # Checkout process
│   │   ├── Thanks.vue      # Order confirmation
│   │   ├── AddToCart.vue   # Add to cart button
│   │   └── MiniCart.vue    # Cart preview widget
│   └── rsbuild.config.ts
│
├── logs/                   # Development logs
├── start.sh               # Development startup script
├── stop-all.sh           # Stop all services script
└── CLAUDE.md             # AI assistant instructions
```

## 🔧 Technology Stack

### Core Technologies
- **Vue 3** - Progressive JavaScript framework with Composition API
- **TypeScript** - Type-safe JavaScript development
- **Module Federation** - Micro-frontend architecture via Rsbuild plugin
- **Rsbuild** - Fast build tool based on Rspack

### Module Federation Setup
- **Host Application**: Consumes all remote components and manages routing
- **Shared Dependencies**: Vue, Vue Router, Canvas Confetti as singletons
- **Cross-App Communication**: Event-driven cart state management
- **Lazy Loading**: All remote components loaded on-demand

### Development Tools
- **ESLint**: Code linting with Vue-specific rules
- **TypeScript**: Full type checking across all apps
- **Hot Module Replacement**: Fast development feedback

## 🛠️ Build & Deployment

### Development Build
```bash
# Build all applications
npm run build:all

# Build individual apps
cd host && npm run build
cd explore && npm run build  
cd decide && npm run build
cd checkout && npm run build
```

### Production Considerations
- Each microfrontend can be deployed independently
- Host app consumes remotes via manifest.json files
- Configure proper CORS headers for cross-origin loading
- Set up proper CDN for static assets

### Linting & Type Checking
```bash
# Lint all applications
cd host && npm run lint
cd explore && npm run lint && npm run type-check
cd decide && npm run lint && npm run type-check
cd checkout && npm run lint && npm run type-check
```

## 🌟 Key Features

### Micro-Frontend Benefits
- **Independent Development**: Teams can work on separate microfrontends
- **Independent Deployment**: Deploy features without affecting other parts
- **Technology Flexibility**: Each app can use different versions or tools
- **Scalable Architecture**: Add new microfrontends easily

### Performance Optimizations
- **Shared Dependencies**: Avoid duplicate Vue bundles
- **Lazy Loading**: Components loaded only when needed
- **Optimized Rendering**: Header/Footer persist across navigation
- **Local Storage**: Cart state persists across page reloads

### Developer Experience
- **Hot Module Replacement**: Instant development feedback  
- **Type Safety**: Full TypeScript support across all apps
- **Consistent Tooling**: Unified ESLint and build configurations
- **Easy Setup**: Single command to start all applications

## 🤝 Contributing

1. **Development Setup**: Run `npm run install:all` and `npm run start`
2. **Code Style**: Follow ESLint configurations in each app
3. **Type Safety**: Ensure TypeScript passes in all applications
4. **Testing**: Test changes across all microfrontends

## 📝 Notes

- Based on [the tractor store 2.0](https://micro-frontends.org/tractor-store/) by [neuland](https://neuland-bfi.de)
- Logs are automatically saved to `./logs/` directory during development
- Each microfrontend can run standalone for isolated development
- Cart state is managed via local storage and event communication
