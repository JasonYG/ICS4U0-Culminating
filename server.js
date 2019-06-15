const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const Authentication = require("./back-end/Authentication");

app.use(bodyParser.json());

app.get("/api/test", (req, res) => res.send({ Hello: "world" }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post("/api/login", (req, res) => {
  const { idToken } = req.body;
  const auth = new Authentication(idToken);

  auth.login();
  res.send(req.body);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
