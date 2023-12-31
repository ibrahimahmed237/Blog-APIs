# Blog APIs Application with REST APIs

This Node.js application provides REST APIs for managing blog-related functionalities and real-time updates using WebSockets and Socket.IO. It includes features such as user authentication, blog creation, editing, and deletion, image uploads, error handling, and utilizes Express.js as the web framework for enhanced flexibility in data retrieval. The real-time updates feature allows users to see new posts and updates to existing posts in real-time without needing to refresh the page. Below is a comprehensive guide on installation, usage, configuration, features, dependencies, and contributing.


## Installation

First, clone the repository to your local machine:

```bash
git clone git@github.com:ibrahimahmed237/Blog-APIs-REST.git
```

Navigate to the project directory and install the dependencies:

```bash
npm install
```

## Usage

To start the application, run:

```bash
npm start
```

Access the REST APIs at http://localhost:{PORT}/api to interact with the APIs.

## Configuration

The application requires several environment variables to be set for proper functioning. Create a .env file in the root directory and add the following variables:

- PORT: The port number the API will listen on. (e.g. PORT=8080)
- MONGO_URI: The connection URL for the MongoDB database. 
- JWT_SECRET: The secret key for JWT authentication. 
- CLOUDINARY_NAME: The name of your Cloudinary account. 
- CLOUDINARY_API_KEY: The API key for your Cloudinary account.
- CLOUDINARY_API_SECRET: The API secret for your Cloudinary account.
- NODE_ENV: The environment in which the application is running. (e.g. NODE_ENV=development)
- OTHER_ENV_VARIABLES: (Add any other environment variables required by your application)

# API Endpoints

## Authentication Routes

- `POST /auth/signup`: Sign up a new user
- `POST /auth/login`: Log in a user
- `POST /auth/logout`: Log out a user
- `GET /auth/status`: Get the status of a user
- `PUT /auth/status`: Update the status of a user

## Post Routes

- `GET /posts`: Get all posts. Supports pagination through query parameters `page` and `perPage`.
- `POST /posts`: Create a new post. Requires a valid image file and post data in the request body.
- `GET /posts/:postId`: Get a specific post by its ID.
- `PUT /posts/:postId`: Update a specific post by its ID. Requires a valid image file and post data in the request body.
- `DELETE /posts/:postId`: Delete a specific post by its ID.

All routes except `POST /auth/signup` and `POST /auth/login` require authentication.

## Features

- User Authentication:
    - Users can securely register with their email and password.
    - Robust authentication with password hashing ensures user security.
- Blog Management:
    - Users can create, edit, and delete blog posts.
    - Thorough validation ensures data integrity.
- Real-time Updates:
    - Utilizes WebSockets and Socket.IO to provide real-time updates to the feed.
    - Users can see new posts and updates to existing posts in real-time without needing to refresh the page.
- Image Handling:
    - Support for uploading images associated with blog posts.
    - Utilizes a suitable image processing library.
- Cloudinary Integration:
    - Utilizes Cloudinary for managing and storing images.
- REST APIs:
    - Utilizes REST APIs for flexible and efficient data retrieval.
    - Define routes and controllers for interacting with the application data.
- Error Handling and Notifications:
    - Custom error pages for common HTTP status codes.
    - Effective user notifications through appropriate error handling.
- Security Measures:
    - Implements necessary security measures to protect against common vulnerabilities.

## Technological Stack

- Developed using Express.js as the web framework.
- MongoDB for data storage.
- Utilizes REST APIs for enhanced API interactions.
- Real-time communication: Implemented using WebSockets and Socket.IO for real-time updates to the feed.
- Other dependencies...

## Dependencies

- Express.js: For handling server and routes.
- bcrypt: For hashing passwords and ensuring user security.
- mongoose: For modeling and managing application data.
- jsonwebtoken: For handling JWT-based user authentication.
- multer: For handling file uploads.
- cloudinary: For image management and storage.
- socket.io: For real-time communication using WebSockets.
- Other dependencies...

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.