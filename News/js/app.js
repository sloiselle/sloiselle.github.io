//Incomplete (Nearly complete) Tasks
//Jim - Add infinite scrolling
	//Load 20 articles by default, load 20 more when bottom of page is hit

//Completed Tasks
//Scott - Make AJAX request to NPR
//Scott - Error handling if app cannot load from selected feed
//Scott - Clicking on Search icon expands search bar
//Ray - Create a 'loading' container
//JB - Use handlebars.js to template articles
//Julie - Add second source later
//Julie - Clicking on article should pop overlay/modal with full article
	//Needs onclick event
//Julie - Should be link in overlay to read more from source
	//Onclick, overlay.show. Overlay is built with handlebars
	//Should be able to close with X button
//JB - User can select news source which repopulates the page
	//On error from AJAX request
	//Width = 0 by default. Width = 20%. Add sweet transition here, Scott.
//Julie - Clicking the feedr logo displays default feed (all news sources)
	//Add onclick event here
//Jim - Searching in the bar by article title
	//On keyup, query the loaded articles

var Feedr = {
	formattedStories: []
};
//Getting and formatting the feeds

Feedr.getNPRData = function () {
	var nprUrl = 'http://api.npr.org/query?id=1001&dateType=story&fields=title,teaser,storyDate,text,image,relatedLink&output=JSON&apiKey=MDI0MzcyNjQ4MDE0NjM1MzI4OTM5MWM4NQ000';

	$.ajax({
		url: nprUrl, 
		method: 'GET',
		dataType: 'json',
		async: !1,
		error: function(req, err){ 
			$('#main').append("<div class='errorMessage'>Unfortunately, we couldn't get your feed. Please try again later...</div>");
		},
		success: function(data){
			Feedr.handleResponse(data, "NPR")
		}
	})
	return formattedStories;
};

Feedr.getNYTData = function () {
	var nytUrl = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=9110591622f644cb97e319bb627afcdf';

	$.ajax({
		url: nytUrl, 
		method: 'GET',
		dataType: 'json',
		async: !1,
		error: function(req, err){ 
			$('#main').append("<div class='errorMessage'>Unfortunately, we couldn't get your feed. Please try again later...</div>");
		},
		success: function(data){
			Feedr.handleResponse(data, "NYT")
		}
	})
	return formattedStories;
};

Feedr.getGuardianData = function() {
	var guardianUrl = "http://content.guardianapis.com/search?api-key=695fa638-6cf0-4f26-abb9-21ad316b0b1f&show-fields=all";

    $.ajax({
		url: guardianUrl,
		method: "GET",
		dataType: "json",
		async: !1,
		error: function(req, err){ 
			$('#main').append("<div class='errorMessage'>Unfortunately, we couldn't get your feed. Please try again later...</div>");
		},
		success: function(data){
			Feedr.handleResponse(data, "Guardian")
  		}
    })
    return formattedStories;
}

Feedr.handleResponse = function(data, source) {
			formattedStory = function(id, title, date, blurb, fullStory, link, source, image){
				this.id = id
				this.title = title
				this.date = date
				this.blurb = blurb
				this.fullStory = fullStory
				this.link = link
				this.source = source;
				this.image = image;
			};
			if(source === "NPR"){
				var stories = data.list.story;
				stories.forEach(function(elem) {
					var fullStory = "";
					for(var i = 0;i < elem.text.paragraph.length;i++){
						fullStory += elem.text.paragraph[i].$text;
					}
					if(fullStory.length > 500){
						fullStory = fullStory.slice(0,500).trim() + "...";
					}
					var date = new Date(elem.storyDate.$text)
					formattedDate = date.toLocaleString()
					var image = '';
					if(elem.image === undefined || elem.image[0].crop[1] === undefined){
						image = 'https://lh4.ggpht.com/AnC8LtJK3CzWLuMrVee3FMgNrGcKXDPjtygeNfkLmV078Tu5C9L_bxcR0tEnnluu_e8=w300'
					} else{
						image = elem.image[0].crop[1].src || elem.image[0].crop[0].src;
					}
					var story = new formattedStory(elem.id, elem.title.$text, formattedDate, elem.teaser.$text, fullStory, elem.link[2].$text, "NPR",image);
					formattedStories.push(story);
				});
				Feedr.sortDates(formattedStories);
			} else if(source === "NYT"){
				var stories = data.results;
				stories.forEach(function(elem) {
					var date = new Date(elem.created_date);
					var image = "";
					if(elem.multimedia.length == 0){
						image = 'https://static01.nyt.com/images/icons/t_logo_291_black.png'
					} else{
						image = elem.multimedia[0].url;
					}
					formattedDate = date.toLocaleString();
					var story = new formattedStory("n/a", elem.title, formattedDate, elem.abstract, elem.abstract, elem.short_url, "NYT",image);
					formattedStories.push(story);
					})
				Feedr.sortDates(formattedStories);
			} else if(source === "Guardian"){
				var stories = data.response.results;
				stories.forEach(function(elem) {
					var date = new Date(elem.webPublicationDate);
					formattedDate = date.toLocaleString();
					var image = "";
					if(elem.fields.thumbnail === undefined){
						image = 'https://lh5.ggpht.com/ekfdW6Z5Hj1A_VBG2MWazZfCuz-66Gpkou0V8maEGDgO1tgNGET8Jy9Kbf-D9F7Hnv0=w300'
					} else{
						image = elem.fields.thumbnail;
					}
					var storyBody = elem.fields.body;
					var regex = /(<([^>]+)>)/ig;
					var result = storyBody.replace(regex, "");
					if(result.length > 500){
						result = result.slice(0,500).trim() + "...";
					}
					var story = new formattedStory(elem.id, elem.webTitle, formattedDate, elem.fields.trailText, result, elem.fields.shortUrl, "Guardian",image);
					formattedStories.push(story);
				})
				Feedr.sortDates(formattedStories);	
			}
		}

Feedr.sortDates = function(stories) {
	stories.sort(function(a,b){
	var c = new Date(a.date);
	var d = new Date(b.date);
	return d-c;
	});
}

Feedr.randomColor = function() {
	var hexList = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
	var charSet = [];
	var multiHex = "";
	var hexString = "#";
	for(var i = 0; i < 6; i++) {
		var char = hexList[Math.ceil(Math.random() * 15)];
		charSet.push(char);
		hexString += char;
	}
	return hexString;
}

//Using the data from the feeds to populate the DOM
Feedr.compileItem = function(story) {
  var source = $('#articleTemplate').html();
  var template = Handlebars.compile(source);
  return template(story);
}

Feedr.initializeFeed = function(source, list) {
  $.each(source, function() {
    list.append(Feedr.compileItem(this));
  });
}


//Styling stuff
$('.search').on('click',function() {
	$('.search').css({'width':'','background':'white'})
})

$('.search').on('focusout',function() {
	$('.search').css({'width':'','background':'rgba(0,0,0,0.2)'})
	var length = $('.search').val().length
	if(length === 0){
		$('.search').css({'width':''})
	} else{
		$('.search').css({'width':(length * 12)+'px'})
	}
})

//Initialization
$(function() {
	var $articleList = $('#main')
	formattedStories = [];
	$articleList.children().remove();
	Feedr.initializeFeed(Feedr.getNPRData(), $articleList);
	$articleList.html("");
	Feedr.initializeFeed(Feedr.getNYTData(), $articleList);
	$articleList.html("");
	Feedr.initializeFeed(Feedr.getGuardianData(), $articleList);
	$(this).parent().parent().parent().find('span').text('All');
	$("#overlay").css('opacity','0');
	setTimeout(function(){
		$("#overlay").hide();
	},1000)
})

//Event handling
$('.newsList').on('click', function(){
		formattedStories = [];
		var $articleList = $('#main')
		$articleList.html("");
		if($(this).text() == 'NPR'){
			Feedr.initializeFeed(Feedr.getNPRData(), $articleList);
			$(this).parent().parent().parent().find('span').text('NPR');
		} else if($(this).text() == 'New York Times'){
			Feedr.initializeFeed(Feedr.getNYTData(), $articleList);
			$(this).parent().parent().parent().find('span').text('NYT');
		} else if($(this).text() == 'Guardian'){
			Feedr.initializeFeed(Feedr.getGuardianData(), $articleList);
			$(this).parent().parent().parent().find('span').text('Guardian'); 
		} else{
			Feedr.initializeFeed(Feedr.getNPRData(), $articleList);
			$articleList.html("");
			Feedr.initializeFeed(Feedr.getNYTData(), $articleList);
			$articleList.html("");
			Feedr.initializeFeed(Feedr.getGuardianData(), $articleList);
			$(this).parent().parent().parent().find('span').text('All');
		}
})

$('body').on('click','article',function() {
	$(this).next().css({"opacity": "1","z-index": "5"});
})

$('body').on('click', '.closePopUp',function() {
	$(this).parent().css({"opacity": "0","z-index": "-1"});
})

$('header').on('click',function(){
	var hexString = Feedr.randomColor();
	var darkerColor = 'rgba(0,0,0,0.2)'
	$(this).css({'background':hexString})
	$('.title').css({'color':hexString})
	$('.closePopUp').css({'color':hexString})
	$('.popUpAction').css({'background':hexString})
	$('#header ul li').css({'background':darkerColor})
	$('.search').css({'background':darkerColor})
	$('.search:hover').css({'color':darkerColor})
	$('.search:focus').css({'color':darkerColor})
})

$('header > *').on('click',function(e){
	e.stopPropagation();
})

$('#feedr-logo').on('click', function(){
	formattedStories = [];
	var $articleList = $('#main')
	$articleList.html("");
	Feedr.initializeFeed(Feedr.getNPRData(), $articleList);
	$articleList.html("");
	Feedr.initializeFeed(Feedr.getNYTData(), $articleList);
	$articleList.html("");
	Feedr.initializeFeed(Feedr.getGuardianData(), $articleList);
	$(this).parent().parent().parent().find('span').text('All');
});

$('.search').on('keyup',function() {
        var search = $('.search').val().toUpperCase(); //Sets the search value to UpperCase always
        var title = '';
    $('.title').each( function(){
        title = $(this).text().toUpperCase(); //Sets each title to UpperCase always
        if(title.includes(search)){
            $(this).parent().parent().parent().show();
        } else{
            $(this).parent().parent().parent().hide();
        }
    })
});
