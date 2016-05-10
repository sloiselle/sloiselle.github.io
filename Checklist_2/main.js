'use strict';
var MyApp = {};

// Compile element using handlebars
MyApp.compileItem = function(item) {
  var source = $('#to-do-template').html();
  var template = Handlebars.compile(source);
  return template(item);
}

// Note: this starter data is usually loaded from somewhere
MyApp.todos = [{toDo: "Clean fridge"}, {toDo: "Take out Puppy"}, {toDo: "Finish work"} ];

//Add to List MyApp.addToList

MyApp.addToList = function(list) {
  //On click of '$button', add the given item to the 'todos' array
    var $newThingText = $('#new-thing').val();
    $('#new-thing').val("");
    MyApp.todos.push({toDo: $newThingText}); //need to add to todos list for iteration later
    if($newThingText != ""){
      list.append(MyApp.compileItem({toDo: $newThingText}));
    }
  };

// Initial population of the list from todos array
MyApp.initializeList = function(list) {
  $.each(MyApp.todos, function() {
    list.append(MyApp.compileItem(this));
  });
}

// Remove both the data from the model/array and from the DOM
MyApp.removeFromList = function($list, $item) {
  var itemIndex = $item.index();

  // Remove item from main data array
  if (itemIndex > -1)
      MyApp.todos.splice(itemIndex, 1);

  // Remove dom element of item
  $item.remove();
}

$(function() {

  var $thingList = $('#fav-list'),
      $button = $('#new-thing-button');

  $($button).on('click', function(e){
    e.preventDefault();
    MyApp.addToList($thingList);
  });

  MyApp.initializeList($thingList);



  

  /************************* Event Handlers *************************/
  

  // Hover events for each list item in the to-do list. On hovering an element, its siblings get an inactive class applied
  $thingList.on('mouseenter mouseleave', 'li', function(e){
    if(e.type == 'mouseenter'){
      $(this).removeClass('inactive');
      $(this).siblings().addClass('inactive');
    } else if (e.type == 'mouseleave') {
      $(this).siblings().removeClass('inactive');
    }


  });

  //Click on Complete
  $thingList.on('click', 'button.complete', function(e){
    $(this).children().toggleClass('fa-hand-o-right');
    $(this).parent().toggleClass('completed');
    $(this).children().toggleClass('fa-check');
  });

  //Click on Delete
  $thingList.on('click', 'button.delete', function(e){
    var $item = $(this).parent();
    MyApp.removeFromList($thingList, $item);
  });  


  /************************* End Event Handlers *************************/
});







