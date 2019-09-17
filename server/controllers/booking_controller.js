var express = require("express");
var connection = require('./../config');

// To add new Booking 
module.exports.addbooking = function (req, res) {

    console.log("Inside addbooking Server -----",req.booking);
    var booking = {
        "Taxi_Id": req.body.booking.taxiid,
        "User_Id": req.body.booking.userid,
        "Pickup_Date": req.body.booking.pickupdate,
        "Pickup_Time": req.body.booking.pickuptime,
        "Pickup_Location" : req.body.booking.pickuploc,
        "No_Of_Persons": req.body.booking.noofpersons
    }
    connection.query('INSERT INTO taxi_booking SET ?', booking, function (error, results) {
        if (error) {
            res.json({
                status: false,
                message: 'There is an error while inserting booking'
            })
        } else {
            res.json({
                status: true,
                data: results,
                message: 'Booking inserted sucessfully'
            })
        }
    });
}
// To get all the bookings
module.exports.getbookings = function (req, res) {
    console.log("Inside get all booking Server -----");
    connection.query('SELECT * from taxi_booking', function (error, results) {
        if (error) throw error;
        res.json({bookings :  results});
      });
}

// to get bookins by userid
module.exports.getbookingbyuid = function (req, res) {
    console.log("***Inside get booking by uid Server",req.params);
    connection.query('SELECT * from taxi_booking  WHERE user_id = ?',[req.params.uid], function (error, results) {
        if (error) throw error;
        res.json({bookings :  results});
      });
}

// to get bookings by bookingid
module.exports.getbookingbybid = function (req, res) {
    console.log("***Inside get booking by booking id Server",req.params);
    connection.query('SELECT * from taxi_booking  WHERE booking_id = ?',[req.params.bid], function (error, results) {
        if (error) throw error;
        res.json({bookings :  results});
      });
}

//To delete a booking by booking_id
module.exports.deletebooking = function (req, res) {
    var id =  req.params.id;
    console.log("Inside Delete Booking ---------------------",req.params.id);
    connection.query('delete from  taxi_booking where Booking_Id=?',[id], function (error) {
        if (error) throw error;
        {
            res.json({
                status: true,
                message: 'Booking deleted sucessfully'
            })
        }
      });
}

//To Update a booking by booking_id
module.exports.updatebooking = function (req, res) {
    console.log ("Indide update booking**************",req.body.booking);
    var param =  [req.body.booking , 
        req.params.id];
    console.log ("req body booking**************",req.body.booking);
    console.log("******req.params*******",req.params.id);
    connection.query('update taxi_booking set ? where Booking_Id=?',param, function (error) {
        if (error) throw error;
        else {
            res.json({
                status: true,
                message: 'Booking Updated sucessfully'
            })
        }
      });
}