## Introduction

This is a simple Todo application built off React and Django (including the Django REST Framework).

## App Info

### Backend

1. Configurations

   - Install Pipenv using pip: `[pip install pipenv]`
   - Activate new virtual environment `[pipenv shell]`
   - Install the dependencies `[pipenv install]`
   - Start the backend server: `[cd backend && python manage.py runserver]`

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

- Heroku uses **buildpacks** to **transform deployed code into slugs** which can be executed by Dynos (server instances on Heroku). We’ll be needing two buildpacks. One for Node and another for Python because the React app build process depends on NPM, so we need Node.js. We also need Python to run Django

- During production, Heroku will **not be using SQLite database**. Instead, we need to use **PostgreSQL** by configuring the addon to our app

- Configure Heroku config variables

- WhiteNoise allows your web app to serve its own static files, making it a self-contained unit that can be deployed anywhere without relying on nginx, Amazon S3 or any other external service. (Especially useful on Heroku)

1. Export current environment configuration file to install packages of the same version as the original environment in another environment: `[pip freeze > requirements.txt]`. Moving to another environment and install it: `[pip install -r requirements.txt]`
2. Deploying the project to Heroku
   - Choose a Buildpack: Pipfile, requirements.txt
   - Choose the Python Version (Optional): runtime.txt
   - Specify Processes to Run: The Procfile is a single, language-agnostic format for defining the processes making up your project. It will instruct Heroku on how to run your web server.
   - Configure Django: `[pip install django-on-heroku]`
   - Configure the Heroku App: turn off debug mode and set environment variables in backend/backend/settings.py
