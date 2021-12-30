const vocab = require("./routes/Vocab");
const app = vocab.connection;

app.get("/themes", async (req, res) => {
  try {
    const themes = await vocab.getThemes();
    res.send(themes);
  } catch (err) {
    res.status(400).send(err);
  }
});
