import React, { Component } from "react";
import PropTypes from "prop-types";
import RestaurantServices from "../services/RestaurantServices";
import UserServices from "../services/UserServices";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import QRCodeComponent from "./QRCodeComponent";
import HeaderComponent from "./HeaderComponent";

class CustomerChallengeProgressComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      challengeId: sessionStorage.getItem("participateChallengeId"),
      challengeName: sessionStorage.getItem("participateChallengeName"),
      customerId: sessionStorage.getItem("customerId"),
      customerName: sessionStorage.getItem("customerName"),
      allRestaurantsForChallenge: [],
      customerValidatedRestaurantsForChallenege: [],
    };
  }

  isCustomerLoggedIn() {
    const loggedIn = sessionStorage.getItem("customerLoggedin");
    console.log("loggedIn", loggedIn);
    if (loggedIn === "false" || loggedIn === "" || loggedIn == null) {
      sessionStorage.clear();
      this.setState({ loggedIn: false });
      this.props.history.push("/customer-signin");
      return false;
    } else {
      return true;
    }
  }

  handleLogout() {
    sessionStorage.setItem("customerLoggedin", "false");
  }

  componentDidMount() {
    if (this.isCustomerLoggedIn()) {
      RestaurantServices.getRestaurantsForChallenege(
        this.state.challengeId
      ).then((res) => {
        this.setState({ allRestaurantsForChallenge: res.data });
        console.log(res);
      });

      UserServices.getValidatedRestaurants(
        this.state.customerId,
        this.state.challengeId
      ).then((res) => {
        console.log("componentDidMount");
        this.setState({ customerValidatedRestaurantsForChallenege: res.data });
        console.log(
          "cvd",
          this.state.customerValidatedRestaurantsForChallenege
        );
      });
    }
  }

  render() {
    return (
      <div>
        <HeaderComponent
          homeUrl="/customer-homescreen"
          name={this.state.customerName}
        />
        <h1> Restaurants List </h1>
        <div className="wrapper">
          
          <div className="form-wrapper">
            {this.state.allRestaurantsForChallenge.map((restaurant) => (
              <div className="customCheckBox">
                <label htmlFor="customCheckBox"> {restaurant.restaurantName}</label>
                <input
                  className="customCheckBox"
                  type="checkbox"
                  disabled
                  checked={this.state.customerValidatedRestaurantsForChallenege.some(
                    (v) => v.id === restaurant.id
                  )}
                  name
                  noValidate
                />
              </div>
            ))}
          </div>
          <br></br>
        </div>
      </div>
    );
  }
}

export default CustomerChallengeProgressComponent;
