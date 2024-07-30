# Blog Application

A simple blog application built using Express.js, EJS, and MongoDB. This application allows users to view blogs, post comments, and manage their accounts. It includes features such as blog management, profile management, and comments with support for image uploads.

## Features

- **Blog Management**: Create, view, and update blogs.
- **User Authentication**: Sign up, sign in, and manage user profiles.
- **Comments**: Add and view comments on blogs.
- **Responsive Design**: Optimized for both desktop and mobile views.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side code.
- **Express.js**: Web framework for Node.js.
- **EJS**: Templating engine for rendering HTML.
- **MongoDB**: NoSQL database for data storage.
- **Bootstrap**: CSS framework for responsive design.

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

## Usage

- **Home Page**: View the list of blogs. This is a public endpoint and accessible to everyone.
- **Blog Page**: View details of a specific blog, including comments. This is also a public endpoint.
- **My Account Page**: Manage your account information and profile image. Access to add a blog or comment on a blog requires user authentication. These endpoints are protected and require you to log in before accessing them.

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
