const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

/* INDEPENDENT REQUEST */
app.get('/independent', (req, res) => {
  console.log('Independent request printing on console');
  res.status(200).send('I am an independent response');
});

/* SYNCRHONOUS REQUEST */
app.get('/sync', (req, res) => {
  const waitMs = 5000;
  const now = Date.now();

  /* This while loop is a dummy synchronous code */
  while (Date.now() < now + waitMs) {
    // do nothing here
  }

  console.log('IMPORTANT: this is printed on terminal after 5 seconds of receiving request');

  res.status(200).send('I am coming as synchronous response');
});

/* ASYNCHRONOUS REQUEST */
app.get('/async', (req, res) => {
  const waitMs = 5000;

  setTimeout(() => {
    console.log('Asynchronous request printing on console');
    res.status(200).send('I am coming as asynchronous response');
  }, waitMs);
});

/* Spawn a web server */
app.listen(port, () => {
  console.log(`Multi-purpose app listening on port ${port}`);
});
