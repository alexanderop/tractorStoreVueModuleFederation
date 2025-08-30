# Module Federation Development Guide

## Quick Start

Start all applications at once:
```bash
./start.sh
# or
npm run start
```

Stop all applications:
```bash
./stop-all.sh
# or  
npm run stop
```

## Individual Applications

Start only the host app:
```bash
npm run start:host
```

Start only the decide microfrontend:
```bash
npm run start:decide
```

## Installation

Install all dependencies:
```bash
npm run install:all
```

## Build

Build all applications:
```bash
npm run build:all
```

## Application URLs

- **Host Application**: http://localhost:3001
- **Decide Microfrontend**: http://localhost:5175

## Logs

Application logs are saved in the `./logs/` directory when using the startup script.

## Architecture

- `host/` - Main host application (rsbuild + Vue)
- `decide/` - Product page microfrontend (vite + Vue)
- Future remotes: `checkout/`, `explore/`