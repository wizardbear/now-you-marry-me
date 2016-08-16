var minMsgId = 9999999;

var tmpl = '<div class="col-sm-6 sp-effect1" id="messageBox{id}" data-msg-id="{id}">' +
'<div class="media">' +
//'<a class="pull-left" href="#"><img class="media-object img-circle" src="data/jj.png" alt=""></a>' +
'<div class="media-body">' +
'<h4 class="media-heading">{name}</h4>' +
//'<span><!--Webdesigner-->&nbsp</span>' +
'<p>{message}</p></div></div></div>';
            
function addMessage(id, name, message, position) {
    msg = tmpl.replace('{name}', name);
    msg = msg.replace('{message}', message);
    msg = msg.replace('{id}', id);
    if (position == 'top') {
        $('#messageRow').prepend(msg);
    }
    else {
        $('#messageRow').append(msg);
    }
    if (minMsgId > id) minMsgId = id;
}

function showRecentMessages() {
	$.ajax({
		url: "add-ins/guestbook/api.php?m=show-recent-messages",
		type: "GET",
		data: {},
		dataType: 'json',
		cache: false,
		success: function(res) {
		    for(i=0; i<res.length; i++) {
		        name = res[i].name;
		        message = res[i].message;
		        id = res[i].id;
		        
		        addMessage(id, name, message, 'bottom');
		    }
		},
		error: function(){},
	})
    
}

$(document).ready(function() {
    var errorHandler = function() {
		// Fail message
		$('.contact-alert').html("<div class='alert alert-danger'>");
		$('.contact-alert > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'><i class='fa fa-times'></i></button><strong>잠깐 문제가 있는 것 같은데요,\n잠시 후에 한번만 더 시도해 주시겠어요?</strong></div>");
		//clear all fields
		$('#contactForm').trigger("reset");
	};

    var $container = $('#photos-wrapper');
    
    // init
    $container.imagesLoaded(function () {
        $container.packery({
            itemSelector: '.item',
            percentPosition: true
        });
        
    	if($(window).width() > 767) {
    		$('.scrollpoint.sp-effect1').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInLeft');},{offset:'90%'});
    		$('.scrollpoint.sp-effect2').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInRight');},{offset:'90%'});
    		$('.scrollpoint.sp-effect3').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInDown');},{offset:'90%'});
    		$('.scrollpoint.sp-effect4').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeIn');},{offset:'70%'});
    		
    		$('.macbook-inner').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('black');},{offset:'70%'});
    	}

    });

    $("#testimonials .btn-primary").click(function(){
        
		$.ajax({
			url: "add-ins/guestbook/api.php?m=show-more-messages",
			type: "GET",
			data: {
				minMsgId: minMsgId
			},
			cache: false,
    		dataType: 'json',
    		success: function(res) {
    		    for(i=0; i<res.length; i++) {
    		        name = res[i].name;
    		        message = res[i].message;
    		        id = res[i].id;
    		        
    		        addMessage(id, name, message, 'bottom');
    		    }
    		},
			error: errorHandler,
		});
        
    }); 

	$("input,textarea").jqBootstrapValidation({
    	preventSubmit: true,
		
		submitSuccess: function($form, event) {
			event.preventDefault(); // prevent default submit behaviour
			// get values from FORM
			var name = $("input#name").val();
			var message = $("textarea#message").val();

			$.ajax({
				url: "add-ins/guestbook/api.php",
				type: "POST",
				data: {
					name: name,
					message: message
				},
				cache: false,
				success: function(res) {
				    console.log(res);
				    if (res == 'fail') {
				        errorHandler();
				        return false;
				    }
				    
					// Success message
					$('.contact-alert').html("<div class='alert alert-success'>");
					$('.contact-alert > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'><i class='fa fa-times'></i></button><strong>축하해 주셔서 감사합니다!</strong></div>");
					//clear all fields
					$('#contactForm').trigger("reset");
					
					addMessage(res, name, message, "top");
			// 		location.href='#messageBox'+res;
					location.href='#TestimonialsTitle';
				},
				error: errorHandler,
			})
		}
	});

});


showRecentMessages();

