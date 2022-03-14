import React, { Component } from "react";
import PropTypes from "prop-types";
import RestaurantServices from "../services/RestaurantServices";
import UserServices from "../services/UserServices";
import HeaderComponent from "./HeaderComponent";
import Popup from "reactjs-popup";
import QRGenericComponent from "./QRGenericComponent";

class LiveChallengeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liveChallenges: [],
      selectedChallenges: [],
      selectedRestaurants: [],
      customerEmailAddress: sessionStorage.getItem("customerEmailAddress"),
      customerName: sessionStorage.getItem("customerName"),
      customerId: sessionStorage.getItem("customerId"),
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

  liveChallengeHasSelectedRestaurant(challengeId) {
    const selectedRestaurantOptions = sessionStorage
      .getItem("selectedRestaurantOptions")
      .split(",");
    RestaurantServices.getRestaurantNamesForChallenege(challengeId).then(
      (res) => {
        const restaurantsForChallenge = res.data;
        console.log("fromDB", restaurantsForChallenge);
        return selectedRestaurantOptions.some((item) =>
          restaurantsForChallenge.includes(item)
        );
      }
    );
  }

  componentDidMount() {
    if (this.isCustomerLoggedIn()) {
      const selectedCuisineOptions = sessionStorage
        .getItem("selectedCuisineOptions")
        .split(",");
      const selectedCountyOptions = sessionStorage
        .getItem("selectedCountyOptions")
        .split(",");
      const selectedRestaurantOptions = sessionStorage
        .getItem("selectedRestaurantOptions")
        .split(",");
      // console.log("counties", selectedCountyOptions);
      // console.log("cuisines", selectedCuisineOptions);

      RestaurantServices.getAllLiveChallenges().then((res) => {
        console.log("componentDidMount");
        this.setState({ liveChallenges: res.data });
        this.setState({ selectedChallenges: res.data });
        //console.log("state is: " ,this.state);

        if (
          selectedCuisineOptions != "" ||
          selectedCountyOptions != "" ||
          selectedRestaurantOptions != ""
        ) {
          const filteredChallenges = [];
          this.state.liveChallenges.map((liveChallenge) => {
            RestaurantServices.getRestaurantNamesForChallenege(
              liveChallenge.challengeId
            ).then((res1) => {
              const restaurantsForChallenge = res1.data;
              console.log("fromDB", restaurantsForChallenge);
              const resExist = selectedRestaurantOptions.some((item) =>
                restaurantsForChallenge.includes(item)
              );
              console.log("resExists".resExist);
              if (
                selectedCountyOptions.some((v) => v === liveChallenge.county) ||
                selectedCuisineOptions.some(
                  (v) => v === liveChallenge.cuisine
                ) ||
                resExist
              ) {
                filteredChallenges.push(liveChallenge);
              }
              console.log("filteredChallenges123", filteredChallenges);
              this.setState({ selectedChallenges: filteredChallenges });
            });
          });
        }
      });
    }
  }

  participateChallenge(challengeId, challengeName) {
    sessionStorage.setItem("participateChallengeId", challengeId);
    sessionStorage.setItem("participateChallengeName", challengeName);
    this.props.history.push("/customer-participate-challenge", challengeId);
  }

  render() {
    return (
      <div>
        <HeaderComponent
          homeUrl="/customer-homescreen"
          name={this.state.customerName}
        />
        <h2 className="text-center">Live Challenges</h2>
        <div className="wrapper">
          <div className="form-wrapper">
            <div className="row">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th> Challenges </th>
                    <th> Participating Restaurants </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.selectedChallenges.map((challenge) => (
                    <tr key={challenge.challengeTitle}>
                      <td>
                      <Popup
                      trigger={
                        <a  href="#" style={{ cursor: "pointer"}}>
                            {/* , color:"#0000EE"  */}
                        {challenge.challengeTitle}
                      </a>
                      }
                    >
                      <div>
                        <b>Min Purchase</b> : ${challenge.purchase} <br/>
                        <b>Reward</b> : {challenge.reward}
                      </div>
                    </Popup>
                        {/* <a  style={{ cursor: "pointer", color:"#0000EE" }}>
                          {challenge.challengeTitle}
                        </a> */}
                      </td>
                      <td>
                      <div className="standardButton">
                          <button
                            onClick={() =>
                              this.participateChallenge(
                                challenge.challengeId,
                                challenge.challengeTitle
                              )
                            }
                          >
                            {" "}
                            View Restaurants{" "}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LiveChallengeComponent;
