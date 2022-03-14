import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateUserAccountComponent from './CreateUserAccountComponent';
import UserServices from '../services/UserServices';
import RestaurantServices from '../services/RestaurantServices';

class RestaurantLoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            loginStatusMessage: "",
            formErrors: {
                password: "",
            },
        }; 
    }


    handleSubmit = (e) => {
        e.preventDefault();

        const username = this.state.username;
        console.log(username);

        const encrypted_password = RestaurantServices.encryptWithSha512(this.state.password);
        console.log(encrypted_password);

        const credentials = { username: username, password: encrypted_password };
        RestaurantServices.validateCredentials(credentials).then(res => {

            console.log(res.data);

            const loginStatus = res.data.loginStatus;
            const message = res.data.message;
            const restaurantName = res.data.restaurantName;
            const restaurantId = res.data.restaurantId;

            if (loginStatus == true) {
                
                sessionStorage.setItem("restaurantUsername", username);
                sessionStorage.setItem("restaurantName", restaurantName);
                sessionStorage.setItem("restaurantId", restaurantId);
                sessionStorage.setItem("restaurantLoggedin", "true");

                this.props.history.push  ('/restaurant-homescreen');
            } else {
                console.log(message);
                this.setState({ loginStatusMessage: message })
            }

        });

    };

    handleHelpClick = (e) => {
        e.preventDefault();

        this.props.history.push('/restaurant-hereshelp');
    };

    handleSignUpClick = (e) => {
        e.preventDefault();

        this.props.history.push('/restaurant-createaccount');
    };

    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {

            case "password":
                formErrors.password =
                    value.length < 6 ? "minimim 6 characters required" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };

    
    render() {
        const { formErrors, loginStatusMessage } = this.state;
        return (

            <div>
                <h2 className="text-center">Restaurant Login</h2>
            <div className="restaurantWrapper">
                <div className="restaurant-form-wrapper">

                    <form>
                        <div className="username">
                            <label htmlFor="username"> email </label>
                            <input
                                placeholder="email "
                                type="text"
                                name="username"
                                noValidate
                                onChange={this.handleChange}
                            />


                        </div>

                        <div className="username">
                            <label htmlFor="password"> Password </label>
                            <input
                                placeholder="Password"
                                type="password"
                                name="password"
                                noValidate
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="restaurantStandardButton">
                            <button type="submit" onClick={this.handleSubmit}>
                                Login
                            </button>

                            {loginStatusMessage.length > 0 && (
                                <span className="errorMessage">{loginStatusMessage}</span>
                            )}

                            <div>
                                <small> Trouble logging in?</small>
                                <small><a href="#" onClick={this.handleHelpClick} style={{ cursor: 'pointer' }}>  Here's help.</a></small>

                            </div>

                            <div>
                                <small> New here?  </small>
                                <small><a href="#" onClick={this.handleSignUpClick} style={{ cursor: 'pointer' }}>  Sign up.</a></small>
                            </div>

                        </div>
                    </form>
                </div>
            </div></div>

        );
    }
}


export default RestaurantLoginComponent;
