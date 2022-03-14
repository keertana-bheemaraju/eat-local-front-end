import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RestaurantServices from '../services/RestaurantServices';
import HeaderComponent from './HeaderComponent';

class RestaurantExitChallengeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            enrolledChallenges: [],
            enrolledChallengeIds: [],
            restaurantId: sessionStorage.getItem("restaurantId"),
            restaurantName: sessionStorage.getItem("restaurantName")
        }

    }

    getEnrolledChallenges() {
        const joinChallengeInfo = { restaurantId: this.state.restaurantId };
        RestaurantServices.getEnrolledChallengeNames(joinChallengeInfo).then((res) => {
            this.setState({ enrolledChallenges: res.data });
            console.log(this.state);
        });

        RestaurantServices.getEnrolledChallenges(joinChallengeInfo).then((res) => {

            this.setState({enrolledChallengeIds: res.data});
            console.log(this.state);
        });
    }

    exitChallenge(challengeName) {
        const joinChallengeInfo = { restaurantId: this.state.restaurantId, restaurantName : this.state.restaurantName, challengeName : challengeName };
        RestaurantServices.exitChallenge(joinChallengeInfo).then((res) => {
            this.getEnrolledChallenges();
        });
        
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

        this.getEnrolledChallenges();
    }}

    render() {
        return (

            <div>
            <HeaderComponent homeUrl="/restaurant-homescreen" name={this.state.restaurantName}/>

            <div className="wrapper">

                <h1> Exit Challenge </h1>

           <div className="form-wrapper">

            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th >Challenge</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            this.state.enrolledChallenges.map(
                                challenge =>
                                
                                    <tr key={challenge}>
                                      
                                        <td><a style={{ cursor: 'pointer' }}>{challenge}</a></td>  
                                        <div className="standardButton">
                                        <td><button onClick={() => this.exitChallenge(challenge)} className="standardButton btn-info"> Exit Challenge </button></td>
                                        </div>
                                    </tr>
                            )
                        }

                    </tbody>

                </table>
            </div>
            </div>
            </div>
            </div>

        );
    }
}


export default RestaurantExitChallengeComponent;