import React, { Component } from "react";
import PropTypes from "prop-types";
import RestaurantServices from "../services/RestaurantServices";
import HeaderComponent from "./HeaderComponent";
import Popup from "reactjs-popup";
import RestaurantsInChallengeComponent from './RestaurantsInChallengeComponent'


class OpenChallengesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proposedChallenges: [],
      enrolledChallenges: [],
      restaurantId: sessionStorage.getItem("restaurantId"),
      restaurantName: sessionStorage.getItem("restaurantName"),
    };
  }

  componentDidMount() {
    this.refreshCounts();
  }

  refreshCounts() {
    RestaurantServices.getAllProposedChallenges().then((res) => {
      console.log("componentDidMount");
      this.setState({ proposedChallenges: res.data });
      console.log(this.state);
    });

    const joinChallengeInfo = { restaurantId: this.state.restaurantId };
    RestaurantServices.getEnrolledChallenges(joinChallengeInfo).then((res) => {
      console.log("componentDidMount");
      this.setState({ enrolledChallenges: res.data });
      console.log(this.state);
    });
  }

  joinChallenge(challengeId, challengeName) {
    console.log("in join challenge")
    const joinChallengeInfo = {
      challengeId: challengeId,
      restaurantId: this.state.restaurantId,
      challengeName: challengeName,
      restaurantName: this.state.restaurantName,
    };

    RestaurantServices.joinChallenge(joinChallengeInfo).then((res) => {
      console.log(res);
      this.refreshCounts();
    });
  }

  exitChallenge(challengeName) {
    console.log("in exit challenge")
    const joinChallengeInfo = {
      restaurantId: this.state.restaurantId,
      restaurantName: this.state.restaurantName,
      challengeName: challengeName,
    };
    RestaurantServices.exitChallenge(joinChallengeInfo).then((res) => {
      //this.getEnrolledChallenges();
      this.refreshCounts();
    });
  }

  viewParticipatingRestaurants(challengeId) {
    console.log("viewParticipatingRestaurants");
    
  }

  gotoProposeChallenge = (e) => {
    this.props.history.push("/restaurant-proposechallenge");
  };

  render() {
    return (
      <div>
        <HeaderComponent
          homeUrl="/restaurant-homescreen"
          name={this.state.restaurantName}
        />
        <h2 className="text-center">Open Challenges</h2>
        <div className="restaurantWrapper">
          <br></br>
          <div className="restaurant-form-wrapper">
            <div className="row">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Challenge</th>
                    <th>Vacancy</th>
                    <th>Participating Restaurants</th>
                    <th>Join Challenge</th>
                    <th>Exit Challenge</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.proposedChallenges.map((challenge) => (
                    <tr key={challenge.id}>
                      {/* <td>{challenge.challengeTitle}</td> */}
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
                        <div className="participating">
                          <label htmlFor="participating"> Participating</label>
                          <input
                            className="participating"
                            type="checkbox"
                            disabled
                            name="participating"
                            noValidate
                            checked={this.state.enrolledChallenges.some(
                              (v) => v == challenge.id
                            )}
                          />
                        </div>
                        <div className="available">
                          <label htmlFor="available"> Available</label>
                          <input
                            className="available"
                            type="checkbox"
                            disabled
                            name="available"
                            noValidate
                            checked={!this.state.enrolledChallenges.some(
                              (v) => v == challenge.id
                            )}
                          />
                        </div>
                      </td>
                      <td>{challenge.vacancy}</td>
                      <td> 
                      <Popup
                      trigger={
                        <div className="restaurantStandardButton">
                          <button > View </button>
                        </div>
                        
                      }
                    >
                      <div>
                        <RestaurantsInChallengeComponent challengeId={challenge.id}/>
                      </div>
                    </Popup>
                    </td>
                      <td>
                        <div className="restaurantStandardButton">
                          <button
                            disabled={this.state.enrolledChallenges.some(
                              (v) => v == challenge.id
                            )}
                            onClick={() =>
                              this.joinChallenge(
                                challenge.id,
                                challenge.challengeTitle
                              )
                            }
                         
                          >
                            {" "}
                            Join{" "}
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="restaurantStandardButton">
                          <button
                            disabled={!this.state.enrolledChallenges.some(
                              (v) => v == challenge.id
                            )}
                            onClick={() =>
                              this.exitChallenge(challenge.challengeTitle)
                            }
                          >
                            {" "}
                            Exit{" "}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="restaurantStandardButton">
              <button
                type="submit"
                name="proposechallenge"
                onClick={this.gotoProposeChallenge}
              >
                Propose Challenge
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OpenChallengesComponent.propTypes = {};

export default OpenChallengesComponent;
