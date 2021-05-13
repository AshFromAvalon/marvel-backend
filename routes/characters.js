const express = require("express");
const router = express.Router();
const axios = require("axios");

const url = "https://lereacteur-marvel-api.herokuapp.com/characters";
const myApiKey = process.env.MARVEL_API_KEY;

// GET all characters
router.get("/characters", async (req, res) => {
  try {
    // Destructure query params
    const { limit, skip } = req.query;

    const response = await axios.get(`${url}?apiKey=${myApiKey}`);
    const characters = response.data.results.slice(skip, limit);

    res.status(200).json(characters);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
