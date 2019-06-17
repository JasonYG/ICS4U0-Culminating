const jwtDecode = require("jwt-decode");
/**
 * This class handles user authentication
 *
 * @class
 * @return the object that has the attributes and methods for this Authentication object
 */
class Authentication {
  /**
   * Setter method that adds the user's email
   *
   * @param {string} jwtIdToken - The id token that contains user information
   */
  set email(jwtIdToken) {
    const decodedToken = jwtDecode(jwtIdToken);
    this.userEmail = decodedToken.email;
  }

  /**
   * Logs user into service or registers a new user
   *
   * @return {Promise} - a Promise that contains the result from the server
   */
  login() {
    const email = this.userEmail;
    const MongoClient = require("mongodb").MongoClient;
    const uri =
      "mongodb+srv://studyguide:raaghavisgay@cluster0-pitl1.mongodb.net/test?retryWrites=true&w=majority";
    return new Promise((resolve, reject) =>
      MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
        const db = client.db("studyguide");
        const users = db.collection("users");
        users.findOne({ email }, (err, user) => {
          if (err) reject(err);
          if (user) {
            resolve(user);
          } else {
            const newUser = { email: email, studyGuides: [] };
            users.insertOne(newUser, (err, inserted) => {
              if (err) reject(err);
              if (inserted) console.log("Successfully added user!");
            });
          }
        });
      })
    );
  }
  /**
   * Gets the user's study guides
   *
   * @return {Promise} - a Promise that contains the study guide objects
   */
  getStudyGuides() {
    const email = this.userEmail;
    const MongoClient = require("mongodb").MongoClient;
    const uri =
      "mongodb+srv://studyguide:raaghavisgay@cluster0-pitl1.mongodb.net/test?retryWrites=true&w=majority";
    return new Promise((resolve, reject) =>
      MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
        const db = client.db("studyguide");
        const users = db.collection("users");
        users.findOne({ email }, (err, user) => {
          if (err) reject(err);
          console.log("find study guides", user);
          if (user) resolve(user.studyGuides);
          else reject("User not found");
        });
      })
    );
  }
  /**
   * Saves the user's study guide in the database
   *
   * @param {object} studyGuide The study guide that will be saved
   * @return {Promise} - a Promise that contains a response
   */
  saveStudyGuide(studyGuide) {
    const email = this.userEmail;
    const MongoClient = require("mongodb").MongoClient;
    const uri =
      "mongodb+srv://studyguide:raaghavisgay@cluster0-pitl1.mongodb.net/test?retryWrites=true&w=majority";
    return new Promise((resolve, reject) =>
      MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
        const db = client.db("studyguide");
        const users = db.collection("users");
        console.log(email);
        users.findOne({ email }, (err, user) => {
          if (err) reject(err);
          if (user) {
            const { studyGuides: oldStudyGuides } = user;
            const studyGuides = [...oldStudyGuides, studyGuide];

            users.updateOne(user, {
              $set: { studyGuides }
            });
            resolve("Successfully saved study guide");
          } else reject("User not found");
        });
      })
    );
  }
}
module.exports = Authentication;
