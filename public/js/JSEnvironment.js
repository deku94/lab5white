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
	$(this).next().slideToggle( "slow" );
	
	$(this).toggleClass("row-bottom-margin");
	
	$(icon).toggleClass("fa-sort-desc");
	$(icon).toggleClass("fa-sort-asc");
	$.get("environment/view/"+link,views);
	/*$(this).after("<div class='row row-bottom-margin info' style = 'margin-bottom: 0px; background-color: #151515; background-size: 100% auto ; padding-bottom: 0px;overflow:hidden;'>  </div>");
		*/

}
function views(e){
	console.log(e);
	var n=e['name'];
	//console.log($( "[id="+n+"]"+' div div span'));
	var text="Equipment:" + e['name']+"<br>Type:"+e['type']+"<br>Usage:"+e['usage'];
	$("[id='"+n+"']"+' div div span p').html(text);


}
/*
It should be sound level, environment name, the equipment used in the environment.
For now. I'll deal with styling and standardizing CSS when I get back

Associated environments
Name of equipment
*/
