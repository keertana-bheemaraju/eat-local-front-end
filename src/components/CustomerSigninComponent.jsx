import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateUserAccountComponent from './CreateUserAccountComponent';
import UserServices from '../services/UserServices';


class CustomerSigninComponent extends Component {
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
    
        let loginStatusMessage = this.state.loginStatusMessage;

        const username = this.state.username;
        console.log(username);

        const encrypted_password = UserServices.encryptWithSha512(this.state.password);
        console.log(encrypted_password);

        const credentials = { username: username, password: encrypted_password };
        UserServices.validateCredentials(credentials).then(res => {
            const loginStatus = res.data.loginStatus;
            const message = res.data.message;
            const name = "loginStatusMessage"
            if(loginStatus == true) {
                sessionStorage.setItem("customerEmailAddress", username)
                sessionStorage.setItem("customerName", res.data.customerName)
                sessionStorage.setItem("customerId", res.data.customerId)
                sessionStorage.setItem("customerLoggedin", "true")
                this.props.history.push('/customer-homescreen');
            } else {
               // console.log(message);
               sessionStorage.setItem("customerLoggedin", "false")
               this.setState({loginStatusMessage:message})
            }
            
        });

    };

    handleHeresHelpClick = (e) => {
        e.preventDefault();

        this.props.history.push('/customer-hereshelp');
    };

    handleSignUpClick = (e) => {
        e.preventDefault();

        this.props.history.push('/create-account');
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
             
           <div><h2 className="text-center">Customer Signin</h2>
           
            <div className="wrapper">

                <div className="form-wrapper">

                    <form>
                        <div className="username">
                            <label htmlFor="username"> email </label>
                            <input
                                placeholder="email"
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

                        <div className="standardButton">

                            <button type="submit" onClick={this.handleSubmit}>
                                Login
                            </button>
                        
                            {loginStatusMessage.length > 0 && (
                                <span className="errorMessage">{loginStatusMessage}</span>
                            )}
                          
                            <div>
                                <small> Trouble logging in?</small>
                                <small><a a href="#" onClick={this.handleHeresHelpClick} style={{ cursor: 'pointer' }}>  Here's help.</a></small>
                           
                            </div>

                            <div>
                                <small> New here?  </small>
                                <small><a a href="#" onClick={this.handleSignUpClick} style={{ cursor: 'pointer' }}>  Sign up.</a></small>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
            </div>   
        );
    }
}


export default CustomerSigninComponent;
