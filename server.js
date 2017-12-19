var express = require('express'),
app = express(),
port = process.env.PORT || 3030,
cors = require('cors'),
//user = require('./api/models/userModel'),
winston = require('winston'),
bodyParser = require('body-parser');
//sql = require('mssql'); // MS Sql Server client


var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var userRoutes = require('./api/routes/userRoutes'); //importing route
var locationRoutes = require('./api/routes/locationRoutes'); //importing route
var operatorRoutes = require('./api/routes/operatorRoutes'); //importing route
var productRoutes = require('./api/routes/productRoutes'); //importing route
var pricingRoutes = require('./api/routes/pricingRoutes'); //importing route
var favoriteOperatorRoutes = require('./api/routes/favoriteOperatorRoute'); //importing route
userRoutes(app); //register the route
locationRoutes(app);
operatorRoutes(app);
productRoutes(app);
pricingRoutes(app);
favoriteOperatorRoutes(app);
app.listen(port, function(){
    console.log('Find local rentals RESTful API server started on: ' + port);
});
