import React, { Component } from "react";
import PropTypes from "prop-types";
import UserServices from "../services/UserServices";
import RestaurantServices from "../services/RestaurantServices";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const phoneRegex = RegExp(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  );

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  //validate form errors - empty

  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  //validate form filled out

  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class RestaurantCreateAccountComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantName: null,
      email: null,
      password: null,
      phone: null,

      formErrors: {
        restaurantName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: ""
      },
      restaurantCreateAccountMessage: "",
    };
  }

  addRestaurant = (rname, phone, email, password) => {
    const encrypted_password = RestaurantServices.encryptWithSha512(password);
    const restaurant = {
      restaurantName: rname,
      email: email,
      password: encrypted_password,
      phone: phone,
    };
    RestaurantServices.createAccount(restaurant).then((res) => {
      const createAccountStatus = res.data.createAccountStatus;
      const message = res.data.restaurantCreateAccountMessage;
      if (createAccountStatus) {
        sessionStorage.setItem("restaurantName", rname);
        sessionStorage.setItem("restaurantEmail", email);
        sessionStorage.setItem("restaurantId", res.data.restaurantId);
        this.props.history.push("/restaurant-homescreen");
      } else {
        //  console.log("res is " + res.data);
        this.setState({ restaurantCreateAccountMessage: message });
        console.log(this.restaurantCreateAccountMessage);
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
      const rn = this.state.restaurantName;
      console.log(rn);

      const ph = this.state.phone;
      console.log(ph);

      const em = this.state.email;
      console.log(em);

      const pwd = this.state.password;
      console.log(pwd);

      this.addRestaurant(rn, ph, em, pwd);
    } else {
      console.error("FORM INVALID - PLEASE ENTER DATA");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "restaurantName":
        formErrors.restaurantName =
          value.length < 3 ? "minimim 3 characters required" : "";
        break;

      case "phone":
        formErrors.phone = phoneRegex.test(value)
          ? ""
          : "invalid phone number";
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

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  handleAccountClick = (e) => {
    e.preventDefault();

    this.props.history.push("/restaurant-login");
  };

  render() {
    const { formErrors, restaurantCreateAccountMessage } = this.state;

    return (
      <div> 
        <h2 className="text-center">Restaurant Signup</h2>
      <div className="restaurantWrapper">
        <div className="restaurant-form-wrapper">

          <form onSubmit={this.handleSubmit} noValidate>
            <div className="restaurantName">
              <label htmlFor="restaurantName"> Restaurant Name </label>
              <input
                className={
                  formErrors.restaurantName.length > 0 ? "error" : null
                }
                placeholder="Restaurant Name"
                type="text"
                name="restaurantName"
                noValidate
                onChange={this.handleChange}
              />
            </div>

            {formErrors.restaurantName.length > 0 && (
              <span className="errorMessage">{formErrors.restaurantName}</span>
            )}

            <div className="email">
              <label htmlFor="email"> Phone </label>
              <input
                className={formErrors.phone.length > 0 ? "error" : null}
                placeholder="Phone"
                type="text"
                name="phone"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.phone.length > 0 && (
                <span className="errorMessage">{formErrors.phone}</span>
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

            <div className="restaurantName">
              <label htmlFor="password"> Password </label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>

            <div className="restaurantName">
              <label htmlFor="confirmPassword"> Confirm Password </label>
              <input
                className={
                  formErrors.confirmPassword.length > 0 ? "error" : null
                }
                placeholder="Confirm Password"
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

            <div className="restaurantStandardButton">
              <button type="submit" onClick={this.handleSubmit}>
                Create Account
              </button>

              {restaurantCreateAccountMessage.length > 0 && (
                <span className="errorMessage">
                  {restaurantCreateAccountMessage}
                </span>
              )}

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

export default RestaurantCreateAccountComponent;
