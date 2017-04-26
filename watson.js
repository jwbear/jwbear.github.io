(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    
    ext.get_temp = function(location, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&units=imperial&APPID=0839f1e7c6c46680879e8b06e86d8714',
              dataType: 'jsonp',
              success: function( weather_data ) {
                  // Got the data - parse it and return the temperature
                  temperature = weather_data['main']['temp'];
                  callback(temperature);
              }
        });
    };
    
    
    //separate ajax call, Watson API not jsonp enabled
    function watsonTone(sent, callback) {

		  var http = new XMLHttpRequest();
		  var url = "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19&text=" + sent;
		  http.open("GET", url, true);		  


		  http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState == 4 && http.status == 200) {
				//console.log('signIn responseText: ', http.responseText);

				var response = http.responseText;

				//console.log(response);
				//get tones from response
				var responseString = JSON.parse(response);
				var tones = responseString.document_tone.tone_categories[0].tones;

				//loop over tones choose max tone
				var tone = "";
				var max = 0;
				for (var i=0; i<tones.length; i++){
					var score = tones[i].score;
					if(score > max){
						max = tones[i].score; 
						tone = tones[i].tone_name;
						console.log(tone);
					}
					
				}
				
				//return dominant tone
				callback(tone);
				//console.log(responseString);
				return;
			}
			else {
			
				
				var response = http.responseText;
				console.log(response);

				//console.log(response);
				//get tones from response
				var responseString = JSON.parse(response);
				var tones = responseString.document_tone.tone_categories[0].tones;

				//loop over tones choose max tone
				var tone = "";
				var max = 0;
				for (var i=0; i<tones.length; i++){
					var score = tones[i].score;
					if(score > max){
						max = tones[i].score; 
						tone = tones[i].tone_name;
						console.log(tone);
					}
					
				}
				
				//return dominant tone
				callback(tone);
				//console.log(responseString);
				return;
				
			}
		  }

	  http.withCredentials = true;
	  http.send(null);
	}
    
    ext.get_tone = function(sent, callback){
    	watsonTone(sent, callback);
    	}
    
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'current temperature in city %s', 'get_temp', 'Boston, MA'],
            ['R', 'tone of sentence %s', 'get_tone', 'fine.'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Watson extension', descriptor, ext);
})({});
