## Introduction

This is a simple Todo application built off React and Django (including the Django REST Framework).

## App Info

### Backend

1. Configurations (in the `[backend]` directory)

   - Install Pipenv using pip: `[pip install pipenv]`
   - Activate new virtual environment `[pipenv shell]`
   - Install the dependencies `[pipenv install]`
   - Start the backend server: `[python manage.py runserver]`

2. API Routes

   - /api/todos/ - returns a list of all the Todo items
   - /api/locations - returns a list of Todo locations

3. Uploading a file to Google Cloud (on progress)

   - Google Cloud Services
   - Google Cloud Buckets
   - Google App Engine

4. Next step

   - Unit testing and automation
   - CI/CD

### Frontend

1. Configurations (in the `[frontend]` directory)

   - Install the dependencies `[npm install]`
   - Start the frontend server: `[npm start]`

2. Google Console APIs:

   - Geocoding
   - Geolocation
   - Maps JavaScript
   - Places

3. Setup an API key with React .env file: `[REACT_APP_*your_api_key]`

### Heroku

1. Heroku CLI
2. Export current environment configuration file to install packages of the same version as the original environment in another environment: `[pip freeze > requirements.txt]`. Moving to another environment and install it: `[pip install -r requirements.txt]`
3. Deploying the project to Heroku
   - Choose a Buildpack: Pipfile, requirements.txt
   - Choose the Python Version (Optional): runtime.txt
   - Specify Processes to Run: The Procfile is a single, language-agnostic format for defining the processes making up your project. It will instruct Heroku on how to run your web server.
