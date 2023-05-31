let express = require('express');


let {postWebhook,getWebhook} = require("../controller/chatbot.controller");

let router = express.Router();

router.get("/webhooks", getWebhook);

router.get("/webhooks", postWebhook);


module.exports = {
  router
}