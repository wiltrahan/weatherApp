var myKey = config.token;

var skycons = new Skycons({"color": "black"});

// skycons.add("animated-icon", Skycons.rain);

// skycons.play();

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
  console.log(lat, long);
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
  var sky = document.getElementById('sky');
  var weatherIcon = document.getElementById('animated-icon');


  var currently = model.weatherInfo.apparentTemperature;
  var summary = model.weatherInfo.summary;
  var icon = model.weatherInfo.icon;
  temp.innerHTML = "The Temperature is " + Math.round(currently);
  sky.innerHTML = summary;
  weatherIcon = skycons.add("animated-icon", icon);
  skycons.play();
};



