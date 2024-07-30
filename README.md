![blogify](https://github.com/user-attachments/assets/3d322228-9f1e-4500-b7ba-1c68dc147368)

# Blog Application

A simple blog application built using Express.js, EJS, and MongoDB. This application includes user authentication using JSON Web Tokens (JWT) and allows users to view blogs, post comments on existing blogs, and manage their accounts. It includes features such as blog management, profile management, comments and support for image uploads.

## Hosted Link

https://blogify-fzlr.onrender.com/

## Features

- **View Blogs**: Publicly accessible. Users can view a list of blogs and read individual blog posts.
- **Blog Management**: Protected endpoint. Users must be logged in to add a new blog and edit or delete an existing blog.
- **Comment on Blog**: Protected endpoint. Users must be logged in to comment on blogs.
- **User Authentication**: JWT-based authentication to secure protected endpoints.
- **User Management**: User can upload profile image or edit their full name to their respective accounts.
- **Responsive Design**: Optimized for both desktop and mobile views.

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Frontend**: EJS, CSS, Bootstrap

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org) (v18 or later)
- [MongoDB](https://www.mongodb.com) (installed and running)

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/blog-app.git
    cd blog-app
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory and add your MongoDB URI:

    ```env
    MONGODB_URI=mongodb://localhost:27017/blogapp
    PORT=3000
    SECRET_KEY=secret
    ```

4. **Start the application**:

    ```bash
    npm start
    ```

    The application will be running on `http://localhost:3000`.

## Frontend

The front-end is designed with Bootstrap for responsive and mobile-friendly layouts. The application features a clean and intuitive design with dark mode support.

## Authentication

JWT (JSON Web Tokens) is used for user authentication. Upon login, users receive a JWT that must be included in the headers of requests to access protected endpoints.

## Code Structure

- **`app.js`**: Main application file where the Express server is configured.
- **`controllers/`**: Contains the logic for handling requests and interacting with the database.
- **`models/`**: Mongoose models for database schemas.
- **`routes/`**: Defines routes for various endpoints.
- **`views/`**: EJS templates for rendering HTML.
- **`public/`**: Static files such as images, CSS, and JavaScript.

## Contributing

If you want to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit your changes.
4. Push your branch to your forked repository.
5. Open a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Bootstrap](https://getbootstrap.com) for responsive design.
- [EJS](https://www.npmjs.com/package/ejs) for templating.
- [Mongoose](https://mongoosejs.com) for MongoDB object modeling.

## Contact

For any questions or feedback, please contact [shashanksinha45@gmail.com](mailto:shashanksinha45@gmail.com).
