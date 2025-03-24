# Task Manager App

A simple task manager application with a Python backend and React frontend.

## Project Structure

```
task-manager/
├── backend/         # Python HTTP server backend
│   ├── main.py
│   └── requirements.txt
└── frontend/        # React frontend
    ├── src/
    │   ├── components/
    │   │   ├── TaskForm.jsx
    │   │   └── TaskList.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Prerequisites

- Python 3.8+
- Node.js 16+
- npm 8+

## Running the Backend

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Run the Python HTTP server:

   ```
   python main.py
   ```

   The API will be available at http://localhost:8000

## Running the Frontend

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run dev
   ```

   The frontend will be available at http://localhost:3000

## API Endpoints

- `GET /tasks` - Get all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/{task_id}` - Mark a task as completed

## Features

- View a list of tasks
- Add a new task
- Mark a task as completed

## Deploying to Render

This application is configured for easy deployment to [Render](https://render.com).

### Deploying with a Blueprint

1. Fork or clone this repository to your GitHub account.

2. Create a new Render account or sign in to your existing account.

3. In your Render dashboard, click on "Blueprints" in the sidebar.

4. Click "New Blueprint Instance".

5. Connect your GitHub account and select the repository.

6. Render will automatically detect the `render.yaml` configuration and set up two services:

   - `task-manager-backend` - The Python backend API
   - `task-manager-frontend` - The React frontend site

7. Review the settings and click "Apply".

8. Render will deploy both services and provide URLs for each.

### Manual Deployment

If you prefer to deploy the services manually:

#### Backend Deployment

1. In your Render dashboard, click "New Web Service".

2. Select the repository and choose the "Python" environment.

3. Configure the service:

   - Name: task-manager-backend
   - Build Command: `cd backend && echo "Building backend..."`
   - Start Command: `cd backend && python main.py`
   - Environment Variables:
     - `PYTHON_VERSION`: 3.9.0

4. Click "Create Web Service".

#### Frontend Deployment

1. In your Render dashboard, click "New Static Site".

2. Select the repository.

3. Configure the service:

   - Name: task-manager-frontend
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`
   - Environment Variables:
     - `NODE_VERSION`: 16
     - `API_URL`: (URL of your backend service)

4. Click "Create Static Site".

## Troubleshooting

### CORS Issues

If you encounter CORS issues:

1. Ensure the backend is running on port 8000
2. Make sure the frontend is configured to proxy requests to the backend (already set up in vite.config.js)
3. If issues persist, the CORS headers may need to be adjusted in the backend's main.py
