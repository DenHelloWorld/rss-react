# RSS React — Art Institute of Chicago

A web application for browsing the [Art Institute of Chicago](https://www.artic.edu/) collection. Search, pagination, detailed artwork view, CSV export, and theme switching.

## Tech Stack

- **React 19** + TypeScript 6
- **React Router v7** — nested routes, URL as source of truth for search
- **Redux Toolkit + RTK Query** — state management and API caching
- **Tailwind CSS 4** — styling
- **Vite 8** — build tool
- **Vitest + Testing Library + MSW** — testing

## Project Structure

```
src/
├── components/      # UI components (cards, search, pagination, spinner...)
├── consts/          # Constants (routes, cache tags, URLs, HTTP statuses, theme)
├── context/         # React Context (theme)
├── hooks/           # Custom hooks (cache invalidation, error handling, localStorage...)
├── layouts/         # Layouts (list + flyout + details outlet)
├── pages/           # Pages (About, Details, NotFound)
├── providers/       # Providers (ThemeProvider)
├── router/          # Router config + loader
├── services/        # Services (CSV, localStorage)
├── store/           # Redux store + RTK Query API + slice
└── test-utils/      # Test utilities (MSW server, mocks, mock-data)
```

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command                 | Description                         |
| ----------------------- | ----------------------------------- |
| `npm run dev`           | Start dev server                    |
| `npm run build`         | TypeScript check + production build |
| `npm run test`          | Run tests                           |
| `npm run test:coverage` | Run tests with coverage report      |
| `npm run lint`          | ESLint check                        |
| `npm run format:fix`    | Prettier formatting                 |

## Environment Variables

Create a `.env` file based on `.env.example`:

```
CACHE_TTL=300   # RTK Query cache time-to-live in seconds
```

## API

This app uses the [Art Institute of Chicago API](https://api.artic.edu/docs/). All requests go through RTK Query:

- **`searchArts`** — search/list with pagination (`/artworks/search` or `/artworks`)
- **`getArtById`** — artwork details (`/artworks/:id`)

Cache is managed via tags: `Arts/LIST` for the list and `Arts/:id` for details. The Refresh button invalidates the corresponding tag and triggers a refetch.
