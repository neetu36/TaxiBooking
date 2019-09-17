var express = require("express");
var connection = require('./../config');

module.exports.getusers = function (req, res) {
    
    connection.query('SELECT * from users', function (error, results, fields) {
        if (error) throw error;
        res.json({users :  results});
      });
}