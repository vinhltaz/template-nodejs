# Node.js Template with ExpressJS

This project is a Node.js template using ExpressJS, following the **Vertical Slice Architecture**. The current setup includes a temporary in-memory database using **lru-cache** for caching, and uses **Yarn** for package management.

## Features

- **ExpressJS**: For handling routes and middleware.
- **Vertical Slice Architecture**: Each feature has its own structure (routes, logic, database access).
- **lru-cache**: In-memory caching solution, currently used as a temporary database.
- **Yarn**: Package manager for handling dependencies.
- **Structured Folder Setup**: Predefined structure to scale your application efficiently.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/vinhltaz/template-nodejs.git
    cd template-nodejs
    ```

2. Install dependencies using Yarn:
    ```bash
    yarn install
    ```

3. Run the application:
    ```bash
    yarn start
    ```

## Folder Structure

```bash
.
├── docker
│   ├── Dockerfile
│   └── Dockerfile.dev
├── src
│   ├── api
│   │   └── v1
│   │       └── users
│   │           ├── create-user
│   │           │   ├── handler.js
│   │           │   ├── request.js
│   │           │   └── response.js
│   │           ├── get-users
│   │           │   ├── handler.js
│   │           │   └── response.js
│   │           ├── user-model.js
│   │           ├── user-repository.js
│   │           └── user-route.js
│   ├── config
│   │   └── config.js
│   ├── lib
│   │   ├── cache
│   │   │   └── cache.js
│   │   └── logger
│   │       ├── format.js
│   │       ├── logger.js
│   │       └── message.js
│   ├── middlewares
│   │   ├── error.js
│   │   ├── not-found.js
│   │   └── request-logger.js
│   ├── shared
│   │   ├── adapters
│   │   │   └── database
│   │   │       ├── base-adapter.js
│   │   │       └── mongo-adapter.js
│   │   └── repositories
│   │       ├── base-repository.js
│   │       └── user-repository.js
│   ├── utils
│   │   ├── common.js
│   │   ├── error.js
│   │   └── object.js
│   └── app.js
├── README.md
├── docker-compose.dev.yml
├── docker-compose.yml
├── jsconfig.json
├── package.json
├── server.js
└── yarn.lock
```

## Vertical Slice Architecture
In this template, each feature is developed as a vertical slice, meaning all logic, routing, and other components related to a feature are placed in the same folder. This leads to better maintainability and modularity as your project grows.

## Temporary Database Setup
The project uses lru-cache as a placeholder for a proper database. This can be swapped out with a relational or NoSQL database (e.g., MongoDB, PostgreSQL) based on your project's needs.

## Contributions
Feel free to submit issues or pull requests for improvements.



