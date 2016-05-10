/*

- Sign up for openweathermap.org and generate an API key.
- User either $.ajax or $.get to pull weather current data .
  for Washington DC (hint: http://api.openweathermap.org/data/2.5/weather?q=...).
- Print the temperature in console.
- Bonus 1: add a form prompting user for the city and state.
- Bonus 2: convert answer from kelvin to fahrenheit.

*/

var WeatherApp = {};

WeatherApp.precipitation = function(precipitationType, quantity){

	function randRange(minNum, maxNum) {
  		return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
	};

	function precipitate() {
		for( i = 0;i < quantity; i++) {
			var dropLeft = randRange(0,1600);
			var dropTop = randRange(-2000,0);

			if(precipitationType == "raindrop"){
		  		$('body').append('<i class="drop fa fa-tint" id="drop'+i+'"></i>');
	  		} else{
	  			$('body').append('<div class="drop snowflake" id="drop'+i+'">&#x2744;</div>');
	  		}
			$('#drop'+i).css('left',dropLeft);
			$('#drop'+i).css('top',dropTop);
		}
	}
	precipitate();
}

WeatherApp.time = function(sunrise, sunset){
	var currentDate = new Date(),
	sunrise = new Date(sunrise * 1000),
	sunset = new Date(sunset * 1000);
	if((currentDate.getTime() - sunrise.getTime())/1000/60/60 > 1.5 && (sunset.getTime() - currentDate.getTime())/1000/60/60 > 1.5){
		console.log("Daytime");
		for(i = 1;i < 10;i++){
			$('#cloud-' + i).css({'color':''});
		};
		$('.stars').css('opacity','');
		$('.twinkling').css('opacity','');
		$('#sun').css({'color':'','font-size': '','left': '','top': '','z-index':''});
		$('#sun').html('&#x2600;');
	} else if((currentDate.getTime() - sunrise.getTime())/1000/60/60 < 1.5){
		console.log('sunrise');
		if($('#sun').css('opacity') == 1){
			$('#sun').css({'z-index': '-20'});
			$('body').css('background','#fbb400');
			$('#sun').css({'color': '#fbf08d', 'font-size': '300px','left': '200px','top': '275px'});
		}
	} else if((sunset.getTime() - currentDate.getTime())/1000/60/60 > 1.5){
		console.log('sunset');
		if($('#sun').css('opacity') == 1){
			$('#sun').css({'z-index': '-20'});
			$('#sun').css({'color': '#fbf08d', 'font-size': '300px','left': '900px','top': '300px'});
			$('body').css('background','#d287c9');
			for(i = 1;i < 10;i++){
				if(i % 2 == 0){
					$('#cloud-' + i).css('color','#ad0e4f');
				} else{
					$('#cloud-' + i).css('color','#fcaf9d');
				}
			}
		}
	}else{
		console.log("Night");
		$('body').css('background','#000000');
		$('.stars').css('opacity','1');
		$('.twinkling').css('opacity','1');
		$('#sun').html('&#x25cf;');
		$('#sun').css({'color': '#edf4fe','text-shadow': 'none','z-index': -10,'left':'','top':''});
	}
	console.log('Sunrise at ' + sunrise.toString());
	console.log('Sunset at ' + sunset.toString());
	console.log('Current time is ' + currentDate.toString());
}

WeatherApp.citySearch = function(data, city){
	city = city || 0;
	if(data.cod == "404" || (data.name != city && city != 0)){
		alert("I don't know that city!");
	} else{
		var city = data.name,
		weather = data.weather[0].id,
		country = data.sys.country,
		temp = (data.main.temp * 9/5 - 459.67).toString().substring(0,4) + "&deg;F";
		if(city == "North Pole"){
			weather = city;
		}
		$('#city').html(city + ", " + country);
		$('#temperature').html(temp);
		WeatherApp.weather(weather);
		WeatherApp.time(data.sys.sunrise, data.sys.sunset);
	};
};

WeatherApp.weather = function(weather){
	console.log(weather);
	$('.hill').removeClass('snow');
	$('.drop').remove();
	for(i = 1;i < 10;i++){
		if(i % 2 == 0){
			$('#cloud-' + i).css('color','#ffffff');
		} else{
			$('#cloud-' + i).css('color','#f4f3f5');
		}
	}
	if(weather >= 200 && weather < 300){

		WeatherApp.precipitation('raindrop', 80);
		//insert thunderstorm logic
	} else if(weather >= 300 && weather < 400){
		//drizzle
		WeatherApp.precipitation('raindrop', 20);
	} else if(weather >= 500 && weather < 600){
		//rain
		$('#top').children().each(function() {
			if(this.id.includes("cloud") || this.id.includes("rain")) {
				$(this).css('opacity','1');
			} else{
				$(this).css('opacity','0');
			}
		});
		for(i = 1;i < 10;i++){
			if(i % 2 == 0){
				$('#cloud-' + i).css('color','#7e7d7d');
			} else{
				$('#cloud-' + i).css('color','#919091');
			}
		}
		$('body').css('background','#4c5d6d');
		WeatherApp.precipitation('raindrop', 80);
	} else if(weather >= 600 && weather < 700){
		//snow
		$('#top').children().each(function() {
			if(this.id.includes("cloud")) {
				$(this).css('opacity','0');
			} else{
				$(this).css('opacity','1');
			}
		});
		$('body').css('background','#dfe8e7');
		WeatherApp.precipitation('snow', 40);
		$('.hill').addClass('snow');
	} else if(weather == 800){
		$('.hill').removeClass('snow');
		//sunny/clear
		$('#top').children().each(function() {
			if(this.id != 'sun'){
				$(this).css('opacity','0');
			} else{
				$(this).css('opacity','1');
			}
		});
		$('body').css('background','#ADD8E6');
	} else if(weather >= 800 && weather < 804) { 
		$('.hill').removeClass('snow');
		//partly cloudy
		$('#top').children().each(function() {
			if(this.id =="sun" || this.id =="cloud-3" || this.id =="cloud-4" || this.id =="cloud-7" || this.id =="cloud-5"){
				$(this).css('opacity','1');
			} else{
				$(this).css('opacity','0');
			}
		});
		$('body').css('background','#4567a7');
	} else if(weather == 804){
		//overcast
		$('#top').children().each(function() {
			if(this.id.includes("cloud")) {
				$(this).css('opacity','1');
			} else{
				$(this).css('opacity','0');
			}
		});
		$('body').css('background','#4c5d6d');
	}

	if(weather == 'North Pole'){
		$('body').css('background','#dfe8e7');
		$('#top').children().each(function() {
			if(this.id.includes("cloud")) {
				$(this).css('opacity','1');
			} else{
				$(this).css('opacity','0');
			}
		});
		$('.hill').addClass('snow');
		$('#santa').css('opacity','1');
		$('#north_pole').css('opacity','1');
		WeatherApp.precipitation('snow', 40);
	} else{
		$('#santa').css('opacity','0');
		$('#north_pole').css('opacity','0');
	}
}

WeatherApp.initialize = function(data) {
	var city = data.name,
	weather = data.weather[0].id,
	country = data.sys.country,
	temp = (data.main.temp * 9/5 - 459.67).toString().substring(0,4) + "&deg;F";
	$('#city').html(city + ", " + country);
	$('#temperature').html(temp);
	WeatherApp.weather(weather);
	WeatherApp.time(data.sys.sunrise, data.sys.sunset)

}

WeatherApp.convertTemp = function(){
	var temp = $('#temperature').html();
	if($('#temperature').html().endsWith('F')){
		temp = ((temp.substring(0,4) - 32) / 1.8).toString().substring(0,4) + "&deg;C";
	} else{
		temp = (temp.substring(0,4) * 1.8 + 32).toString().substring(0,4) + "&deg;F";
	}
	$('#temperature').html(temp);
}

'use strict';
(function() {
  var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?";
  var apiKey = "&apikey=79bea1990b4e155d6341eb53a9fc8934";
  var zipCode = Math.ceil(Math.random() * 100000).toString().substring(0,6);


//Event Handlers
	$.get(weatherUrl + 'zip=' + zipCode + apiKey, function(data){
		WeatherApp.initialize(data);
	});

	 $(document).keydown(function(e) {
            if (e.keyCode == 13) {
                 $('button').click(); 
            }
        })

	$('body').on('click', 'button', function(){
		cityZip = $('#cityZipInput').val();
		if(cityZip == ""){
			alert("Enter either a city or a zip code to search for.");
		} else if(isNaN(cityZip.substring(0,1))){
			$.get(weatherUrl + 'q=' + cityZip + apiKey, function(data) {
				WeatherApp.citySearch(data, cityZip);
			});
		} else {
			$.get(weatherUrl + 'zip=' + cityZip + apiKey, function(data){
				WeatherApp.citySearch(data);
			});
		}
		$('#cityZipInput').val("");
	});

	$('body').on('click', '#temperature', function(){
		WeatherApp.convertTemp();
	});
})();

;
