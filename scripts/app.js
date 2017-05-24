var myKey = config.token;
var googleKey = config.googleToken;

var skycons = new Skycons({"color": "black"});

var model = {
  weatherInfo: [],
  cityName : []
};

//2 if location can be recieved from browser, showPosition is called
function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }

}
//3 latitude and longitude are sent to getCityName
function showPosition(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  getCityName(lat, long);

}

//4 lat and long are sent to the first api call to get the city name
//with success, data is sent to the cityName model and getWeatherInfo is called
function getCityName(latitude, longitude, callback) {
  $.ajax({
    url: config.googleRoot,
    data: {
      latlng: latitude + ',' + longitude,
      key: googleKey
    }
  })
  .done(function(data) {
    console.log("success");
    model.cityName = data.results;
    getWeatherInfo(latitude, longitude, render);

  })
  .fail(function() {
    console.log("error");
  })
}

//5 getWeatherInfo takes the lat/long and gets the weather for that loc
//the callback, render is called
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

//6 render gets info from the model and displays on page.
function render() {
  var temp = document.getElementById('temp');
  var sky = document.getElementById('sky');
  var city = document.getElementById('city');

  var currently = model.weatherInfo.apparentTemperature;
  var summary = model.weatherInfo.summary;
  var icon = model.weatherInfo.icon;

  var myCity = model.cityName[0].address_components[2].long_name;

  temp.innerHTML = "The Temperature is " + Math.round(currently);
  city.innerHTML = myCity;
  sky.innerHTML = summary;

  weatherIcon = skycons.add("animated-icon", icon);
  skycons.play();
  console.log(myCity);
};


//1 window loads, calls getLocation()
$(window).on("load", function() {
    getLocation();
});

