const request = require('request');
const { setUpMessangerPlatform } = require('../utils/homepageService');

let getHomepage = (req,res,next) => {
  res.render('homepage');
};

let getFacebookUserProfile = (req, res,next) => {
  res.render("profile");
}

let setUpUserFacebookProfile = async (req, res, next) => {
  
  try {

    await setUpMessangerPlatform(process.env.PAGE_ACCESS_TOKEN);

    return  res.status(200).json({
      message: "ok"
    });
    
  } catch (error) {

    return  res.status(500).json({
      message: error
    });
    
  }
  

}

module.exports = {
  getHomepage,
  getFacebookUserProfile,
  setUpUserFacebookProfile
}