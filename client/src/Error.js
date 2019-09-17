import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

class Error extends Component{
         render(){
        return<div className="wrapper">
        <div className="form-wrapper">
          <h1>Invalid  Email and Password  </h1>
          <Link to="/">Home </Link>
         </div>
        </div>
    }
}
export default Error;