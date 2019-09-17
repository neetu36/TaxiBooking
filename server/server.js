var express = require('express');
var cors = require('cors');
var app = express();
var registerController=require('./controllers/register_controller');
var bookingController=require('./controllers/booking_controller');
var authenticateController=require('./controllers/authenticate_controller');
var userController=require('./controllers/allusers_controller');
var taxiController=require('./controllers/alltaxis_controller');

var connection = require('./config');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json())
app.use(cors());
var route = express.Router();

app.post('/api/register',registerController.register);  //done
app.get('/api/authenticate',authenticateController.authenticate);   //--done
app.get('/api/getAllUsers', userController.getusers);  //done
app.get('/api/getAlltaxis',taxiController.gettaxis);  //done
app.post('/api/addbooking',bookingController.addbooking); //done
app.get('/api/getbookings',bookingController.getbookings);   //done
app.get('/api/getbookingbyuid/:uid',bookingController.getbookingbyuid);  //done
app.get('/api/getbookingbybid/:bid',bookingController.getbookingbybid);//done
app.delete('/api/deletebooking/:id',bookingController.deletebooking); // done
app.put('/api/updatebooking/:id',bookingController.updatebooking); //not chck

app.listen(3001,()=>{
    console.log('Server starts')
})