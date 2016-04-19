var startupX = ['Uber', 'Google', 'Amazon', 'Apple', 'Facebook', 'Twitter'];
var startupY = ['Slack', 'Trello', 'Tesla', 'Hyperloop', 'Harvest', 'DraftKings'];
var favorites = [];

//Create New Startup

setRandom();

$("#xForY").text("Create your new startup!");

$('#create').bind('click', setRandom);

function setRandom() { 
	random1 = Math.ceil( Math.random() * startupX.length - 1); 
	random2 = Math.ceil( Math.random() * startupY.length - 1);
	window.randomString = ('A startup that is ' + startupX[random1] + ', but for ' + startupY[random2]);
	$("#xForY").text(randomString);
};

//Favorite Startup

$('#save').bind('click', addToFavorites);

function addToFavorites() {
	favorites.push(randomString);
	$("#xForY").text("Added to favorites!");
}

//Print Favorites

$('#print').bind('click', printFavorites);

function printFavorites() {
	if(favorites.length < 1) {
		$("#favorites").html("You don't have any favorites!");
	}
	else{
		$("#favorites").html("");
		for(i = 0; i < favorites.length; i++){
			$("#favorites").append(favorites[i] + "<br/>");
		}
	}
}

//Clear Favorites

$('#clear').bind('click', clearFavorites);

function clearFavorites() {
	$("#favorites").html("");
	favorites = [];
}
