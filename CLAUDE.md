# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Module Federation project for a tractor store application using Vue 3 with three main applications:
- **Host Application** (`host/`) - Main shell app using Rsbuild + Vue (port 3001)
- **Decide Microfrontend** (`decide/`) - Product page microfrontend using Rsbuild + Vue (port 5175)
- **Explore Microfrontend** (`explore/`) - Category/product browsing microfrontend using Rsbuild + Vue (port 3004)

## Essential Commands

### Development
```bash
# Start all applications at once
./start.sh
npm run start

# Stop all applications  
./stop-all.sh
npm run stop

# Start individual apps
npm run start:host    # Host app only
npm run start:decide  # Decide microfrontend only
npm run start:explore # Explore microfrontend only

# Install all dependencies
npm run install:all
```

### Building and Testing
```bash
# Build all applications
npm run build:all

# Lint individual apps
cd host && npm run lint
cd decide && npm run lint && npm run type-check
cd explore && npm run lint && npm run type-check
```

## Architecture

### Module Federation Setup
- **Host** (`host/`) exposes routing shell and consumes remote microfrontends
- **Decide** (`decide/`) exposes `./ProductPage` component via Module Federation
- **Explore** (`explore/`) exposes `./HomePage`, `./CategoryPage`, `./StoresPage`, `./Recommendations`, `./Header`, `./Footer`, `./StorePicker` components
- **Future remotes**: `checkout/` (port 3003) - configured but not implemented

### Key Configuration Files
- `host/rsbuild.config.ts` - Rsbuild configuration with Module Federation plugin
- `host/module-federation.config.ts` - Defines remotes and shared dependencies  
- `decide/rsbuild.config.ts` - Rsbuild configuration with Module Federation setup for decide app
- `explore/rsbuild.config.ts` - Rsbuild configuration with Module Federation setup for explore app

### Port Configuration
- Host: 3001 (production URLs reference this port)
- Decide: 5175 (Rsbuild dev server default, referenced in host config)
- Explore: 3004 (Rsbuild dev server, referenced in host config)
- Checkout (future): 3003

### Shared Dependencies
All microfrontends share Vue and vue-router as singletons to prevent version conflicts.

### Logs and Monitoring
Application logs are saved to `./logs/` directory when using startup scripts.

## Development Notes
- The project uses TypeScript throughout
- ESLint is configured for all applications with @antfu/eslint-config (host) and Vue-specific rules (decide, explore)
- Both microfrontends include proper Vue 3 + TypeScript support
- Components are converted from React to Vue 3 using Composition API