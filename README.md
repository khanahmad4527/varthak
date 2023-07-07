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
  - `password` (string, required): User's hashed password.
  - `roles` (array of strings, required): User's roles. Possible values: "CREATOR", "VIEWER", "VIEW_ALL".



 **Example:**

<div class="copyable">
  <pre>
    <code>
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "johndoe@example.com",
  "password": "password123",
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
  - `password` (string, required): User's hashed password.


 **Example:**

<div class="copyable">
  <pre>
    <code>
{
"email": "johndoe@example.com",
"password": "password123"
}
    </code>
  </pre>
</div>

Response:
Status: 200 OK
Content-Type: application/json
{
"message": "Login successful",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

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

 **Example:**

<div class="copyable">
  <pre>
    <code>
{
"title": "The Great Gatsby",
"author": "F. Scott Fitzgerald",
"publicationYear": 1925,
"description": "A novel about the American Dream",
"genres": ["Fiction", "Classic"],
"price": 19.99,
"quantity": 10,
"createdBy": "64a6c4f7f16891f7e4a4faed"
}
    </code>
  </pre>
</div>

Response:
Status: 200 OK
Content-Type: application/json
{
"message": "Book created successfully"
}

#### View Books

- Method: `GET`
- Endpoint: `/books`
- Description: Retrieve a list of books.
- Middleware: `viewValidator` (validate request data)

 **Example:**

<div class="copyable">
  <pre>
    <code>
GET /books
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    </code>
  </pre>
</div>

Response:
Status: 200 OK
Content-Type: application/json

{
"books": [
{
"title": "The Great Gatsby",
"author": "F. Scott Fitzgerald",
"publicationYear": 1925,
"description": "A novel about the American Dream",
"genres": ["Fiction", "Classic"],
"price": 19.99,
"quantity": 10,
"createdBy": "64a6c4f7f16891f7e4a4faed"
},
{
"title": "To Kill a Mockingbird",
"author": "Harper Lee",
"publicationYear": 1960,
"description": "A story of racial injustice in the Deep South",
"genres": ["Fiction", "Classic"],
"price": 15.99,
"quantity": 8,
"createdBy": "64a6c4f7f16891f7e4a4faed"
},
...
]
}

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

