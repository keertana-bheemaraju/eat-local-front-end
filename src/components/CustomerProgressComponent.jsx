import React, { Component } from "react";
import PropTypes from "prop-types";
import HeaderComponent from "./HeaderComponent";
import UserServices from "../services/UserServices";
import Popup from "reactjs-popup";
import QRGenericComponent from "./QRGenericComponent";

const HOST = "http://eat-local.us-east-1.elasticbeanstalk.com";

// const HOST = "192.168.1.7:3000";

// const HOST = "192.168.1.7:8080";

class CustomerProgressComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerEmailAddress: sessionStorage.getItem("customerEmailAddress"),
      customerName: sessionStorage.getItem("customerName"),
      customerId: sessionStorage.getItem("customerId"),
      loggedIn: true,
      customerProgressData: [],
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

  participateChallenge(challengeId, challengeName) {
    sessionStorage.setItem("participateChallengeId", challengeId);
    sessionStorage.setItem("participateChallengeName", challengeName);
    this.props.history.push("/customer-challenge-progress", challengeId);
  }

  componentDidMount() {
    if (this.isCustomerLoggedIn()) {
        console.log("email", sessionStorage.getItem("customerEmailAddress"))
      this.setState({
        customerEmailAddress: sessionStorage.getItem("customerEmailAddress"),
      });
      this.setState({ customerId: sessionStorage.getItem("customerId") });
      this.setState({ customerName: sessionStorage.getItem("customerName") });
      console.log("state", this.state);
      // fetch reward progress and display
      UserServices.getCustomerProgress(this.state.customerId).then((res) => {
        this.setState({ customerProgressData: res.data });
      });
    }
  }
  
  getQRCodeUrl(rewardProgress) {
    const url = HOST + "/validate-order?customerIdForValidation=" + rewardProgress.customerId + "&challengeIdForValidation=" + rewardProgress.challengeId 
    + "&customerNameForValidation=" + rewardProgress.customerName + "&challengeNameForValidation=" + rewardProgress.challengeName; 
    console.log(url);
    return url;
  }

  render() {
    const { customerProgressData } = this.state;
    return (
      <div>
        <HeaderComponent
          homeUrl="/customer-homescreen"
          name={this.state.customerName}
        />
        <h2>Customer Progress</h2>
        <div className="wrapper">
          <div className="form-wrapper">
            <div className="row">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th> Challenge Progress</th>
                    <th> Orders validated</th>
                    <th> Minimum order count for reward </th>
                    <th> Validate your order here</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.customerProgressData.map((customerProgress) => (
                    <tr key={customerProgress.id}>
                      <td><a href="#" onClick={() =>
                              this.participateChallenge(
                                customerProgress.challengeId,
                                customerProgress.challengeTitle
                              )
                            }>{customerProgress.challengeName}</a></td>
                      <td>{customerProgress.progress}</td>
                      <td>{customerProgress.minForReward}</td>
                      <td><div className="standardButton">
                    <Popup
                      trigger={
                        <button className="standardButton"> QR Code</button>
                      }
                      position="right center"
                    >
                      <div>
                        <QRGenericComponent url={this.getQRCodeUrl(customerProgress)} />
                      </div>
                    </Popup>
                  </div></td>
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

CustomerProgressComponent.propTypes = {};

export default CustomerProgressComponent;
