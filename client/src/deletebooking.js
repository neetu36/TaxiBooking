import React, { Component } from 'react';
import axios from "axios";
class deletebooking extends Component{
    componentDidMount() {
        let booking_id = this.props.match.params["id"]
        console.log("before axios---------",booking_id);    
        axios.delete(`http://localhost:3001/api/deletebooking/`+booking_id).then(res => {
        console.log("After deletion status ********************", res.status);  // print 200
        })
      }
        render(){
        return<div className="wrapper">
        <div className="form-wrapper">
          <h1>Booking Deleted For Booking Id  </h1>
        </div></div>
    }
}
export default deletebooking;