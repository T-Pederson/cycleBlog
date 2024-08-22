# Cycle Blog

## _Come With Me On My Cycling Journey_

Cycle Blog is a full-stack web app to discuss all things cycling!

React powered front end, Express and PostgreSQL powered back end.

Built by [Tyson Pederson](https://tysonpederson.netlify.app/).

[Live Repo Here](https://cycleblog-user.netlify.app/)

## Features

- Any site visitor can view published posts and their associated comments.
- Registered users can create, edit and delete their own comments.
- Authors can create new blog posts, edit existing blog posts, and publish/unpublish posts to the public.
- Authors can also delete comments from any user on their own posts.
- Registering a user account is free!
- Registering an author account is unrestricted for demonstration purposes.

## Tech

Cycle Blog uses a number of open source projects to work properly:

### Front End

- [React] - Front end framework for web apps
- [Vite] - Build tool for faster app development
- [TailWind] - CSS framework for web apps

### Back End

- [Node.js] - evented I/O for the backend
- [Express] - fast Node.js network app framework
- [PostgreSQL] - Relation database service
- [Prisma_ORM] - Object-Relation Mapper for the database
- [Passport-jwt] - Authentication middleware using JSON Web Tokens
- [Bcryptjs] - Password encryption middleware

And of course Cycle Blog itself is open source with a [public repository][public_repo] on GitHub.

## Installation

### Back End

CycleBlog requires [Node.js] and [PostgreSQL] to run.

[Connect](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgresql) and [migrate](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-postgresql) to the database with PostgreSQL if unfamiliar.

Make sure the .env file is created in the root of the backend folder.

Add your secret for [Passport-jwt](https://www.passportjs.org/packages/passport-jwt/#:~:text=opts.secretOrKey%20%3D%20%27secret%27%3B) to the .env file.

```sh
SECRET="<YourSecret>"
```

Install the dependencies and start the server.

```sh
cd backend
npm i
node app.js
```

### Front End

The front end is separated into two web apps, a user app and an author app.
The setup is the same for both apps.

Create a .env file in the root of each front end folder that contains URLs to the backend API and to the opposite front end app.
The default links are shown below.

Author Front End .env file

```sh
VITE_API_URL="http://localhost:3000"
VITE_USER_FRONT_END_URL="http://localhost:5174"
```

User Front End .env file

```sh
VITE_API_URL="http://localhost:3000"
VITE_AUTHOR_FRONT_END_URL="http://localhost:5173"
```

Install the dependencies and start the server for the particular web app. You will need to start each one separately.
Example for user front end, "cd authorFrontEnd" to start the author front end instead.

```sh
cd userFrontEnd
npm i
npm run dev
```

## Check Out My Other Work

Use the links below to find more info about the author of this app, Tyson Pederson!

- [Portfolio]
- [LinkedIn]
- [GitHub]

## License

**Free Software, Hell Yeah!**

[Node.js]: http://nodejs.org
[Express]: http://expressjs.com
[React]: https://react.dev/
[TailWind]: https://tailwindcss.com/
[PostgreSQL]: https://www.postgresql.org/
[Prisma_ORM]: https://www.prisma.io/orm
[Vite]: https://vitejs.dev/guide/
[Passport-jwt]: https://www.passportjs.org/packages/passport-jwt/
[Bcryptjs]: https://www.npmjs.com/package/bcryptjs
[public_repo]: https://github.com/T-Pederson/cycleBlog
[Portfolio]: https://tysonpederson.netlify.app/
[LinkedIn]: https://www.linkedin.com/in/tys1/
[GitHub]: https://github.com/T-Pederson
