const express = require("express");
const passport = require("passport");
const users = require("../db/users");
const router = express.Router();

router.get("/logout", async (req, res) => {
  req.session = null;
  req.logout();
  res.send({ message: "Logged out" });
});

router.get("/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "User has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    res.json({
      success: false,
      message: "User has not logged in",
    });
  }
});

router.get("/failed", async (req, res) => {
  res.send("Failed to login");
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),
  (req, res) => {
    if (process.env.IS_PRODUCTION) {
      return res.redirect(`/login/redirect`);
    } else {
      return res.redirect(`http://localhost:4200/login/redirect`);
    }
  }
);

module.exports = router;
