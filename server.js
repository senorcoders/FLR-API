var express = require('express'),
app = express(),
port = process.env.PORT || 3030,
cors = require('cors'),
winston = require('winston'),
bodyParser = require('body-parser');


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
var commissionRoutes = require('./api/routes/commissionRoutes'); 
var reservationRoutes = require ('./api/routes/reservationRoutes');
var favoriteProductRoutes = require('./api/routes/favoriteProductRoute'); //importing route
var commentsOperator = require('./api/routes/commentsOperatorRoute')
var starsOperator = require('./api/routes/starsOperatorRoute')
var serviceDatesRoutes = require('./api/routes/servicesDatesRoutes');

var couponRoutes = require('./api/routes/couponRoute');

var serviceHoursRoutes = require('./api/routes/servicesHoursRoutes');


userRoutes(app); //register the route
locationRoutes(app);
operatorRoutes(app);
productRoutes(app);
pricingRoutes(app);
commissionRoutes(app);
reservationRoutes(app);
serviceDatesRoutes(app);
serviceHoursRoutes(app);
favoriteProductRoutes(app);
commentsOperator(app)
starsOperator(app)
couponRoutes(app)

app.listen(port);
console.log('Find local rentals RESTful API server started on: ' + port);
