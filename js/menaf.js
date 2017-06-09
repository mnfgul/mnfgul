/**
 * @author menaf
 */

$(document).ready(function(){
	
	//change color incase visitor coming with hash
	changeColor();
	
	//assign events
	$(".footNavSec").fadeTo('fast', 0.5).hover(function(){
		$(this).stop(true,true).fadeTo('slow',1);
	},function(){
		$(this).stop(true,true).fadeTo('slow',0.5);
	});
	
	$("#projectsNav a").click(function(){
		$(this).toggleClass("selected");
		var selector=".projectThumbs li." + $(this).attr("rel");
		$('.projectThumbs li').not('.selected').fadeTo('fast',0.5);
		if($(this).hasClass('selected'))
		{
			$(selector).fadeTo('slow',1.0).addClass('selected');
		}
		else
		{
			$(selector).fadeTo('slow',0.5).removeClass('selected');
		}
		return false;
	});
	
	$('.projectThumbs li').hover(function(){
		$(this).addClass('hover');
	},function(){
		$(this).removeClass('hover');
	});
	
	$('.projectThumbs li a').click(function(){
		var link =  $(this).attr('href');
		$("#overlay").show();
		$("#modal").animate({ 
		    width: "100%",
		  }, 500 );
		$("#progressBar").show();
		$('#modalContentArea').ajaxError(function() {
			$("#closeBt").fadeIn('slow');
			  $(this).html('<div class="error">Well this is embarrassing; error while loading page. Please try again.</div>');
			});
		$("#modalContentArea").load(link, function(response, status, xhr){
			Cufon.replace('.convert');
			$("#progressBar").hide();
			$("#modal").animate({ height: "90%", top: "5%"}, 500, function(){
				$("#modalContentArea").fadeIn();
				$("#closeBt").fadeIn('slow');
			});
		});
		
		return false;
	});
	
	$("#closeBt").click(function(){
		$(this).hide();
		$("#modalContentArea").hide();
		$("#modal").animate({ height: "0px", top: "50%"}, 500 ).animate({ width: "0px"}, 500, function(){
			$(this).hide();
			$("#overlay").hide();
		}).hide();
	});
	
	//assign each menu item function to change color and smooth scrolling
	$("#topmenu a").each(function(){
		$(this).click(function(){
			var page=$(this).attr('href');	        
			$.scrollTo(page,1200,{onAfter:function(){
	        	changeColor();
	        }});	        
	        return false;
		});
	});
	
	//add color change trigger for scrolling with scrollbar
	$(window).scroll(function () { 
		setTimeout("changeColor()",1000);
	});
});

/*
 * Changes interface color based on shown page
 */
function changeColor(){
	//page array
	pageHashes = ['home', 'about-me', 'projects', 'contact-me'];
	//get current page
	var page=getPageNumber();
	
	//change logo if page is changed
	var logo='#logo'+page;
	var color='color'+page;
	if(!$(logo).is(':visible')){
		$('.logo').stop(true, true);
		$('.logo:visible').fadeOut(1600);
		$(logo).fadeIn(1600);
		$('#topmenu li').stop(true,true).removeClass().addClass(color);
		window.location.hash = pageHashes[page-1];
	}	
}

/*
 *Returns page number based on positions
 */
function getPageNumber(){
	//get positions of each page and scrollbar
	var position=$(window).scrollTop();
	var positions=[];
	positions[0]=$('#page1').offset().top;
	positions[1]=$('#page2').offset().top-160;
	positions[2]=$('#page3').offset().top-160;
	positions[3]=$('#page4').offset().top-160;

	//calculate page numbers based on positions
	var page=1;
	switch(true){
	case ((position > positions[0]) && (position < positions[1])):{
		page=1;
	}break;
	case ((position > positions[1]) && (position < positions[2])):{
		page=2;
	}break;
	case ((position > positions[2]) && (position < positions[3])):{
		page=3;
	}break;
	case ((position > positions[3])):{
		page=4;
	}break;
	default:{
		page=1;
	}
	}
	return page;
}