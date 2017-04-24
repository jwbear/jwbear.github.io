alert("start");

$( document ).ready(function (callback) {
       //AJAX Call to Watson API
    	$.ajax({
    		url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27',
              beforeSend: function(xhr) { 
                     xhr.setRequestHeader("Authorization", "Basic " + btoa("f2a9cfc8-3322-41f3-b188-95a90ecf7e9e:2CLTsQkdjCQa")); 
              },
              dataType: 'jsonp',
              success: function( tone_data ) {
                  // Got the data - parse it and return the temperature
                  tone = tone_data[document][emotion][joy];
                  alert(tone_data);
                  callback(tone);
              }
        });
});
    
