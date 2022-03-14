import React, { Component } from 'react';
import RestaurantServices from '../services/RestaurantServices';
import toast, { Toaster } from 'react-hot-toast';

class RestaurantHeresHelpComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '', 
            passwordResetErrorMessage : ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        //clear password reset message
        this.setState({passwordResetErrorMessage:""});

        const restaurant = {email : this.state.email};
        console.log("email is " + this.state.email);
        console.log("restaurant is " + restaurant.email);
        RestaurantServices.sendPasswordResetEmail(restaurant).then((res) => {
            if(res.data.loginStatus) {
                toast("Password Rest Email sent");
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
            <div className="restaurantWrapper">

                <h1> <b>EAT LOCAL </b></h1>

                <div className="restaurant-form-wrapper">

                    <form>
                        <div className="enteremail">
                            <label htmlFor="enteremail"> Enter Email </label>
                            <input
                                placeholder="Enter Email"
                                type="text"
                                name="email"
                                noValidate
                                onChange={this.handleChange}                     
                            />
                        </div>

                        <div className="restaurantStandardButton">
                            <button type="submit" onClick={this.handleSubmit}>
                                Email me
                            </button>
                            {this.state.passwordResetErrorMessage.length > 0 && (
                                <span className="errorMessage">{this.state.passwordResetErrorMessage}</span>
                            )}
                            <Toaster/>
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


export default RestaurantHeresHelpComponent;