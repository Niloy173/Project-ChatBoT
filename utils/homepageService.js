const request = require('request');

let setUpMessangerPlatform = (PAGE_ACCESS_TOKEN) => {

  return new Promise((resolve, reject) => {
      
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
                      "type": "web_url",
                      "title": "View YouTube Channel",
                      "url": "https://www.originalcoastclothing.com/",
                      "webview_height_ratio": "full"
                  },
                  {
                    "type": "web_url",
                    "title": "View Facebook Fan Page",
                    "url": "https://www.facebook.com/profile.php?id=100093249606113",
                    "webview_height_ratio": "full"
                }, {
                  "type": "postback",
                  "title": "Restart this conversation",
                  "payload": "RESTART_CONVERSATION"
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
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": data
      }, (err, res, body) => {
        if (!err) {
          
          resolve("setup done!");

        } else {
          
          reject("Error from the node server");
          // console.error("Unable to send message:" + err);
        }
      }); 
  });
}

module.exports = {
  setUpMessangerPlatform
}