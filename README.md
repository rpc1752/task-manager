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

## Troubleshooting

### CORS Issues

If you encounter CORS issues:

1. Ensure the backend is running on port 8000
2. Make sure the frontend is configured to proxy requests to the backend (already set up in vite.config.js)
3. If issues persist, the CORS headers may need to be adjusted in the backend's main.py
