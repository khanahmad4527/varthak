# Project Name

This is a brief description of your project.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [User](#user)
    - [Register](#register)
    - [Login](#login)
  - [Book](#book)
    - [Create Book](#create-book)
    - [View Books](#view-books)
- [Models](#models)
  - [UserModel](#usermodel)
  - [BookModel](#bookmodel)

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure the necessary environment variables.
4. Start the application using `npm start`.

## Usage

Provide instructions on how to use the application or any additional information that might be relevant.

## API Endpoints

### User

#### Register

- Method: `POST`
- Endpoint: `/user/auth/register`
- Description: Register a new user.
- Request body:
  - `firstname` (string, required): User's first name.
  - `lastname` (string, required): User's last name.
  - `email` (string, required): User's email address.
  - `hashedPassword` (string, required): User's hashed password.
  - `roles` (array of strings, required): User's roles. Possible values: "CREATOR", "VIEWER", "VIEW_ALL".



 **Example:**
 POST /user/auth/register
Content-Type: application/json

<div class="copyable">
  <pre>
    <code>
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "johndoe@example.com",
  "hashedPassword": "password123",
  "roles": ["CREATOR"]
}
    </code>
  </pre>
</div>


Response:
Status: 200 OK
Content-Type: application/json
{
"message": "User registered successfully"
}

#### Login

- Method: `POST`
- Endpoint: `/user/auth/login`
- Description: Authenticate and login a user.
- Request body:
  - `email` (string, required): User's email address.
  - `hashedPassword` (string, required): User's hashed password.

### Book

#### Create Book

- Method: `POST`
- Endpoint: `/books`
- Description: Add a new book.
- Middleware: `createValidator` (validate request data)
- Request body:
  - `title` (string, required): Book title.
  - `author` (string, required): Book author.
  - `publicationYear` (number, required): Publication year of the book.
  - `description` (string, required): Book description.
  - `genres` (array of strings, required): Genres of the book.
  - `price` (number, required): Book price.
  - `quantity` (number, required): Book quantity (default: 0).
  - `createdBy` (string, required): User who created the book.

#### View Books

- Method: `GET`
- Endpoint: `/books`
- Description: Retrieve a list of books.
- Middleware: `viewValidator` (validate request data)

## Models

### UserModel

Mongoose model representing a user.

- `firstname` (string, required): User's first name.
- `lastname` (string, required): User's last name.
- `email` (string, required): User's email address.
- `hashedPassword` (string, required): User's hashed password.
- `roles` (array of strings, required): User's roles. Possible values: "CREATOR", "VIEWER", "VIEW_ALL".

### BookModel

Mongoose model representing a book.

- `title` (string, required): Book title.
- `author` (string, required): Book author.
- `publicationYear` (number, required): Publication year of the book.
- `description` (string, required): Book description.
- `genres` (array of strings, required): Genres of the book.
- `price` (number, required): Book price.
- `quantity` (number, required): Book quantity (default: 0).
- `createdBy` (string, required): User who created the book.

