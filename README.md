# FLR-API

API for FLR senorcoders app 

## Getting Started

### Current endpoints:

#### Users
```
get    http://server_address/api/user       //get all users 
post   http://server_address/api/user       //create new user

get    http://server_address/api/user/:id   //get one user
put    http://server_address/api/user/:id   //update one user
delete http://server_address/api/user/:id   //delete one user

get    http://server_address/api/user/:id/email-confirmation/:verification_code //verificate account clicking in the email link

put   http://server_address/api/user/:id/change-location  //change location params in the user table
//just need to send the params id, lat, lon
 
get    http://server_address/api/user/azure_id/:id  //get azure id of the user

post http://server_address/api/user/:userId/favorites-operators //get all favorites operatores

get http://server_address/api/user/:id/stars-comments //get all stars and comments

```
##### User Params
```
-name  
-username 
-password 
-email
-birthday
-lat  
-lon 
-code
-photo_url
-azure_id
-social_access_token
```
#### Operator
```
get  http://server_address/api/operator //get all operators
post http://server_address/api/operator //create all operators
post http://server_address/api/operator/:id/stars-comments //get all starts and comments
```
##### Operator params
```
-operator_name
-operator_type
-time_zone
-currency
-business_type
```
#### Location
```
get  http://server_address/api/location  //get all locations
post http://server_address/api/location  //create a new location

get  http://server_address/api/location/by_distance/:lat/:lon/:distance  //get all locations in a radious of :distance from the :lat, :lon point
    
```
##### Location params
```
-name
-type_id
-image_url
-lat
-lon 
```
#### Product
```
get  http://server_address/api/product  //get all products
post http://server_address/api/product  //create a product
```
##### Product params
```
-operator_id
-location_id
-name
-service_type
-max_adults
-max_childs
```

#### Reservations
```
post  http://server_address/api/reservation/not-passed  //get all reservations that have not passed
```
##### Reservations params
```
-dateNow format YYYY-MM-DD
```

#### Pricing
```
get  http://server_address/api/pricing  //get all the prices
post http://server_address/api/pricing  //create a new price

get    http://server_address/api/pricing/:id  //get a price by id
put    http://server_address/api/pricing/:id  //update a price by id
delete http://server_address/api/pricing/:id  //delete a price by id
```
##### Pricing params
```
-operator_name
-operator_type
-time_zone
-currency
-business_type
```

#### Favorites Operatores
```
post  http://server_address/api/favorite-operator //create operator
post http://server_address/api/favorite-operator/:operator_id/delete //delete operator
```
##### Favorites Operatores params
```
-user_id
-operator_id
```

#### comment of user for Operator
```
post  http://server_address/api/comments-operator //create comment
put http://server_address/api/comments-operator //get all comments
post http://server_address/api/comments-operator/update //update comment
post http://server_address/api/comments-operator/:id/delete //delete comment
```

##### comment of user for Operator params
```
-user_id
-operator_id
-content
```

#### starts of user for Operator
```
post  http://server_address/api/stars-operator //save start of operator
put http://server_address/api/stars-operator //get start of operator
post http://server_address/api/stars-operator/update //update start of operator
post http://server_address/api/stars-operator/:id/delete //delete start of operator
get http://server_address/api/stars-operator //get all start of operators
```

##### comment of user for Operator params
```
-user_id
-operator_id
-numStart
```

### Prerequisites

```
dbconfig.js
mailer.js
```

### Installing
Just run

```
npm install
```
