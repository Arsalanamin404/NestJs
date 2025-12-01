# Task Management System API

### **NestJS + Prisma + PostgreSQL + JWT Authentication**

A production-ready, scalable, and enterprise-grade backend application
built using **NestJS** and **Prisma ORM**.\
This system includes robust authentication, role-based authorization,
modular architecture, and a complete task workflow suitable for
real-world organizations.

------------------------------------------------------------------------

## Features

### Authentication & Authorization

-   User Registration, Login & Logout\
-   Access & Refresh Tokens\
-   Secure Token Rotation\
-   Role-Based Access (Admin, User)\
-   Protected Routes using Guards\
-   Password hashing with **bcrypt**

### Task Management

-   **Admin:** Create, update, assign, and delete tasks\
-   **Users:** Update own task status\
-   "My Tasks" & "All Tasks" endpoints\
-   Strict DTO validation\
-   Enum-based task statuses & roles

### User Management

-   Fetch all users (**Admin only**)\
-   Update user roles\
-   `/users/me` profile endpoint\
-   Account deletion

### Engineering & Production Practices

-   Modular architecture\
-   Global exception filters\
-   Custom error responses\
-   Request throttling (rate limiting)\
-   Swagger/OpenAPI documentation\
-   Strong TypeScript typings\
-   Production-ready folder structure

------------------------------------------------------------------------

## ðŸ§° Tech Stack

  Layer            Technology
  ---------------- -----------------------------------
  Framework        **NestJS**
  ORM              **Prisma**
  Database         **PostgreSQL**
  Authentication   **JWT (Access + Refresh Tokens)**
  Validation       `class-validator`
  Documentation    **Swagger/OpenAPI**

------------------------------------------------------------------------

## Project Structure

    src/
      auth/
      users/
      tasks/
      prisma/
      main.ts
      app.module.ts

    prisma/
      schema.prisma
      migrations/

------------------------------------------------------------------------

## Getting Started

### Clone the Repository

``` bash
git clone https://github.com/Arsalanamin404/TaskManagementSystem_API
cd TaskManagementSystem_API
```

### Install Dependencies

``` bash
npm install
```

### Configure Environment Variables

Create a `.env` file at the project root:

``` env
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/tasks"
JWT_SECRET_ACCESS="your_access_secret"
JWT_SECRET_REFRESH="your_refresh_secret"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
```

### Run Database Migrations

``` bash
npx prisma migrate dev
```

### Start Development Server

``` bash
npm run start:dev
```

Your server will be live at:\
`**http://localhost:3000/api/v1**`

------------------------------------------------------------------------

## API Documentation

Swagger UI:\
`**http://localhost:3000/api/v1/docs**`

------------------------------------------------------------------------

## API Modules Overview

### **Auth Module**

  Endpoint         Method   Description
  ---------------- -------- ---------------------
  /auth/register   POST     Register a new user
  /auth/login      POST     User login
  /auth/logout     POST     Logout
  /auth/refresh    POST     Refresh token

### **User Module**

  Endpoint          Method   Description
  ----------------- -------- ----------------------------
  /users            GET      Get all users (Admin only)
  /users/me         GET      Get logged-in user profile
  /users/:id/role   PATCH    Update user role

### **Task Module**

  Endpoint     Method   Description
  ------------ -------- ----------------------------
  /tasks       POST     Create task (Admin)
  /tasks       GET      List all tasks (Admin)
  /tasks/my    GET      Get logged-in user's tasks
  /tasks/:id   PATCH    Update task
  /tasks/:id   DELETE   Delete task (Admin)

------------------------------------------------------------------------



## Contributing

Contributions, issues, and feature requests are welcome!\
Feel free to open an issue or submit a pull request.

------------------------------------------------------------------------

# MOHAMMAD ARSALAN RATHER 
