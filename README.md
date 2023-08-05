# NiXTT

An open source application built using the new router, server components in Next.js 13.

> **Warning**
> This app is a work in progress. I'm building this in public. [@agha](https://www.linkedin.com/in/mohammed-agha/).
> See the roadmap below.

## Features

- New `/app` dir,
- Routing, Layouts and Nested Layouts
- Data Fetching, Caching and Mutation
- Server and Client Components
- API Routes and Middlewares
- Authentication using **Clerk**
- ORM using **Prisma**
- Database on **PlanetScale**
- UI Components built using **Radix UI**
- Styled using **Tailwind CSS**
- Validations using **Zod**
- Written in **TypeScript**

## Roadmap

- [x] ~Create landing page and home page~
- [x] ~Connect to clerk~
- [x] ~Connect to planetScale~
- [x] Create, delete and update tasks
- [x] Responsive styles

## Running Locally

1. Install dependencies using yarn, npm or pnpm:

```sh
pnpm install
# or
yarn install
# or
npm install
```

2. Copy `.env.example` to `.env.local` and update the variables.

```sh
cp .env.example .env.local
```

3. Start the development server:

```sh
pnpm dev
# or
yarn dev
# or
npm run dev
```

## License

Licensed under the [Apache License 2.0]
