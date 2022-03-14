import React, { Component } from "react";
import PropTypes from "prop-types";
import RestaurantServices from "../services/RestaurantServices";
import toast, { Toaster } from 'react-hot-toast';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, email, newPassword, confirmNewPassword }) => {
  let valid = true;

  //validate form errors - empty
  Object.values(formErrors).forEach((val) => {
    if (val.length > 0) {
      valid = false;
    }
  });

  if (email === null || newPassword === null || confirmNewPassword === null) {
    valid = false;
  }

  return valid;
};

class RestaurantPasswordResetComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      newPassword: null,
      confirmNewPassword: null,
      passwordResetErrorMessage: "",

      formErrors: {
        email: "",
        newPassword: "",
        confirmNewPassword: "",
      },
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    let formErrors = this.state.formErrors;

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;

      case "newPassword":
        formErrors.newPassword = "";
        if (value.length < 6) {
          formErrors.newPassword = "minimim 6 characters required";
        }
        if (value != this.state.confirmNewPassword) {
          formErrors.newPassword = "passwords do not match";
        }
        break;
      case "confirmNewPassword":
        formErrors.confirmNewPassword = "";
        if (value.length < 6) {
          formErrors.confirmNewPassword = "minimim 6 characters required";
        }
        if (value != this.state.newPassword) {
          formErrors.confirmNewPassword = "passwords do not match";
        } else {
          formErrors.newPassword = "";
        }
        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () =>
      console.log(this.state.formErrors)
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({passwordResetErrorMessage:""});
    if (formValid(this.state)) {
      const email = this.state.email;
      console.log(email);

      const pwd = this.state.newPassword;

      const encrypted_password = RestaurantServices.encryptWithSha512(pwd);
      const restaurant = { username: email, password: encrypted_password };
      RestaurantServices.resetPassword(restaurant).then((res) => {
        const response = res.data;
        if (response.loginStatus == true) {
          toast("Password Reset Success. \n Please login.");
        } else {
          this.setState({passwordResetErrorMessage:res.data.message});
        }
      });
    } else {
      console.error("FORM INVALID - PLEASE ENTER DATA");
    }
  };

  render() {
    const { formErrors, passwordResetErrorMessage } = this.state;
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <div className="confirmNewPassword">
            <label htmlFor="enterEmail"> Enter Email </label>
            <input
              placeholder="Enter Email"
              type="text"
              name="email"
              noValidate
              onChange={this.handleChange}
            />
            {formErrors.email.length > 0 && (
              <span className="errorMessage">{formErrors.email}</span>
            )}
          </div>

          <div className="newPassword">
            <label htmlFor="newPassword"> New Password </label>
            <input
              placeholder="Enter new Password"
              type="password"
              name="newPassword"
              noValidate
              onChange={this.handleChange}
            />
            {formErrors.newPassword.length > 0 && (
              <span className="errorMessage">{formErrors.newPassword}</span>
            )}
          </div>

          <div className="confirmNewPassword">
            <label htmlFor="confirmNewPassword"> Confirm New Password </label>
            <input
              placeholder="Confirm new Password"
              type="password"
              name="confirmNewPassword"
              noValidate
              onChange={this.handleChange}
            />
            {formErrors.confirmNewPassword.length > 0 && (
              <span className="errorMessage">
                {formErrors.confirmNewPassword}
              </span>
            )}
          </div>

          <div className="standardButton">
            <button type="submit" onClick={this.handleSubmit}>
              Submit
            </button>
            <Toaster/>
            {passwordResetErrorMessage.length > 0 && (
              <span className="errorMessage">{passwordResetErrorMessage}</span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantPasswordResetComponent;
