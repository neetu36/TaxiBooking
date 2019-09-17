import React, { Component } from 'react';
import axios from "axios";
import { Redirect } from 'react-router'
import './App.css';
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const idRegex = RegExp(/^[0-9\b]+$/);

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
var HH = today.getHours();
var MM = today.getMinutes();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

var today_date = yyyy + '-' + mm + '-' + dd;
var today_time = HH + ':' + MM;

const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false)
    });
    return valid;
}

class updatebooking extends Component {
    constructor() {
        super();
        this.bookingid = '';
        this.state = {
            bookingid: '', userid: null, taxiid: null, pickupdate: null, pickuptime: null, pickuploc: null, noofpersons: null,
            formErrors: { userid: '', taxiid: '', pickupdate: '', pickuptime: '', pickuploc: '', noofpersons: '' },
            updatestatus:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderRedirect= this.renderRedirect.bind(this);
    }
    componentDidMount() {
        console.log("before axios get", this.bookingid);

        axios.get("http://localhost:3001/api/getbookingbybid/" + this.bookingid).then(res => {
            console.log("after axios get 1  ", res.data.bookings[0]);
            let info = res.data.bookings[0];
            console.log("after axios get info.Pickup_Date  ", info.Pickup_Date);
            var pdate = info.Pickup_Date.split("T",1);
            console.log("****date after split***",res);
            this.setState({
                bookingid: info.Booking_Id, userid: info.User_Id, taxiid: info.Taxi_Id, pickupdate: pdate[0],
                pickuptime: info.Pickup_Time, pickuploc: info.Pickup_Location, noofpersons: info.No_Of_Persons
            });
        })


    }

    handleSubmit(eve) {
        eve.preventDefault();

        console.log('Inside Handle Submit :', this.state);
        if (formValid(this.state.formErrors)) {
            const booking = {
                User_Id: this.state.userid,
                Taxi_Id: this.state.taxiid,
                Pickup_Date: this.state.pickupdate,
                Pickup_Time: this.state.pickuptime,
                Pickup_Location: this.state.pickuploc,
                No_Of_Persons: this.state.noofpersons
            };
            console.log("*****this.booking.pickupdate*********", booking.Pickup_Date);
            axios.put("http://localhost:3001/api/updatebooking/" + this.state.bookingid, { booking }).then(res => {
                console.log("updatestatus ******  ", res.status);
                //.log("after update axios put  ", res.status);
                console.log("after update USER ID  ", booking.User_Id);
                if (res.data.status === true) {
                    this.setState({ updatestatus: true, User_Id: booking.User_Id });
                  }

            })
        }
     
    }
    handleChange(eve) {
        const { name, value } = eve.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case 'userid':
                formErrors.userid = idRegex.test(value) ? '' : 'Invalid userid (number only)';
                break;
            case 'taxiid':
                formErrors.taxiid = idRegex.test(value) ? '' : 'Invalid taxiid (number only)';
                break;
            case 'pickupdate':
                formErrors.pickupdate = value >= today_date ? '' : 'Date should be in future';
                break;
            case 'pickuptime':
                formErrors.pickuptime = (value < today_time && this.state.pickupdate === today_date) ? 'time should be in future' : '';
                break;
            case 'pickuploc':
                formErrors.pickuploc = value.length < 3 ? 'minimum 3 char' : '';
                break;
            case 'noofpersons':
                formErrors.noofpersons = (idRegex.test(value) && value > 0) ? '' : 'Only Number greater than 0';
                break;
            default:
                break;
        }
        this.setState({
            formErrors,
            [eve.target.name]: eve.target.value
        }, () => console.log("After set state in handle change  ", this.state));

    }

    renderRedirect = () => {
        
          return <Redirect to={`/booking/${this.state.User_Id}`} />
             }

    render() {
        const { formErrors } = this.state;
        this.bookingid = this.props.match.params["id"];
        console.log("Inside Render ***", this.bookingid);
        return<div><div className="wrapper">
            <div className="form-wrapper">
                <h1>Update Taxi Booking</h1>
                <form onSubmit={this.handleSubmit} noValidate>
                    <div className="bookingid">
                        <label htmlFor="bookingid">Booking Id</label>
                        <input type="bookingid" placeholder="bookingid" name="bookingid"
                            value={this.state.bookingid} onChange={this.handleChange} disabled  noValidate ></input>

                    </div>

                    <div className="userid">
                        <label htmlFor="userid">User Id</label>
                        <input type="userid" className="{formErrors.userid.length > 0 ? 'errors':null}"
                            placeholder="Userid" name="userid" value={this.state.userid} onChange={this.handleChange} noValidate ></input>
                        {formErrors.userid.length > 0 && (
                            <span className="errorMessage">{formErrors.userid}</span>
                        )}
                    </div>
                    <div className="taxiid">
                        <label htmlFor="taxiid">Taxi Id</label>
                        <input type="taxiid" className="{formErrors.userid.length > 0 ? 'errors':null}"
                            placeholder="TaxiId" name="taxiid" value={this.state.taxiid} onChange={this.handleChange} noValidate ></input>
                        {formErrors.taxiid.length > 0 && (
                            <span className="errorMessage">{formErrors.taxiid
                            }</span>
                        )}
                    </div>
                    <div className="pickupdate">
                        <label htmlFor="pickupdate">Pickup Date</label>
                        <input type="date" className="{formErrors.pickupdate.length > 0 ? 'errors':null}"
                            placeholder="pickupdate" name="pickupdate" value={this.state.pickupdate} onChange={this.handleChange} noValidate ></input>

                        {formErrors.pickupdate.length > 0 && (
                            <span className="errorMessage">{formErrors.pickupdate}</span>
                        )}
                    </div>

                    <div className="pickuptime">
                        <label htmlFor="pickuptime">Pickup Time</label>
                        <input type="time" className="{formErrors.pickuptime.length > 0 ? 'errors':null}"
                            placeholder="pickuptime" name="pickuptime" value={this.state.pickuptime} onChange={this.handleChange} noValidate ></input>
                        {formErrors.pickuptime.length > 0 && (
                            <span className="errorMessage">{formErrors.pickuptime}</span>
                        )}
                    </div>
                    <div className="pickloc">
                        <label htmlFor="pickuploc">Pickup Address</label>
                        <input type="pickuploc" className="{formErrors.pickuploc.length > 0 ? 'errors':null}"
                            placeholder="Pickup Address" name="pickuploc" value={this.state.pickuploc} onChange={this.handleChange} noValidate ></input>
                        {formErrors.pickuploc.length > 0 && (
                            <span className="errorMessage">{formErrors.pickuploc}</span>
                        )}
                    </div>
                    <div className="noofpersons">
                        <label htmlFor="noofpersons">No of Persons</label>
                        <input type="noofpersons" className="{formErrors.noofpersons.length > 0 ? 'errors':null}"
                            placeholder="no of persons" name="noofpersons" value={this.state.noofpersons} onChange={this.handleChange} noValidate ></input>
                        {formErrors.noofpersons.length > 0 && (
                            <span className="errorMessage">{formErrors.noofpersons}</span>
                        )}
                    </div>
                    <div className="buttons">
                        <button type="submit">Confirm Booking Update</button>
                    </div>

                </form>
            </div>
        </div>
              { (this.state.updatestatus) ? this.renderRedirect() : null   }
              </div>
    }

}

export default updatebooking;
