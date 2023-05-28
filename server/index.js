const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const app = express()
const dbcon = require('./dbconfig/db')
const routes = require('./routes/routes.js')
var bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use('/' ,routes)




app.listen( 8090 , () => {
    console.log('Server is conneced')
}) 