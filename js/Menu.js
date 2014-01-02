/**
 * @constructor
 * @class Menu
 */
function Menu() {
   /**
	 * Stores the page name for page flipping
	 * @protected
	 * @type {string}
	 */
   var currPage;
	
	/**
	 * Self reference when 'this' is not available
	 * @protected
	 * @type {Menu}
	 */
   var self = this;

   this.loginDiv = $("#loginpages");          //// Login Div
   this.Page1 = $("#page1");                  // Login Menu
   this.Page2 = $("#page2");                  // Login Page 
   this.Page3 = $("#page3");                  // 
   this.Page4 = $("#page4");                    // Forgot User
   this.NewUser = $("#newUser");              // New user button
   this.ExistingUser = $("#existingUser");    // Existing user button
   this.LoginUser = $("#login");              // Login button
   this.ForgotUser = $("#forgot");            // Forgot user button
   this.RecoverUser = $("#recover");          // Recover user button
   this.LoginExistUser = $("#loginexistuser");      

   this.ServerBrowser = $("#serverbrowser");  // Overall Server Browser
   this.SBR = $('#serverbrowserroot');        // Server Browser Root
   this.ServerList = $("#serverlist");        // Server List Div
   this.ServerSub = $("#serversubmission");   // Server subbmision form

   this.NewServer = $("#newserver");          // New Server Button
   this.ExistingServer = $("#existservers");  // Existing Server Button
   this.AddServer = $("#addserver");          // Add Server Button
   this.JoinHighlighted = $('#joinhighlighted');

   this.HighScores = $("#highscores");
   this.GameScreen = $("#gamearea");

	/**
	 * Write content to the server list table on the server browser page 
	 * @public
	 * @param rooms
	 */
   this.loadServers = function (rooms) {
      var i = 0;
      if (rooms.length === 0) {
			console.log("no servers found");
         return;
      } 
    
      var tab = document.getElementById("list");
      if(document.getElementById("tbody")){
         tab.removeChild(document.createElement("tbody"));
      }
      if (rooms !== null) {
         var tbod = document.createElement("tbody");
         tbod.setAttribute("id", "dataset");
         for (i = 0; i < rooms.length; i++) {
            if (rooms[i] !== undefined && rooms[i] !== null) {
               var tr = document.createElement('tr');
               var a = document.createElement('td');
               var t = document.createElement('td');
               var y = document.createElement('td');
               var e = document.createElement('td');
               var c = document.createElement('td');
               a.appendChild(document.createTextNode(rooms[i].Name));
               t.appendChild(document.createTextNode(rooms[i].Map));
               y.appendChild(document.createTextNode(rooms[i].MapSize));
               e.appendChild(document.createTextNode(rooms[i].Players));
               c.appendChild(document.createTextNode(rooms[i].Status));
               tr.appendChild(a);
               tr.appendChild(t);
               tr.appendChild(y);
               tr.appendChild(e);
               tr.appendChild(c);
               tr.addEventListener('dblclick', function () {
                  console.log("join game");
               });
               tr.addEventListener('click', function () {
                  self.JoinHighlighted.css({display: "block"});
               });
               if ((i % 2) === 1) {
                  tr.setAttribute("class", "row2");
               } else {
                  tr.setAttribute("class", "row1");
               }
               tbod.appendChild(tr);
            }
         }
         tab.appendChild(tbod);
      }
   }

	/**
	 * Sets up the event listeners for the Menu's DOM elements. Utilizing currPage to page flip.
	 * @public
	 */
   this.initialize = function (socket) {
      currPage = this.Page1;
      var self = this;
		
      // Overall Pages
      this.ServerBrowser.css({display: "none"});
      this.HighScores.css({display: "none"});
      this.GameScreen.css({display: "none"});
      this.loginDiv.css({display: "block"});

      // Login Subsections
      this.Page1.css({display: "block"});
      this.Page2.css({display: "none"});
      this.Page3.css({display: "none"});
      this.Page4.css({display: "none"});

      // Serer Broswer Subsections
      this.SBR.css({display: "block"});
      this.ServerList.css({display: "none"});
      this.ServerSub.css({display: "none"});
      this.JoinHighlighted.css({display: "none"});

      // Highscore Subsections

      //Gamescreen Subsections
      
      this.NewUser.click(function () {
         currPage.css({display: "none"});
         self.Page2.css({display: "block"});
         currPage = self.Page2;
      });
      this.ExistingUser.click(function () {
         currPage.css({display: "none"});
         self.Page3.css({display: "block"});
         currPage = self.Page3;
      });
      this.LoginUser.click(function () {
         currPage.css({display: "none"});
         self.ServerBrowser.css({display: "block"});
         Game.player.name = $('#newusername').value;
			socket.addUser(Game.player);
         currPage = self.SBR;
      });
      this.ForgotUser.click(function () {
         currPage.css({display: "none"});
         self.Page4.css({display: "block"});
         currPage = self.Page4;
      });
      this.RecoverUser.click(function () {
         currPage.css({display: "none"});
         self.Page1.css({display: "block"});
         currPage = self.Page1;
      });
      this.LoginExistUser.click(function () {
         currPage.css({display: "none"});
         self.ServerBrowser.css({display: "block"});
         Game.player.name = $('#existuser').value;
         currPage = self.SBR;
      });
      this.ExistingServer.click(function () {
         self.loadServers();
         currPage.css({display: "none"});
         self.ServerList.css({display: "block"});
         currPage = self.ServerList;
      });
      this.NewServer.click(function () {
         currPage.css({display: "none"});
         self.ServerSub.css({display: "block"});
         currPage = self.ServerSub;
      });
      this.AddServer.click(function () {
         currPage.css({display: "none"});
         self.ServerBrowser.css({display: "none"});
         self.GameScreen.css({display: "block"});
         currPage = self.GameScreen;
      });
      this.JoinHighlighted.click(function () {
         currPage.css({display: "none"});
         self.ServerBrowser.css({display: "none"});
         self.GameScreen.css({display: "block"});
         currPage = self.GameScreen;
      });
   }
}
