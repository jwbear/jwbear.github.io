alert("start");

        // Make an AJAX call to the Open Weather Maps API
function() {
        $.ajax({
              url: 'http://api.openweathermap.org/data/2.5/weather?q='+'Boston,MA'+'&units=imperial&APPID=0839f1e7c6c46680879e8b06e86d8714',
              dataType: 'jsonp',
              success: function( weather_data ) {
                  // Got the data - parse it and return the temperature
                  temperature = "meep"; //weather_data['main']['temp'];
                  alert("meep");
                  //callback(temperature);
              } 
        });
};
