// jim.js
// Jim's working js file for testing

//Jim - Searching in the bar by article title
    //On keyup, query the loaded articles

// check the way we did it in relevant-mobile

//Jim - Add infinite scrolling
    //Load 20 articles by default, load 20 more when bottom of page is hit

// look up infinite scrolling

// build some sample data
// maybe find some online source that can be translated into it
//

//NYT API Key: 9110591622f644cb97e319bb627afcdf



// filter the list as user types
// $('.search').on('keyup',function() {
//     $('article').hide(); // hide all <article>s
//     $('article:contains('+ $(this).val() +')').show(); // show those that match the case-sensitive filter
// })

// THIS IS THE INFINITE SCROLL CODE //
// WE WANT TO GET 20 OR SO ROWS AT A TIME - FEWER MIGHT BE MORE RESPONSIVE
// KEEP TRACK OF THE STARTING ROW AND NUMBER OF ROWS
// INCREMENT THE STARTING ROW WHEN YOU GET THE NEXT BATCH
// NEED TO CALL THE FEED LOADER IN A COMMON METHOD
// - from page load, scrolling, and switching feeds
// I FOUND AND ADDED THE startNum and numResults parameters to the NPR query
//     var nprUrl = 'http://api.npr.org/query?id=1001&startNum='+start+'&numResults='+rows+'&dataType=story&output=JSON&apiKey=MDI0MzcyNjQ4MDE0NjM1MzI4OTM5MWM4NQ000';
// NEED TO CALL THE PAGE LOADING OVERLAY BEFORE CALL, AND THE FADE AFTER PROCESSING


/*
$(document).ready(function() {
    var win = $(window);

    // keep track of feed items to download
    // I REALLY want these three variables in a closure!
    var start = 1;
    var rows = 15;
    var formattedStories = [];

    // load initial rows
    $("#overlay").show();
    $("#overlay-content").show();
    getNPRDataJim(start, rows, formattedStories);


    // Each time the user scrolls
    win.scroll(function() {
        // End of the document reached?
        if ($(document).height() - win.height() == win.scrollTop()) {
            // $('#loading').show();
            $("#overlay").show();
            $("#overlay-content").show();

            // console.log('win.scroll formattedStories: ',formattedStories);
            console.log('loading rows '+start+' to '+(start+rows-1));
            getNPRDataJim(start, rows, formattedStories);
            console.log('win.scroll formattedStories: ',formattedStories);


            // next time get these rows:
            start = rows + start;

        }
    });
});

*/




// this was my test bed to get the scrolling working

/*

getNPRDataJim = function (start, rows, formattedStories) {
    var nprUrl = 'http://api.npr.org/query?id=1001&startNum='+start+'&numResults='+rows+'&dataType=story&output=JSON&apiKey=MDI0MzcyNjQ4MDE0NjM1MzI4OTM5MWM4NQ000';
    // note the typo in the NPR generated URL - dateType should have been dataType.  BOTH work!
    console.log('getNPRDataJim formattedStories: ',formattedStories);
    $.ajax({
        url: nprUrl,
        method: 'GET',
        dataType: 'json',
        error: function(req, err){ console.log('Error: ' + err); },
        success: function(response){
            // console.log(response);
            handleNPRResponse(response);
            $("#overlay").fadeOut();
        }
    })

    var handleNPRResponse = function(data) {
        console.log('handleNPRResponse formattedStories: ',formattedStories);
        var stories = data.list.story;
        // var formattedStories = [];
        stories.forEach(function(elem) {
            var fullStory = "";
            for(var i = 0;i < elem.text.paragraph.length;i++){
                fullStory += elem.text.paragraph[i].$text;
            }
            var story = {
                id: elem.id,
                title: elem.title.$text,
                date: elem.pubDate.$text,
                blurb: elem.teaser.$text,
                fullStory: fullStory,
                link: elem.link[2].$text,
                source: "NPR"
            }
            formattedStories.push(story);
        });
        // console.log(formattedStories);
        formattedStories.forEach(function(elem) {
            console.log(elem);
            handleList(elem);
            // var fullStory = "";
            // for(var i = 0;i < elem.text.paragraph.length;i++){
            //     fullStory += elem.text.paragraph[i].$text;
            // }
            // var story = {
            //     id: elem.id,
            //     title: elem.title.$text,
            //     date: elem.pubDate.$text,
            //     blurb: elem.teaser.$text,
            //     fullStory: fullStory,
            //     link: elem.link[2].$text,
            //     source: "NPR"
            // }
            // formattedStories.push(story);
        });
    }
};

*/
