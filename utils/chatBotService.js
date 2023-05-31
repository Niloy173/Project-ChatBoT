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


module.exports = {
  getFacebookUsername
}