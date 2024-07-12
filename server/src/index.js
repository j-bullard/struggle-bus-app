const express = require("express");
const cors = require("cors");
const fleet = require("./data/fleet");

const PORT = 3001;
const CAR_API_BASE_URL = "https://carapi.app/api";

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
