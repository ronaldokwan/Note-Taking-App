# Note-Taking-App Documentation

- Server = Express, Sequelize, PostgreSQL, Jest
- Client = React, Redux, Bootstrap
- 3rd party API = RapidAPI, Midtrans, Google OAuth

## Features

- User authentication with Google OAuth or manual registration
- Create, update, delete, archive, and retrieve notes
- Search notes by title
- Filter notes by tags
- Pagination
- Generate a random anime GIF
- Generate a random number trivia fact
- Donation using Midtrans

## Prerequisites

- Node.js
- PostgreSQL
- Midtrans Server Key
- Google OAuth Client ID
- RapidAPI Anime Key
- RapidAPI Trivia Key

## Installation

1. Clone the repository:

```
$ git clone <repository-url>
```

2. Navigate to the project directory:

```
$ cd Note-Taking-App
```

## Server

### Installation

1. Navigate to the server directory:

```
$ cd server
```

2. Install the dependencies:

```
$ npm install
```

3. Create a `.env` file in the server directory with the following content:

```dosini
# Express Server
PORT=your_port # default: 3000
JWT_SECRET=your_jwt_secret

# Midtrans Server Key
SERVER_KEY=your_midtrans_server_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id

# RapidAPI Anime
ANIME_API_KEY=your_anime_api_key
ANIME_API_HOST=your_anime_api_host

# RapidAPI Trivia
TRIVIA_API_KEY=your_trivia_api_key
TRIVIA_API_HOST=your_trivia_api_host

# Sequelize Database Development
DEV_DB_USERNAME=your_dev_db_username
DEV_DB_PASSWORD=your_dev_db_password
DEV_DB_NAME=your_dev_db_name
DEV_DB_HOST=your_dev_db_host

# Sequelize Database Test
TEST_DB_USERNAME=your_test_db_username
TEST_DB_PASSWORD=your_test_db_password
TEST_DB_NAME=your_test_db_name
TEST_DB_HOST=your_test_db_host

# Sequelize Database Production (optional for supabase.com)
DATABASE_URL=your_database_url
```

4. Create a PostgreSQL database for development

```
$ npx sequelize-cli db:create
```

5. Run the migrations

```
$ npx sequelize-cli db:migrate
```

6. Seed the database

```
$ npx sequelize-cli db:seed:all
```

7. Start the server:

```
$ npm start
```

8. The server will be running on

```
http://localhost:3000
```

### Testing

The server has unit tests written with Jest. To run the tests, use the following command:

```
$ npm test
```

## Client

### Installation

1. Navigate to the client directory:

```
$ cd client
```

2. Install the dependencies:

```
$ npm install
```

3. Create a `.env` file in the client directory with the following content:

```dosini
# React Client
VITE_BASE_URL=your_server_base_url # default: http://localhost:3000
```

4. Start the client:

```
$ npm run dev
```

5. The client will be running on

```
http://localhost:5173
```

## Viewing the Application

After starting both the server and the client, you can use the application by navigating to `http://localhost:5173` in your web browser.

## Account Testing

- Email: user1@example.com
- Password: 123456

---

- Email: user2@example.com
- Password: qwerty

```bash
npm run dev
```
