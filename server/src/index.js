const express = require("express");
const cors = require("cors");

const PORT = 3000;

const app = express();
app.use(cors());

app.get("/", (_, res) => {
  res.status(200).json({ msg: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Struggle Bus API listening on port ${PORT}`);
});

module.exports = app;
