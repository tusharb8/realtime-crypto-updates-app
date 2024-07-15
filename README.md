# Real-time Crypto Updates App

## Initial Setup

**Note:** Node.js version v18.20.4 is required for this project.

Follow these steps to get the system ready:

1. Clone the repository:
    ```bash
    git clone https://github.com/tusharb8/realtime-crypto-updates-app.git
    ```

2. Install frontend dependencies:
    ```bash
    cd realtime-crypto-updates-app/frontend/
    npm i
    ```

3. Install backend dependencies:
    ```bash
    cd ../backend/
    npm i
    ```

4. Create a `.env` file in the backend folder and add the following line along with your MongoDB link:
    ```env
    MONGODB_URI="<Your MongoDB link>"
    ```

## Running the Application

### Backend

To run the backend application:

1. Navigate to the backend folder:
    ```bash
    cd realtime-crypto-updates-app/backend/
    ```

2. Start the backend server:
    ```bash
    npm start
    ```

### Frontend

To run the frontend application:

1. Navigate to the frontend folder:
    ```bash
    cd realtime-crypto-updates-app/frontend/
    ```

2. Start the frontend development server:
    ```bash
    npm run dev
    ``
3. Now you can access the application at http://localhost:3000/
