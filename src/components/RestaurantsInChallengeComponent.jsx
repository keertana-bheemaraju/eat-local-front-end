import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RestaurantServices from '../services/RestaurantServices';

class RestaurantsInChallengeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantList : []
        }        
    }

    componentDidMount() {
        const challengeId = this.props.challengeId;
        RestaurantServices.getRestaurantsForChallenege(challengeId).then(res => {
            this.setState({restaurantList:res.data})
        })
    }


    render() {
        return (
            <div>
               {this.state.restaurantList.map((restaurant) => (
                   <div>
                       {restaurant.restaurantName  }
                       </div>
                    
                ))}
            </div>
        );
    }
}

RestaurantsInChallengeComponent.propTypes = {

};

export default RestaurantsInChallengeComponent;