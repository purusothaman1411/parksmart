# ParkSmart

ParkSmart is a responsive React + Vite frontend for smart parking reservations and vehicle service management. It uses browser localStorage as a temporary database and includes customer and admin demo roles.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## Features

- Demo login with customer/admin role protection
- Vehicle CRUD, parking reservations, service history and simulated payments
- Admin management for slots, parking bookings and service status

## Run locally

```bash
npm install
npm run dev
```

## Demo login

- Customer: `customer@parksmart.com` / `1234`
- Admin: `admin@parksmart.com` / `1234`

All booking, payment and availability behavior is intentionally simulated in browser localStorage. A production version would add a backend, payment provider, notifications and live occupancy data.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
