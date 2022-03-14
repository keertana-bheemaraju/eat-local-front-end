import axios from "axios";
import sha256 from "crypto-js/sha256";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";

const HOST = "http://eat-local.us-east-1.elasticbeanstalk.com";

// const HOST = "http://localhost:8080";

// const HOST = "http://192.168.1.7:8080";

const CREATE_ACCOUNT_URL = HOST + "/user-path/save-data";

const SIGN_IN_URL = HOST + "/user-path/signin";

const GET_COUNTY_LIST_URL = HOST + "/user-path/get-county-list";

const GET_CUISINE_LIST_URL = HOST + "/user-path/get-cuisine-list";

const GET_RESTAURANT_LIST_URL =
  HOST + "/user-path/get-all-live-restaurant-names";

const VALIDATED_RESTAURANTS_FOR_CHALLENGE_URL =
  HOST + "/user-path/get-validated-restaurants-for-challenge";

const GET_ALL_CHALLENGES_FOR_CUSTOMER = HOST + "/user-path/get-all-challenges";

const SEND_PASSWORD_RESET_EMAIL_URL =
  HOST + "/user-path/send-password-reset-email";

const GET_REWARDS_URL = HOST + "/user-path/get-rewards";

const RESET_CUSTOMER_PASSWORD_URL = HOST + "/user-path/reset-customer-password";

const CUSTOMER_PROGRESS_URL = HOST + "/user-path/get-progress";

class UserService {
  validateCredentials(credentials) {
    return axios.post(SIGN_IN_URL, credentials);
  }

  createAccount(user) {
    //todo Impact of async here?
    return axios.post(CREATE_ACCOUNT_URL, user);
  }

  getCountyList(selectedCusineOptions) {
    return axios.post(GET_COUNTY_LIST_URL, selectedCusineOptions);
  }

  getCuisineList(selectedCountyOptions) {
    return axios.post(GET_CUISINE_LIST_URL, selectedCountyOptions);
  }

  getRestaurantList() {
    return axios.get(GET_RESTAURANT_LIST_URL);
  }

  getAllChallenges() {
    return axios.post(GET_ALL_CHALLENGES_FOR_CUSTOMER);
  }

  getValidatedRestaurants(customerId, challengeId) {
    const url =
      VALIDATED_RESTAURANTS_FOR_CHALLENGE_URL +
      "/?customerId=" +
      customerId +
      "&challengeId=" +
      challengeId;
    return axios.get(url);
  }

  getCustomerRewards(customerId) {
    const url = GET_REWARDS_URL + "/?customerId=" + customerId;
    return axios.get(url);
  }

  sendPasswordResetEmail(user) {
    return axios.post(SEND_PASSWORD_RESET_EMAIL_URL, user);
  }

  resetCustomerPassword(user) {
    return axios.post(RESET_CUSTOMER_PASSWORD_URL, user);
  }

  getCustomerProgress(customerId) {
    const url = CUSTOMER_PROGRESS_URL + "/?customerId=" + customerId;
    return axios.get(url);
  }

  encryptWithSha512(message) {
    const nonce = "nonce";
    const path = "path";
    const privateKey = "private-key";

    const hashDigest = sha256(nonce + message);
    const hmacDigest = Base64.stringify(
      hmacSHA512(path + hashDigest, privateKey)
    );

    console.log(hmacDigest);
    return hmacDigest;
  }
}

export default new UserService();
