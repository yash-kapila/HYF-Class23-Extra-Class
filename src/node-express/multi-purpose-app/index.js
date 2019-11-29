const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

/* SERVING STATIC FILES */
/*
 * The path that you provide to the express.static function is relative to the directory from where you launch your node process.
 * Thus, we can't serve static as: app.use(express.static('static')) because:
 * while starting server using a NPM script i.e `npm run multi-purpose-app`, `static` is searched from the parent directory.
 */
app.use(express.static(path.join(__dirname, 'static')));

/* SERVING APIs */
app.get('/api', (req, res) => {
  const data = {
    name: 'Yash Kapila',
    gender: 'Male',
    age: 29,
  };
  res.json(data);
});

/* Spawn a web server */
app.listen(port, () => {
  console.log(`Multi-purpose app listening on port ${port}`);
});
