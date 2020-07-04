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

// GET tracks from playlist
router.get("/:id/tracks", (req, res) => {
  const id = req.params.id;
  connexion.query(
    "SELECT tr.title, tr.artist, tr.album_picture, tr.youtube_url FROM track AS tr JOIN playlist AS pl ON pl.id = tr.playlist_id WHERE tr.playlist_id = ?",
    id,
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

// PUT track from a playlist
router.put("/:idplay/tracks/:idtrack", (req, res) => {
  const idPlaylist = req.params.idplay;
  const idTrack = req.params.idtrack;
  const formData = req.body;

  connexion.query(
    "UPDATE track SET ? WHERE id = ? AND playlist_id = ?",
    [formData, idTrack, idPlaylist],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating a track");
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

// DELETE track from a playlist
router.put("/:idplay/delete-tracks/:idtrack", (req, res) => {
  const idPlaylist = req.params.idplay;
  const idTrack = req.params.idtrack;

  connexion.query(
    "UPDATE track SET playlist_id = NULL WHERE id = ? AND playlist_id = ?",
    [idTrack, idPlaylist],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error deleting a track");
      }
      res.sendStatus(200);
    }
  );
});

module.exports = router;
