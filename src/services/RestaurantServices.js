import axios from "axios";
import sha256 from "crypto-js/sha256";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";

const HOST = "http://eat-local.us-east-1.elasticbeanstalk.com";

// const HOST = "http://localhost:8080";

// const HOST = "http://192.168.1.7:8080";

const CREATE_ACCOUNT_URL = HOST + "/restaurant-path/save-data";

const SIGN_IN_URL = HOST + "/restaurant-path/signin";

const PROPOSE_CHALLENGE_URL = HOST + "/restaurant-path/propose-challenge";

const ALL_PROPOSED_CHALLENGES_URL =
  HOST + "/restaurant-path/all-proposed-challenges";

const JOIN_CHALLENGE_URL = HOST + "/restaurant-path/join-challenge";

const ALL_LIVE_CHALLENGES_URL = HOST + "/restaurant-path/all-live-challenges";

const RESTAURANTS_FOR_CHALLENGE_URL =
  HOST + "/restaurant-path/get-all-restaurants-for-challenge";

const RESTAURANT_NAMES_FOR_CHALLENGE_URL =
  HOST + "/restaurant-path/get-all-restaurant-names-for-challenge";

const ENROLLED_CHALLENGES_URL =
  HOST + "/restaurant-path/get-enrolled-challenges";

const ENROLLED_CHALLENGE_NAMES_URL =
  HOST + "/restaurant-path/get-enrolled-challenge-names";

const EXIT_CHALLENGE_URL = HOST + "/restaurant-path/exit-challenge";

const ORDER_VALIDATION_URL = HOST + "/restaurant-path/validate-order";

const ORDER_VALIDATION_WITH_ORDER_VALUE_CHECK_URL =
  HOST + "/restaurant-path/validate-order-with-value-check";

const ISSUE_REWARD_URL = HOST + "/restaurant-path/redeem-reward";

const GET_REPORT_URL = HOST + "/restaurant-path/get-report";

const GET_REWARD_REPORT_URL = HOST + "/restaurant-path/get-reward-report";

const SEND_PASSWORD_REST_EMAIL =
  HOST + "/restaurant-path/send-password-reset-email";

const RESET_RESTAURANT_PASSWORD_URL =
  HOST + "/restaurant-path/reset-restaurant-password";

class RestaurantService {
  validateCredentials(credentials) {
    return axios.post(SIGN_IN_URL, credentials);
  }

  createAccount(restaurant) {
    //todo Impact of async here?
    return axios.post(CREATE_ACCOUNT_URL, restaurant);
  }

  proposeChallenge(proposeChallengeSubmit) {
    // console.log("entered proposeChallenge");

    return axios.post(PROPOSE_CHALLENGE_URL, proposeChallengeSubmit);
  }

  getAllProposedChallenges() {
    return axios.get(ALL_PROPOSED_CHALLENGES_URL);
  }

  getEnrolledChallenges(joinChallengeInfo) {
    return axios.post(ENROLLED_CHALLENGES_URL, joinChallengeInfo);
  }

  getEnrolledChallengeNames(joinChallengeInfo) {
    return axios.post(ENROLLED_CHALLENGE_NAMES_URL, joinChallengeInfo);
  }

  joinChallenge(joinChallengeInfo) {
    console.log(joinChallengeInfo);

    return axios.post(JOIN_CHALLENGE_URL, joinChallengeInfo);
  }

  getAllLiveChallenges() {
    return axios.get(ALL_LIVE_CHALLENGES_URL);
  }

  getRestaurantsForChallenege(challengeId) {
    const url = RESTAURANTS_FOR_CHALLENGE_URL + "/?challengeId=" + challengeId;
    return axios.get(url);
  }

  getRestaurantNamesForChallenege(challengeId) {
    const url =
      RESTAURANT_NAMES_FOR_CHALLENGE_URL + "/?challengeId=" + challengeId;
    return axios.get(url);
  }

  validateOrder(orderValidation) {
    return axios.post(ORDER_VALIDATION_URL, orderValidation);
  }

  validateOrderWithOrderValueCheck(orderValidation) {
    return axios.post(
      ORDER_VALIDATION_WITH_ORDER_VALUE_CHECK_URL,
      orderValidation
    );
  }

  sendPasswordResetEmail(restaurant) {
    return axios.post(SEND_PASSWORD_REST_EMAIL, restaurant);
  }

  resetPassword(restaurant) {
    return axios.post(RESET_RESTAURANT_PASSWORD_URL, restaurant);
  }

  getReport(restaurantId, reportType) {
    const url =
      GET_REPORT_URL +
      "/?restaurantId=" +
      restaurantId +
      "&reportType=" +
      reportType;
    return axios.get(url);
  }

  getRewardReport(restaurantId, reportType) {
    const url =
      GET_REWARD_REPORT_URL +
      "/?restaurantId=" +
      restaurantId +
      "&reportType=" +
      reportType;
    return axios.get(url);
  }

  issueReward(
    customerId,
    customerName,
    challengeId,
    challengeName,
    restaurantId,
    restaurantName
  ) {
    const url =
      ISSUE_REWARD_URL +
      "/?customerId=" +
      customerId +
      "&customerName=" +
      customerName +
      "&challengeId=" +
      challengeId +
      "&challengeName=" +
      challengeName +
      "&restaurantId=" +
      restaurantId +
      "&restaurantName=" +
      restaurantName;
    return axios.post(url);
  }

  exitChallenge(joinChallengeInfo) {
    return axios.post(EXIT_CHALLENGE_URL, joinChallengeInfo);
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

export default new RestaurantService();
