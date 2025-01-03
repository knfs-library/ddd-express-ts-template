# KNFS - DDD express template

A template / frame build project by express and follow to Domain-Driver Design Architecture of Knfs jsc
## Build project and run
### Build Project
- Install Docker
- Install nodejs version > 18

- Copy .env.example to .env
```bash
cp .env.example .env

```
- Config in .env

- Build Docker

```bash
docker compose up -d
```

- Run entrypoint.sh 

```bash
#Linux/Mac
sh entrypoint.sh
```

### Start app
```bash
# Run on Dev Env
yarn start

```
- In browser, access `http://localhost:${APP_PORT}/`

### Run test
```base
yarn test
```
****

## Architecture

```plaintext
├── src
├── ├── contexts
│   ├── ├── register    # Name or context
│   ├── ├── ├── application    # Application Layer: Contains use cases, controller, etc.
│   ├── ├── ├── ├── dto   
│   ├── ├── ├── ├── listeners # Usually functions, registered at events in the domain, will be called when the event occurs  
│   ├── ├── ├── ├── use-cases # Are use cases of the application that will normally reflect the end user's actions on the application such as registering an account
│   ├── ├── ├── domain         # Domain Layer: Contains domain models, repositories, etc.
│   ├── ├── ├── ├── entity     # Are entities or rich models, which are the main mapping entities with business entities (separate from data stored in the database). 
│   ├── ├── ├── ├── events     # Are domain events that occur in business, or are directly related to entities
│   ├── ├── ├── ├── repositories  # Are interface or repositories in infrastructure
│   ├── ├── ├── ├── value-object  # Are objects without an id, often distinguished from other groups of objects through internal values
│   ├── ├── ├── ├── services  # Are Domain Services
│   ├── ├── ├── ├── aggregate.ts  # Are aggregate groups that group entities and value objects together
│   ├── ├── ├── ├── factory.ts  # Where entities, value objects, aggregates are initialized
│   ├── ├── ├── infrastructure # Infrastructure Layer: Contains detailed 
implementations, adapters, etc.
│   ├── ├── ├── ├── http # handle request, response from # http / grpc / cli
│   ├── ├── ├── ├── ├── routes # ExpressJs route, use it as route of module 
│   ├── ├── ├── ├── persistence 
│   ├── ├── ├── ├── ├── repositories
├── ├── ├── ├── interfaces # json / soat / GUI (ejs),
│   ├── ├── ├── ├── controllers # handle request, response from 
│   └── shared         # Shared Layer: Contains shared components, config, helpers, etc.
│       ├── config
│       ├── domain     #
│       ├── ├── aggregate.abs.ts     # Abstract of aggregate
│       ├── ├── entity.abs.ts     # Abstract of entity
│       ├── ├── event.abs.ts     # Abstract of event
│       ├── ├── factory.itf.ts # Interface of Factory    
│       ├── infrastructure # Infrastructure Layer: Contains detailed implementations, 
adapters, etc.
│       ├── ├── http
│       ├── ├── ├── routes # ExpressJs route, use for app
│       └── ├── ├── middleware
│       ├── ├── persistence 
│       ├── ├── ├── migrations 
│       ├── ├── ├── ORMs 
│       ├── ├── ├── seeders 
│       ├── interface # Response (Web UI, JSON API, SOAT API)
│       ├── kernel 
│       ├── utils 
├── tests              # Directory containing test files
├── .env               # Environment configuration file
├── .env.test          # Environment configuration file for test
├── jest.config.js     # Jest configuration
├── package.json       # Project information and dependencies
└── tsconfig.json      # TypeScript configuration
```

