# Multi-Tenant App Demo

An application supporting "multiple dbs, one app" style of multi-tenancy.

View the TypeScript version [here](https://github.com/vicradon/simple_multitenant_app/tree/typeorm_version). 

## Database Diagram

![DB Diagram](./docs/db_diagram.png)


## Running

1. Clone the repo
1. Create the .env file (cp .env .env.example)
1. Install dependencies
1. Create the databases (three dbs required)
1. Seed the DBs (pnpm db:seed)

## Request flow

1. User logs in with credentials
2. Credentials are identified via their email domain
3. tenant id is encoded in the JWT
4. Middleware is used to attach an existing db connection pool based on tenant id
5. Users only write to and read from their respective tenant dbs


## Directory structure

```sh
├── index.js
├── package.json
├── pnpm-lock.yaml
├── README.md
├── routing
│   └── routes.js
├── services
│   ├── Auth.js
│   ├── Database.js
│   └── MedicalRecord.js
└── utils
    └── env.js
```

