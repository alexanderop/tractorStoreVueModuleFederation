# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Module Federation project for a tractor store application using Vue 3 with two main applications:
- **Host Application** (`host/`) - Main shell app using Rsbuild + Vue (port 3001)
- **Decide Microfrontend** (`decide/`) - Product page microfrontend using Vite + Vue (port 3002/5175)

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
```

## Architecture

### Module Federation Setup
- **Host** (`host/`) exposes routing shell and consumes remote microfrontends
- **Decide** (`decide/`) exposes `./ProductPage` component via Module Federation
- **Future remotes**: `checkout/` (port 3003), `explore/` (port 3004) - configured but not implemented

### Key Configuration Files
- `host/rsbuild.config.ts` - Rsbuild configuration with Module Federation plugin
- `host/module-federation.config.ts` - Defines remotes and shared dependencies  
- `decide/vite.config.ts` - Vite configuration with Module Federation setup

### Port Configuration
- Host: 3001 (production URLs reference this port)
- Decide: 3002 (startup script uses this)
- Decide remote entry: 5175 (vite dev server default, referenced in host config)
- Checkout (future): 3003
- Explore (future): 3004

### Shared Dependencies
Both apps share Vue and vue-router as singletons to prevent version conflicts.

### Logs and Monitoring
Application logs are saved to `./logs/` directory when using startup scripts.

## Development Notes
- The project uses TypeScript throughout
- ESLint is configured for both applications with @antfu/eslint-config (host) and Vue-specific rules (decide)
- The decide app includes Vue DevTools plugin for development