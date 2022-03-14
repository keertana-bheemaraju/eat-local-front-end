import React, { Component } from "react";
import PropTypes from "prop-types";
import RestaurantServices from "../services/RestaurantServices";
import HeaderComponent from './HeaderComponent';
import toast, { Toaster } from "react-hot-toast";

const numberRegex = RegExp(
  /^\s*[+-]?(\d+|\d*\.\d+|\d+\.\d*)([Ee][+-]?\d+)?\s*$/
);

const formValid = ({ handleSubmitErrorMessage, formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });
  console.log("valid after form error check", valid)
  //validate form filled out

  console.log("rest", rest)
  Object.values(rest).forEach((val) => {
  if(val == null || val == "") {
    valid=false;
    console.log("val is incomplete", val)
  }
  });
  console.log("valid after form complete check", valid)
 // valid = visits != null || uniqueVisits != null;

  return valid;
};
const initialState = {
  challengeTitle: null,
      restaurantName: null,
      cuisine: null,
      purchase: null,
      reward: null,
     // visits: null,
      //uniqueVisits: null,
      zipcode: null,
      county: null,
      minimum: null,
      maximum: null,
      // isUniqueVisitDisabled: false,
      // isVisitsDisabled: false,
      handleSubmitErrorMessage:"",
      formErrors: {
        challengeTitle: "",
        restaurantName: "",
        cuisine: "",
        purchase: "",
        reward: "",
       // visits: "",
       // uniqueVisits: "",
        zipcode: "",
        county: "",
        minimum: "",
        maximum: "",
      }
};

class RestaurantProposeChallengeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      challengeTitle: null,
      restaurantName: null,
      cuisine: null,
      purchase: null,
      reward: null,
     // visits: null,
      //uniqueVisits: null,
      zipcode: null,
      county: null,
      minimum: null,
      maximum: null,
      // isUniqueVisitDisabled: false,
      // isVisitsDisabled: false,
      handleSubmitErrorMessage:"",
      formErrors: {
        challengeTitle: "",
        restaurantName: "",
        cuisine: "",
        purchase: "",
        reward: "",
       // visits: "",
       // uniqueVisits: "",
        zipcode: "",
        county: "",
        minimum: "",
        maximum: "",
      },
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    let formErrors = this.state.formErrors;

    switch (name) {
      case "challengeTitle":
        formErrors.challengeTitle =
          value.length < 3 ? "minimim 3 characters required" : "";
        break;

      case "restaurantName":
        formErrors.restaurantName =
          value.length < 3 ? "minimim 3 characters required" : "";
        break;

      case "cuisine":
        formErrors.cuisine =
          value.length < 3 ? "minimim 3 characters required" : "";
        break;

      case "purchase":
          formErrors.purchase = numberRegex.test(value)
          ? ""
          : "invalid order value";
        break;

      case "zipcode":
        formErrors.zipcode = value.length < 5 ? "Invalid zipcode" : "";
        break;

      case "county":
        formErrors.county =
          value.length < 3 ? "minimim 3 characters required" : "";
        break;

      // case "visits":
      //   if (value.length > 0) {
      //     this.setState({ isUniqueVisitDisabled: true });
      //   } else {
      //     this.setState({ isUniqueVisitDisabled: false });
      //   }
      //   break;

      // case "uniqueVisits":
      //   if (e.target.checked) {
      //     this.setState({ isVisitsDisabled: true });
      //   } else {
      //     this.setState({ isVisitsDisabled: false });
      //   }

      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () =>
      console.log(this.state.formErrors)
    );
    console.log("set values in handleChange");
  };

  proposeChallengeSubmit = (
    challengeTitle,
    restaurantName,
    cuisine,
    purchase,
    reward,
    // visits,
    // uniqueVisits,
    zipcode,
    county,
    minimum,
    maximum
  ) => {
    const proposeChallenge = {
      challengeTitle: challengeTitle,
      restaurantName: restaurantName,
      cuisine: cuisine,
      purchase: purchase,
      reward: reward,
      // visits: visits,
      // uniqueVisits: uniqueVisits,
      zipcode: zipcode,
      county: county,
      minimum: minimum,
      maximum: maximum,
    };

    RestaurantServices.proposeChallenge(proposeChallenge).then((res) => {
      const proposeChallengeStatus = res.data.proposeChallengeStatus;
      const message = res.data.proposeChallengeMessage;
      // if (proposeChallengeStatus) {
      //   this.props.history.push("/account-success");
      // } else {
      //   //  console.log("res is " + res.data);
      //   this.setState({ proposeChallengeMessage: message });
      //   console.log(this.proposeChallengeMessage);
      // }
      toast(res.data.proposeChallengeMessage);
    
      this.setState(initialState);
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Entered handleSubmit");
    if (formValid(this.state)) {
      console.log("entered if");

      const challengeTitle = this.state.challengeTitle;
      console.log(challengeTitle);

      const restaurantName = this.state.restaurantName;
      console.log(restaurantName);

      const cuisine = this.state.cuisine;
      console.log(cuisine);

      const purchase = this.state.purchase;
      console.log(purchase);

      const reward = this.state.reward;
      console.log(reward);

      // const visits = this.state.visits;
      // console.log(visits);

      // const uniqueVisits = this.state.uniqueVisits;
      // console.log(uniqueVisits);

      const zipcode = this.state.zipcode;
      console.log(zipcode);

      const county = this.state.county;
      console.log(county);

      const minimum = this.state.minimum;
      console.log(minimum);

      const maximum = this.state.maximum;
      console.log(maximum);

      this.proposeChallengeSubmit(
        challengeTitle,
        restaurantName,
        cuisine,
        purchase,
        reward,
        // visits,
        // uniqueVisits,
        zipcode,
        county,
        minimum,
        maximum
      );
    } else {
      console.log("entered else");
      console.error("FORM INVALID - PLEASE ENTER DATA");
      console.error(this.state)
      this.setState({handleSubmitErrorMessage:"Form incomplete"})
    }
  };

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
    }}

  render() {
    const { handleSubmitErrorMessage, formErrors } = this.state;

    return (
      <div>
        <HeaderComponent homeUrl="/restaurant-homescreen" name={sessionStorage.getItem("restaurantName")}/>
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Propose Challenge</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="pc">
              <label htmlFor="pc"> Challenge Title </label>
              <input
                className="challengeTitle"
                placeholder="Challenge Title"
                type="text"
                name="challengeTitle"
                noValidate
                onChange={this.handleChange}
              />
                          {formErrors.challengeTitle.length > 0 && (
              <span className="errorMessage">{formErrors.challengeTitle}</span>
            )}
            </div>


            <div className="pc">
              <label htmlFor="pc"> Restaurant Name</label>
              <input
                className="restaurantName"
                placeholder="Restaurant Name"
                type="text"
                name="restaurantName"
                noValidate
                onChange={this.handleChange}
              />
                          {formErrors.restaurantName.length > 0 && (
              <span className="errorMessage">{formErrors.restaurantName}</span>
            )}
            </div>


            <div className="pc">
              <label htmlFor="pc"> Cuisine</label>
              <input
                className="cuisine"
                placeholder="Cuisine"
                type="text"
                name="cuisine"
                noValidate
                onChange={this.handleChange}
              />
                        {formErrors.cuisine.length > 0 && (
              <span className="errorMessage">{formErrors.cuisine}</span>
            )}
            </div>
  

            <div className="pc">
              <label htmlFor="pc"> Purchase</label>
              <input
                className="purchase"
                placeholder="0.00"
                type="text"
                name="purchase"
                noValidate
                onChange={this.handleChange}
              />
                          {formErrors.purchase.length > 0 && (
              <span className="errorMessage">{formErrors.purchase}</span>
            )}
            </div>


            <div className="pc">
              <label htmlFor="pc"> Reward</label>
              <input
                className="reward"
                placeholder="Reward"
                type="text"
                name="reward"
                noValidate
                onChange={this.handleChange}
              />
                          {formErrors.reward.length > 0 && (
              <span className="errorMessage">{formErrors.reward}</span>
            )}
            </div>


            {/* <div className="visits">
              <label htmlFor="visits"> Visits</label>
              <input
                className="visits"
                placeholder="Visits"
                type="text"
                name="visits"
                disabled={isVisitsDisabled}
                noValidate
                onChange={this.handleChange}
              />
            </div>
           

            <div className="uniqueVisits">
              <label htmlFor="unique"> Unique Visit</label>
              <input
                className="uniqueVisits"
                type="checkbox"
                disabled={isUniqueVisitDisabled}
                name="uniqueVisits"
                noValidate
                onChange={this.handleChange}
              />
            </div> */}
          

          <small>Area</small>

          <div className="pc">
            <label htmlFor="pc"> Zipcode</label>
            <input
              className="zipcode"
              placeholder="Zipcode"
              type="text"
              name="zipcode"
              noValidate
              onChange={this.handleChange}
            />
            {formErrors.zipcode.length > 0 && (
              <span className="errorMessage">{formErrors.zipcode}</span>
            )}
          </div>
          

          <div className="pc">
            <label htmlFor="pc"> County </label>
            <input
              className="county"
              placeholder="County"
              type="text"
              name="county"
              noValidate
              onChange={this.handleChange}
            />
            {formErrors.county.length > 0 && (
              <span className="errorMessage">{formErrors.county}</span>
            )}
          </div>
          

          <small>Number of participating restaurants</small>

          <div className="pc">
            <label htmlFor="pc"> Minimum </label>
            <input
              className="minimum"
              placeholder="Minimum"
              typ="text"
              name="minimum"
              noValidate
              onChange={this.handleChange}
            />
            {formErrors.minimum.length > 0 && (
              <span className="errorMessage">{formErrors.minimum}</span>
            )}
          </div>
          

          <div className="pc">
            <label htmlFor="pc"> Maximum </label>
            <input
              className="maximum"
              placeholder="Maximum"
              type="text"
              name="maximum"
              noValidate
              onChange={this.handleChange}
            />
            {formErrors.maximum.length > 0 && (
              <span className="errorMessage">{formErrors.maximum}</span>
            )}
          </div>
          

          <div className="standardButton">
            <button type="submit" onClick={this.handleSubmit}>
              Submit
            </button>
            <Toaster/>
            {handleSubmitErrorMessage.length > 0 && (
                <span className="errorMessage">
                  {handleSubmitErrorMessage}
                </span>
              )}
          </div>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

export default RestaurantProposeChallengeComponent;
