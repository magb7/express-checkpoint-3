const express = require("express");
const router = express.Router();
const connexion = require("../conf");

// GET tracks
router.get("/", (req, res) => {
  connexion.query(
    "SELECT playlist_id, title, artist, album_picture, youtube_url FROM track",
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error while retrieving data");
        return;
      }
      if (results.length === 0) {
        res.status(400).send("Find nothing");
      }
      res.json(results);
    }
  );
});

// POST new track
router.post("/", (req, res) => {
  const formData = req.body;
  connexion.query("INSERT INTO track SET ?", [formData], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error saving a track");
    }
    res.status(200).send(formData);
  });
});

// PUT track
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const formData = req.body;
  connexion.query("UPDATE track SET ? WHERE id = ?", [formData, id], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error updating a track");
    }
    res.status(200).send(formData);
  });
});

module.exports = router;
