import logo from "./logo.svg";
import "./App.css";
import CreateUserAccountComponent from "./components/CreateUserAccountComponent";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AccountSuccessComponent from "./components/AccountSuccessComponent";
import CustomerSigninComponent from "./components/CustomerSigninComponent";
import RestaurantLoginComponent from "./components/RestaurantLoginComponent";
import CustomerHeresHelpComponent from "./components/CustomerHeresHelpComponent";
import RestaurantCreateAccountComponent from "./components/RestaurantCreateAccountComponent";
import RestaurantHeresHelpComponent from "./components/RestaurantHeresHelpComponent";
import CustomerHomeScreenComponent from "./components/CustomerHomeScreenComponent";
import CustomerChallengePreferencesComponent from "./components/CustomerChallengePreferencesComponent";
import RestaurantHomeScreenComponent from "./components/RestaurantHomeScreenComponent";
import RestaurantProposeChallengeComponent from "./components/RestaurantProposeChallengeComponent";
import RestaurantReportRewardComponent from "./components/RestaurantReportRewardComponent";
import OpenChallengesComponent from "./components/OpenChallengesComponent";
import liveChallengeComponent from "./components/LiveChallengeComponent";
import CustomerParticipateChallengeComponent from "./components/CustomerParticipateChallengeComponent";
import RestaurantExitChallengeComponent from "./components/RestaurantExitChallengeComponent";
import CustomerPasswordResetComponent from "./components/CustomerPasswordResetComponent";
import QRCodeComponent from "./components/QRCodeComponent";
import ValidateOrderComponent from "./components/ValidateOrderComponent";
import CustomerRewardsComponent from "./components/CustomerRewardsComponent";
import RestaurantIssueRewardComponent from "./components/RestaurantIssueRewardComponent";
import ViewReportComponent from "./components/ViewReportComponent";
import ViewRewardReportComponent from "./components/ViewRewardReportComponent";
import LandingScreenComponent from "./components/LandingScreenComponent";
import HeaderNavbar from "./components/HeaderComponent";
import HeaderComponent from "./components/HeaderComponent";
import RestaurantPasswordResetComponent from "./components/RestaurantPasswordResetComponent";
import CustomerProgressComponent from "./components/CustomerProgressComponent";
import CustomerChallengeProgressComponent from "./components/CustomerChallengeProgressComponent";

function App() {
  return (
    <div>
      {/* <HeaderComponent /> */}
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={LandingScreenComponent}></Route>
            <Route
              path="/create-account"
              component={CreateUserAccountComponent}
            ></Route>
            <Route
              path="/account-success"
              component={AccountSuccessComponent}
            ></Route>
            <Route
              path="/customer-signin"
              component={CustomerSigninComponent}
            ></Route>

            <Route
              path="/restaurant-login"
              component={RestaurantLoginComponent}
            ></Route>
            <Route
              path="/customer-hereshelp"
              component={CustomerHeresHelpComponent}
            ></Route>
            <Route
              path="/restaurant-createaccount"
              component={RestaurantCreateAccountComponent}
            ></Route>
            <Route
              path="/restaurant-hereshelp"
              component={RestaurantHeresHelpComponent}
            ></Route>
            <Route
              path="/customer-homescreen"
              component={CustomerHomeScreenComponent}
            ></Route>
            <Route
              path="/challenge-preferences"
              component={CustomerChallengePreferencesComponent}
            ></Route>
            <Route
              path="/restaurant-homescreen"
              component={RestaurantHomeScreenComponent}
            ></Route>
            <Route
              path="/restaurant-proposechallenge"
              component={RestaurantProposeChallengeComponent}
            ></Route>
            <Route
              path="/restaurant-reportreward"
              component={RestaurantReportRewardComponent}
            ></Route>
            <Route
              path="/restaurant-openchallenges"
              component={OpenChallengesComponent}
            ></Route>
            <Route
              path="/live-challenges"
              component={liveChallengeComponent}
            ></Route>
            <Route
              path="/customer-participate-challenge"
              component={CustomerParticipateChallengeComponent}
            ></Route>
            <Route
              path="/restaurant-exit-challenge"
              component={RestaurantExitChallengeComponent}
            ></Route>
            <Route
              path="/customer-password-reset"
              component={CustomerPasswordResetComponent}
            ></Route>
            <Route path="/qrcode" component={QRCodeComponent}></Route>
            <Route
              path="/validate-order"
              component={ValidateOrderComponent}
            ></Route>
            <Route
              path="/customer-rewards"
              component={CustomerRewardsComponent}
            ></Route>
            <Route
              path="/issue-reward"
              component={RestaurantIssueRewardComponent}
            ></Route>
            <Route path="/view-report" component={ViewReportComponent}></Route>
            <Route
              path="/view-reward-report"
              component={ViewRewardReportComponent}
            ></Route>
            <Route
              path="/landing-screen"
              component={LandingScreenComponent}
            ></Route>
            <Route path="/navbar-header" component={HeaderNavbar}></Route>
            <Route
              path="/reset-restaurant-password"
              component={RestaurantPasswordResetComponent}
            ></Route>
            <Route
              path="/customer-progress"
              component={CustomerProgressComponent}
            ></Route>
            <Route
              path="/customer-challenge-progress"
              component={CustomerChallengeProgressComponent}
            ></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
