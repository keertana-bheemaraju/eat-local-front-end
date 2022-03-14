import React, { Component } from "react";
import PropTypes from "prop-types";
import UserServices from "../services/UserServices";
import QRGenericComponent from "./QRGenericComponent";
import Popup from "reactjs-popup";
import HeaderComponent from './HeaderComponent';

class CustomerRewardsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerId: sessionStorage.getItem("customerId"),
      customerRewards: [],
    };
  }

  isCustomerLoggedIn() {
    const loggedIn = sessionStorage.getItem("customerLoggedin");
    console.log("loggedIn", loggedIn)
    if (loggedIn === "false" || loggedIn === "" || loggedIn == null) {
        sessionStorage.clear();
        this.setState({ loggedIn: false })
       this.props.history.push('/customer-signin');  
       return false;
    } else {
        return true;
    }
}

handleLogout() {
    sessionStorage.setItem("customerLoggedin", "false");
}

componentDidMount() {
    if(this.isCustomerLoggedIn()) {
      UserServices.getCustomerRewards(sessionStorage.getItem("customerId")).then(res=> {
        this.setState({customerRewards: res.data})
      })

}
}


  getQRCodeUrl(reward) {
    // const HOST = "192.168.1.7:8080";
    const HOST = "http://eat-local.us-east-1.elasticbeanstalk.com";
    // const HOST = "192.168.1.7:3000";
    const url =
      HOST +
      "/issue-reward?customerIdForReward=" +
      reward.customerId +
      "&challengeIdForReward=" +
      reward.challengeId +
      "&customerNameForReward=" +
      reward.customerName +
      "&challengeNameForReward=" +
      reward.challengeName;
    console.log(url);
    return url;
  }

  render() {
    const { customerId, customerRewards } = this.state;
    return (
      <div>
         <HeaderComponent homeUrl="/customer-homescreen" name={this.state.customerName}/>
      <div className="wrapper">
        <div className="form-wrapper">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th> Challenge Name </th>
              <th> Count </th>
              <th> Redeem </th>
            </tr>
          </thead>

          <tbody>
            {this.state.customerRewards.map((reward) => (
              <tr key={reward.challengeId}>
                <td>{reward.challengeName}</td>
                <td>{reward.rewardCount}</td>
                <td>
                  <div className="standardButton">
                    <Popup
                      trigger={
                        <button className="standardButton"> Available</button>
                      }
                      position = "right center"
                    >
                      <div>
                        <QRGenericComponent url={this.getQRCodeUrl(reward)} />
                      </div>
                    </Popup>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      </div>
    );
  }
}

CustomerRewardsComponent.propTypes = {};

export default CustomerRewardsComponent;
