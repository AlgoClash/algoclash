const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

const userRoute = require('./routes/User')
const algoRoute = require('./routes/Algo')

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

const MONGO_URI = 'mongodb+srv://Ian:CSmongo23@cluster0.z8sil.mongodb.net/AlgoClash?retryWrites=true&w=majority'

mongoose.connect( MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => console.log("connected to database"));

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
};

app.use('/user', userRoute);

app.use('/algo', algoRoute);

app.get('/', (_, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../../public/index.html'));
});

// global error handler --->
app.use((err, _, res, next) => {
    const defaultErr = {
      log: `Express error handler caught unknown middleware error: ${err}`,
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`listening on: ${PORT}`))