const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/playlists", require("./routes/playlists"));

app.listen(port, (err) => {
  if (err) {
    throw new Error("Something went wrong");
  }
  console.log(`Server is listening on http://localhost:${port}`);
});
