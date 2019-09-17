import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';


const axios = require('axios');
class Booking extends Component {
  booking;

  constructor(props) {
    super(props);
    this.state = { bookinginfo: [] }
  };

  componentDidMount() {
    let user_id = this.props.match.params["id"]
    axios.get(`http://localhost:3001/api/getbookingbyuid/` + user_id).then(res => {
      console.log("********state************", user_id);
      this.setState({ bookinginfo: res.data.bookings });
      console.log("********state************", this.state);
      
    })
  }
  refreshPage() {
    window.location.reload(false);
  }

  delbooking = (bid, uid) => {
    let booking_id = bid;
    console.log("before axios---------", booking_id);
    axios.delete(`http://localhost:3001/api/deletebooking/` + booking_id).then(res => {
      console.log("After deletion status ********************", res.status);  // print 200
      this.refreshPage();
    })

  }
  render() {
    let content = <div><h2>No booking data </h2></div>;
    if (this.state.bookinginfo.length !== 0) {
      let bookings = this.state.bookinginfo.map((binfo) => {
        return <tr key={binfo.Booking_Id}><td>{binfo.Booking_Id}</td><td>{binfo.Taxi_Id}</td><td>{binfo.User_Id}</td><td>{new Date(binfo.Pickup_Date).toLocaleDateString()}</td>
          <td>{binfo.Pickup_Time}</td><td>{binfo.Pickup_Location}</td><td>{binfo.No_Of_Persons}</td>
          <td><Link to={`/updatebooking/${binfo.Booking_Id}`} style={{ color: 'blue', cursor: 'pointer' }}>Update </Link></td>
          <td><input type="button" value="Delete" onClick={event => this.delbooking(`${binfo.Booking_Id}`, `${binfo.User_Id}`)} style={{ color: 'blue', cursor: 'pointer' }} /> </td></tr>
      })
      content = <table>
        <thead><tr><td>Booking_Id</td><td>Taxi_Id</td><td>User_Id</td><td>Pickup_Date</td>
          <td>Pickup_Time</td><td>Pickup_Loc</td><td>No_Of_Per</td><td colSpan="2">Operations</td></tr>
        </thead>
        <tbody>
          {bookings}
        </tbody>
      </table>
    }
    return (<div className="wrapper">
      <div className="form-wrapper">
        <h1>Taxi Bookings </h1>
        {content}
        <div className="buttons">
          <button onClick={event => this.props.history.push("/createbooking")  } >New Booking</button>
          <Link to="/logoutapp">Logged Out</Link></div></div>

    </div>

    )
  }
}


export default Booking;