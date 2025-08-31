# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 Module Federation implementation of The Tractor Store micro-frontends demo. It demonstrates how to build distributed applications using Module Federation with Vue 3, TypeScript, and Rsbuild.

## Architecture

### Micro-frontend Structure
- **Host Application** (`host/`) - Shell app managing routing and layout (port 3001)
- **Explore Microfrontend** (`explore/`) - Product browsing and navigation (port 3004)  
- **Decide Microfrontend** (`decide/`) - Product details and decision making (port 5175)
- **Checkout Microfrontend** (`checkout/`) - Shopping cart and purchase flow (port 3003)

### Module Federation Setup
- **Remote Loading**: Components are loaded via `@module-federation/enhanced` runtime
- **Shared Dependencies**: Vue, Vue Router, Canvas Confetti as singletons across all apps
- **Error Handling**: Fallback components when remote loading fails via `host/src/remotes.ts:31`
- **Cross-App Communication**: Custom events and local storage for cart state management

### Key Files
- `host/src/remotes.ts` - Module Federation runtime initialization and remote component loading
- `*/rsbuild.config.ts` - Build configurations with Module Federation plugins
- `start.sh` / `stop-all.sh` - Development environment management scripts

## Development Commands

### Quick Start
```bash
npm run install:all    # Install dependencies for all apps
npm run start          # Start all applications (or ./start.sh)
npm run stop           # Stop all applications (or ./stop-all.sh)
```

### Individual Applications
```bash
npm run start:host     # Host only (port 3001)
npm run start:explore  # Explore only (port 3004) 
npm run start:decide   # Decide only (port 5175)
npm run start:checkout # Checkout only (port 3003)
```

### Building
```bash
npm run build:all      # Build all applications
cd [app] && npm run build  # Build individual app
```

### Linting & Type Checking
Each application has its own linting and type checking:
```bash
cd host && npm run lint
cd explore && npm run lint && npm run type-check
cd decide && npm run lint && npm run type-check  
cd checkout && npm run lint && npm run type-check
```

## Development Notes

### Module Federation Workflow
1. Remote microfrontends must start first (decide, explore, checkout)
2. Host application starts last and consumes from remotes
3. Each app can run independently for focused development
4. Hot Module Replacement works across all applications

### Cart State Management
- Uses local storage for persistence across microfrontends
- Custom events bridge communication between apps
- No centralized state management (Pinia was replaced with custom solution)

### Error Handling
- Remote component loading failures show fallback UI
- Error boundaries implemented for distributed component failures
- Detailed logging in `host/src/remotes.ts` for debugging

### Build System
- **Rsbuild**: Primary build tool (modern replacement for webpack)
- **TypeScript**: Full type checking across all applications
- **ESLint**: Consistent code style with Vue-specific rules
- **Module Federation Plugin**: Handles remote component exposure and consumption

### Logs
Development logs are stored in `logs/` directory:
- `logs/host.log` - Host application output
- `logs/decide.log` - Decide microfrontend output
- `logs/explore.log` - Explore microfrontend output  
- `logs/checkout.log` - Checkout microfrontend output