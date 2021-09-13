const express = require("express");
const path = require("path");

const morgan = require("morgan");
const cardsRouter = require("./routes/cards");
const cardsetsRouter = require("./routes/cardsets");
const packsRouter = require("./routes/packs");
const collectionsRouter = require("./routes/collections");
const usersRouter = require("./routes/users");
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("short"));
app.use(express.json());

// app.use(express.static(path.join(__dirname, "client/dist")));

app.use("/api/cards", cardsRouter);
app.use("/api/cardsets", cardsetsRouter);
app.use("/api/packs", packsRouter);
app.use("/api/collections", collectionsRouter);
app.use("/api/users", usersRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
