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

    const regexOf = (text) => {
      const arr = text.split(" ");
      let regexp = "";

      const escaped = (word) => {
        const arr = word.split("");
        let str = "";
        arr.forEach((letter) => {
          letter === "(" || letter === ")"
            ? (str += `\\${letter}`)
            : (str += letter);
        });
        return str;
      };

      arr.forEach((word, index) => {
        if (word.includes("(") || word.includes(")")) {
          word = escaped(word);
        }

        if (index + 1 === arr.length) {
          regexp = regexp + `${word}`;
        } else {
          regexp = regexp + `${word}\\s`;
        }
      });

      return new RegExp(regexp, "i");
    };

    const comics = title
      ? response.data.results
          .filter((comic) => comic.title.match(regexOf(title)))
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
