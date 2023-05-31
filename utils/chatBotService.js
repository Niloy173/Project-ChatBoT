const request = require('request');


function getFacebookUsername(sender_psid) {

  // Send the HTTP request to the Messenger Platform

  return new Promise((resolve,reject) => {
    const uri = `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${process.env.PAGE_ACCESS_TOKEN}`

    request({
      "uri": uri,
      "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
      "method": "GET",
    }, (err, res, body) => {
      if (!err) {
       
        body = JSON.parse(body);
        let username = `${body.first_name} ${body.last_name}`;
        resolve(username);

      } else {
        reject("Unable to send message:" + err);
      }
    }); 
  });
}


let sendResponseWelcomeNewCustomer = (username, sender_psid) => {

  return new Promise(async (resolve, reject) => {

    try {
      
      let response_first =  { "text": `Welcome ${username} to The Dinner 💜`};
      
      let response_second = {
          "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "The Diner Restaurant",
                        "subtitle": "We are always here to serve you.",
                        "image_url": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "SHOW MAIN MENU",
                                "payload": "MAIN_MENU",
                            },
                            {
                                "type": "postback",
                                "title": "RESERVE A TABLE",
                                "payload": "RESERVE_TABLE",
                            },
                            {
                                "type": "postback",
                                "title": "GUIDE TO USE THIS BOT",
                                "payload": "GUIDE_BOT",
                            }
                        ],
                    } ]
            }
        }
      }

    // send a welcome message
    await sendMessage(sender_psid, response_first);

    // send a welcome large  message
    await sendMessage(sender_psid, response_second);

   resolve("done!");

    } catch (error) {
      reject(error)
    }

  });
}


let sendMainMenu = (sender_psid) => {

  
    return new Promise(async (resolve, reject) => {
      try {
        
        let response = {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "generic",
              "elements": [
                {
                  "title": "Our Menus",
                  "subtitle": "We are pleased to offer you a whole-range of menu for lunch or dinner.",
                  "image_url": "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                  "buttons": [
                    {
                      "type": "postback",
                      "title": "LUNCH MENU",
                      "payload": "LUNCH_MENU",
                    },

                    {
                      "type": "postback",
                      "title": "DINNER MENU",
                      "payload": "DINNER_MENU",
                    },

                    {
                      "type": "postback",
                      "title": "PUB MENU",
                      "payload": "PUB_MENU",
                    }
                  ],
                },

                {
                  "title": "Hours",
                  "subtitle": `MON-FRI 10AM - 11PM  | SAT 5PM - 10PM | SUN 5PM - 9PM`,
                  "image_url": "https://images.unsplash.com/photo-1514371879740-2e7d2068f502?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
                  "buttons": [
                    {
                      "type": "postback",
                      "title": "RESERVE A TABLE",
                      "payload": "RESERVE_TABLE",
                    }
                  ],
                },

                {
                  "title": "Banquet Rooms",
                  "subtitle": "A place that tells a story.",
                  "image_url": "https://images.unsplash.com/photo-1572803089768-1b990231961a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
                  "buttons": [
                    {
                      "type": "postback",
                      "title": "SHOW ROOMS",
                      "payload": "SHOW_ROOMS",
                    }
                  ],
                },


            
              ]
            }
          }
        }

        await sendMessage(sender_psid, response);

        resolve("done!");


    
      } catch (error) {
        reject(error);
      }
    });
 
  
}

let sendMessage = (sender_psid, response) => {
  
  console.log(`sender id ${sender_psid}`);
  console.log(response.attachment.payload.elements);

  return new Promise((resolve, reject) => {
    try {
      let request_body = {
        "recipient": {
          "id": sender_psid
        },
        "message": response
      }
    
      // Send the HTTP request to the Messenger Platform
      request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
      }, (err, res, body) => {
        if (!err) {
          console.log('message sent!');
          resolve("done!");
        } else {
          reject("Unable to send message:" + err);
        }
      });       
    } catch (error) {
      reject(error);
    }
  })
}

module.exports = {
  getFacebookUsername,
  sendResponseWelcomeNewCustomer,
  sendMainMenu
}