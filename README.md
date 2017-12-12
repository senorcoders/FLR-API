# FLR-API

API for FLR senorcoders app 

## Getting Started

### Current endpoints:

#### Users
```
get    http://server_address/api/user
post   http://server_address/api/user

get    http://server_address/api/user/:id
put    http://server_address/api/user/:id
delete http://server_address/api/user/:id

post   http://server_address/api/user/:id/email-confirmation/:verification_code

put   http://server_address/api/user/:id/change-location
 
get    http://server_address/api/user/azure_id/:id

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
get  http://server_address/api/operator
post http://server_address/api/operator
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
get  http://server_address/api/location
post http://server_address/api/location

get  http://server_address/api/location/by_distance/:lat/:lon/:distance'
    
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
get  http://server_address/api/product 
post http://server_address/api/product
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
#### Pricing
```
get  http://server_address/api/pricing
post http://server_address/api/pricing

get    http://server_address/api/pricing/:id
put    http://server_address/api/pricing/:id
delete http://server_address/api/pricing/:id
```
##### Pricing params
```
-operator_name
-operator_type
-time_zone
-currency
-business_type
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
