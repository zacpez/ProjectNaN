//
// Menu.js
//

function Menu() {
   var loginDiv = $('#loginpages');          //// Login Div
   var Page1 = $('#page1');                  // Login Menu
   var Page2 = $('#page2');                  // Login Page 
   var Page3 = $('#page3');                  // Forgot User
   var NewUser = $('#newuser');              // New user button
   var ExistingUser = $('#existinguser');    // Existing user button
   var LoginUser = $('#login');              // Login button
   var ForgotUser = $('#forgot');            // Forgot user button
   var RecoverUser = $('#recover');          // Recover user button

   var ServerBrowser = $('#serverbrowser');
   var HighScores = $('#loginPages');
   var GameScreen = $('#loginPages');
   



   this.init = function () {
   ServerBrowser.css('display': 'none');
   HighScores.css('display': 'none');
   GameScreen.css('display': 'none');
   loginDiv.css('display': 'block');

   Page1.css('display': 'block');
   Page2.css('display': 'none');
   Page3.css('display': 'none');

   NewUser.click(function () {
      Page2.css('display': 'none');
   });
   ExistingUser.click(function () {
      
   });
   LoginUser.click(function () {
      
   });
   ForgotUser.click(function () {
      
   });
   RecoverUser.click(function () {
      
   });
   }
}
