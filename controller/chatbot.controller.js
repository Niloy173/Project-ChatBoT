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

  let body = req.body;

  if(body.object === 'page') {

    body.entry.forEach(function(entry){
      
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      let sender_psid = webhook_event.sender.id;
      // console.log('Sender PSID: ' + sender_psid);

     

    });

    res.status(200).send('EVENT_RECEIVED');
  }else{
    res.sendStatus(404);
  }
}


module.exports = {
  postWebhook,
  getWebhook
}