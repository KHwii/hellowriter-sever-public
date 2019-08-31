const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.set("port", 5000);
app.use(cors());
app.options("*", cors());

app.listen(app.get("port"));
console.log("Listening on", app.get("port"));
