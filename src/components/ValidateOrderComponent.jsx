import React, { Component } from "react";
import PropTypes from "prop-types";
import RestaurantServices from "../services/RestaurantServices";
import toast, { Toaster } from "react-hot-toast";
import HeaderComponent from "./HeaderComponent";

const numberRegex = RegExp(
  /^\s*[+-]?(\d+|\d*\.\d+|\d+\.\d*)([Ee][+-]?\d+)?\s*$/
);

class ValidateOrderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantId: "",
      restaurantName: "",
      restaurantLoggedin: "",
      customerIdForValidation: "",
      challengeIdForValidation: "",
      customerNameForValidation: "",
      challengeNameForValidation: "",
      orderValue: -1,
      orderValidationErrorMessage : "",
      overrideOrderValidationErrorMessage : "",
      formErrors: {
        orderValue: "",
      },
    };
  }

  componentDidMount() {
    console.log("comp did mount");

    const queryParams = new URLSearchParams(window.location.search);
    const customerIdForValidation = queryParams.get("customerIdForValidation");
    const challengeIdForValidation = queryParams.get(
      "challengeIdForValidation"
    );
    const customerNameForValidation = queryParams.get(
      "customerNameForValidation"
    );
    const challengeNameForValidation = queryParams.get(
      "challengeNameForValidation"
    );

    if (
      customerIdForValidation &&
      challengeIdForValidation &&
      customerNameForValidation &&
      challengeNameForValidation
    ) {
      sessionStorage.setItem(
        "customerIdForValidation",
        customerIdForValidation
      );
      sessionStorage.setItem(
        "challengeIdForValidation",
        challengeIdForValidation
      );
      sessionStorage.setItem(
        "customerNameForValidation",
        customerNameForValidation
      );
      sessionStorage.setItem(
        "challengeNameForValidation",
        challengeNameForValidation
      );

      console.log("customerIdForValidation is ", customerIdForValidation);
      console.log("challengeIdForValidation is ", challengeIdForValidation);
      console.log("customerNameForValidation is ", customerNameForValidation);
      console.log("challengeNameForValidation is ", challengeNameForValidation);

      const restaurantLoggedin = sessionStorage.getItem("restaurantLoggedin");
      console.log("restaurantLoggedin", restaurantLoggedin);
      if (
        restaurantLoggedin === "false" ||
        restaurantLoggedin === "" ||
        restaurantLoggedin == null
      ) {
        //sessionStorage.clear();
        this.setState({ restaurantLoggedin: false });
        this.props.history.push("/restaurant-login");
      } else {
        this.props.history.push("/restaurant-homescreen");
      }
    } else {
      this.setState({
        customerNameForValidation: sessionStorage.getItem(
          "customerNameForValidation"
        ),
      });
      this.setState({
        challengeNameForValidation: sessionStorage.getItem(
          "challengeNameForValidation"
        ),
      });
      this.setState({
        customerIdForValidation: sessionStorage.getItem(
          "customerIdForValidation"
        ),
      });
      this.setState({
        challengeIdForValidation: sessionStorage.getItem(
          "challengeIdForValidation"
        ),
      });
      this.setState({ restaurantId: sessionStorage.getItem("restaurantId") });
      this.setState({
        restaurantName: sessionStorage.getItem("restaurantName"),
      });
    }

    // Call validate-order endpoint
  }

  handleSubmit = (e) => {
    console.log("in handle submit");
    
    let valid = true;
    //validate form errors - empty
    Object.values(this.state.formErrors).forEach((val) => {
      if (val.length > 0) {
        valid = false;
      }
    });

    if(this.state.orderValue == -1) {
        valid = false;
    }

    if (valid) {
        console.log("isvalid")
      // store validation record in db - with timestamp - for reports
      const orderValidation = {
        customerId: this.state.customerIdForValidation,
        customerName: this.state.customerNameForValidation,
        restaurantId: this.state.restaurantId,
        restaurantName: this.state.restaurantName,
        challengeId: this.state.challengeIdForValidation,
        challengeName: this.state.challengeNameForValidation,
        orderValue: this.state.orderValue,
      };

      RestaurantServices.validateOrderWithOrderValueCheck(orderValidation).then((res) => {
        console.log("validation response is : ", res.data);

        toast(res.data.message);

        // clear validation customer details if the validation is successfull
        if(res.data.validationStatus == true) {
        sessionStorage.setItem("customerIdForValidation", "");
        sessionStorage.setItem("challengeIdForValidation", "");
        sessionStorage.setItem("customerNameForValidation", "");
        sessionStorage.setItem("challengeNameForValidation", "");
        }
      });
    } else {
        this.setState({orderValidationErrorMessage: "enter a valid order value"})
    }
  };

  handleSubmitOverride = (e) => {
    console.log("in handle submit override");
    
    let valid = true;
    //validate form errors - empty
    Object.values(this.state.formErrors).forEach((val) => {
      if (val.length > 0) {
        valid = false;
      }
    });

    if(this.state.orderValue == -1) {
        valid = false;
    }

    if (valid) {
        console.log("isvalid")
      // store validation record in db - with timestamp - for reports
      const orderValidation = {
        customerId: this.state.customerIdForValidation,
        customerName: this.state.customerNameForValidation,
        restaurantId: this.state.restaurantId,
        restaurantName: this.state.restaurantName,
        challengeId: this.state.challengeIdForValidation,
        challengeName: this.state.challengeNameForValidation,
        orderValue: this.state.orderValue,
      };

      RestaurantServices.validateOrder(orderValidation).then((res) => {
        console.log("validation response is : ", res.data);

        toast(res.data.message);

        // clear validation customer details if the validation is successfull
        if(res.data.validationStatus == true) {
        sessionStorage.setItem("customerIdForValidation", "");
        sessionStorage.setItem("challengeIdForValidation", "");
        sessionStorage.setItem("customerNameForValidation", "");
        sessionStorage.setItem("challengeNameForValidation", "");
        }
      });
    } else {
        this.setState({overrideOrderValidationErrorMessage: "please enter the order value"})
    }
  };


  handleHomeScreenButton = (e) => {
    this.props.history.push("/restaurant-homescreen");
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    let formErrors = this.state.formErrors;

    switch (name) {
      case "orderValue":
        formErrors.orderValue = numberRegex.test(value)
          ? ""
          : "invalid order value";
        break;
    }

    this.setState({ formErrors, [name]: value }, () =>
      console.log(this.state.formErrors)
    );
  };

  render() {
    const { formErrors, orderValidationErrorMessage, overrideOrderValidationErrorMessage } = this.state;
    const customerId = sessionStorage.getItem("customerIdForValidation");
    let show;
    if (customerId) {
      console.log("customerId here is ", customerId);
      show = (
        <div>
          Customer: {sessionStorage.getItem("customerNameForValidation")} <br />
          Challenge: {sessionStorage.getItem("challengeNameForValidation")} <br />
          <div className="maximum">
            <label htmlFor="maximum"> Enter Order Value </label>
            <input
              className="maximum"
              placeholder="0.00"
              type="text"
              name="orderValue"
              noValidate
              onChange={this.handleChange}
            />
            {formErrors.orderValue.length > 0 && (
              <span className="errorMessage">{formErrors.orderValue}</span>
            )}
          </div>
          <div className="standardButton">
            <button
              disabled={!this.state.customerNameForValidation}
              type="submit"
              name="ConfirmValidation"
              onClick={this.handleSubmit}
            >
            Validate Order
            </button>
            <Toaster />
            {orderValidationErrorMessage.length > 0 && (
                <span className="errorMessage">
                  {orderValidationErrorMessage}
                </span>
              )}
          </div>
          <div className="standardButton">
            <button
              disabled={!this.state.customerNameForValidation}
              type="submit"
              name="ConfirmValidationOverride"
              onClick={this.handleSubmitOverride}
            >
            Validation Override
            </button>
            <Toaster />
            {overrideOrderValidationErrorMessage.length > 0 && (
                <span className="errorMessage">
                  {overrideOrderValidationErrorMessage}
                </span>
              )}
          </div>
        </div>
      );
    } else {
      show = <div>No order to validate</div>;
    }

    return (
      <div>
        <HeaderComponent
          homeUrl="/restaurant-homescreen"
          name={this.state.restaurantName}
        />
        <div className="/restaurant-homescreen">
          <div className="restaurantWrapper">
          <div className="restaurant-form-wrapper">

            {show}

            <br/>

            <div className="restaurantStandardButton">
              <button
                type="submit"
                name="backToHomeScreen"
                onClick={this.handleHomeScreenButton}
              >
                Back To Home Screen
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default ValidateOrderComponent;
