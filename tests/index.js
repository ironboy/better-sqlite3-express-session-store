const express = require('express');
const session = require('express-session');
const store = require('../index');
const app = express();

let daStore = store({
  dbPath: './db/test-db.db',
  tableName: 'mysessions',
  deleteAfterInactivityMinutes: 40
});

app.use(session({
  secret: 'your own secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' },
  store: daStore
}));

app.get('*', (req, res) => {
  req.session.visited = req.session.visited || [];
  req.session.visited.push(req.url);
  res.json(req.session.visited);
})

app.listen(3000, () => console.log('Listening on port 3000'));