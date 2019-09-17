import React, { Component } from 'react';
import axios from "axios";
import './App.css';
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const idRegex = RegExp(/^[0-9\b]+$/);

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
var HH = today.getHours();
var MM = today.getMinutes() ; 

if (dd < 10)   dd = '0' + dd;
if (mm < 10)   mm = '0' + mm;

var today_date = yyyy + '-' + mm + '-' + dd;
var today_time = HH + ':' + MM;

const formValid = formErrors => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false)
  });
  return valid;
}
class Createbooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: null,
      taxiid: null,
      pickupdate: null,
      pickuptime: null,
      pickuploc: null,
      noofpersons: null,
      taxiinfo: [],
      formErrors: {
        userid: '',
        taxiid: '',
        pickupdate: '',
        pickuptime: '',
        pickuploc: '',
        noofpersons: ''
      }
    };

  }
  componentDidMount(){
  
    axios.get("http://localhost:3001/api/getAlltaxis").then(res => {
        console.log("Get Taxis **********",res);
        this.setState({ taxiinfo: res.data.taxis });
        console.log(res.data);
       // let taxi_id = this.state.bookinginfo.map((binfo
        
      })
    }   ; 

  handleSubmit = e => {
    e.preventDefault();

    console.log("after prevent *********");
    console.log('state *********', this.state);
    if (formValid(this.state.formErrors)) {
      const booking = {
        userid: this.state.userid,
        taxiid: this.state.taxiid,
        pickupdate: this.state.pickupdate,
        pickuptime: this.state.pickuptime,
        pickuploc: this.state.pickuploc,
        noofpersons: this.state.noofpersons
      };

      console.log("#####BOOKING#########",booking);
      axios.post("http://localhost:3001/api/addbooking", { booking }).then(res => {
        console.log(res);
        console.log(res.data);
        this.props.history.push( `/booking/${this.state.userid}`);
      })
    }
    else {
      console.error('Invalid')
    }
  };

  handleChange = e => {
   // e.preventDefault();
    const { name, value } = e.target;
       let formErrors = this.state.formErrors;
    switch (name) {
      case 'userid':
        formErrors.userid = idRegex.test(value) ? '' : 'Invalid userid (number only)';
        break;
      case 'taxiid':
        formErrors.taxiid = idRegex.test(value) ? '' : 'Invalid taxiid (number only)';
        break;
      case 'pickupdate':
        formErrors.pickupdate = value >= today_date  ? '' : 'Date should be in future' ;
        break;
      case 'pickuptime':
        formErrors.pickuptime = (value < today_time && this.state.pickupdate === today_date) ? 'time should be in future' : '';
        break;
      case 'pickuploc':
        formErrors.pickuploc = value.length < 3 ? 'minimum 3 char' : '';
        break;
      case 'noofpersons':
        formErrors.noofpersons = (idRegex.test(value) && value >0) ?  '' : 'Only Number greater than 0';
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state))
  }

  //this.handleSubmit= this.handleSubmit.bind(this);

  render() {
    const { formErrors } = this.state;
    let uid=sessionStorage.getItem('suid');
    this.state.userid = uid;
    let taxis = this.state.taxiinfo.map((tinfo) => {
      return<option key={tinfo.Taxi_Id}>{tinfo.Taxi_Id}</option>
    })
    return <div className="wrapper">
      <div className="form-wrapper">
        <h1>Taxi Booking Form</h1>
        <form  noValidate>
          <div className="userid">
            <label htmlFor="userid">User Id</label>
            <input type="userid" className="{formErrors.userid.length > 0 ? 'errors':null}" 
            placeholder="Userid" value={uid} name="userid" onChange={this.handleChange} disabled noValidate ></input>
            {formErrors.userid.length > 0 && (
              <span className="errorMessage">{formErrors.userid}</span>
            )}
          </div>
          <div className="taxiid">
            <label htmlFor="taxiid">Taxi Id</label>
            <select id = "Taxid"  onClick={this.getTaxis} 
            className="{formErrors.userid.length > 0 ? 'errors':null}"
            placeholder="TaxiId" name="taxiid"  onChange={this.handleChange} noValidate> 
            <option>Taxi_Id</option>
               {taxis}
             </select>
             {formErrors.taxiid.length > 0 && (
              <span className="errorMessage">{formErrors.taxiid}</span>
            )}
          </div>
          <div className="pickupdate">
            <label htmlFor="pickupdate">Pickup Date</label>
            <input type="date" className="{formErrors.pickupdate.length > 0 ? 'errors':null}" placeholder="pickupdate" name="pickupdate" onChange={this.handleChange} noValidate ></input>
          
          {formErrors.pickupdate.length > 0 && (
              <span className="errorMessage">{formErrors.pickupdate}</span>
            )}
            </div>

          <div className="pickuptime">
            <label htmlFor="pickuptime">Pickup Time</label>
            <input type="time" className="{formErrors.pickuptime.length > 0 ? 'errors':null}" placeholder="pickuptime" name="pickuptime" onChange={this.handleChange} noValidate ></input>
            {formErrors.pickuptime.length > 0 && (
              <span className="errorMessage">{formErrors.pickuptime}</span>
            )}
          </div>
          <div className="pickloc">
            <label htmlFor="pickuploc">Pickup Address</label>
            <input type="pickuploc" className="{formErrors.pickuploc.length > 0 ? 'errors':null}" placeholder="Pickup Address" name="pickuploc" onChange={this.handleChange} noValidate ></input>
            {formErrors.pickuploc.length > 0 && (
              <span className="errorMessage">{formErrors.pickuploc}</span>
            )}
          </div>
          <div className="noofpersons">
            <label htmlFor="noofpersons">No of Persons</label>
            <input type="noofpersons" className="{formErrors.noofpersons.length > 0 ? 'errors':null}" placeholder="no of persons" name="noofpersons" onChange={this.handleChange} noValidate ></input>
            {formErrors.noofpersons.length > 0 && (
              <span className="errorMessage">{formErrors.noofpersons}</span>
            )}
          </div>
          <div className="buttons">
            <button onClick={this.handleSubmit} >Confirm Booking</button>
           </div>

        </form>
      </div>
    </div>
  }
}
export default Createbooking;
