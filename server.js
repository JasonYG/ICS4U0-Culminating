const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const Authentication = require("./back-end/authentication");

app.use(bodyParser.json());

app.get("/api/test", (req, res) => res.send({ Hello: "world" }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post("/api/login", async (req, res) => {
  const { idToken } = req.body;
  const auth = new Authentication(idToken);
  const user = await auth.login();
  console.log(user);

  res.send(user);
});
app.post("/api/search-term", (req, res) => {
  const { term } = req.body;
  console.log(req.body);
  //Search term
  res.send({ term });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
