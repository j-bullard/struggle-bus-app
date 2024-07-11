const express = require("express");
const cors = require("cors");
const fleet = require("./data/fleet");

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.status(200).json(fleet);
});

app.get("/:vin", (req, res) => {
  const vin = req.params.vin;
  const vehicle = fleet.find((v) => v.vehicle_vin === vin);
  res.status(200).json(vehicle);
});

app.listen(PORT, () => {
  console.log(`Struggle Bus API listening on port ${PORT}`);
});

module.exports = app;
