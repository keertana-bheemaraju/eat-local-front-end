import React, { Component } from "react";
import PropTypes from "prop-types";
import isMatch from "date-fns/isMatch";
import RestaurantServices from "../services/RestaurantServices";
import HeaderComponent from "./HeaderComponent";
import Popup from "reactjs-popup";

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

class RestaurantReportRewardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todaysReports: [],
      todaysRewards: [],
      thisWeekReports: [],
      thisWeekRewards: [],
      thisMonthReports: [],
      thisMonthRewards: []
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    let formErrors = this.state.formErrors;

    switch (name) {
      case "enterDateForReports":
        formErrors.enterDateForReports =
          value.length < 3 ? "Please enter valid date" : "";
        break;

      case "enterDateForRewards":
        formErrors.enterDateForRewards =
          value.length < 3 ? "Please enter valid date" : "";
        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () =>
      console.log(this.state.formErrors)
    );
  };

  handleSubmit_reports = (e) => {
    e.preventDefault();

    const reportType = e.target.name;
    sessionStorage.setItem("reportType", reportType);
    this.props.history.push("/view-report");
  };

  handleSubmit_rewards = (e) => {
    e.preventDefault();

    const reportType = e.target.name;
    sessionStorage.setItem("reportType", reportType);
    this.props.history.push("/view-reward-report");
  };

  isRestaurantLoggedIn() {
    const loggedIn = sessionStorage.getItem("restaurantLoggedin");
    console.log("loggedIn", loggedIn);
    if (loggedIn === "false" || loggedIn === "" || loggedIn == null) {
      sessionStorage.clear();
      this.setState({ loggedIn: false });
      this.props.history.push("/restaurant-login");
      return false;
    } else {
      return true;
    }
  }

  handleLogout() {
    sessionStorage.setItem("restaurantLoggedin", "false");
  }



  componentDidMount() {
    if (this.isRestaurantLoggedIn()) {
      //Get todays reports
      RestaurantServices.getReport(
        sessionStorage.getItem("restaurantId"),
        "today"
      ).then((res) => {
        console.log(res.data);
        this.setState({ todaysReports: res.data });
      });

      //Get todays rewards
      RestaurantServices.getRewardReport(
        sessionStorage.getItem("restaurantId"),
        "today"
      ).then((res) => {
        console.log(res.data);
        this.setState({ todaysRewards: res.data });
      });

      //Get this weeks reports
      RestaurantServices.getReport(
        sessionStorage.getItem("restaurantId"),
        "this-week"
      ).then((res) => {
        console.log(res.data);
        this.setState({ thisWeekReports: res.data });
      });

      //Get this weeks rewards
      RestaurantServices.getRewardReport(
        sessionStorage.getItem("restaurantId"),
        "this-week"
      ).then((res) => {
        console.log(res.data);
        this.setState({ thisWeekRewards: res.data });
      });

      //Get this months reports
      RestaurantServices.getReport(
        sessionStorage.getItem("restaurantId"),
        "this-month"
      ).then((res) => {
        console.log(res.data);
        this.setState({ thisMonthReports: res.data });
      });

      //Get this months rewards
      RestaurantServices.getRewardReport(
        sessionStorage.getItem("restaurantId"),
        "this-month"
      ).then((res) => {
        console.log(res.data);
        this.setState({ thisMonthRewards: res.data });
      });
    }
  }

  render() {
    const { formErrors } = this.state;

    return (
      <div>
        <HeaderComponent
          homeUrl="/restaurant-homescreen"
          name={sessionStorage.getItem("restaurantName")}
        />
        <div className="restaurantWrapper">
          <div className="restaurant-form-wrapper">
            <h2>View Reports</h2>
            <div className="row">
              <table className="table table-striped table-bordered">
                <tbody>
                  <tr>
                    <td>
                      <div
                        className="restaurantStandardButton"
                        onClick={this.handleSubmit_reports}
                      >
                        <button type="submit" name="today">
                          Today
                        </button>
                      </div>
                    </td>
                    <td>
                      <div
                        className="restaurantStandardButton"
                        onClick={this.handleSubmit_reports}
                      >
                        <button type="submit" name="this-week">
                          This Week
                        </button>
                      </div>
                    </td>
                    <td>
                      <div
                        className="restaurantStandardButton"
                        onClick={this.handleSubmit_reports}
                      >
                        <button type="submit" name="this-month">
                          This Month
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <br />
            <h2>View Rewards</h2>
            <div className="row">
              <table className="table table-striped table-bordered">
                <tbody>
                  <tr>
                    <td>
                      <div
                        className="restaurantStandardButton"
                        onClick={this.handleSubmit_rewards}
                      >
                        <button type="submit" name="today">
                          Today
                        </button>
                      </div>
                    </td>
                    <td>
                      <div
                        className="restaurantStandardButton"
                        onClick={this.handleSubmit_reports}
                      >
                        <button type="submit" name="this-week">
                          This Week
                        </button>
                      </div>
                    </td>
                    <td>
                      <div
                        className="restaurantStandardButton"
                        onClick={this.handleSubmit_rewards}
                      >
                        <button type="submit" name="this-month">
                          This Month
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <br />
            <h2>View Challenge Report</h2>
            <div className="row">
              <table className="table table-striped table-bordered">
                <tbody>
                  <tr>
                    <td>
                      <div
                        className="restaurantStandardButton"

                      >
                        <Popup
                          trigger={
                            <div className="restaurantStandardButton">
                              <button > Today </button>
                            </div>

                          }
                        >
                          <div>
                            Visits Today : {this.state.todaysReports.length}
                            <br />
                        Rewards Issued : {this.state.todaysRewards.length}
                          </div>
                        </Popup>
                      </div>
                    </td>

                    <td>
                      <div
                        className="restaurantStandardButton"

                      >
                        <Popup
                          trigger={
                            <div className="restaurantStandardButton">
                              <button > This Week </button>
                            </div>

                          }
                        >
                          <div>
                            Visits : {this.state.thisWeekReports.length}
                            <br />
                        Rewards Issued : {this.state.thisWeekRewards.length}
                          </div>
                        </Popup>
                      </div>
                    </td>

                    <td>
                      <div
                        className="restaurantStandardButton"

                      >
                        <Popup
                          trigger={
                            <div className="restaurantStandardButton">
                              <button > This Month </button>
                            </div>

                          }
                        >
                          <div>
                            Visits  : {this.state.thisMonthReports.length}
                            <br />
                        Rewards Issued : {this.state.thisMonthRewards.length}
                          </div>
                        </Popup>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Visits Today: {this.state.todaysReports.length}
            <br />
            Rewards Issued Today : {this.state.todaysRewards.length} */}
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantReportRewardComponent;
