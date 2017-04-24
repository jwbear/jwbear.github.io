alert("start");

       //AJAX Call to Watson API
    	$.ajax({
    		  url: 'https://gateway.watsonplatform.net/tone-analyzer/api',
              username: 'f2a9cfc8-3322-41f3-b188-95a90ecf7e9e',
  			  password: '2CLTsQkdjCQa',
              dataType: 'jsonp',
              success: function( tone_data ) {
                  // Got the data - parse it and return the temperature
                  tone = tone_data[document][emotion][joy];
                  callback(temperature);
              }
        });
    
alert(temperature);