import React, { Component } from 'react';
import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import Select from 'react-select';
import UserServices from '../services/UserServices';
import HeaderComponent from './HeaderComponent';


class CustomerChallengePreferencesComponent extends Component {
    constructor(props) {
        super(props);

        // Make an API call with these cuisines as input
        let countyListFromDB = [];
        let allCountyOptions = [];
        let cuisines = [];
        UserServices.getCountyList(cuisines).then(res => {

            countyListFromDB = res.data;
            console.log(countyListFromDB);


            for (const val of countyListFromDB) {
                allCountyOptions.push({ value: val, label: val })
            }

            console.log(allCountyOptions);
        });

        // Make an API call with these counties as input
        let cuisineListFromDB = [];
        let allCuisineOptions = [];
        let county = [];
        UserServices.getCuisineList(county).then(res => {

            cuisineListFromDB = res.data;
            console.log(cuisineListFromDB);


            for (const val of cuisineListFromDB) {
                allCuisineOptions.push({ value: val, label: val })
            }
        });

        // Make an API call with these counties as input
        let restaurantListFromDB = [];
        let allRestaurantOptions = [];

        UserServices.getRestaurantList().then(res => {

            restaurantListFromDB = res.data;
            console.log(restaurantListFromDB);

            for (const val of restaurantListFromDB) {
                allRestaurantOptions.push({ value: val, label: val })
            }
        });

        this.state = {
            selectedCuisineOptions: [],
            selectedCountyOptions: [],
            selectedRestaurantOptions: [],

            cuisineOptions: allCuisineOptions,
            countyOptions: allCountyOptions,
            restaurantOptions: allRestaurantOptions,

            customerEmailAddress: sessionStorage.getItem("customerEmailAddress"),
            customerName: sessionStorage.getItem("customerName"),
            customerId: sessionStorage.getItem("customerId")
        }
    }



    // Handles county input change
    handleCountyInputChange = (e) => {
        console.log("changed input event: ");
        console.log(e);
    }
    // Handles cuisine input change

    handleCuisineInputChange = (e) => {
        console.log("changed input event: ");
        console.log(e);
    }

    handleRestaurantInputChange = (e) => {
        console.log("changed input event: ");
        console.log(e);
    }

    // handles county change 

    handleCountyChange = (e) => {

        console.log("handleCountyChange Event is : ");
        console.log(e);

        const countyValues = e.map((element) => {
            return element.value;
        });

        // console.log("calling cuiseine endpoint in handlecountychange()");
        // console.log(countyValues);

        // UserServices.getCuisineList(countyValues).then(res => {

        //     const cuisineListFromDB = res.data;
        //     //console.log(cuisineListFromDB);
        //     let filteredCuisineOptions = [];
        //     for (const val of cuisineListFromDB) {
        //         filteredCuisineOptions.push({ value: val, label: val })
        //     }
        //     this.setState({ cuisineOptions: filteredCuisineOptions });
        // });

        this.setState({ selectedCountyOptions: e });

        console.log(`Option selected:`, this.state.selectedCountyOptions);

    };

    storeSelectedCountyOptions() {
        //reset
        sessionStorage.setItem("selectedCountyOptions", "");

        const { selectedCountyOptions, selectedCuisineOptions, cuisineOptions, countyOptions } = this.state;

        if (selectedCountyOptions != []) {
            console.log("in storeSelectedCountyOptions if")
            let counties = "";
            selectedCountyOptions.map(
                (county) => {
                    if (counties == "") {
                        counties = county.value;
                    } else {
                        counties = counties + "," + county.value;
                    }

                }
            );
            console.log("counties", counties);
            sessionStorage.setItem("selectedCountyOptions", counties);
        }
    }

    // handles cuisine change 

    handleCuisineChange = (e) => {

        console.log("handleCuisineChange Event is : ");
        console.log(e);
        let allSelected = false;

        const cuisineValues = e.map((element) => {
            return element.value;
        });

        // console.log("calling county endpoint in handleCuisinechange()");
        // console.log(cuisineValues);

        // UserServices.getCountyList(cuisineValues).then(res => {

        //     const countyListFromDB = res.data;
        //     //console.log(cuisineListFromDB);
        //     let filteredCountyOptions = [];
        //     for (const val of countyListFromDB) {
        //         filteredCountyOptions.push({ value: val, label: val })
        //     }
        //     this.setState({ countyOptions: filteredCountyOptions });
        // });

        this.setState({ selectedCuisineOptions: e });

        console.log(`Option selected:`, this.state.selectedCuisineOptions);

    };

    storeSelectedCuisineOptions() {
        //reset 
        sessionStorage.setItem("selectedCuisineOptions", "");

        if (this.state.selectedCuisineOptions != []) {
            let cuisines = "";
            this.state.selectedCuisineOptions.map(
                (cuisine) => {
                    if (cuisines == "") {
                        cuisines = cuisine.value;
                    } else {
                        cuisines = cuisines + "," + cuisine.value;
                    }

                }
            );
            sessionStorage.setItem("selectedCuisineOptions", cuisines);
        }
    }

    handleRestaurantChange = (e) => {

        console.log("handleRestaurantChange Event is : ");
        console.log(e);
        let allSelected = false;

        const restaurantValues = e.map((element) => {
            return element.value;
        });

        this.setState({ selectedRestaurantOptions: e });

        console.log(`Option selected:`, this.state.selectedRestaurantOptions);

    };

    storeSelectedRestaurantOptions() {
        //reset 
        sessionStorage.setItem("selectedRestaurantOptions", "");

        if (this.state.selectedRestaurantOptions != []) {
            let restaurants = "";
            this.state.selectedRestaurantOptions.map(
                (restaurant) => {
                    if (restaurants == "") {
                        restaurants = restaurant.value;
                    } else {
                        restaurants = restaurants + "," + restaurant.value;
                    }

                }
            );
            sessionStorage.setItem("selectedRestaurantOptions", restaurants);
        }
    }

    handleSubmit = (e) => {
        console.log('submitting this state', this.state);
        this.storeSelectedCuisineOptions();
        this.storeSelectedCountyOptions();
        this.storeSelectedRestaurantOptions();
        this.props.history.push('/live-challenges');
    }

    isCustomerLoggedIn() {
        const loggedIn = sessionStorage.getItem("customerLoggedin");
        console.log("loggedIn", loggedIn)
        if (loggedIn === "false" || loggedIn === "" || loggedIn == null) {
            sessionStorage.clear();
           // this.setState({ loggedIn: false })
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

            this.storeSelectedCuisineOptions();
            this.storeSelectedCountyOptions();
            this.storeSelectedRestaurantOptions();
        }
    }

    render() {

        const { selectedCountyOptions, selectedCuisineOptions, selectedRestaurantOptions, cuisineOptions, countyOptions, restaurantOptions } = this.state;

        return (
            <div>
                <HeaderComponent homeUrl="/customer-homescreen" name={this.state.customerName} />
                <h2>
                    Search Challenges
                </h2>
                <div className="wrapper">
                    <div className="form-wrapper">

                        <div>

                            <Select
                                placeholder="County (optional)"
                                value={selectedCountyOptions}
                                onChange={this.handleCountyChange}
                                onInputChange={this.handleCountyInputChange}
                                options={countyOptions}
                                isMulti
                                isSearchable
                            />
                        </div>
                        <div>

                            <Select
                                placeholder="Cuisine (optional)"
                                value={selectedCuisineOptions}
                                onChange={this.handleCuisineChange}
                                onInputChange={this.handleCuisineInputChange}
                                options={cuisineOptions}
                                isMulti
                                isSearchable
                            />
                        </div>
                        <div>

                            <Select
                                placeholder="Restaurants (optional)"
                                value={selectedRestaurantOptions}
                                onChange={this.handleRestaurantChange}
                                onInputChange={this.handleRestaurantInputChange}
                                options={restaurantOptions}
                                isMulti
                                isSearchable
                            />
                        </div>

                        <div className="standardButton">
                            <button type="submit" onClick={this.handleSubmit}>
                                Submit
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default CustomerChallengePreferencesComponent;