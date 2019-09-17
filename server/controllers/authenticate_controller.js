var connection = require('./../config');

// to validate user from users table data
module.exports.authenticate = function (req, res) {
    var param = [req.query.email,
    req.query.password];
    connection.query('SELECT * FROM users WHERE User_Email = ? and User_Password =?', param, function (error, results) {
        if (error) {
            console.log("********Errors**********",error);
            res.json({
                status: false,
                message: 'There is an error in the query'
            })
        } else {
            console.log("********Results**********",results); //results[0].User_Id)
           // console.log("******************", results[0].User_Password);
            if (results.length > 0) {
                res.json({
                    User_Id:results[0].User_Id,
                    status: true,
                    message: 'successfully authenticated'
                })
            }
            else {
                console.log("********Results**********",results);
                res.json({
                    status: false,
                    message: "Email & password does not exits"
                });
            }
        }
    });
}