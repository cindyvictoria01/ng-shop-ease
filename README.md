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

### Home

<img width="1386" height="907" alt="Home" src="https://github.com/user-attachments/assets/fb17b400-9985-41ef-b703-7315a1255c74" />

### Product Detail

<img width="1372" height="905" alt="Product Detail" src="https://github.com/user-attachments/assets/4b1283fd-6058-4c90-bcde-f41673af4654" />

### Shopping Cart

<img width="1373" height="909" alt="Shopping Cart" src="https://github.com/user-attachments/assets/0f96624a-c346-4790-a48f-50864afb0c83" />

## Notes

This project uses mock data and APIs for development and demonstration purposes.
