const express = require('express');
const router = require('./routes/index');
const { configDotenv } = require('dotenv');
const { connect } = require('mongoose');
const uri = require('./config');
const { Server } = require('socket.io');

require('dotenv')

const { MongoClient, ServerApiVersion } = require('mongodb');

let db = mongoose.connection;
db.on('connecting', () => {
    console.log('Conectando a la base de datos...');
    console.log(mongoose.connection.readyState);
});
db.on('connected', () => {
    console.log('Conexión establecida correctamente.');
    console.log(mongoose.connection.readyState);
});
mongoose.connect(uri, {useNewUrlParser: true});


configDotenv();
const port = process.env.PORT || 3000; 
const dburl = process.env.DB_URL;


const app = express();
app.use(express.json());
app.use(router);


connect(dburl).then(res => {
    console.log("Connected to DB");
    
    const server = app.listen(port, () => {
        console.log(`App running on port ${port}`);
        
        
        
        
    });
    const io = new Server(server);

    io.on('connection', (socket) => {
        io.on('joinedRoom', (data) => {

        });

        

        io.on('sendNewMessage', (data) => {
            io.emit('messageRecieved', data);
        });

    });

    io.on('disconnect', () => {
        console.log('User disconnected');
    });

    


}).catch(err => {
    console.log("Error connecting to DB");
});    
