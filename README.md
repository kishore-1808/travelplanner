# Travel Planner Dashboard ✈️

A comprehensive, full-stack web application for planning trips, managing budgets, and securely storing travel documents.

## Live Deployments

You can access the live application using the following links:

*   **Frontend (User Interface):** [https://travelplanner-black.vercel.app/](https://travelplanner-black.vercel.app/)
*   **Backend (API & Database):** [https://travelplanner-t7ef.vercel.app/](https://travelplanner-t7ef.vercel.app/)

> **Note:** As a user, you only need to visit the **Frontend** link. The frontend securely communicates with the backend API behind the scenes.

## Features

This application provides a seamless experience for managing your adventures:

*   **🌍 Trip Planning:** Create new trips with destinations, dates, descriptions, and budgets. The app automatically fetches a representative image of your destination from Wikipedia.
*   **💰 Budget Tracking (Real-time):** Log expenses across various categories (Food, Transport, Accommodation, etc.) and instantly see your remaining budget and spending breakdown visualized on the dashboard.
*   **📂 Document Vault:** Securely upload and store your essential travel documents (Passports, Visas, Tickets) as PDFs or images within the application.
*   **📊 Insightful Dashboard:** A comprehensive overview of your upcoming trips, total budget, automated live weather forecasts for your next destination, and spending analytics.
*   **⚡ Real-time Global State:** Built with Zustand to ensure that any trip or expense added immediately reflects across all screens without reloading.

## Technology Stack

### Frontend
*   **Framework:** React 18 with Vite
*   **Routing:** React Router DOM
*   **Styling:** Custom CSS with Lucide React icons
*   **State Management:** Zustand (Global Store)
*   **Deployment:** Vercel

### Backend
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB Atlas (NoSQL)
*   **ODM:** Mongoose
*   **Deployment:** Vercel (Serverless Functions)

## Getting Started (Local Development)

If you wish to run the project locally on your machine, follow these steps:

### Prerequisites
*   Node.js installed on your machine.
*   A MongoDB Atlas account and cluster (or a local MongoDB instance).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/kishore-1808/travelplanner.git
    cd travelplanner
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    cd backend
    npm install
    cd ..
    ```

3.  **Setup Environment Variables:**
    *   Create a `.env.development` file in the root directory:
        ```env
        VITE_API_URL=http://localhost:3000
        ```
    *   Create a `.env` file in the `backend` directory with your MongoDB Connection string:
        ```env
        MONGODB_URI="your_mongodb_connection_string"
        PORT=3000
        ```

### Running the Application Locally

You will need to run the frontend and backend simultaneously in two separate terminal windows.

1.  **Start the Backend Server:**
    ```bash
    cd backend
    npm run dev
    ```
    *(The server should start on `http://localhost:3000`)*

2.  **Start the Frontend Development Server:**
    ```bash
    # From the project root
    npm run dev
    ```
    *(The frontend should start on `http://localhost:5173`)*

## API Endpoints

The backend exposes the following RESTful API endpoints:

*   **Trips:**
    *   `GET /api/trips` - Fetch all trips
    *   `POST /api/trips` - Create a new trip
    *   `PUT /api/trips/:id` - Update a trip
    *   `DELETE /api/trips/:id` - Delete a trip (automatically deletes associated expenses)
*   **Expenses:**
    *   `GET /api/expenses` - Fetch all expenses
    *   `POST /api/expenses` - Create a new expense
    *   `DELETE /api/expenses/:id` - Delete an expense
*   **Documents:**
    *   `GET /api/documents` - Fetch all documents
    *   `POST /api/documents` - Upload a new document
    *   `DELETE /api/documents/:id` - Delete a document
