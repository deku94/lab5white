'use strict';

$(document).ready(function() {
	initializePage();
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");
	
	$('.listing').click(extendTab);
}

function extendTab(event){
	event.preventDefault();
	var link=($(this).next()).attr('id');

	var icon=$(this).find('#dir');
	//$(this).css("background-color","red");
	$.get("equipment/view/"+link,views);
	
	
	/*$(this).after("<div class='row row-bottom-margin info' style = 'margin-bottom: 0px; background-color: #151515; background-size: 100% auto ; padding-bottom: 0px;overflow:hidden;'>  </div>");
		*/

}
function views(e){
	var n;
	console.log(e);
	var key;
	var text="";
	var height= String(e.length*150)+"px";
	console.log(height);
	for(key in e){
		n=e[key]['equipment'];
		var temp=e[key];
		//console.log(e[key]);
		text=text+"<br>"+ "<h4>Place:"+temp['name']+"</h4>  Noise:"+temp['noise']+"<br>  Type of place:"+temp['type'];
		
	}

	var link="[id='"+n+"']";
	$("[id='"+n+"']"+' div').css('max-height',height);
	$("[id='"+n+"']"+' div div span p').html(text);	
	toggling(link);
}
function toggling(l){
	$(l).slideToggle( "slow" );
	
	$(l).prev().toggleClass("row-bottom-margin");
	var icon=($(l).prev()).find('#dir')
	console.log(icon);
	$(icon).toggleClass("fa-sort-desc");
	$(icon).toggleClass("fa-sort-asc");
}
/*
It should be sound level, environment name, the equipment used in the environment.
For now. I'll deal with styling and standardizing CSS when I get back

Associated environments
Name of equipment
*/
