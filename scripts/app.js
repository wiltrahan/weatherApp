var myKey = config.token;

var model = {
  weatherInfo: []
};

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }

}

function showPosition(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  getWeatherInfo(lat, long, render);
}

$(window).on("load", function() {
    getLocation();
});


function getWeatherInfo(latitude, longitude, callback) {

  $.ajax({
    url: config.root + myKey + '/' + latitude + ',' + longitude,
    success : function(data) {
      model.weatherInfo = data.currently;
      console.log(model.weatherInfo);
      callback();
    },
    error : function(err) {
      console.log("Something went wrong.");
      throw err;
    }
  });
};

function render() {
  var temp = document.getElementById('temp');
  var currently = model.weatherInfo.apparentTemperature;
  temp.innerHTML = "The Temperature is " + Math.round(currently);

};
