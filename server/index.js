const env = require("dotenv");
env.config();
const cors = require("cors");
const express = require("express");
const app = express();

console.log("environment =", process.env.ENV);
const port = process.env.PORT || 5000;
const options = ["http://localhost:5173", "http://localhost:5000"];

app.use(express.json());
app.use(cors());

app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  console.log("api works");
  return res.send("api works");
});
app.use(require("./src/routes/routes"));

app.listen(port, () => console.log("http://localhost:" + port));
