function login(email, password, callback) {
  const mongo = require("mongodb");
  const bcrypt = require("bcrypt");

  mongo(
    "mongodb+srv://studyguide:raaghavisgay@cluster0-pitl1.mongodb.net/test?retryWrites=true&w=majority",
    function(db) {
      const users = db.collection("users");

      users.findOne({ email: email }, function(err, user) {
        if (err) return callback(err);
        if (!user) return callback(new WrongUsernameOrPasswordError(email));

        bcrypt.compare(password, user.password, function(err, isValid) {
          if (err || !isValid)
            return callback(err || new WrongUsernameOrPasswordError(email));

          return callback(null, {
            user_id: user._id.toString(),
            nickname: user.nickname,
            email: user.email
          });
        });
      });
    }
  );
}
module.exports = login;
