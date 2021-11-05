# Unit 9 - Express - Lecture Demo App

**IMPORTANT:** Do _not_ share this demo with students after the lecture as we don't want them to just copy / paste from here for their challenge. There are enough starter examples in the lecture slides.

## Description

This is a working demo app for the Express unit. Points to highlight during demo:

### Main server.js file

- Serving main file
- Incorporating modular router files
- Global Express error handling
- Catch-all route handler for unhandled requests

### articleRouter.js file

- Middleware Design Pattern
- Anonymous middleware to handle responding to the request

### articleController.js file

- Express next error handler invocation
- Persisting state between middleware using res.locals

## Setup

1. Install dependencies: `npm install`

## Startup

1. Start the server (with watching): `npm start` (alt: `nodemon server.js`)

## Requests

All available endpoints and example requests can be found in [assets/requestExamples.json](./assets/requestExamples.json).
