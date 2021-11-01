const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
require('./db/db');

const {UserRouter} = require('./routes/User');
const {checkAuth} = require('./controller/User');

const port = process.env.PORT;

const app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  if (req.path !== '/users/login') {
    try {
      await checkAuth();
    } catch (e) {
      console.error('index::', e);
      res.status(500).json({msg: e});
    }
  }
  next();
});

app.get('/', (req, res) => {
  res.send('Created by superRaptor911');
});

app.use('/users', UserRouter);

app.listen(port, () => {
  console.log(`app listening at port ${port}`);
});
