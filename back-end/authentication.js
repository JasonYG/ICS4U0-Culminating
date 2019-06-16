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
            // users.updateOne(user, { $set: { studyGuides: [1, 2, 3, 4] } });
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
}
module.exports = Authentication;
