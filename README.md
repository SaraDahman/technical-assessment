# Book Management App:

This application allows users to create an account, log in, and manage their personal book collection. Users can perform CRUD operations (Create, Read, Update, Delete) on their books. The app is built using Sequelize, Express.js, Vue.js, and various other technologies to ensure a smooth and efficient experience.

## Getting Started

### server

1- Navigate to the server folder.

2- Install server dependencies by running:

```bash
npm install
```

3-Create a .env file in the server folder with the following content:

```plaintext
DB_USERNAME = your db username
DB_PASSWORD = your db password
DB_NAME = your db name
DB_HOST = localhost
DB_DIALECT = postgres
DB_PORT = 5432

SECRET_KEY= your secret key


CLOUDINARY_CLOUD_NAME= your cloudinary cloud name
CLOUDINARY_API_KEY= your cloudinary API key
CLOUDINARY_API_SECRET= your cloudinary secret
```

4- Run database migrations to set up the initial database schema:

```bash
npm run migrate:up
```

5- Start the server:

```bash
npm run dev
```

<br />

### client

1- Navigate to the client folder.

2- Install client dependencies by running:

```bash
npm install
```

3- Start the client development server:

```bash
npm run serve
```

4- Open your browser and navigate to http://localhost:8080 to access the client interface.

5- Create an account or log in if you already have one.

<br/>

## Used Technologies:

- Sequelize: An ORM (Object-Relational Mapping) library for Node.js and SQL databases, used to manage the database models and relationships.
- Express.js: A web application framework for Node.js, utilized to build the backend API.
- Vue.js 2: A progressive JavaScript framework, used for building the interactive and dynamic user interface.
- Vuetify: A Material Design component framework for Vue.js, employed to create a visually appealing UI.
- Migration: Database migration tool to manage changes to the database schema over time.
- JWT (JSON Web Tokens): Used for user authentication and authorization.
