import React, { Component } from 'react';

class LandingScreenComponent extends Component {

    handleCustomerSignIn = (e) => {
        e.preventDefault();

        this.props.history.push('/customer-signin');
    };

    handleCustomerSignup = (e) => {
        e.preventDefault();

        this.props.history.push('/create-account');
    }

    handleRestautantSignIn = (e) => {
        e.preventDefault();

        this.props.history.push('/restaurant-login');
    };

    handleRestautantSignUp = (e) => {
        e.preventDefault();

        this.props.history.push('/restaurant-createaccount');
    };

    render() {
        return (
            <div className = "wrapper">

                <h1> Eat Local </h1>

                <div className="form-wrapper">
                    <h3>  Support local restaurants and earn rewards!<br/>
                     </h3>   

                    <div>
                                <small><a a href="#" onClick={this.handleCustomerSignIn} style={{ cursor: 'pointer' }}> Customer Sign in.</a></small>
                                <small> New here? <a a href="#" onClick={this.handleCustomerSignup} style={{ cursor: 'pointer' }}> Sign up.</a> </small>                          
                    </div>

                    <br></br> 

                    <div>
                                <small><a a href="#" onClick={this.handleRestautantSignIn} style={{ cursor: 'pointer' }}>  Restaurant Sign in.</a></small> 
                                <small> New Here?<a a href="#" onClick={this.handleRestautantSignUp} style={{ cursor: 'pointer' }}>  Sign up.</a></small>
                    </div>         
                </div>
            </div>
        );
    }
}

export default LandingScreenComponent;