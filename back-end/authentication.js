const login = async (email, callback) => {
  const MongoClient = require("mongodb").MongoClient;
  const uri =
    "mongodb+srv://studyguide:raaghavisgay@cluster0-pitl1.mongodb.net/test?retryWrites=true&w=majority";
  MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
    const db = client.db("studyguide");
    const users = db.collection("users");
    users.findOne({ email }, (err, user) => {
      if (err) throw err;
      if (user) {
        users.update(user, { $set: { updateIsWorking: "true" } });
        return console.log(user);
      }
      users.insert({ email: email }, (err, inserted) => {
        if (err) throw err;
        if (inserted) console.log("Successfully added user!");
      });
    });
  });
};
module.exports = login;
