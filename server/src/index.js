const express = require("express");
const cors = require("cors");
const fs = require("node:fs");
const path = require("node:path");

const PORT = 3001;
const CAR_API_BASE_URL = "https://carapi.app/api";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/fleet", async (_, res) => {
  const dbPath = path.join(__dirname, "/data/fleet.json");
  const contents = fs.readFileSync(dbPath, "utf-8");
  const fleet = JSON.parse(contents);
  res.status(200).json(fleet);
});

app.post("/api/fleet", async (req, res) => {
  const vehicle = req.body;
  const dbPath = path.join(__dirname, "/data/fleet.json");
  const contents = fs.readFileSync(dbPath, "utf-8");
  const fleet = JSON.parse(contents);
  fleet.push(vehicle);
  fs.writeFileSync(dbPath, JSON.stringify(fleet, null, 2));
  res.status(201).json(vehicle);
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
