//
// Menu.js
//

function Menu() {
	var self = this;
   this.loginDiv = $("#loginpages");          //// Login Div
   this.Page1 = $("#page1");                  // Login Menu
   this.Page2 = $("#page2");                  // Login Page 
   this.Page3 = $("#page3");                  // 
	this.Page4 = $("#page4"); 						 // Forgot User
   this.NewUser = $("#newUser");              // New user button
   this.ExistingUser = $("#existingUser");    // Existing user button
   this.LoginUser = $("#login");              // Login button
   this.ForgotUser = $("#forgot");            // Forgot user button
   this.RecoverUser = $("#recover");          // Recover user button
	this.LoginExistUser = $("#loginexistuser");      

   this.ServerBrowser = $("#serverbrowser");
   this.HighScores = $("#loginPages");
   this.GameScreen = $("#loginPages");
   



   this.init = function () {
		this.ServerBrowser.css({display: "none"});
		this.HighScores.css({display: "none"});
		this.GameScreen.css({display: "none"});
		this.loginDiv.css({display: "none"});

		this.Page1.css({display: "block"});
		this.Page2.css({display: "none"});
		this.Page3.css({display: "none"});
		this.Page4.css({display: "none"});
		
		this.NewUser.click(function () {
			self.Page1.css({display: "none"});
			self.Page2.css({display: "block"});
		});
		this.ExistingUser.click(function () {
			self.Page1.css({display: "none"});
			self.Page3.css({display: "block"});
		});
		this.LoginUser.click(function () {
			self.loginDiv.css({display: "none"});
			self.ServerBrowser.css({display: "block"});
		});
		this.ForgotUser.click(function () {
			self.Page3.css({display: "none"});
			self.Page4.css({display: "block"});
		});
		this.RecoverUser.click(function () {
			self.Page4.css({display: "none"});
			self.Page1.css({display: "block"});
		});
		this.LoginExistUser.click(function () {
			self.loginDiv.css({display: "none"});
			self.ServerBrowser.css({display: "block"});
		});
   }
}
