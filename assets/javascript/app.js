// Author: Guiyu (Zoey) Zhao
// Created 7/4/2017
// Candy Collection Game

console.log ("app.js file has started.");
// ================================================================================
//------Buttons------

	// Topic Array. Your app should take the topics in this array and create buttons in your HTML.
	var topics = ["cat", "dog", "bird", "hamster", "red panda", "hedgehog", "grumpy cat", "jellyfish"];
	var i = 0; // for API Query URL

	console.log(topics)

	// ================================================================================
	// ---Function 1: rendering buttons---

	function renderButtons() {

		// Deleting the animal buttons prior to adding new animal buttons
		// (this is necessary otherwise we will have repeat buttons)
		$("#buttons").empty();

		//Try using a loop that appends a button for each string in the array.
		// Looping through the array of itmes
		for (var i = 0; i < topics.length; i++) {

		  // Then dynamicaly generating buttons for each item in the array.
		  // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
		  var a = $("<button>");
		  // Adding a class
		  a.addClass("btn btn-primary btn-md");
		  // Adding a data-attribute with a value of the animal at index i
		  a.attr("data-input", topics[i]);
		  // Providing the button's text with a value of the animal at index i
		  a.text(topics[i]);
		  // Adding the button to the HTML
		  $("#buttons").append(a);
		}
	}

		//Calling the function
		renderButtons();
	// ================================================================================
	//---Function 2: Create Custom Buttons & Submit button on click event---
	// Add a form to your page takes the value from a user input box and adds it into your topics array. 
	// Then make a function call that takes each topic in the array remakes the buttons on the page.


	// This function handles events where one button is clicked
	$("#submit").on("click", function() {
	// event.preventDefault() prevents the form from trying to submit itself.
	// We're using a form so that the user can hit enter instead of clicking the button if they want
	event.preventDefault();

	// This line will grab the text from the input box
	var input = $("#input").val().trim();
	// The movie from the textbox is then added to our array
	topics.push(input);

	console.log("new input = " + input);

	// calling renderButtons which handles the processing of our movie array
	renderButtons();
	});

// ================================================================================
// GIPHY API
// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

$(".btn").on("click", function(){
	//Clear any existing gifs
	$("#gifs").empty();

	// In this case, the "this" keyword refers to the button that was clicked
	var searchTerm = $(this).attr("data-input");
	var limit = 10;

	//Guiyu's API Key: Api Key: 95ad6144828c471dbb77004f8e9e8d7f
    var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=95ad6144828c471dbb77004f8e9e8d7f" + "&q=" + searchTerm + "&limit=" + limit;
    console.log(queryURL);

	// Perfoming an AJAX GET request to our queryURL
	$.ajax({
		url: queryURL,
		method: "GET"
	})

	// After the data from the AJAX request comes back
	.done(function(response) {

		var results = response.data;
		console.log(response);
		console.log(response.data);

		// Saving the image_original_url property
		for (var j = 0; j < limit; j++) {
			// var imageUrl = results.image_original_url;

			var imageUrl = results[j].images.fixed_height_still.url;

			console.log(imageUrl);

			// Creating and storing an image tag
			var animalImage = $("<img>");

			// Setting the catImage src attribute to imageUrl
			animalImage.attr("src", imageUrl);
			animalImage.attr("alt", "animal image");
			animalImage.attr("width", 200);
			animalImage.attr("height", 200);
			// var animalImageP = "<p>" + animalImage +"</p>";

			// Prepending the catImage to the images div
			// $("#gifs").append(animalImage);

			// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
			
			// Under every gif, display its rating (PG, G, so on).
			// $("#gifs").append("<p> Rating: " + results[j].rating + "</p>");

			// Add div around image & rating
			var imageContainer = $("<div>");

			imageContainer.append(animalImage);
			imageContainer.append("<p> Rating: " + results[j].rating + "</p>");

			$("#gifs").append(imageContainer);
			// This data is provided by the GIPHY API.

		}
	});
});

