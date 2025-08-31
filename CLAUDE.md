# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 micro-frontend application using Module Federation, built as a monorepo with pnpm workspaces. The project demonstrates a tractor store e-commerce platform split into four main applications:

- **Host Application** (`apps/host`, port 3001) - Shell app managing routing and layout
- **Explore Microfrontend** (`apps/explore`, port 3004) - Product browsing and navigation  
- **Decide Microfrontend** (`apps/decide`, port 5175) - Product details and decision making
- **Checkout Microfrontend** (`apps/checkout`, port 3003) - Shopping cart and purchase flow
- **Shared Package** (`packages/shared`) - Common components, utilities, and composables

## Essential Commands

### Development
```bash
# Start all applications in development mode
pnpm start
# or
./start.sh

# Start individual applications
pnpm run start:host      # Host only (port 3001)
pnpm run start:explore   # Explore only (port 3004)
pnpm run start:decide    # Decide only (port 5175)
pnpm run start:checkout  # Checkout only (port 3003)

# Stop all applications
pnpm run stop
# or
./stop-all.sh
```

### Build and Quality Checks
```bash
# Build all applications
pnpm run build

# Lint all applications
pnpm run lint

# Type check all applications  
pnpm run type-check

# Install dependencies for all workspaces
pnpm install
```

## Architecture Details

### Module Federation Configuration
- **Host** consumes remote components from all three microfrontends via manifest.json files
- **Shared Dependencies**: Vue, Vue Router, and Canvas Confetti are configured as singletons
- **Exposed Components**: Each microfrontend exposes specific Vue components that can be consumed by the host
- **Cross-App Dependencies**: Some microfrontends consume components from others (e.g., Decide uses Header/Footer from Explore, AddToCart from Checkout)

### Communication Patterns
- **Routing**: Centralized in host application using Vue Router
- **State Management**: Cart state uses local storage with custom event bridge (`cartEventBridge.ts`)
- **Component Sharing**: Shared UI components via `@tractor/shared` workspace package

### Build Tools
- **Rsbuild**: Primary build tool for all applications (Rspack-based)
- **Module Federation Plugin**: `@module-federation/rsbuild-plugin` for micro-frontend setup
- **TypeScript**: Full type checking across all workspaces with project references
- **ESLint**: Different configurations per app (`.mjs`, `.ts`, `.js` variants)

### Key Configuration Files
- `pnpm-workspace.yaml`: Workspace configuration for monorepo
- `apps/host/module-federation.config.ts`: Remote consumption configuration
- `apps/*/rsbuild.config.ts`: Build configurations with exposed modules
- `packages/shared/src/index.ts`: Shared package exports

### Development Notes
- The host application must start after microfrontends are ready (handled automatically by start.sh)
- Each app runs on a different port with CORS headers configured
- Hot Module Replacement works across all applications
- Logs are saved to `./logs/` directory during development
- The shared package uses TypeScript project references for type checking

### Testing and Deployment
- No test framework is currently configured
- Each microfrontend can be deployed independently
- Production builds require proper CORS configuration and CDN setup for remote loading