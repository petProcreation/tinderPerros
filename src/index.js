const express = require('express');
const router = require('./routes/index');
const { configDotenv } = require('dotenv');
require('dotenv')


configDotenv();
const port = process.env.PORT || 3000; 

const app = express();


app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
});

app.use('/', router);