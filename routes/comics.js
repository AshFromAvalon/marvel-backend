const express = require("express");
const router = express.Router();
const axios = require("axios");

const url = "https://lereacteur-marvel-api.herokuapp.com/comics";
const myApiKey = process.env.MARVEL_API_KEY;

// GET all comics
router.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(`${url}?apiKey=${myApiKey}`);

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

// GET all comics by character ID
router.get("/comics/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(`${url}/${id}?apiKey=${myApiKey}`);

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
