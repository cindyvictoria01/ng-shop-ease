# Shop Ease

A modern e-commerce web application built with **Angular and TypeScript**.

## Features

* User authentication
* Protected routes
* Product listing and product details
* REST API integration
* Shopping cart
* Quantity management
* Cart persistence with localStorage
* Form validation
* Toast notifications
* Loading and error states
* Responsive UI
* 404 Not Found page

## Tech Stack

* Angular
* TypeScript
* RxJS
* Tailwind CSS
* Lucide Angular
* JSON Server
* DummyJSON API
* HTML / CSS

## Requirements

* Node.js v18.13.0 or higher
* npm

## Getting Started

### Installation

```bash
npm install
```

### Run the application

```bash
npm start
```

The application will be available at `http://localhost:4200`.

### Run the mock API

JSON Server is used as a local mock backend for authentication and development purposes.

```bash
npm run api
```

The mock API will run at `http://localhost:3000`.

## Authentication

Authentication is implemented using a local JSON Server API to simulate a backend environment.

Protected routes are handled using an Angular route guard.

> For production use, authentication should be handled by a secure backend or authentication provider.

## Product API

Product data is provided by the [DummyJSON](https://dummyjson.com/) REST API.

## Screenshots

### Login

<img width="1913" height="906" alt="image" src="https://github.com/user-attachments/assets/f42933e7-8e0b-42a3-9b15-ae63ffeec68c" />

### Home

<img width="1902" height="910" alt="image" src="https://github.com/user-attachments/assets/4f5eef13-014f-4687-ad1f-07663ec77b05" />

### Product Detail

<img width="1903" height="910" alt="image" src="https://github.com/user-attachments/assets/4faefe91-17ae-4c49-9542-87524950ca05" />

### Shopping Cart

<img width="1499" height="648" alt="image" src="https://github.com/user-attachments/assets/c8dfad15-de57-494b-947b-3b99a09102f6" />

## Notes

This project uses mock data and APIs for development and demonstration purposes.
