
# 🛍️ Fashion Aura

Welcome to **Fashion Aura**, a modern, feature-rich e-commerce storefront designed to provide a seamless and intelligent shopping experience. This project showcases a blend of cutting-edge web technologies, including a robust frontend with Next.js, powerful backend services with Firebase, and generative AI features powered by Genkit.

---

## ✨ Key Features

- **Dynamic E-commerce Storefront**: Browse extensive product collections for Men and Women, including categories for casual wear, formal wear, street style, and more.
- **Advanced Product Filtering & Sorting**: Easily find products with filters for price, color, size, and other attributes.
- **AI-Powered Shopping Advisor**: Receive personalized shopping advice based on your cart items and budget.
- **AI Customer Support Chat**: Get instant answers to your questions about products, shipping, and returns through an integrated AI chat assistant.
- **Interactive Shopping Cart & Wishlist**: Manage your selections with a persistent cart and wishlist.
- **Coupon & Discount System**: Apply coupon codes to get discounts on your purchases.
- **Complete Checkout Flow**: A multi-step, secure checkout process from address entry to payment simulation.
- **Backend API & Testing**: Includes a REST API for products and a Jest test suite to ensure reliability.
- **Firebase Integration**: Utilizes Firestore for data storage (like newsletter subscriptions) and Firebase Authentication.
  ##**Note**: API Key for the several functions are disabled for safety purpose, you can use your own API key for testing.

---

## 🛠️ Built With

This project is built with a modern, full-stack JavaScript technology set:

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/ui](https://ui.shadcn.com/)
- **State Management**: React Context API
- **Generative AI**: [Genkit (Google AI)](https://firebase.google.com/docs/genkit)
- **Backend Services**: [Firebase](https://firebase.google.com/) (Firestore, Authentication)
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### 1. Prerequisites

Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/get-npm) (usually comes with Node.js)

### 2. Environment Variables

Before running the project, you need to set up your environment variables. Create a file named `.env` in the root directory of the project and add the following line.

```.env
# This is a placeholder for any future environment variables.
# You may need to add Firebase or Genkit API keys here for full functionality.

```
*Note: For the current build, the AI features with Genkit are mocked or configured to work in a developer environment, but a `GEMINI_API_KEY` would be required for production use.*

### 3. Installation

Clone the repository and install the project dependencies using npm.

```bash
# 1. Install all the required packages
npm install
```

### 4. Running the Application

Once the installation is complete, you can run the development server.

```bash
# 2. Run the development server
npm run dev
```

This will start the Next.js development server, typically on port 9002. Open your web browser and navigate to:
[http://localhost:9002](http://localhost:9002)

You should now see the Fashion Aura homepage live! The application will automatically reload if you make any changes to the source files.

### 5. Running Tests

This project includes a test suite to ensure the backend API endpoints are working correctly. To run the tests, execute the following command in your terminal:

```bash
# Run the Jest test suite
npm test
```

Jest will find all test files (ending in `.test.ts` or `.test.tsx`) and run them, showing you the results directly in the terminal.

---

## 🏗️ Assumptions & Design Choices

Several key decisions were made during the development of this project:

- **Technology Stack**: The project is built on a modern stack centered around Next.js and React. This choice enables server-side rendering, static site generation, and a powerful component-based architecture. Tailwind CSS and Shadcn/ui were chosen for rapid, utility-first styling and a pre-built, accessible component library.
- **State Management**: For simplicity and to avoid heavy external libraries, client-side state (like the shopping cart and wishlist) is managed using React's built-in Context API. Data is persisted in the browser's `localStorage` to ensure a seamless user experience across sessions.
- **Product Data**: All product information is currently hardcoded within `src/lib/products.ts`. This was done for demonstration purposes to allow for rapid development without a database dependency. In a production environment, this data would be fetched from a database (like Firestore) or a dedicated e-commerce backend.
- **API Simulation**: The checkout process and product API are simulated. The `/api/checkout` endpoint logs the order to the console instead of processing a real payment. The `/api/products` endpoint returns the hardcoded product list. This provides a functional front-to-back flow without requiring external service integrations.
- **AI Integration**: The generative AI features (Shopping Advisor, Customer Support Chat) are powered by Genkit. They are designed to showcase modern AI capabilities within an e-commerce context but run in a developer environment. A production setup would require a valid `GEMINI_API_KEY`.
- **Styling**: The visual style, including colors and fonts, is based on the initial project requirements. The theme is implemented using CSS variables within `src/app/globals.css`, making it easy to customize the entire application's look and feel from a central location.

---

## 📂 Project Structure

Here is a high-level overview of the project's directory structure:

```
/
├── src/
│   ├── app/                # Next.js App Router: contains all pages and layouts.
│   ├── components/         # Reusable React components (UI, specific features).
│   ├── context/            # React context for global state (cart, wishlist).
│   ├── ai/                 # Genkit flows for AI features.
│   ├── firebase/           # Firebase configuration and custom hooks.
│   ├── hooks/              # Custom React hooks.
│   ├── lib/                # Utility functions and product data.
│   └── types/              # TypeScript type definitions.
├── public/                 # Static assets like images and icons.
├── .env                    # Environment variables.
├── jest.config.ts          # Jest testing framework configuration.
├── next.config.ts          # Next.js configuration.
├── package.json            # Project dependencies and scripts.
└── README.md               # You are here!
```

---
Thank you for checking out Fashion Aura. Happy coding!
