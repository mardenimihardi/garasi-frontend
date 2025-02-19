# Garasi Frontend

A modern frontend project built with **React**, **TypeScript**, and **Vite** for a fast and efficient development experience.

## 🚀 Getting Started

### 📌 Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

## ⚙️ Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd garasi-frontend
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```

## ⚙️ Environment Variables  

Create a `.env` file in the project root and configure the API URL:  

```
VITE_API_IMAGE=https://garasi-backend-production.up.railway.app/api/image
```

### 📉 Notes:  
- **For Production**, use the deployed backend URL.  
- **For Local Development**, use:  
  ```
  VITE_API_IMAGE=http://127.0.0.1:3000/api/image
  ```
- **Leave it empty** to use default backend settings:  
  ```
  VITE_API_IMAGE=
  ```

---

## ▶️ Running the Project

### Development Mode:
```sh
npm run dev
```

### Production Mode:
```sh
npm run build
npm run preview
```

## 📂 Project Structure

```
├── src
│   ├── components     # Reusable components
│   ├── pages          # Page components
│   ├── App.tsx        # Root component
│   ├── App.css        # Global styles
│   ├── main.tsx       # Entry point
│   └── vite-env.d.ts  # Vite environment types
├── index.html         # Main HTML file
├── package.json       # Project metadata and dependencies
├── tsconfig.json      # TypeScript configuration
├── vite.config.ts     # Vite configuration
└── README.md          # Project documentation
```

## 📜 License
This project is licensed under the MIT License.

---

This README provides a clear and structured guide for setting up and running the frontend project. Happy coding! 🚀

