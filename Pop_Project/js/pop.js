$('#toggle').on('click',function() {
	$(this).toggleClass('on');
	$('.menu').toggleClass('menu-open');
	var menuHeight = $('.menu').css('height');
	console.log(menuHeight);
	if($('.menu').hasClass('menu-open')){
		$('.container').on({
		    'mousewheel': function(e) {
		    	console.log('menu scroll')
		        if (e.target.id == 'el') return;
		        e.preventDefault();
		        e.stopPropagation();
	    	}
		})
	}
	$('body').toggleClass('push-toright');
})




$('.menu ul').on('click', function() {
	$(this).toggleClass('selected');
	$(this).children().toggleClass('expanded');
})