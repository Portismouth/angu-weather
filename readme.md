# Welcome to the AnguWeather!

To get started clone this repository and simply run

```
npm start
```
I've configured the package.json file to run npm install on this command. If you have issues, please run npm install.

When finished building, please go to http://localhost:8000

# Features

This is a simple forecast app using AngularJS 1.7.x, the OpenWeather API, the Google Places Autcomplete APU, and the Unsplash API for the city photos. The default location is set to 60661,but the browser will request permission to grab your current location. From there, you can search for your favorite city, getting the current weather and a five day forecast, plus show you a photo related to that city. 

# Testing

This was, admittedly, a new topic for me so there was a bit of a learning curve. I was able to set some simple unit tests for the the current-weather component and a simple e2e test for the search bar and some other basic features. I wasn't able to figure out how to test that API results were returning the correct result, unfortunately. I outline instructions for testing below.

# Known Issues

Queries to the weather API return an error if you search for an obscure city - and the photos don't always perfectly match up - Portland, OR vs Portland, ME for example.

# Running Tests

## End-2-End Testing (Protractor)

To run the end-2-end (e2e) tests against the application, we use [Protractor][protractor].

## Starting the Web Server

First, we need the application to be running via the web-server.
From the project's root directory run:

```
npm start
```

The application should now be available at http://localhost:8000.

## Testing with Protractor

Start the Protractor test runner, using the e2e configuration:

```
npm run protractor
```
(The configuration will add the appropriate modules)

##Unit Testing with Jasmine

You can run the simple unit tests I created by running

```
npm test
```

in your terminal.
