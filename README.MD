# Book Library Microserrvice

Backend REST API on Node.js + Express.js + Typescript + MongoDB(Mongoose).

## Quick Start to run locally

## Clone Repo 

## Run npm install

## Setup Mongodb(Atlas or compass). Get connection string/url

## Create .env file

    Create .env file in project folder
    Enter these lines:

        DB_STRING = "
        DB_STRING_PROD = mongodb db live for production
        NODE_ENV = 'development'

## Start App
    npm start for production
    npm run dev - development
    npm run test - test

## Documentation
https://documenter.getpostman.com/view/13581274/UzJFvybR

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--test\           # Test
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--helpers\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
```

## Validation

Request data is validated using [Joi](https://joi.dev/).
The validation schemas are defined in the `/validations` directory and are used in the routes by providing them as parameters to the `validate` middleware.

### Test
Test is powered by Jest testing library

### Docker
Docker compose up