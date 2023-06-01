const request = require('request');

const {sendMainMenu, 
  getFacebookUsername, 
  sendResponseWelcomeNewCustomer,
  sendLunchMenu,
  sendDinnerMenu,
  sendPubMenu,
  sendAppetizer,
  sendClassic,
  sendFish,
  sendSalad,
  handleReserveTable,
  handleShowRooms,
  sendMessageAskingQuantity
  } = require("../utils/chatBotService");

let getWebhook = (req,res,next) => {

  let VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN ;

  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  if(mode && token) {

    if(mode === 'subscribe' && token === VERIFY_TOKEN) {

      console.log('WEBHOOK VERIFIED');
      res.status(200).send(challenge);
    
    }else{
      res.sendStatus(403);
    }

  }
}


let postWebhook = (req,res,next) => {

  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);        
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
      
    });

    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
}

// Handles messages events
let handleMessage = async (sender_psid, received_message) => {

 // let response;

  // Check if the message contains text
  // if (received_message.text) {    

  //   // Create the payload for a basic text message
  //   response = {
  //     "text": `You sent the message: "${received_message.text}". Now send me an image!`
  //   }
  // }
  // // check if the message is an attachment  
  // else if (received_message.attachments) {
  
  //   // Gets the URL of the message attachment
  //   let attachment_url = received_message.attachments[0].payload.url;
  
  //   response = {
  //     "attachment": {
  //       "type": "template",
  //       "payload": {
  //         "template_type": "generic",
  //         "elements": [{
  //           "title": "Is this the right picture?",
  //           "subtitle": "Tap a button to answer.",
  //           "image_url": attachment_url,
  //           "buttons": [
  //             {
  //               "type": "postback",
  //               "title": "Yes!",
  //               "payload": "yes",
  //             },
  //             {
  //               "type": "postback",
  //               "title": "No!",
  //               "payload": "no",
  //             }
  //           ],
  //         }]
  //       }
  //     }
  //   }
  // } 

  let entity = handleMessageWithEntities(received_message);

  if(entity.name === "datetime"){
    // handle quick reply message asking about phone number
    await sendMessageAskingQuantity(sender_psid);
  }
  else if(entity.name === "phone_number"){
    // handle quick reply message : done reserve table

  }else {

    // default reply message
  }


  
  // Sends the response message
  callSendAPI(sender_psid, response);
}


// Handles messaging_postbacks events
let handlePostback = async (sender_psid, received_postback) => {

  let response;
  
  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  switch(payload){

    case 'GET_STARTED':

      //get username
      const username = await getFacebookUsername(sender_psid);
      await sendResponseWelcomeNewCustomer(username,sender_psid);
      
      // response = { "text": `Welcome ${username} to The Dinner 💜`};
      break;

      case "MAIN_MENU":
        //send main menu to users
        await sendMainMenu(sender_psid);
        break;
      // case "GUIDE_BOT":
      //   await sendGuideToUseBot(sender_psid);
      //   break;
      case "LUNCH_MENU":
        await sendLunchMenu(sender_psid);
        break;
      case "DINNER_MENU":
        await sendDinnerMenu(sender_psid);
        break;

      case "PUB_MENU":
        await sendPubMenu(sender_psid);
        break;

      case "RESERVE_TABLE":
        await handleReserveTable(sender_psid);
        break;

      case "SHOW_ROOMS":
        await handleShowRooms(sender_psid);
        break;
      // case "SHOW_ROOM_DETAIL":
      //   await chatBotService.showRoomDetail(sender_psid);
      //   break;
      case "SHOW_APPETIZERS":
        await sendAppetizer(sender_psid);
        break;

      case "SHOW_ENTREE_SALAD":
        await sendSalad(sender_psid);
        break;

      case "SHOW_FISH":
        await sendFish(sender_psid);
        break;

      case "SHOW_CLASSICS":
        await sendClassic(sender_psid);
        break;

      case "BACK_TO_MAIN_MENU":
        await sendMainMenu(sender_psid);
        break;

      case "BACK_TO_LUNCH_MENU":
        await sendLunchMenu(sender_psid);
        break;

      case 'yes':
        response = { "text": "Thanks!" }
        callSendAPI(sender_psid, response);
        break;
    
      case 'no':
        response = { "text": "Oops, try sending another image." }
        callSendAPI(sender_psid, response);
        break;
    
    default:
      console.log("Something went wrong with the switch case");
  }
  // Send the message to acknowledge the postback
  // callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  
  // Construct the message body
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
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}

// handle message with Entities
let handleMessageWithEntities = (message) => {
  let entitiesArr = ["datetime", "phone_number"];
  let entityChosen = "";
  let data = {}; // to detect which entities choosen
  entitiesArr.forEach((name) => {

    let entity = firstEntity(message.nlp, name.trim());
    if(entity && entity.confidence > 0.8) {
      entityChosen = name;
      data.value = entity.value;
    }
  });

  data.name = entityChosen;
  //console.log(data);

  return data;

  // console.log("------------------------");
  // console.log(entityChosen); // Wheither to detect phone or dateTime from message it will print them otherwise remains empty string
  // console.log("------------------------");


}

// Parse an NLP message
function firstEntity(nlp, name) {
  return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0];
}
module.exports = {
  postWebhook,
  getWebhook
}