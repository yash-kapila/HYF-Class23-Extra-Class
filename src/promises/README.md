# Promises

NodeJS is an asynchronous event driven **JavaScript runtime** which is built on Chrome's V8 engine. ExpressJS is a framework which helps in building Node applications in an easier and faster way.

There are different kinds of applications we can develop using Node/Express combination such as:

- A Node app serving server-side rendered HTML pages
- A Node app providing REST APIs(consumer can then be a web app or mobile app)
- A Node app serving static website(HTML + CSS + JS files)

Web servers can be easily spawned in Node capable of serving individually either of the three above mentioned applications or in a combination of them. What it means is that a web server can easily serve static content along with exposing APIs to exchange data with client.

A good example of such an app(we don't know if it is written in NodeJS but the idea is the same) is what we currently use in React homework - https://uinames.com/. The website serves static content(HTML + CSS + JavaScript) when opened in browser but is also capable of serving information through its APIs i.e https://uinames.com/api/?ext&amount=25&region=india&gender=random&source=uinames.com

Have a look inside the **multi-purpose-app** to see how we can implement a similar app using Node/ExpressJS. Execute `npm run multi-purpose-app` in root directory to spawn the web server.

**Note:** Although possible to combine different apps in one, following the principle of separation of concerns, it is better to keep apps serving static content and those serving APIs separate.

**References:**

- https://expressjs.com/en/starter/static-files.html
- https://stackabuse.com/node-js-express-examples-rendered-rest-and-static-websites/

## Application Programming Interface(API)

An API as the name suggests is an interface which we can connect/use to in order to establish a connection between our application and the system/application/library serving us those APIs.

We have been dealing with interfaces ever since we had a computer. For example, we use a Graphical User Interface(GUI) to interact with different applications or operating system running on our computer. Similarly, we make use of a Command Line Interface(CLI) to interact with the OS's file system or a Git application when working on a repository. An API, however, is a software-to-software interface and not a user interface. This means that with APIs, applications talk to each other without any user knowledge or intervention.

### Examples

Example1: Plain JavaScript modules interacting with each other using APIs

```JavaScript
// utils.js
const utils = () => ({
  /* sum and multiply are APIs exposed by utils library */
  sum: (...params) => params.reduce((elem, acc) => elem + acc, 0),
  multiply: (...params) => params.reduce((elem, acc) => elem * acc, 1);
});

export default utils;


// app.js
import utils from 'utils';

/* A different program app.js can use APIS exposed by utils */
const main = () => {
  console.log(`Summing numbers: ${utils.sum(1,2,3,4)}`);
  console.log(`Multiplying numbers: ${utils.multiply(1,2,3,4)}`);
};

main();
```

Example2: A Node app exposing an API to be used by another app(could be a web app or mobile app)

```JavaScript
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

/* This Node app exposes a single API */
app.get('/api', (req, res) => {
  const data = {
    name: 'Yash Kapila',
    gender: 'Male',
    age: 29,
  };
  res.status(200).send(data);
});

/* Spawn a web server */
app.listen(port, () => {
  console.log(`Multi-purpose app listening on port ${port}`);
});

// Spin this server and try accessing http://localhost:3000/api to interact with this endpoint
```

## Asynchronocity in NodeJS

JavaScript as we know is a single threaded language. This means that it can only do one task at a time. While that task being is executed, main thread remains busy. This is in comparison to other languages such as Java which are multi-threaded languages where a task can be subdivided and distributed amongs threads while keeping the main thread free.

Since our main thread is kept busy while executing a task, it is not considered a good practice to execute long operations like reading from a big file, waiting for a server to respond to an API request or even to execute a big loop.

This is where asynchronous programming in JavaScript comes in handy. All tasks which may have a long execution time are executed in parallel off from the main thread. These tasks then communicate with the main thread using **Event loop**.

Asynchronous programming in both JavaScript runtimes, browsers and NodeJS, works the same way(minor differences would be in how event loop works but the overall concept is same). They both make operations which may take a while to complete asynchronous.

This is implemented using various techniques such as:

- callbacks
- promises
- async/await
- generators

Let's have a quick look at an example showing why asynchronous programming is important in NodeJS.

**Reference:**

- https://eloquentjavascript.net/11_async.html
- https://www.youtube.com/watch?v=8aGhZQkoFbQ
- https://nodejs.org/en/docs/guides/dont-block-the-event-loop/

## Environment variables

Decoupling configuration from the application.

Environment variables are those whose value is set outside the program, likely through configuration files or provided at runtime while deploying the application. An environment variable is made up of a key=value pair and any number can be created and used within a programn.

For example, at the time of deploying our app in production, we would like to set the environment variable NODE_ENV to __production__ which is going to bring in some additional benefits to our app such as less verbose error messages. Similarly, we may want to connect to different databases for different environments(development, staging, test, or production) and thus we can set different DB endpoints for different environments using environment variables.

We use environment variables in our NodeJS application using __process.env__ object. And these variables can be passed in different ways such as:

- Command Line: `PORT=3000 node server.js` will set environment variable PORT as 3000 which will be then accessible inside our app.
- **.env** file: We can consolidate all our configurations in an environment file which can be added into root of our app. But we need to make sure that this file is not added to source-control and is kept away using `.gitignore`.

## Middlewares

Middleware as the name might suggest are functions that lie in the middle of a flowwhen it reaches the server(be it request or response). They are nothing but functions which have access to the request and response object and a __next__ function in the app's cycle. __next__ is again a function which, when invoked, executes the next middleware function registered.

Some of the basic functions which a middleware function does:

- Execute any piece of code
- Modify request or response object
- End the request/response cycle
- Call the next middleware function

If a middleware function doesn't end the request/response cycle, then it must call the __next__ function to pass control to the next middleware. Otherwise, the request would be left hanging.

Common use cases of a midleware function would be:

- **Guard routes:** For protected endpoints i.e for which a user must be authenticated, check whether the incoming request is coming from an authenticated source.
- **Logging:** We would like to keep a log of all incoming requests.
- **Error handling:** Middleware functions can be used for a common way of dealing with errors instead of doing it on every route.

**Reference:**

- https://expressjs.com/en/guide/writing-middleware.html
- https://expressjs.com/en/guide/using-middleware.html
