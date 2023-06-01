const express = require('express');
const request = require('request');

const {getFacebookUserProfile, setUpUserFacebookProfile} = require("../controller/web.controller");

// import controllers
const {getHomepage} = require("../controller/web.controller");

const router = express.Router();

router.get('/',getHomepage);

router.get("/profile", getFacebookUserProfile);

router.post("/set-up-user-fb-profile", setUpUserFacebookProfile);


module.exports = {
  router
}