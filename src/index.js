const express = require('express');
const router = require('./routes/index');
const { configDotenv } = require('dotenv');
const { connect } = require('mongoose');
require('dotenv')




configDotenv();
const port = process.env.PORT || 3000; 
const dburl = process.env.DB_URL;


const app = express();



connect(dburl).then(res => {
    console.log("Connected to DB");
    
    app.listen(port, () => {
        console.log(`App running on port ${port}`);
        
    });

    app.use(express.json());
    app.use(router);
    

}).catch(err => {
    console.log("Error connecting to DB");
});    
