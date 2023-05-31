let express = require('express');


let {postWebhook,getWebhook} = 
require("../controller/chatbot.controller");

let router = express.Router();

router.get("/webhook", getWebhook);

router.post("/webhook", postWebhook);


module.exports = {
  router
}