# cv-builder-app

## Documentation
 This is a simple CV builder app that allows users to create and download their CVs in PDF format. The app is built using React, Node.js, and Express.

 ## How to Run the App

1. install all dependencies
```bash
npm install
```
2. start the server
```bash
npm run start
```
3. open the app in your browser
```bash
http://localhost:3000
```

## Dependencies

all of the dependencies are listed in the package.json file. The main dependencies are:
- Express: A web framework for Node.js
- jsonwebtoken: A library to work with JSON Web Tokens
- bycrypt: this library will hash users passwords
- dotenv: A library to load environment variables from a .env file
- uuid: A library to generate unique IDs
- slqite3: A library to work with SQLite databases
- ejs: for view engine
- cookie-parser: A middleware to parse cookies
- express-validator:  validating request from server
- express-ejs-layouts: A library to use EJS layouts(there is one layout file and all other views render inside it)
## devDependencies
- nodemon: This is development dependency that will automatically restart the server when changes are made to the code

## Links
- GitHub:https://github.com/mohiramansurovna/cv-builder-app
- Deployed:https://befitting-merciful-occupation.glitch.me/auth/home

## Project Structure

root:
- public: contains all the static files
- controllers: contains all the controllers (business logic with database)
- models: contains all the database models
- routes: contains all the routes
  - api: contains all the api routes
    - auth: contains all the authentication routes
    - user: contains all the user routes like dashboard routes
  - web: contains all the routes that renders ejs
- views: contains all the views (EJS files)
    - auth: contains all the authentication views
    - user: contains all the user views
    - templates: contains the cv templates
- authMiddleware: middleware to check if the user is authenticated
- validators: middleware to validate the request in server with express-validator
- database.db: SQLite database file
- app.js: main file that starts the server
- package.json: contains all the dependencies and scripts
- .env: contains all the environment variables
- .gitignore: contains all the files and folders that should be ignored by git