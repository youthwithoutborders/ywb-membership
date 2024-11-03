# ywb-membership

## Getting Started

Copy `.env.example` to `.env` and install the dependencies:

```bash
pnpm install # install dependencies
./start-database.sh # start the database
pnpm db:push # push the database schema
```

Then start development:

```bash
./start-database.sh # start the database
pnpm dev # start the development server
```

## Deploy

Follow the deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
