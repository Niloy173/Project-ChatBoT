const express = require('express');

// import controllers
const {getHomepage} = require("../controller/web.controller");

const router = express.Router();

router.get('/',getHomepage);


module.exports = {
  router
}