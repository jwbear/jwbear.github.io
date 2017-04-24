alert("start");

$( document ).ready(function (callback) {
       //AJAX Call to Watson API
    	$.ajax({
    		url: 'https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19&text=A%20word%20is%20dead%20when%20it%20is%20said,%20some%20say.%20Emily%20Dickinson',
              username:'f2a9cfc8-3322-41f3-b188-95a90ecf7e9e', 
              password:'2CLTsQkdjCQa',
              dataType: 'jsonp',
              success: function( tone_data ) {
                  // Got the data - parse
                  tone = tone_data[document_tone][tone_categories][0][tones][0][tone_name];
                  alert(tone);
                  callback(tone);
              }
        });
});
    
