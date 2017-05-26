var myKey = config.token;
var googleKey = config.googleToken;

var skycons = new Skycons({"color": "#DC3522"});

var model = {
  weatherInfo: [],
  cityName : []
};


$(document).ready(function(){

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
      model.cityName = data.results;
      getWeatherInfo(latitude, longitude, render);

    })
    .fail(function() {
      alert("Something went wrong, please try again");
    })
  }

  //5 getWeatherInfo takes the lat/long and gets the weather for that loc
  //the callback, render and startTime is called
  function getWeatherInfo(latitude, longitude, callback) {

    $.ajax({
      url: config.root + myKey + '/' + latitude + ',' + longitude,
      success : function(data) {
        model.weatherInfo = data.currently;
        callback();
        startTime();
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

    temp.innerHTML = "Current Temp: " + Math.round(currently) + "f";
    city.innerHTML = "Welcome to " + myCity + "!";
    sky.innerHTML = "Today will be " + summary + ".";



    weatherIcon = skycons.add("animated-icon", icon);
    skycons.play();
    $('.btn').show();
  };


  function startTime() {
    var currentTime = new Date(),
        hours = currentTime.getHours(),
        minutes = currentTime.getMinutes();

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    var suffix = "AM";

    if (hours >= 12) {
      suffix = "PM";
      hours = hours - 12;
    }
    if (hours == 0) {
        hours = 12;
    }
    document.getElementById('time').innerHTML = hours + ":" + minutes + " " + suffix;
  }


      $("#cbut").click(function(){
          $("#temp").show(tempConvert())
      });
      $("#fbut").click(function(){
          $("#temp").show(farConvert())
      });


    function tempConvert() {
      var cel = document.getElementById("temp");
      var faren = model.weatherInfo.apparentTemperature;
      var celConv = (faren-32)/1.8;

      cel.innerHTML = "Current Temp: " + Math.round(celConv) + "c";

    }

    function farConvert() {
      var far = document.getElementById("temp");
      var farTemp = model.weatherInfo.apparentTemperature;
      far.innerHTML = "Current Temp: " + Math.round(farTemp) + "f";
    }

  //starts here*****
  getLocation();
});
