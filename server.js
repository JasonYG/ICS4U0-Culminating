const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const login = require("./back-end/authentication");
const jwtDecode = require("jwt-decode");

app.use(bodyParser.json());

app.get("/api/test", (req, res) => res.send({ Hello: "world" }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post("/api/login", (req, res) => {
  const { idToken } = req.body;
  const decodedJwt = jwtDecode(idToken);
  console.log(decodedJwt);
  login(decodedJwt.email);

  res.send(req.body);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
