import React, { Component } from "react";
import PropTypes from "prop-types";
import UserServices from "../services/UserServices";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  //validate form errors - empty
  Object.values(formErrors).forEach((val) => {
    if (val.length > 0) {
      valid = false;
    }
  });

  //validate form filled out
  Object.values(rest).forEach((val) => {
    if (val === null) {
      valid = false;
    }
  });

  return valid;
};

class CreateUserAccountComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,

      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },

      customerCreateAccountMessage: "",
    };
  }

  addUser = (fname, lname, email, password) => {
    const encrypted_password = UserServices.encryptWithSha512(password);
    const user = {
      fname: fname,
      lname: lname,
      email: email,
      password: encrypted_password,
    };

    UserServices.createAccount(user).then((res) => {
      const createAccountStatus = res.data.createAccountStatus;
      const message = res.data.customerCreateAccountMessage;
      if (createAccountStatus) {
        sessionStorage.setItem("customerName", fname);
        sessionStorage.setItem("customeEmail", email);
        sessionStorage.setItem("customerId", res.data.customerId);
        sessionStorage.setItem("customerLoggedin", "true");
        this.props.history.push("/customer-homescreen");
      } else {
        //  console.log("res is " + res.data);
        this.setState({ customerCreateAccountMessage: message });
        sessionStorage.setItem("customerLoggedin", "false");
        console.log(this.customerCreateAccountMessage);
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
      const fn = this.state.firstName;
      console.log(fn);

      const ln = this.state.lastName;
      console.log(ln);

      const em = this.state.email;
      console.log(em);

      const pwd = this.state.password;

      this.addUser(fn, ln, em, pwd);
      // const res = this.getMoviesFromApi();

      // console.log(res);
    } else {
      console.error("FORM INVALID - PLEASE ENTER DATA");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    let formErrors = this.state.formErrors;

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimim 3 characters required" : "";
        break;

      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimim 3 characters required" : "";
        break;

      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;

      case "password":

        formErrors.password = "";
        if (value.length < 6) {
          formErrors.password = "minimim 6 characters required";
        }
        if (value != this.state.confirmPassword) {
          formErrors.password = "passwords do not match";
        }
        break;
        formErrors.confirmPassword = "";
        if (value.length < 6) {
          formErrors.confirmPassword = "minimim 6 characters required";
        }
        if (value != this.state.password) {
          formErrors.confirmPassword = "passwords do not match";
        }
        break;

    case "confirmPassword":
        case "confirmPassword":
        formErrors.confirmPassword = "";
        if (value.length < 6) {
          formErrors.confirmPassword = "minimim 6 characters required";
        }
        if (value != this.state.password) {
          formErrors.confirmPassword = "passwords do not match";
        } else {
          formErrors.password = "";
        }
        break;



      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () =>
      console.log(this.state.formErrors)
    );
  };

  handleAccountClick = (e) => {
    e.preventDefault();

    this.props.history.push("/customer-signin");
  };

  render() {
    const { formErrors, customerCreateAccountMessage } = this.state;

    return (
      <div>
        <h2 className="text-center">Customer Signup</h2>

      <div className="wrapper">
        <div className="form-wrapper">
         
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName"> First Name </label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
            </div>

            {formErrors.firstName.length > 0 && (
              <span className="errorMessage">{formErrors.firstName}</span>
            )}

            <div className="lastName">
              <label htmlFor="lastName"> Last Name </label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />

              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>

            <div className="email">
              <label htmlFor="email"> Email </label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>

            <div className="email">
              <label htmlFor="password"> Password </label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>

            <div className="email">
              <label htmlFor="confirmPassword"> Confirm Password </label>
              <input
                className={
                  formErrors.confirmPassword.length > 0 ? "error" : null
                }
                placeholder="Confirm password"
                type="password"
                name="confirmPassword"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.confirmPassword.length > 0 && (
                <span className="errorMessage">
                  {formErrors.confirmPassword}
                </span>
              )}
            </div>

            <div className="standardButton">
              <button type="submit" onClick={this.handleSubmit}>
                Create Account
              </button>

              {customerCreateAccountMessage.length > 0 && (
                <span className="errorMessage">
                  {customerCreateAccountMessage}
                </span>
              )}

              {/* <small> Already have an Account?</small> */}
              <small>
                <a a href="#"
                  onClick={this.handleAccountClick}
                  style={{ cursor: "pointer" }}
                >
                  {" "}
                  Already have an Account?
                </a>
              </small>
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

export default CreateUserAccountComponent;
