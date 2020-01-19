const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const Authentication = require("./back-end/authentication");
const Topic = require("./back-end/web-scraping/topic");

const auth = new Authentication();

app.use(bodyParser.json());

app.get("/api/test", (req, res) => res.send({ Hello: "wrld" }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post("/api/login", async (req, res) => {
  const { idToken } = req.body;
  auth.email = idToken;
  const user = await auth.login();
  console.log(user);

  res.send(user);
});
app.post("/api/save-guide", async (req, res) => {
  const { studyGuide, idToken } = req.body;
  auth.email = idToken;
  const response = auth.saveStudyGuide(studyGuide);
  console.log("saved guide");
  res.send({ response: response });
});

app.post("/api/get-study-guides", async (req, res) => {
  const { idToken } = req.body;
  auth.email = idToken;
  const studyGuides = await auth.getStudyGuides();

  res.send({ studyGuides });
});

app.post("/api/search-term", async (req, res) => {
  const { term, breadthValue, depthValue } = req.body;
  console.log(req.body);
  const WebScraper = new Topic(term, breadthValue, depthValue);
  const studyGuide = await WebScraper.getInformation();
  console.log(studyGuide);
  res.send(studyGuide);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
