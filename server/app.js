const express = require("express");
const path = require("path");
const cors = require('cors')
const app = express();
const config = require('./config/config');
const mongoose = require('mongoose');

async function connectDatabase () {
  try {
    await mongoose.connect(config.dbURI);
    app.listen(config.port, () => {
      console.log(`Example app listening at http://localhost:${config.port}`);
    });
  } catch (e) {
    console.log(e);
  }
}

connectDatabase();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json({ extended: true }));
app.use('/', express.static('../client/build'));
app.use('/api', require('./routes/auth.route'));
app.use('/api', require('./routes/category.route'));
app.use('/api', require('./routes/task.route'));

app.get('/*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
