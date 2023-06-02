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
                  "subtitle": "Restaurant accommodates up to 200 seated guests and similar at cocktail receptions",
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
                        "subtitle": "We know you want a bite of this",
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
                        "subtitle": "Eat healthy, live healthy.",
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
                        "subtitle": "Bring The Sea To Your Plate",
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
                        "image_url": "https://bestthingstodoinyork.co.uk/wp-content/uploads/2021/07/Tomahawk-Steak-Restaurant-York-5.jpg",
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

          let response = {
              "attachment": {
                  "type": "template",
                  "payload": {

                      "template_type": "generic",
                      elements: [
                        {
                          "title": "Lump crab cocktail",
                          "subtitle": "$25.00",
                          "image_url": "https://djfoodie.com/wp-content/uploads/Crab-Cocktail-3-800.jpg"
                        },
                        {
                          "title": "House cured salmon",
                          "subtitle": "$16.00",
                          "image_url": "https://www.thespruceeats.com/thmb/rys3IyH2DB6Ma_r4IQ6emN-2jYw=/4494x3000/filters:fill(auto,1)/simple-homemade-gravlax-recipe-2216618_hero-01-592dadcba64743f98aa1f7a14f81d5b4.jpg"
                        },
                        {
                          "title": "Steamed Whole Maine Lobsters",
                          "subtitle":"$35.00",
                          "image_url": "https://popmenucloud.com/cdn-cgi/image/width=1920,height=1920,format=auto,fit=scale-down/dcbkxuzi/ce7a0686-5270-4cce-913c-7abb970bb3ed.jpg"

                        }
                      ]
                      
                  }
              }
          };


          let response_options = {
              "attachment": {
                  "type": "template",
                  "payload": {
                      "template_type": "button",
                      "text": `Back to main menu or make a reservation`,
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

         
          await sendMessage(sender_psid, response);

          await sendMessage(sender_psid, response_options);

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
                    "text": `Back to main menu or make a reservation`,
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

    return new Promise(async (resolve, reject) => {
        try {
            let username = await getFacebookUsername(sender_psid);
            let response = { text: `Hi ${username}, What time and date you would like to reserve a table ?` };
            await sendMessage(sender_psid, response);
        } catch (e) {
            reject(e);
        }
    });
}

let handleShowRooms = (sender_psid) => {
   
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "Bull Moose Room",
                                "subtitle": "The room is suited for parties of up to 20 people",
                                "image_url": "https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "SHOW DESCRIPTION",
                                        "payload": "SHOW_ROOM_DETAIL",
                                    }
                                ],
                            },

                            {
                                "title": "Lillie Langstry Room",
                                "subtitle": "The room is suited for parties of up to 30 people",
                                "image_url": "https://images.unsplash.com/photo-1529022805552-1c88a713c1c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=725&q=80",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "SHOW DESCRIPTION",
                                        "payload": "SHOW_ROOM_DETAIL",
                                    }
                                ],
                            },

                            {
                                "title": "Lincoln Room",
                                "subtitle": "The room is suited for parties of up to 40 people",
                                "image_url": "https://images.unsplash.com/photo-1508213824875-83a3d36e72a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "SHOW DESCRIPTION",
                                        "payload": "SHOW_ROOM_DETAIL",
                                    }
                                ],
                            },

                            {
                                "title": "Go back",
                                "image_url": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
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
            };

            //send a welcome message
            await sendMessage(sender_psid, response);
        } catch (e) {
            reject(e);
        }
    });
};

let showRoomDetail = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try{
            let response1 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjE1ZjM5YWE0MDM5OTc2OTU2MzBhYTBlODYzNWIwOGUzZGZhYzZhMCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/kwIKbt5w6htuSHgWk0/giphy.gif"
                    }
                }
            };
            let response2 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `The room is well suited & furnished for amazing people.`,
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

            resolve("done!");
        }catch (e) {
            reject(e);
        }
    })
};


let sendAppetizer = (sender_psid) => {
 
  return new Promise(async (resolve, reject) => {
      try {
          let response = {
              "attachment": {
                  "type": "template",
                  "payload": {
                      "template_type": "generic",
                      "elements": [
                          {
                              "title": "Little Neck Clams on the Half Shell",
                              "subtitle": "Dozen - $20.00",
                              "image_url": "https://nationaltoday.com/wp-content/uploads/2021/03/National-Clams-on-the-Half-Shell-Day.jpg",
                          },

                          {
                              "title": "Fresh Oysters",
                              "subtitle": "1/2 Dozen - $21.00 | Dozen - $40.00",
                              "image_url": "https://i.ytimg.com/vi/-pMG2g3jTt4/maxresdefault.jpg",
                          },

                          {
                              "title": "Lobster Salad",
                              "subtitle": "Half Lobster with Avocado and Grapefruit | $15.00",
                              "image_url": "https://healthyrecipesblogs.com/wp-content/uploads/2022/10/lobster-salad-featured.jpg",
                          },

                          {
                              "title": "Go back",
                              "image_url": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
                              "buttons": [
                                  {
                                      "type": "postback",
                                      "title": "SHOW LUNCH MENU",
                                      "payload": "BACK_TO_LUNCH_MENU",
                                  },
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
          };

          await sendMessage(sender_psid, response);
          resolve("done!");
      } catch (e) {
          reject(e);
      }
  });
};

let sendSalad = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
      try{
          let response1 = {
              "attachment": {
                  "type": "image",
                  "payload": {
                      "url": "https://media0.giphy.com/media/9Vk8qP9EmWB8FePccb/giphy.gif?cid=ecf05e478d0c93d69e72264c8ebbf58a9a1d7ae294754131&rid=giphy.gif"
                  }
              }
          };
          let response2 = {
              "attachment": {
                  "type": "template",
                  "payload": {
                      "template_type": "button",
                      "text": `Entree Salad \n$25.00`,
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

          resolve("done");
      }catch (e) {
          reject(e);
      }
  });
};

let sendFish = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
      try{
          let response1 = {
              "attachment": {
                  "type": "image",
                  "payload": {
                      "url": "https://media.tenor.com/9CPhGHC1KUUAAAAd/%EB%A7%A4%EC%9A%B4%EB%AA%A8%EB%93%AC%ED%95%B4%EB%AC%BC%EC%B0%9C-%EC%A4%91%EA%B5%AD%EB%8B%B9%EB%A9%B4.gif"
                  }
              }
          };
          let response2 = {
              "attachment": {
                  "type": "template",
                  "payload": {
                      "template_type": "button",
                      "text": `Fish fry \n$60.00`,
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

          resolve("done");
      }catch (e) {
          reject(e);
      }
  });
};

let sendClassic = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
      try{
          let response1 = {
              "attachment": {
                  "type": "image",
                  "payload": {
                      "url": "https://media3.giphy.com/media/TGcD6N8uzJ9FXuDV3a/giphy.gif?cid=ecf05e47afe5be971d1fe6c017ada8e15c29a76fc524ac20&rid=giphy.gif"
                  }
              }
          };
          let response2 = {
              "attachment": {
                  "type": "template",
                  "payload": {
                      "template_type": "button",
                      "text": `Perfect oven baked fries \n$30.00`,
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

          resolve("done");
      }catch (e) {
          reject(e);
      }
  });
};


let sendMessageAskingQuantity = (sender_psid) => {

    return new Promise((resolve, reject) => {
        
        try {
          
            let request_body = {
               
            "recipient":{
                    "id": sender_psid
                },
                "messaging_type": "RESPONSE",
                "message":{
                    "text": "What is your party size ?",
                    "quick_replies":[
                    {
                        "content_type":"text",
                        "title":"1-3",
                        "payload":"SMALL",
                        
                    },{
                        "content_type":"text",
                        "title":"2-5",
                        "payload":"MEDIUM",
                        
                    },{
                        "content_type":"text",
                        "title":"More than 5",
                        "payload":"LARGE",
                        
                    }]
                }
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

let sendMessageAskingPhoneNumber = (sender_psid) => {
    return new Promise((resolve, reject) => {

        let request_body = {
          "recipient": {
              "id": sender_psid
          },
          "messaging_type": "RESPONSE",
          "message": {
              "text": "Thank you. And what's the best phone number for us to reach you at?",
              "quick_replies": [
                  {
                      "content_type": "user_phone_number",
                  }
              ]
          }
      };
    
      // Send the HTTP request to the Messenger Platform
      request({
          "uri": "https://graph.facebook.com/v6.0/me/messages",
          "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
          "method": "POST",
          "json": request_body
      }, (err, res, body) => {
          if (!err) {
              console.log('message sent!');
              resolve("success!")
          } else {
              reject("Unable to send message:" + err);
          }
      });
    });
}

let sendMessageDoneReservation = async (sender_psid) => {

    try {
      let response = {
          "attachment": {
              "type": "image",
              "payload": {
                  "url": "https://thumbs.gfycat.com/OpenPointlessAndeancondor-size_restricted.gif"
              }
          }
      };
      
      await sendMessage(sender_psid, response);

      //get facebook username
      let username = await getFacebookUsername(sender_psid);

      //send another message
      let response2 = {
          "attachment": {
              "type": "template",
              "payload": {
                  "template_type": "button",
                  "text": `Done! \nOur reservation team will contact you as soon as possible ${username}.\n \nWould you like to check our Main Menu?`,
                  "buttons": [
                      {
                          "type": "postback",
                          "title": "SHOW MAIN MENU",
                          "payload": "MAIN_MENU"
                      },
                      {
                          "type":"phone_number",
                          "title":"☎ HOT LINE",
                          "payload":"+911911"
                      },
                      {
                          "type": "postback",
                          "title": "START OVER",
                          "payload": "RESTART_CONVERSATION"
                      }
                  ]
              }
          }
      };
      
      await sendMessage(sender_psid, response2);
  } catch (e) {
      console.log(e);
  }
}

let sendMessageDefaultForTheBot = (sender_psid) => {
    return new Promise (async (resolve, reject) => {
        
        try{
            let response1 = {
                "text": "Sorry, I'm just a bot, man ^^ \nYou can test me with all these buttons or try to make a reservation.\n\nThis video may help you to understand me 😉"
            };
            //send a media template
            let response2 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "media",
                        "elements": [
                            {
                                "media_type": "video",
                                "url": "https://www.facebook.com/haryphamdev/videos/635394223852656/",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "BACK TO MAIN MENU",
                                        "payload": "BACK_TO_MAIN_MENU",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "Start over",
                                        "payload": "RESTART_CONVERSATION"
                                    }
                                ]
                            }
                        ]
                    }
                }
            };
           
            await sendMessage(sender_psid, response1);
            await sendMessage(sender_psid, response2);
            resolve("done");
        }catch (e) {
            reject(e);
        }
    });
};


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
  sendAppetizer,
  sendSalad,
  sendFish,
  sendClassic,
  handleReserveTable,
  handleShowRooms,
  sendMessage,
  sendMessageAskingQuantity,
  sendMessageAskingPhoneNumber,
  sendMessageDoneReservation,
  showRoomDetail,
  sendMessageDefaultForTheBot
}