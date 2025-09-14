# Multi-Tenant App Demo

An application supporting "multiple dbs, one app" style of multi-tenancy.

## Database Diagram

![DB Diagram](./docs/db_diagram.png)

### Getting the DB up

Run the command below to run the three dbs
```sh
docker compose up
```

You can then use these env values based on the docker

```sh
DB_URL_IDENTITY=postgresql://hospital_identity_db:hospital_identity_db@localhost:5432/hospital_identity_db
DB_URL_HOSPITAL_A=postgresql://hospital_a:hospital_a@localhost:5433/hospital_a
DB_URL_HOSPITAL_B=postgresql://hospital_b:hospital_b@localhost:5434/hospital_b
```

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

