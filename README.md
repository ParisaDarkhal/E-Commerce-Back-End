# E-commerce Back End

This project is a back end for an e-commerce website. It provides the necessary API routes and database functionality to interact with a MySQL database. The project utilizes npm packages such as Express.js, Sequelize, and dotenv to create a secure and efficient back end for the e-commerce website.

## Features

- Connects to a MySQL database using Sequelize ORM.
- Secures sensitive information such as database name, MySQL username, and MySQL password using the dotenv package and an environment variable file (.env).
- Creates a development database and seeds it with test data using schema and seed commands.
- Starts the server and syncs the Sequelize models with the MySQL database.
- Provides API routes for CRUD operations on categories, products, and tags.
- Supports formatted JSON responses for GET requests on categories, products, and tags.
- Allows successful creation, update, and deletion of data in the database using POST, PUT, and DELETE requests.

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the required dependencies.
4. Create a `.env` file in the root directory and add the following environment variables:

```
DB_NAME=your_database_name
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
```

5. Replace `your_database_name`, `your_mysql_username`, and `your_mysql_password` with your actual MySQL database information.
6. Run the schema and seed commands to create and seed the development database:

```
npm run schema
npm run seed
```

## Usage

1. Start the server by running the following command:

```
node server.js
```

2. Once the server is running, you can use a tool like Insomnia Core to test the API routes.

3. Open Insomnia Core and perform GET requests on the following routes to retrieve data:

- `http://localhost:3001/api/categories` - Get all categories
- `http://localhost:3001/api/products` - Get all products
- `http://localhost:3001/api/tags` - Get all tags

4. Use POST, PUT, and DELETE requests in Insomnia Core to create, update, and delete data in the database. The routes for these operations are:

- POST: `http://localhost:3001/api/categories`, `http://localhost:3001/api/products`, `http://localhost:3001/api/tags`
- PUT: `http://localhost:3001/api/categories/:id`, `http://localhost:3001/api/products/:id`, `http://localhost:3001/api/tags/:id`
- DELETE: `http://localhost:3001/api/categories/:id`, `http://localhost:3001/api/products/:id`, `http://localhost:3001/api/tags/:id`

Replace `:id` with the actual ID of the category, product, or tag you want to update or delete.

## Mockup

![Demo-1](assets/images/demo-01.gif)

## Contributing

Contributions to the E-commerce Back End project are welcome! If you find any issues or would like to propose enhancements, feel free to submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
