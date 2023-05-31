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

// Inital Get Started Button Response
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

// Main Menu Button
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
                  "image_url": "https://images.template.net/wp-content/uploads/2017/07/lore-beer-pub-1-1.jpg",
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

// Show the Lunch Menu Details
let sendLunchMenu = (sender_psid) => {

  return new Promise(async (resolve, reject) => {
    try {

      let response = {

          "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Appetizers",
                        "image_url": "https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=775&q=80",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "SHOW APPETIZERS",
                                "payload": "SHOW_APPETIZERS",
                            }
                        ],
                    },

                    {
                        "title": "Entree Salad",
                        "image_url": "https://images.unsplash.com/photo-1505576633757-0ac1084af824?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "SHOW ENTREE SALAD",
                                "payload": "SHOW_ENTREE_SALAD",
                            }
                        ],
                    },

                    {
                        "title": "Fish and Shell Fish",
                        "image_url": "https://images.unsplash.com/photo-1517115358639-5720b8e02219?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "SHOW FISH",
                                "payload": "SHOW_FISH",
                            }
                        ],
                    },

                    {
                        "title": "Skeens Classics",
                        "subtitle": "Dry-aged on Premise",
                        "image_url": "",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "SHOW CLASSICS",
                                "payload": "SHOW_CLASSICS",
                            }
                        ],
                    },

                    {
                        "title": "Go back",
                        "image_url": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BACK TO MAIN MENU",
                                "payload": "BACK_TO_MAIN_MENU",
                            },
                            {
                                "type": "postback",
                                "title": "RESERVE A TABLE",
                                "payload": "RESERVE_TABLE",
                            }
                        ],
                    }
                ]
            }
        }
      }

      await sendMessage(sender_psid, response);
      resolve("done");

    } catch (error) {
      reject(error);  
    }

  });
}

// Show the Dinner Menu Details
let sendDinnerMenu = (sender_psid) => {

  return new Promise(async (resolve, reject) => {
      
      try {
          let response1 = {
              "text": "Lump crab cocktail\n$25.00"
          };
          let response2 = {
              "attachment": {
                  "type": "image",
                  "payload": {
                      "url": "https://djfoodie.com/wp-content/uploads/Crab-Cocktail-3-800.jpg"
                  }
              }
          };

          let response3 = {
              "text": "House cured salmon\n$16.00"
          };
          let response4 = {
              "attachment": {
                  "type": "image",
                  "payload": {
                      "url": "https://www.thespruceeats.com/thmb/rys3IyH2DB6Ma_r4IQ6emN-2jYw=/4494x3000/filters:fill(auto,1)/simple-homemade-gravlax-recipe-2216618_hero-01-592dadcba64743f98aa1f7a14f81d5b4.jpg"
                  }
              }
          };

          let response5 = {
              "text": "Steamed Whole Maine Lobsters\n$35.00"
          };
          let response6 = {
              "attachment": {
                  "type": "image",
                  "payload": {
                      "url": "https://portcitydaily.com/wp-content/uploads/For-the-Shell-of-It.jpg"
                  }
              }
          };

          let response7 = {
              "attachment": {
                  "type": "template",
                  "payload": {
                      "template_type": "button",
                      "text": `Back to main menu or make a reservation ?`,
                      "buttons": [
                          {
                              "type": "postback",
                              "title": "SHOW MAIN MENU",
                              "payload": "MAIN_MENU"
                          },
                          {
                              "type": "postback",
                              "title": "RESERVE A TABLE",
                              "payload": "RESERVE_TABLE",
                          }
                      ]
                  }
              }
          };

         
          await sendMessage(sender_psid, response1);

         
          await sendMessage(sender_psid, response2);

          
          await sendMessage(sender_psid, response3);

          
          await sendMessage(sender_psid, response4);

         
          await sendMessage(sender_psid, response5);

         
          await sendMessage(sender_psid, response6);

         
          await sendMessage(sender_psid, response7);

          resolve("done");

      } catch (e) {
          reject(e);
      }
  });
}

// Show the Pub Service Details
let sendPubMenu = (sender_psid) => {

  return new Promise(async (resolve, reject) => {
    try {
        let response1 = {
            "text": "Hamburger with French Fries\n$19.50"
        };
        let response2 = {
            "attachment": {
                "type": "image",
                "payload": {
                    "url": "https://previews.123rf.com/images/genmike/genmike1411/genmike141100010/33951440-burger-and-french-fries.jpg"
                }
            }
        };

        let response3 = {
            "text": "Ham and Cheese on a Baguette as Salad or Sandwich\n$21.00"
        };
        let response4 = {
            "attachment": {
                "type": "image",
                "payload": {
                    "url": "https://unpeeledjournal.com/wp-content/uploads/2020/09/50371473232_3b952086a0_c-1.jpg"
                }
            }
        };

        let response5 = {
            "text": "Braised short rib salad\n$29.50"
        };
        let response6 = {
            "attachment": {
                "type": "image",
                "payload": {
                    "url": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2015%2F06%2F22%2Fshort-ribs-cucumber-orange-salad-ck.jpg"
                }
            }
        };

        let response7 = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": `Back to main menu or make a reservation ?`,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "SHOW MAIN MENU",
                            "payload": "MAIN_MENU"
                        },
                        {
                            "type": "postback",
                            "title": "RESERVE A TABLE",
                            "payload": "RESERVE_TABLE",
                        }
                    ]
                }
            }
        };

        
        await sendMessage(sender_psid, response1);

        
        await sendMessage(sender_psid, response2);

        
        await sendMessage(sender_psid, response3);

        
        await sendMessage(sender_psid, response4);

        
        await sendMessage(sender_psid, response5);

        
        await sendMessage(sender_psid, response6);

        
        await sendMessage(sender_psid, response7);

        resolve("done");

    } catch (e) {
        reject(e);
    }
});

}

let handleReserveTable = (sender_psid) => {

}

let handleShowRooms = (sender_psid) => {

}

// Go Back to main menu
// let goBackToMainMenu = (sender_psid) => {
//   sendMainMenu(sender_psid);
// };


// Send Message to indiviual recepients
let sendMessage = (sender_psid, response) => {
  
  // console.log(`sender id ${sender_psid}`);
  // console.log(response.attachment.payload.elements);

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
  sendMainMenu,
  sendLunchMenu,
  sendDinnerMenu,
  sendPubMenu,
  handleReserveTable,
  handleShowRooms,
}