const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routeProduct = require('./routes/product');
const routeStore = require('./routes/stores');
const routeCategory = require('./routes/categories');
const routeManu = require('./routes/manufacturer');
const routeChipmaker = require('./routes/chipmaker')

require('dotenv').config();

const app = express();
app.use(bodyParser.json());


var localDB = 'mongodb://localhost:27017/test-new-price'; // Local test database
var cloudDB = "mongodb+srv://Alphabg:DHvCHYctncJIViYM@maincluster.o7kgh.mongodb.net/pc-part-price-database?retryWrites=true&w=majority"
app.use(cors());

mongoose.connect(cloudDB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
    console.log("connected to database");
    app.use("/api/prods", routeProduct);
    app.use("/api/stores", routeStore);
    app.use("/api/categories", routeCategory);
    app.use("/api/manu", routeManu);
    app.use("/api/chip", routeChipmaker);
})
.catch((err)=>{
    console.log("Not connected to database");
    console.error(err)
});


module.exports = app;
