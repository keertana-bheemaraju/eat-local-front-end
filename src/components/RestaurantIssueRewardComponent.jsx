import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';
import RestaurantServices from '../services/RestaurantServices';
import HeaderComponent from './HeaderComponent';

class RestaurantIssueRewardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurantId: '',
            restaurantName: '',
            restaurantLoggedin: '',
            customerIdForReward: '',
            challengeIdForReward: '',
            customerNameForReward: '',
            challengeNameForReward: ''
        }
    }

   
    componentDidMount() {
        
        console.log("comp did mount");

        const queryParams = new URLSearchParams(window.location.search);
        const customerIdForReward = queryParams.get('customerIdForReward');
        const challengeIdForReward = queryParams.get('challengeIdForReward');
        const customerNameForReward = queryParams.get('customerNameForReward');
        const challengeNameForReward = queryParams.get('challengeNameForReward');

        if (customerIdForReward && challengeIdForReward && customerNameForReward && challengeNameForReward) {
            sessionStorage.setItem("customerIdForReward", customerIdForReward);
            sessionStorage.setItem("challengeIdForReward", challengeIdForReward);
            sessionStorage.setItem("customerNameForReward", customerNameForReward);
            sessionStorage.setItem("challengeNameForReward", challengeNameForReward);

            console.log("customerIdForReward is ", customerIdForReward);
            console.log("challengeIdForReward is ", challengeIdForReward);
            console.log("customerNameForReward is ", customerNameForReward);
            console.log("challengeNameForReward is ", challengeNameForReward);

            const restaurantLoggedin = sessionStorage.getItem("restaurantLoggedin");
            console.log("restaurantLoggedin", restaurantLoggedin)
            if (restaurantLoggedin === "false" || restaurantLoggedin === "" || restaurantLoggedin == null) {
                //sessionStorage.clear();
                this.setState({ restaurantLoggedin: false })
                this.props.history.push('/restaurant-login');
            } else {
                this.props.history.push('/restaurant-homescreen');
            }
         } else {
            this.setState({ customerNameForReward: sessionStorage.getItem("customerNameForReward") })
            this.setState({ challengeNameForReward: sessionStorage.getItem("challengeNameForReward") })
            this.setState({ customerIdForReward: sessionStorage.getItem("customerIdForReward") })
            this.setState({ challengeIdForReward: sessionStorage.getItem("challengeIdForReward") })
            this.setState({ restaurantId: sessionStorage.getItem("restaurantId") })
            this.setState({ restaurantName: sessionStorage.getItem("restaurantName") })
        }
    }

    handleHomeScreenButton = (e) => {
        this.props.history.push('/restaurant-homescreen');
    }

    handleSubmit = (e) => {
        console.log("in handle submit")

        RestaurantServices.issueReward(this.state.customerIdForReward, this.state.customerNameForReward,
            this.state.challengeIdForReward, this.state.challengeNameForReward,
            this.state.restaurantId, this.state.restaurantName ).then((res) => {
            console.log("issue reward response is : ", res.data);
            
            toast(res.data.message);

            // clear validation customer details 
            sessionStorage.setItem("customerIdForReward", "");
            sessionStorage.setItem("challengeIdForReward", "");
            sessionStorage.setItem("customerNameForReward", "");
            sessionStorage.setItem("challengeNameForReward", "");
        });

    }

    render() {
        const customerId = sessionStorage.getItem("customerIdForReward");
        let show ;
        if (customerId) {
             console.log("customerId here is ", customerId);
             show =
                <div>
                    Customer:  {this.state.customerNameForReward} <br/>
                    Challenge:  {this.state.challengeNameForReward} <br/>
                    <div className="standardButton">
                        <button type="submit" name="IssueReward" onClick={this.handleSubmit}>
                            Issue Reward
                         </button>
                         <Toaster />
                    </div>
                </div>;
        } else {
            show = <div>No rewards to issue at the moment</div>;
        }
        
        return (
            <div>
                <HeaderComponent homeUrl="/restaurant-homescreen" name={this.state.restaurantName}/>
            <div className="restaurantWrapper">
                <div className="restaurant-form-wrapper">
                    {show}
                    <div className="restaurantStandardButton">
                        <button type="submit" name="backToHomeScreen" onClick={this.handleHomeScreenButton}>
                            Back To Home Screen
                         </button>
                         
                    </div>
                </div>
               
            </div>
            </div>
        );
    }
}

RestaurantIssueRewardComponent.propTypes = {

};

export default RestaurantIssueRewardComponent;