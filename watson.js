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
    
    ext.get_tone = function(sent, callback){
    	 //AJAX Call to Watson API
    	$.ajax({
    		url: 'https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19&text='+sent,
              username:'f2a9cfc8-3322-41f3-b188-95a90ecf7e9e', 
              password:'2CLTsQkdjCQa',
              dataType: 'jsonp',
              success: function( tone_data ) {
                  // Got the data - parse
                  tone = tone_data[document_tone][tone_categories][0][tones][0][tone_name];
                  //alert(tone);
                  callback(tone);
              }
        });
    };
    
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'current temperature in city %s', 'get_temp', 'Boston, MA'],
            ['R', 'tone of sentence %s', 'get_tone', 'fine.'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Weather extension', descriptor, ext);
})({});
