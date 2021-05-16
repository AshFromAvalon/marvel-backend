const express = require("express");
const router = express.Router();
const axios = require("axios");

const url = "https://lereacteur-marvel-api.herokuapp.com/characters";
const myApiKey = process.env.MARVEL_API_KEY;

// GET all characters
router.get("/characters", async (req, res) => {
  try {
    // Destructure query params
    const { limit, skip, name } = req.query;

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

    const characters = name
      ? response.data.results
          .filter((character) => character.name.match(regexOf(name)))
          .slice(skip, limit)
      : response.data.results.slice(skip, limit);

    res.status(200).json(characters);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
