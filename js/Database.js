//
//
//

function Database() {

	this.init = function () {
		
		return true;
	}
	
   this.loadServers = function (url, page) {
   
		try {
			var ajax = new XMLHttpRequest();
			ajax.open("GET", url);
			ajax.overrideMimeType("text/javascript");		
			ajax.onreadystatechange = function () {			
				
				if (ajax.readyState === 4) {

					if (ajax.status===200) {
						console.log(ajax.responseText);
						loadPage (ajax.responseText, page);	
					} else {
						alert (ajax.status +": "+ ajax.statusText);
					}
				}				
			}
			ajax.send(null);
		}
		catch (e) {
			alert (e.message);
		}
	}
	
	this.addServer = function () {
		var url = "addServer.php"+ "?random=" + (new Date()).getTime();	
		
			try
			{
				var ajax = new XMLHttpRequest();
				
				ajax.open("POST",url,true);
				ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");

				ajax.onreadystatechange = function ()
				{			
					if( ajax.readyState === 4)
					{
						document.getElementById("bookid").value = "";
						document.getElementById("amount").value = "";
						// Confirm the addition of the sale entry
						alert("The new sale entry was successfully added.");
					
					}		
				}
				ajax.send("&date=" + document.getElementById("date").value + 
				"&bookid=" + document.getElementById("bookid").value +"&amount=" + document.getElementById("amount").value );
			}
			catch (e)
			{
				alert (e.message);
			}
		}	
	}
	
	this.handleRefresh = function () {
	
	}
	
	
};
