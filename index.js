// Dependecies
const express = require("express");
const formidableMiddleware = require("express-formidable");
const cors = require("cors");
require("dotenv").config();

// Server config
const app = express();
app.use(formidableMiddleware());
app.use(cors());

// Import routes
const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to React Marvel API" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

// Launch server
app.listen(process.env.PORT || 3001, () => {
  console.log("Server Started");
});
