$('#toggle').on('click',function() {
	$(this).toggleClass('on');
	$('.menu').toggleClass('menu-open');
	var menuHeight = $('.menu').css('height');
	console.log(menuHeight);
	if($('.menu').hasClass('menu-open')){
		$('.main').on({
		    'mousewheel': function(e) {
		        if (e.target.id == 'el') return;
		        e.preventDefault();
		        e.stopPropagation();
	    	}
		})
		$('.main').on({
		    'swipe': function(e) {
		        if (e.target.id == 'el') return;
		        e.preventDefault();
		        e.stopPropagation();
	    	}
		})
	}
	$('.main').toggleClass('push-toright');
})




$('.menu ul').on('click', function() {
	$(this).toggleClass('selected');
	$(this).children().toggleClass('expanded');
})