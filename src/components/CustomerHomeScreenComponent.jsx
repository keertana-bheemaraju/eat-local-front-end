import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomerSigninComponent from "./CustomerSigninComponent";
import HeaderComponent from './HeaderComponent';


class CustomerHomeScreenComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerEmailAddress: '',
            customerName: '',
            customerId: '',
            loggedIn: true
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { name } = e.target;

        switch (name) {

            case "challenge":
                this.props.history.push('/account-success');
                console.log("challengeSuccess");
                break;

            case "challengepreferences":
                this.props.history.push('/challenge-preferences');
                console.log("challengepreferencesSuccess");
                break;

            case "reward":
                this.props.history.push('/customer-rewards');
                console.log("rewardSuccess");
                break;
            case "progress":
                this.props.history.push('/customer-progress');
                
                break;
            case "validateorder":
                this.props.history.push('/account-success');
                console.log("validateorderSuccess");
                break;

        }

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
        if (this.isCustomerLoggedIn()) {
            this.setState({ customerEmailAddress: sessionStorage.getItem("customerEmailAddress") })
            this.setState({ customerId: sessionStorage.getItem("customerId") })
            this.setState({ customerName: sessionStorage.getItem("customerName") })
        }
    }

    render() {
        return (
            <div>
               <HeaderComponent homeUrl="/customer-homescreen" name={this.state.customerName}/>

                <div className="wrapper">
                    <div className="form-wrapper">

                        <form>
                            {/* <Text style={{color: '#fff'}}>Connexion avec Facebook</Text> */}
                            
                            <div className="standardButton">
                                <button type="submit" name="challengepreferences" onClick={this.handleSubmit}>
                               Challenges    
                            </button>
                            </div>

                            <div className="standardButton">
                                <button type="submit" name="reward" onClick={this.handleSubmit}>
                                    Reward
                            </button>
                            </div>

                            <div className="standardButton">
                                <button type="submit" name="progress" onClick={this.handleSubmit}>
                                    Progress
                            </button>
                            </div>


                            <div className="standardButton">
                                <button type="submit" name="logout" onClick={this.handleLogout}>
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


export default CustomerHomeScreenComponent;

