import auth0 from "auth0-js";
import history from "./history";

export default class Auth {
  accessToken;
  idToken;
  expiresAt;
  auth0 = new auth0.WebAuth({
    domain: "ics4u.auth0.com",
    clientID: "zfEeSMmnfCtMKzQhzHQPLmjB9GjicNBx",
    redirectUri:
      process.env.NODE_ENV === "production"
        ? "http://localhost:3000/callback" /*"http://ics4u-culminating.herokuapp.com/callback"*/
        : "http://localhost:3000/callback",
    responseType: "token id_token",
    scope: "openid email"
  });
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
  }

  handleAuthentication = () => {
    return new Promise((resolve, reject) =>
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          resolve(this.setSession(authResult));
        } else if (err) {
          reject(err);
          alert(`Error: ${err.error}. Check the console for further details.`);
        }
      })
    );
  };

  getAccessToken = () => {
    return this.accessToken;
  };

  getIdToken = () => {
    return this.idToken;
  };

  setSession = authResult => {
    // Set the time that the Access Token will expire at
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    // Set localStorage variables
    localStorage.setItem("isLoggedIn", "1");
    localStorage.setItem("accessToken", this.accessToken);
    localStorage.setItem("idToken", this.idToken);
    localStorage.setItem("expiresAt", this.expiresAt);
  };

  renewSession = () => {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`
        );
      }
    });
  };

  logout = () => {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem("isLoggedIn");

    this.auth0.logout({
      returnTo: window.location.origin
    });

    // navigate to the home route
    history.replace("/home");
  };

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  };

  login = () => {
    this.auth0.authorize();
  };
}
