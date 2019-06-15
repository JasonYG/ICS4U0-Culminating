const jwtDecode = require("jwt-decode");
/**
 * This class handles user authentication
 *
 * @class
 * @return the object that has the attributes and methods for this Authentication object
 */
class Authentication {
  /**
   * Constructor function that creates an Authentication object
   *
   * @param {string} jwtIdToken The JSON web token that contains user information
   */
  constructor(jwtIdToken) {
    const decodedToken = jwtDecode(jwtIdToken);
    this.userEmail = decodedToken.email;
  }

  /**
   * Logs user into service or registers a new user
   */
  async login() {
    const email = this.userEmail;
    const MongoClient = require("mongodb").MongoClient;
    const uri =
      "mongodb+srv://studyguide:raaghavisgay@cluster0-pitl1.mongodb.net/test?retryWrites=true&w=majority";
    MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
      const db = client.db("studyguide");
      const users = db.collection("users");
      users.findOne({ email }, (err, user) => {
        if (err) throw err;
        if (user) {
          users.updateOne(user, { $set: { updateOneIsWorking: "true" } });
          return console.log(user);
        }
        users.insert({ email: email }, (err, inserted) => {
          if (err) throw err;
          if (inserted) console.log("Successfully added user!");
        });
      });
    });
  }
}
module.exports = Authentication;
