const express = require("express");
const path = require("path");

const morgan = require("morgan");
const passport = require("passport");
const cookieSession = require("cookie-session");

const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const cardsetsRouter = require("./routes/cardsets");
const secretPacksRouter = require("./routes/secret_packs");
const packsRouter = require("./routes/packs");
const collectionsRouter = require("./routes/collections");

const app = express();
const port = process.env.PORT || 3000;

require("./boot/auth")();

// TODO: investigate other cookie/session implementations
app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "client/dist/client")));

app.use(morgan("short"));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/cards", cardsRouter);
app.use("/api/cardsets", cardsetsRouter);
app.use("/api/secret_packs", secretPacksRouter);
app.use("/api/packs", packsRouter);
app.use("/api/collections", collectionsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/dist/client/index.html"));
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
