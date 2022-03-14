import React, { Component } from "react";
import PropTypes from "prop-types";
import RestaurantServices from "../services/RestaurantServices";
import UserServices from "../services/UserServices";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import QRCodeComponent from "./QRCodeComponent";
import HeaderComponent from "./HeaderComponent";

class CustomerParticipateChallengeComponent extends Component {
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
      
        <div className="wrapper">

          <div className="form-wrapper">
            <div className="row">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th> Restaurants </th>
                    <th> Phone </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.allRestaurantsForChallenge.map((restaurant) => (
                    <tr key={restaurant.id}>
                      <td>{restaurant.restaurantName}</td>
                      <td>{restaurant.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="standardButton"> 
          <Popup
                      trigger={
                        <button> QR Code</button>
                      }
                      position="right center"
                    >
                      <div>
                        <QRCodeComponent/>
                      </div>
                    </Popup>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerParticipateChallengeComponent;
