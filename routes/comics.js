const express = require("express");
const router = express.Router();
const axios = require("axios");

const url = "https://lereacteur-marvel-api.herokuapp.com/comics";
const myApiKey = process.env.MARVEL_API_KEY;

// GET all comics
router.get("/comics", async (req, res) => {
  try {
    const { limit, skip, title } = req.query;

    const response = await axios.get(`${url}?apiKey=${myApiKey}`);

    let regexp;
    if (title) {
      const cleanTitle = (text) => {
        text.replace("(", "\\(");
        text.replace(")", "\\)");
        return text;
      };
      regexp = new RegExp(cleanTitle(title), "i");
    }

    const comics = title
      ? response.data.results
          .filter((comic) => comic.title.match(regexp))
          .slice(skip, limit)
      : response.data.results.slice(skip, limit);

    res.status(200).json(comics);
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
