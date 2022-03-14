import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateUserAccountComponent from './CreateUserAccountComponent';
import UserServices from '../services/UserServices';
import toast, { Toaster } from 'react-hot-toast';

class HeresHelpComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email : '', 
            passwordResetErrorMessage : ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({passwordResetErrorMessage:""});
        const user = {email : this.state.email};
        console.log("email is " + this.state.email);
        UserServices.sendPasswordResetEmail(user).then((res) => {
            if(res.data.loginStatus) {
                toast("Password Reset Email sent");
            } else {
                this.setState({passwordResetErrorMessage:res.data.message});
            }
        });

      };

      handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({email:value});
      }

    render() {
        return (
            <div className="wrapper">

                <h1> EAT LOCAL </h1>

                <div className="form-wrapper">

                    <form onSubmit={this.handleSubmit} >
                        <div className="email">
                            <label htmlFor="email"> Enter Email </label>
                            <input
                                placeholder="Enter Email"
                                type="text"
                                name="email"
                                noValidate  
                                onChange={this.handleChange}                           
                            />
                        </div>

                        <div className="emailme">
                            <button type="submit" onClick={this.handleSubmit}>
                                Send password reset link
                            </button>
                            <Toaster/>
                            {this.state.passwordResetErrorMessage.length > 0 && (
                                <span className="errorMessage">{this.state.passwordResetErrorMessage}</span>
                            )}
                        </div>
                        

                            <div>
                            <small> Password reset link will be sent to your Email </small>
                        </div>


                    </form>
                </div>
            </div>
        );
    }
}


export default HeresHelpComponent;