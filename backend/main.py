from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import uuid
from urllib.parse import parse_qs, urlparse

# Task model as a simple Python class
class Task:
    def __init__(self, id, title, completed=False):
        self.id = id
        self.title = title
        self.completed = completed
    
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "completed": self.completed
        }

# In-memory database for tasks
tasks_db = [
    Task("1", "Learn Python", False),
    Task("2", "Build a React App", True)
]

class TaskHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status_code=200):
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        # Enable CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_OPTIONS(self):
        self._set_headers()
    
    def do_GET(self):
        if self.path == '/tasks':
            self._set_headers()
            tasks_json = json.dumps([task.to_dict() for task in tasks_db])
            self.wfile.write(tasks_json.encode())
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Not found"}).encode())
    
    def do_POST(self):
        if self.path == '/tasks':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            task_data = json.loads(post_data.decode())
            
            task = Task(str(uuid.uuid4()), task_data.get('title', ''), False)
            tasks_db.append(task)
            
            self._set_headers()
            self.wfile.write(json.dumps(task.to_dict()).encode())
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Not found"}).encode())
    
    def do_PUT(self):
        # Extract task_id from /tasks/{task_id}
        path_parts = self.path.split('/')
        if len(path_parts) == 3 and path_parts[1] == 'tasks':
            task_id = path_parts[2]
            
            # Find and update the task
            for task in tasks_db:
                if task.id == task_id:
                    task.completed = True
                    self._set_headers()
                    self.wfile.write(json.dumps(task.to_dict()).encode())
                    return
            
            # Task not found
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Task not found"}).encode())
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Not found"}).encode())

def run(server_class=HTTPServer, handler_class=TaskHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Starting server on port {port}...")
    httpd.serve_forever()

if __name__ == '__main__':
    run() 