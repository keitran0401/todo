## Introduction

This is a simple Todo application built off Django (including the Django REST Framework for API CRUD operations) and React.

## Run the application

### Backend

1. Install Pipenv using pip: `[pip install pipenv]`
2. Activate new virtual environment `[pipenv shell]`
3. Install the dependencies `[pipenv install]`

### Frontend

1. Install the dependencies `[npm install]`
2. Make sure you are using Google Console with these APIs:

- Geocoding
- Geolocation
- Maps JavaScript
- Places

3. Setup an API key with React .env file: `[REACT_APP_*your_api_key]`

### Backend

1. API Routes

   - /todos/ - returns a list of all the Todo items. CREATE and READ operations can be performed here.

   - /todos/id - returns a single Todo item using the id primary key. UPDATE and DELETE operations can be performed here.

2. Google Cloud Services & Google Cloud Buckets

### Run the application

You will need two terminals pointed to the frontend and backend directories to start the servers for this application.

1. Run this command to start the backend server in the `[backend]` directory: `[python manage.py runserver]` (You have to run this command while you are sourced into the virtual environment)
2. Run this command to start the frontend development server in the `[frontend]` directory: `[npm start]`
