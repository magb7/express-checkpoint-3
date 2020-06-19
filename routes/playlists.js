const express = require("express");
const router = express.Router();
const connexion = require("../conf");

// GET playlists
router.get("/", (req, res) => {
  connexion.query("SELECT title, genre FROM playlist", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error while retrieving data");
      return;
    }
    if (results.length === 0) {
      res.status(400).send("Find nothing");
    }
    res.json(results);
  });
});

// GET playlist by id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  connexion.query(
    "SELECT title, genre FROM playlist WHERE id=?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error while retrieving data");
        return;
      }
      if (results.length === 0) {
        res.status(400).send("Find nothing");
        return;
      }
      res.send(results);
    }
  );
});

// POST new playlists
router.post("/", (req, res) => {
  const formData = req.body;
  connexion.query("INSERT INTO playlist SET ?", [formData], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error saving a playlist");
    }
    res.status(200).send(formData);
  });
});

// PUT playlist
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const formData = req.body;
  connexion.query(
    "UPDATE playlist SET ? WHERE id = ?",
    [formData, id],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating a playlist");
      }
      res.status(200).send(formData);
    }
  );
});

// DELETE playlist by id
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  connexion.query("DELETE FROM playlist WHERE id=?", [id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting a playlist");
      return;
    }
    res.sendStatus(200);
  });
});

module.exports = router;
