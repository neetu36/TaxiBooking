import React, { Component } from 'react'
import { Redirect } from 'react-router'
import './App.css';
import axios from "axios";

class Login extends Component {

  constructor(props) {
    super(props);
    //let User_Id='';
    this.state = {
      email: null,
      password: null,
      User_Id: null,
      fireRedirectBooking: false,
      formerrors: {
        email: "",
        password: ""
      }
    };
    //this.handleSubmit= this.handleSubmit.bind(this);
  }
  handleSubmit = e => {
    e.preventDefault();
    const login = {
      email: this.state.email,
      password: this.state.password
    };
    axios.get("http://localhost:3001/api/authenticate", { params: login }).then(res => {
      console.log('Inside axios response ------ ', res.data.User_Id);
      if (res.data.status === true) {
        this.setState({ fireRedirectBooking: true, User_Id: res.data.User_Id });
      }
      console.log("**after else**** ", this.state);
    })



  };
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;
    this.setState({ formErrors, [name]: value }, () => console.log(this.state))
  }

  renderRedirect = () => {
    if (this.state.fireRedirectBooking) {
      return <Redirect to={`/booking/${this.state.User_Id}`} />
    }
    else {
      return <Redirect to={`/login}`} />
    }
  }
  render() {

    return <div>
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Login to Taxi Booking</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input type="email" className="" placeholder="Email" name="email" onChange={this.handleChange} noValidate ></input>
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input type="password" className="" placeholder="Password" name="password" onChange={this.handleChange} noValidate ></input>
            </div>
            <div className="buttons">
              <button type="submit">Login</button>
            </div>
    </form>
        </div>
      </div>
      {
        (this.state.fireRedirectBooking) ? this.renderRedirect() : null
      }
    </div>
  }
}

export default Login;