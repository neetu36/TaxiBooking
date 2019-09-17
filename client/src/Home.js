import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

class Error extends Component{
    
        render(){
        return<div className="wrapper">
        <div className="form-wrapper">
          <h1>Welcome to Taxi Booking App  </h1>
          <Link to="/login">Go to Login </Link>
          <Link to="/register">New User Registration</Link> 
        </div>
        </div>
    }
}
export default Error;