var express = require("express");
var connection = require('./../config');

module.exports.register = function (req, res) {
    var today = new Date();
    console.log('today is '+today);
       var users = {
        "User_FirstName": req.body.user.firstName,
        "User_LastName": req.body.user.lastName,
        "User_Email": req.body.user.email,
        "User_Password": req.body.user.password,
        "CreatedOn": today
     }
     console.log("Users data   ------",req.body);
    connection.query('INSERT INTO users SET ?', users, function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: error
            })
        } else {
            res.json({
                status: true,
                data: results,
                message: 'user registered sucessfully'
            })
        }
    });
}