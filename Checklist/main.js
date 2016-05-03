/*Create a Checklist: Independent Practice

You'll add the ability to complete tasks in your favorite things list. Your program must complete the following rules:

- Through jQuery, add a "complete task" link at the end of each to-do item (i.e. each "favorite thing").
- When clicked, the link will cross out the current item (hint: add a class to the list that sets the text-decoration to strikeout).
- Each new item added by the user needs to also have the "complete task" link at the end.
- Bonus: when user completes an item, remove that item from the current list and add it to a completed list below. Do not show this list unless the there are completed items.
- Bonus 2: add the ability to restore items from the completed list to the first list.

*/

'use strict';
  
$(document).ready( function() {
  var done_button = "<button style='margin:0 5px' class='done-button fa-input' type='submit'><i class='fa fa-times' aria-hidden='true'></i><i class='fa fa-hand-o-right' aria-hidden='true'></i></button>";
  var undo_button = "<button style='margin:0 5px' class='undo-button' type='submit'><i class='fa fa-check' aria-hidden='true'></i><i class='fa fa-undo' aria-hidden='true'></i></button>";
  var yourName = prompt('What is your name?');
  var $thingList = $('#fav-list');
  var $completedList = $("#completed-list");
  var $completedHeader = $('#completed-header');
  var $newButton = $('#new-thing-button');
  var $favHeader = $('#fav-header');
  var $doneButton = $('.done-button');

  $('#name').html(yourName);

  $(done_button).prependTo("li");

  //Add a new item to the To Do list and show the list if it's hidden.
  $newButton.on('click', function(event) {
    event.preventDefault();
    MyApp.addToList($thingList, done_button);
    $favHeader.show();
    $thingList.show();
  });


  $(document).on('click', 'li', function(event) {
    //If the item is in the To Do list, move it to the Completed list
    if($(this).children().children().hasClass("fa-times")){
      var task = $(this);
      $.each(task, function(i, task) {
        $(task).detach();
        $completedList.append("<li>" + undo_button + $(task).text() + "</li>");
      });
      //If there are no items left in the To Do list, hide the list.
      if($thingList.children().length < 1){
        $favHeader.hide();
        $thingList.hide();
      }
      $completedHeader.show();
      $completedList.show();
      //If the item is in the Completed list, move it to the To Do list
    } else if($(this).children().children().hasClass("fa-check")){
      var task = $(this);
      $.each(task, function(i, task) {
        $(task).detach();
        $thingList.append("<li>" + done_button + $(task).text() + "</li>");
      });
      //If there are no items left in the Completed list, hide the list.
      if($completedList.children().length < 1){
        $completedHeader.hide();
        $completedList.hide();
      }
      $favHeader.show();
      $thingList.show();
    }
    });
  });

var MyApp = {};

MyApp.addToList = function(list, button) {
  var $newLi = $('<li>');
  var $newItemText = $('#new-thing');
  $newLi.html($newItemText.val());
  $newItemText.val('');
  if ($newLi.html() !== '') {
    list.append($newLi);
    $newLi.prepend(button);
  }
}
