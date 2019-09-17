import React from "react";
import axios from "axios";
import "./App.css";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const formValid = formErrors => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false)
  });
  return valid;
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    };
  }

  handleSubmit = e => {
    // console.log('submitted')
    e.preventDefault();
    console.log("after prevent default");
    console.log(this.state.firstName);
    if (formValid(this.state.formErrors)) {
      const user = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      };
      console.log(this.state);
      axios.post("http://localhost:3001/api/register",{ user }).then(res => {
        console.log(res);
        console.log(res.data);
        this.props.history.push( `/login`)
      })

      }
    else {
      console.error('Invalid')
    }
  };
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case 'firstName':
        formErrors.firstName = value.length < 3 ? 'minimum 3 char' : '';
        break;
      case 'lastName':
        formErrors.lastName = value.length < 3 ? 'minimum 3 char' : '';
        break;
      case 'email':
        formErrors.email = emailRegex.test(value) ? '' : 'Invalid Email';
        break;
      case 'password':
        formErrors.password = value.length < 6 ? 'minimum 6 char' : '';
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state))

    //console.log('The form details are ', this.state.firstName)

  }
  render() {
    const { formErrors } = this.state
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create User Account</h1>
          <form  noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="{formErrors.firstName.length > 0 ? 'errors':null}"
                placeholder="Enter First Name"
                name="firstName" onChange={this.handleChange}
                noValidate
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>

            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="{formErrors.lastName.length > 0 ? 'errors':null}"
                placeholder="Enter Last Name"
                name="lastName"
                onChange={this.handleChange}
                noValidate
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="{formErrors.email.length > 0 ? 'errors':null}"
                placeholder="Enter Email"
                name="email" onChange={this.handleChange}
                noValidate
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="{formErrors.password.length > 0 ? 'errors':null}"
                placeholder="Enter Password"
                name="password" onChange={this.handleChange}
                noValidate
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="buttons">
              <button onClick={event => this.handleSubmit(event)  } >Create Account</button>
            </div>
          </form>
        </div>
      </div>

    )
  }

}

export default App;
