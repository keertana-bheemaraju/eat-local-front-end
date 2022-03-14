import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderComponent from './HeaderComponent';

class RestaurantHomeScreenComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurantId : sessionStorage.getItem("restaurantId"),
            restaurantName : sessionStorage.getItem("restaurantName")
            }
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
        console.log("in handleLogout");
        sessionStorage.setItem("restaurantLoggedin", "false");
    }

    componentDidMount() {
        if(this.isRestaurantLoggedIn()) {

    }}

    handleSubmit = (e) => {
        e.preventDefault();
        const { name } = e.target;

        switch (name) {

            case "validateorderrestaurant":
                this.props.history.push('/validate-order');
               // console.log("validateorderrestaurantsuccess");
                break;
            
            case "issueReward":
                this.props.history.push('/issue-reward');
                break;

            case "viewreportandreward":
                this.props.history.push('/restaurant-reportreward');
                console.log("viewreportsuccess");
                break;

            case "joinchallenge":
                this.props.history.push('/restaurant-openchallenges');
                console.log("joinchallengesuccess");
                break;
            case "proposechallenge":
                this.props.history.push('/restaurant-proposechallenge');
                console.log("proposechallengeSuccess");
                break;
            case "exitchallenge":
                this.props.history.push('/restaurant-exit-challenge');
                console.log("exitchallengeSuccess");
                break;

        }

    }

    
    render() {
        return (
            <div>
                <HeaderComponent homeUrl="/restaurant-homescreen" name={this.state.restaurantName}/>
            <div className="restaurantWrapper">

                {/* <h4>Welcome {this.state.restaurantName} </h4> */}

                <div className="restaurant-form-wrapper">
                  
                    <form>

                        <div className="restaurantStandardButton">
                            <button type="submit" name="validateorderrestaurant" onClick={this.handleSubmit}>
                                Validate Order
                            </button> <b></b>
                        </div>

                        <div className="restaurantStandardButton">
                            <button type="submit" name="issueReward" onClick={this.handleSubmit}>
                                Issue Reward
                            </button>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>

                        <div className="restaurantStandardButton">
                            <button type="submit" name="viewreportandreward" onClick={this.handleSubmit}>
                                View Reports 
                            </button>
                        </div>

                        <div className="restaurantStandardButton">
                            <button type="submit" name="joinchallenge" onClick={this.handleSubmit}>
                            Manage Challenges
                            </button>
                        </div>

       
                        <br/>
                        <br/>
                        <br/>                                              
                        <br/>

                        <div className="restaurantStandardButton">
                            <button type="submit" name="restaurantLogout" onClick={this.handleLogout}>
                            Logout
                            </button>
                        </div>

                    </form>
                </div>
            </div>
            </div>
        );
    }
}


export default RestaurantHomeScreenComponent;