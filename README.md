# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## React Compiler

# Customer Manager PWA

A React single-page application for displaying customer records from the Customer REST API. It is built with Vite and configured as a Progressive Web App (PWA) with automatic service-worker updates and runtime caching for the customer API.

## Requirements

- Node.js and npm
- The customer API available at `http://localhost:9090/api/v1/customer` for local use

The API must allow requests from the frontend origin and accept the `flow` request header.

## Getting Started

Install dependencies and start the Vite development server:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`. The customer API must be running separately. The current frontend sends a `GET` request to `http://localhost:9090/api/v1/customer` with these headers:

```http
Content-Type: application/json
flow: tu_valor_para_el_header
```

The response is expected to be a JSON array. Each customer record should include `id`, `name`, and `phone` fields. While data is loading, the page displays a loading message; if the request fails, it displays the error.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with hot module replacement. |
| `npm run build` | Create the production build in `dist/`. |
| `npm run preview` | Serve the production build locally for a preview. Run `npm run build` first. |
| `npm run lint` | Run ESLint on the project. |

## Project Structure

```text
src/
	components/
		CustomerList.jsx  Fetches and renders customer records
	App.jsx             Root page component
	index.css           Global styles
	main.jsx            React entry point
public/
	favicon.svg         Browser favicon
	icons.svg           Additional static SVG asset
index.html            HTML document and mount point
vite.config.js        Vite and PWA configuration
```

## PWA Behavior

The Vite PWA plugin is configured to register the service worker with automatic updates. Its Workbox runtime cache uses a network-first strategy for requests matching `http://localhost:9090/api/v1/customer`; successful responses can be retained for up to seven days, with a maximum of 50 entries. This supports fallback to a cached API response when the network is unavailable, but does not guarantee that a first visit or uncached customer list works offline.

The web app manifest is named **Gestor de Clientes PWA** and uses standalone display mode. Its icon entries point to `public/icons/icon-192x192.png` and `public/icons/icon-512x512.png`; those files need to be added for the configured manifest icons to be available.

## Configuration Notes

The API URL and `flow` header value are currently literals in `src/components/CustomerList.jsx`; there is no environment-based configuration yet. Before deploying to another environment, update the API URL and header value and make sure the API's CORS policy permits the deployed frontend origin and `flow` header. The Workbox cache URL pattern in `vite.config.js` must also be updated to match the deployed API URL if it changes.
