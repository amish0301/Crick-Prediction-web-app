## Schema Design
![Schema-Design](./assets/Schema-Chart.png)

## Flow Diagram
![Flow-Diagram](./assets/Flow-Diagram.png)

🔗 FlowChart/designs: https://excalidraw.com/#json=c3Hy1G8Jz0fCT5JR1UbRR,0XXZ7YPnOIelbPgwp3Vj6Q

# Set Up Project Locally

- Clone the repository.
- Go to main directory.
- Run `npm install` to install all dependencies.
- To run the server, run `npm run dev`.

## For DATABASE Config:
- We've used `PostgreSQL` as our database.
- For ORM, we've used `Sequelize`.
- For migrations, we've used `sequelize-cli`.
- DB Drivers used: `pg` and `pg-hstore`.
- For DB Config, you can find config in `config/config.json` file.

### For Setting Up Database Config:
- dependencies: `npm install pg pg-hstore sequelize sequelize-cli`
- go to main directory like in our case it's server directory.
- run `npx sequelize init` to create `config`.
- Now, you can find `config/config.json` file.
- Update the config file with your database credentials.

### config.json sample file,
```
{
  "development": {
    "username": "your_postgres_user",
    "password": "your_password",
    "database": "your_database_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "your_postgres_user",
    "password": "your_password",
    "database": "your_database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "your_postgres_user",
    "password": "your_password",
    "database": "your_database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

## API Endpoints