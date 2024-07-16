const express = require("express");
const cors = require("cors");
const fs = require("node:fs");
const path = require("node:path");

const PORT = 3001;
const CAR_API_BASE_URL = "https://carapi.app/api";
const DB_PATH = path.join(__dirname, "/data/fleet.json");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/fleet", (_, res) => {
  const contents = fs.readFileSync(DB_PATH, "utf-8");
  const fleet = JSON.parse(contents);
  res.status(200).json(fleet);
});

app.get("/api/fleet/:vin", (req, res) => {
  const { vin } = req.params;

  const contents = fs.readFileSync(DB_PATH, "utf-8");
  const fleet = JSON.parse(contents);
  const vehicle = fleet.find((v) => v.vin === vin);
  if (!vehicle) {
    res.status(404).json({ error: "Vehicle not found" });
  } else {
    res.status(200).json(vehicle);
  }
});

app.post("/api/fleet", async (req, res) => {
  const vehicle = req.body;
  const q = `${vehicle.year} ${vehicle.make_model.make.name} ${vehicle.make_model.name} ${vehicle.name} with ${vehicle.exterior_color.name} exterior color.`;

  const response = await fetch(
    `https://serpapi.com/search.json?engine=google_images&q=${q}&location=United+States&api_key=ac5aca347751f30a1c27e66b1c5a7556e6f7222f96eb4a9cdc39a8f999a503f8`,
  );
  const json = await response.json();
  vehicle.image = json.images_results[0].original;
  const contents = fs.readFileSync(DB_PATH, "utf-8");
  const fleet = JSON.parse(contents);
  fleet.push(vehicle);
  fs.writeFileSync(DB_PATH, JSON.stringify(fleet, null, 2));
  res.status(201).json(vehicle);
});

app.delete("/api/fleet/:vin", (req, res) => {
  const { vin } = req.params;

  const contents = fs.readFileSync(DB_PATH, "utf-8");
  const fleet = JSON.parse(contents);
  const vehicleIndex = fleet.findIndex((v) => v.vin === vin);
  if (vehicleIndex === -1) {
    res.status(404).json({ error: "Vehicle not found" });
  } else {
    fleet.splice(vehicleIndex, 1);
    fs.writeFileSync(DB_PATH, JSON.stringify(fleet, null, 2));
    res.status(204).end();
  }
});

app.get("/api/makes", async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);
    const url = `${CAR_API_BASE_URL}/makes?${params}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/models", async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);
    const url = `${CAR_API_BASE_URL}/models?${params}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/trims", async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);
    const url = `${CAR_API_BASE_URL}/trims?${params}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/trims/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await fetch(`${CAR_API_BASE_URL}/trims/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Struggle Bus API listening on port ${PORT}`);
});

module.exports = app;
