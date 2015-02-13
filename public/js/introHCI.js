'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);


	console.log("User clicked on project " + idNumber);
	var projectURL = "/project/" + idNumber;
	console.log("URL? " + projectURL);
	$.get(projectURL, functionx);
}

function functionx(result){
	console.log(result);

	var idNum = result['id'];
	console.log("idNum? " + idNum);
	var proj = $("#" + "project" + idNum);
	console.log("proj? " + proj);
	
	var details = proj.find('.details');
	var detailsHTML = '<img src="' +result['image']+ '" class="detailsImage">' + '<h3>' +result['title']+ '</h3>' + '<p><small>' +result['date']+ '</small></p>' + '<p>' +result['summary']+ '</p>';
	details.html(detailsHTML);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	e.preventDefault();

	console.log("User clicked on color button");
	var paletteURL = "/palette";
	$.get(paletteURL, functionp);

}

function functionp(result){
	console.log(result);
	var colors = result['colors']['hex'];

	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}