Task Management System API (NestJS + Prisma + JWT Auth)

A production-ready, scalable, and enterprise-grade backend application built using NestJS.
This project includes end-to-end authentication, authorization, user management, role-based access, and a complete task management workflow.


---

Features

Authentication & Authorization

Register, Login, Logout

Access and Refresh Tokens

Secure token rotation

Role-based access (Admin, User)

Protected routes using Guards

Password hashing using bcrypt


Task Management

Admin can create, update, and delete tasks

Admin can assign tasks to users

Users can update their own task status

Separate views for "My Tasks" and "All Tasks"

Strict DTO validation and enums


User Management

Fetch all users (Admin only)

Update user roles

User profile endpoint /users/me

Account deletion


Engineering Practices

Modular architecture

Global exception filters

Custom error responses

Request throttling (Rate limiting)

Strong TypeScript typing

Swagger/OpenAPI documentation

Production-ready folder structure



---

Tech Stack

Layer	Technology

Framework	NestJS
ORM	Prisma
Database	PostgreSQL
Auth	JWT (Access + Refresh Tokens)
Docs	Swagger/OpenAPI
Validation	class-validator



---

Project Structure

src/
 ├── auth/
 ├── users/
 ├── tasks/
 ├── common/
 ├── prisma/
 ├── main.ts
 └── app.module.ts

prisma/
 ├── schema.prisma
 └── migrations/


---

Getting Started

1. Clone the Repository

git clone https://github.com/Arsalanamin404/TaskManagementSystem_API
cd TaskManagementSystem_API

2. Install Dependencies

npm install

3. Setup Environment Variables

Create an .env file:

DATABASE_URL="postgresql://<user>:<password>@localhost:5432/tasks"
JWT_SECRET_ACCESS="your_access_secret"
JWT_SECRET_REFRESH="your_refresh_secret"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

4. Run Prisma Migrations

npx prisma migrate dev

5. Start the Development Server

npm run start:dev

Server runs at:
http://localhost:3000


---

API Documentation

Swagger Documentation URL:
http://localhost:3000/api


---

API Modules Overview

Auth Module

Endpoint	Method	Description

/auth/register	POST	Create new user
/auth/login	POST	Login user
/auth/logout	POST	Logout
/auth/refresh	POST	Refresh token


User Module

Endpoint	Method	Description

/users	GET	Get all users (Admin)
/users/me	GET	Get logged-in user info
/users/:id/role	PATCH	Update user role


Task Module

Endpoint	Method	Description

/tasks	POST	Create task (Admin)
/tasks	GET	Get all tasks (Admin)
/tasks/my	GET	Get logged-in user's tasks
/tasks/:id	PATCH	Update task
/tasks/:id	DELETE	Delete task (Admin)



---

Running Tests

npm run test
npm run test:e2e
npm run test:cov


---

Production Build

npm run build
npm run start:prod


---

Contributing

Contributions and feature requests are welcome.
Feel free to open an issue or submit a pull request.


---

License

This project is licensed under the MIT License.

