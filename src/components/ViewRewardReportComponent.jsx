import React, { Component } from "react";
import PropTypes from "prop-types";
import RestaurantServices from "../services/RestaurantServices";
import HeaderComponent from './HeaderComponent';

class ViewRewardReportComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reportData: [],
    };
  }


  isRestaurantLoggedIn() {
    const loggedIn = sessionStorage.getItem("restaurantLoggedin");
    console.log("loggedIn", loggedIn)
    if (loggedIn === "false" || loggedIn === "" || loggedIn == null) {
        sessionStorage.clear();
        this.setState({ loggedIn: false })
       this.props.history.push('/restaurant-login');  
       return false;
    } else {
        return true;
    }
}

handleLogout() {
    sessionStorage.setItem("restaurantLoggedin", "false");
}


componentDidMount() {
  if(this.isRestaurantLoggedIn()) {
    RestaurantServices.getRewardReport(
      sessionStorage.getItem("restaurantId"),
      sessionStorage.getItem("reportType")
    ).then((res) => {
      console.log(res.data);
      this.setState({ reportData: res.data });
    });
  }}

  render() {
    return (
      <div>
      <HeaderComponent homeUrl="/restaurant-homescreen" name={sessionStorage.getItem("restaurantName")}/>
      <div className="restaurantWrapper">
        <div className="restaurant-form-wrapper">
          <div className="row">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th> Challenge Name </th>
                  <th> Customer Name </th>
                  <th> Restaurant Name </th>
                  <th> Date and Time </th>
                </tr>
              </thead>
              <tbody>
                {this.state.reportData.map((reportRow) => (
                  <tr key={reportRow.id}>
                    <td>{reportRow.challengeName}</td>
                    <td>{reportRow.customerName}</td>
                    <td>{reportRow.restaurantName}</td>
                    <td>{reportRow.redeemDate}</td>
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

ViewRewardReportComponent.propTypes = {};

export default ViewRewardReportComponent;
