const express = require('express');
const request = require('request');

const {getFacebookUserProfile, setUpUserFacebookProfile} = require("../controller/web.controller");

// import controllers
const {getHomepage} = require("../controller/web.controller");

const router = express.Router();

router.get('/',getHomepage);

router.get("/profile", getFacebookUserProfile);

router.post("/set-up-user-fb-profile", (req, res, next) => {
  
  let data = {

    "get_started": {
      "payload": "GET_STARTED"
    },

    "persistent_menu": [
      {
          "locale": "default",
          "composer_input_disabled": false,
          "call_to_actions": [
              {
                  "type": "postback",
                  "title": "Talk to an agent",
                  "payload": "CARE_HELP"
              },
              {
                  "type": "postback",
                  "title": "Outfit suggestions",
                  "payload": "CURATION"
              },
              {
                  "type": "web_url",
                  "title": "Shop now",
                  "url": "https://www.originalcoastclothing.com/",
                  "webview_height_ratio": "full"
              }
          ]
      }
  ],

  "whitelisted_domains":[
    "https://project-chatbot-z7qx.onrender.com"
  ]



  };

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v17.0/me/messenger_profile",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": data
  }, (err, response, body) => {
    if (!err) {
      return res.status(200).json({
        message: "setup done!"
      })
    } else {
      return res.status(500).json({
        message: "Error from the node server"
      })
      // console.error("Unable to send message:" + err);
    }
  }); 


})


module.exports = {
  router
}