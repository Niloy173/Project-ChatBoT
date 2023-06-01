const request = require('request');
const moment = require('moment');

let user = {
  name: "",
  phoneNumber: "",
  time: "",
  quantity: "",
  createdAt: ""
};

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
  sendMessageAskingPhoneNumber,
  sendMessageAskingQuantity,
  sendMessageDoneReservation
  } = require("../utils/chatBotService");

const {sendMessageDefaultForTheBot, 
        sendResponseGreetings,
        sendResponseBye,
        sendResponseThanks
} = require("../utils/homepageService");

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
let handleMessage = async (sender_psid, message) => {

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

  // checking quick reply
  if(message && message.quick_reply && message.quick_reply.payload) {

    if(message.quick_reply.payload === "SMALL" || message.quick_reply.payload === "MEDIUM" ||  
     message.quick_reply.payload === "LARGE") {

      if (message.quick_reply.payload === "SMALL") user.quantity = "1-2 people";
      if (message.quick_reply.payload === "MEDIUM") user.quantity = "2-5 people";
      if (message.quick_reply.payload === "LARGE") user.quantity = "More than 5 people";

      // asking about the phone number
      await sendMessageAskingPhoneNumber(sender_psid);
      return;
     }

     // payload is a phone number | look for the validity of the phone number
     if(message.quick_reply.payload !== " "){

      user.phoneNumber = message.quick_reply.payload;
      user.createdAt = moment(Date.now()).zone("+07:00").format('MM/DD/YYYY h:mm A');

      //send a notification to Telegram Group chat by Telegram bot.

      // done reservation. send messages to the user
      await sendMessageDoneReservation(sender_psid);
      
     }

     return;

  }

  let entity = handleMessageWithEntities(message);
  let locale = entity.locale;

  if(entity.name === "datetime"){
    // handle quick reply message asking about phone number
    await sendMessageAskingQuantity(sender_psid);
  }
  else if(entity.name === "phone_number"){

    user.phoneNumber = entity.value;
    user.createdAt = moment(Date.now()).zone("+07:00").format('MM/DD/YYYY h:mm A');
    //send a notification to Telegram Group chat by Telegram bot.

    // handle quick reply message : done reserve table
    await sendMessageDoneReservation(sender_psid);

  }else if(entity.name === "greetings"){
    await sendResponseGreetings(sender_psid, locale);
  }else if(entity.name === "thanks"){
    await sendResponseThanks(sender_psid, locale);
  }else if(entity.name === "bye"){
    await sendResponseBye(sender_psid, locale);
  }else {

    // default reply message
    await sendMessageDefaultForTheBot(sender_psid);
  }


  
  // Sends the response message
  // callSendAPI(sender_psid, response);
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
      user.name = username;
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
  
  // console.log(`The actual message : `, message);
  let entitiesArr = ["datetime", "phone_number","greetings", "thanks", "bye" ];
  let entityChosen = "";
  let data = {}; // to detect which entities choosen
  entitiesArr.forEach((name) => {

    let entity = firstEntity(message.nlp, name);
    // console.log(`Return entity:  ${entity}`);
    if(entity && entity.confidence > 0.8) {
      entityChosen = name;
      data.value = entity.value;
    }
  });

  data.name = entityChosen;
  // console.log(entityChosen);

  //checking language
  if (message && message.nlp && message.nlp.detected_locales) {
    if (message.nlp.detected_locales[0]) {
        let locale = message.nlp.detected_locales[0].locale;
        console.log(`locale :`,locale);
        data.locale = locale.substring(0, 2)
    }

  }
  
  // console.log(`data: `,data);

  

  console.log("------------------------");
  console.log(entityChosen); // Wheither to detect phone or dateTime from message it will print them otherwise remains empty string
  console.log("------------------------");

   return data;
}

// Parse an NLP message
function firstEntity(nlp, name) {
  // console.log(`entities : ${nlp.entities[`wit$${name}: ${name}`]}`);
  try {
    return nlp && nlp.entities && nlp.traits[`wit$${name}:${name}`] && nlp.traits[`wit$${name}:${name}`][0];
  } catch (error) {
    console.log(`Error occurred : ${error}`);
  }
}
module.exports = {
  postWebhook,
  getWebhook
}