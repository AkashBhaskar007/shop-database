const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('dotenv').config()
require('./dbconfig/mongoconfig');

const shopregistration = require('./routes/shopregistration');
const axioslist = require('./routes/axioslist');

app.use('/shopRegistration', shopregistration)
app.use('/axiosList', axioslist)


app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log('Error', err);
    }
    console.log('Node.js is running at port : ',process.env.PORT)
})