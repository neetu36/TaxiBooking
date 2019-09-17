var express = require("express");
var connection = require('./../config');

module.exports.gettaxis = function (req, res) {
    
    connection.query('SELECT * from taxis', function (error, results, fields) {
        if (error) throw error;
        res.json({taxis :  results});
      });
}