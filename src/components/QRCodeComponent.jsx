import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from "react-qr-code";
import toast, { Toaster } from 'react-hot-toast';

class QRCodeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            challengeId: sessionStorage.getItem("participateChallengeId") ,
            challengeName: sessionStorage.getItem("participateChallengeName"),
            customerName : sessionStorage.getItem("customerName"),
            customerId : sessionStorage.getItem("customerId"),
            url : ''

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
        if(this.isCustomerLoggedIn()) {
        // const HOST = "192.168.1.7:8080";
        const HOST = "http://eat-local.us-east-1.elasticbeanstalk.com";
        const link = HOST + "/validate-order?customerIdForValidation=" + this.state.customerId + "&challengeIdForValidation=" + this.state.challengeId 
         + "&customerNameForValidation=" + this.state.customerName + "&challengeNameForValidation=" + this.state.challengeName; 
        console.log(link);
        this.setState({ url: link });
    }}

    render() {
        return (

            <div>
                <QRCode value={this.state.url} />
            </div>
        );
    }
}

QRCodeComponent.propTypes = {

};

export default QRCodeComponent;