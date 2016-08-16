/*------------------------------
 * Copyright 2014 Pixelized
 * http://www.pixelized.cz
 *
 * Freelancer theme v1.1
------------------------------*/

$(window).scroll(function(){
	if($(window).scrollTop() > 600) {
		$('.navbar-default').fadeIn(300);
	}
	else {
		$('.navbar-default').fadeOut(300);
	}
	
	if($(window).width() > 767) {
		if ($(this).scrollTop() > 600) {
			$('.scroll-up').fadeIn(300);
		} else {
			$('.scroll-up').fadeOut(300);
		}		
	}
});

$(document).ready(function() {	

	$("a.scroll[href^='#']").on('click', function(e) {
		e.preventDefault();
		var hash = this.hash;
		$('html, body').animate({ scrollTop: $(this.hash).offset().top}, 1000, function(){window.location.hash = hash;});
	});
	
	$('#skills-toggle').click(function() {
        $('#skills').slideToggle(500);
        $('#skills').waypoint(function(){$('#skills .number').countTo();},{offset:'85%'});
		/*$('.chart').easyPieChart({
			barColor: '#1ABC9C',
			trackColor: '#2F4254',
			scaleColor: false,
			lineCap: 'butt',
			lineWidth: 12,
			size:110,
			animate: 2000
		});*/
    });
	
	$('#overlay-hide').click(function() {
		$('#reference .reference-overlay').animate({opacity:0},1000);
		$('#reference-text').animate({opacity:0},1000);
	});
		
	$('.overlay-wrapper').mouseenter(function() {
		$(this).find('.overlay a:first-child').addClass('animated slideInLeft');
		$(this).find('.overlay a:last-child').addClass('animated slideInRight');
    });
	
	$('.overlay-wrapper').mouseleave(function() {
		$(this).find('.overlay a:first-child').removeClass('animated slideInLeft');
		$(this).find('.overlay a:last-child').removeClass('animated slideInRight');
    });
	
	$('.carousel').mouseenter(function() {
		$('.carousel-control').fadeIn(300);
	});
	
	$('.carousel').mouseleave(function() {
		$('.carousel-control').fadeOut(300);
	});
	
	//$('#separator').waypoint(function(){$('#separator .number').countTo();},{offset:'85%'});
	
	if($(window).width() > 767) {
		$('.service').mouseenter(function(e) {
			$(this).find('img').animate({paddingBottom: "15px"},500);
		});
		
		$('.service').mouseleave(function(e) {
			$(this).find('img').stop().animate({paddingBottom: "0px"},500);
		});
	}
	
	if($(window).width() > 767) {
		$('.scrollpoint.sp-effect1').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInLeft');},{offset:'90%'});
		$('.scrollpoint.sp-effect2').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInRight');},{offset:'90%'});
		$('.scrollpoint.sp-effect3').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInDown');},{offset:'90%'});
		$('.scrollpoint.sp-effect4').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeIn');},{offset:'70%'});
		
		$('.macbook-inner').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('black');},{offset:'70%'});
	}
	
	var getMessage = function(){
        date_future = new Date(2016, 9, 8, 14, 0, 0);
        date_now = new Date();
        
        if (new Date() < new Date(2016, 9, 8, 14, 0, 0)) {
	        seconds = Math.floor((date_future - (date_now))/1000);
	        minutes = Math.floor(seconds/60);
	        hours = Math.floor(minutes/60);
	        days = Math.floor(hours/24);
	        
	        hours = hours-(days*24);
	        minutes = minutes-(days*24*60)-(hours*60);
	        seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
	        
	    	$("#counter0").text(days);
	        $("#counter1").text(hours);
			$("#counter2").text(minutes); 
			$("#counter3").text(seconds);
        }
        
		$.get("add-ins/dday/api.php",function(messages){
	        $("#remainText").text(messages.remainText);
	        $("#welcomeText").text(messages.welcomeText);
	      
		}, "json");
	    
    };
    
	var calcWedding = setInterval(getMessage,1000);
    
});


