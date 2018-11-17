console.log ("app.js file has started.");
// ================================================================================
// Topic Array. The app should take the topics in this array and create buttons in the HTML.
var topics = ["puppy", "kitten", "penguin", "panda", "hamster", "guinea pig", "hedgehog"];
var i = 0; // for API Query URL

console.log(topics);

// ---------- Define the number of GIPHY API search results shown-----------
var numShown = 6;

//------Buttons------

// ================================================================================
// ---Function 1: rendering buttons---

function renderButtons(topics) {
	
	// Deleting the animal buttons prior to adding new animal buttons
	// (this is necessary otherwise we will have repeat buttons)
	$("#category-btns-wrapper").empty();

	//Try using a loop that appends a button for each string in the array.
	// Looping through the array of itmes
	for (var i = 0; i < topics.length; i++) {

		// Then dynamicaly generating buttons for each item in the array.
		// This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
		var a = $("<button>");
		// Adding a class
		a.addClass("btn btn-primary btn-md category-btn");
		// Adding button type
		a.attr("type", "button");
		// Adding a data-attribute with a value of the animal at index i
		a.attr("data-input", topics[i]);
		// Providing the button's text with a value of the animal at index i
		a.text(topics[i]);
		// Adding the button to the HTML
		$("#category-btns-wrapper").append(a);
	}
}

	//Calling the function
	renderButtons(topics);
	// generateGifs(topics, "bunny"); // Call bunny gif results on page load

function generateGifs(topics, searchTerm){
	//Clear any existing gifs
	$("#gifs").empty();

	// In this case, the "this" keyword refers to the button that was clicked
	// var searchTerm = $(this).attr("data-input");
	var limit = 30;

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=95ad6144828c471dbb77004f8e9e8d7f" + "&q=" + searchTerm + "&limit=" + limit;
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

			var stillImageUrl = results[j].images.original_still.url;
			var animateImageUrl = results[j].images.original.url;

			console.log(stillImageUrl);
			console.log(animateImageUrl);

			// Creating and storing an image tag
			var animalImage = $("<img>");

			// Setting the catImage src attribute to imageUrl
			animalImage.attr("src", stillImageUrl);
			animalImage.attr("alt", "animal image");
			animalImage.attr("width", "100%");
			animalImage.attr("height", "250px");
			animalImage.attr("data-still", stillImageUrl);
			animalImage.attr("data-animate", animateImageUrl);
			animalImage.attr("data-state", "still");
			animalImage.attr("class", "gif");
			
			// Add div and aaround image & rating

			var imageCropper = $("<div>");
			imageCropper.attr("class", "img-cropper");
			imageCropper.append(animalImage);

			var imageContainerDiv = $("<div>");
			imageContainerDiv.attr("class", "col-md-4 moreItems");
			imageContainerDiv.append(imageCropper);
			imageContainerDiv.append("<p> Rating: " + results[j].rating + "</p>");

			$("#gifs").append(imageContainerDiv);

			$(".moreItems").slice(0, numShown).show(); // select the first set of items to show after clicking a category button
		}
			
		// ===== PLAY AND PAUSE WHEN CLICKING ON IMAGES =====//


		// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
		$(".gif").on("click", function() {
			// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
			var state = $(this).attr("data-state");
			// If the clicked image's state is still, update its src attribute to what its data-animate value is.
			// Then, set the image's data-state to animate
			// Else set src to the data-still value
			if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
			} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
			}
		});
	});
}


// =============================================================================
//---Function 2: Create Custom Buttons & Submit button on click event---
// Add a form to the page takes the value from a user input box and adds it into the topics array. 
// Then make a function call that takes each topic in the array remakes the buttons on the page.


// This function handles events where one button is clicked
$("#submit").on("click", function() {
	// event.preventDefault() prevents the form from trying to submit itself.
	// We're using a form so that the user can hit enter instead of clicking the button if they want
	event.preventDefault();

	// This line will grab the text from the input box
	var searchTerm = $("#input").val().trim();

	// Check if a search term was empty. If not empty, render buttons and generate gifs
	if (searchTerm == "") {
		alert ("Please type in a gif category and try again.")
	} else {
		console.log (searchTerm);
		// The input from the textbox is then added to our array
		topics.push(searchTerm);
	
		console.log (topics);
	
		console.log("new input = " + searchTerm);
	
		// calling renderButtons which handles the processing of our array
		renderButtons(topics);
		$("#gifs").empty();
		generateGifs(topics, searchTerm);
		console.log (topics);
	
		// Reset the form
		document.getElementById("form").reset();
	}

});

// ================================================================================
// GIPHY API
// When the user clicks on a button, the page should grab a set of static, non-animated gif images from the GIPHY API and place them on the page.

$(".category-btn").on("click", function(){
	console.log("category-btn was clicked.")
	event.preventDefault();
	var searchTerm = $(this).attr("data-input");
	generateGifs(topics, searchTerm);
});


// ========================================================================
// Load More Function

$( document ).ready(function (){
	// $(".moreItems").slice(0,9).show(); // select the first ten
	if ($(".moreItems:hidden").length != 0) {
		$("#loadMore").show();
	  };

    $("#loadMore").click(function(e){ // click event for load more
		e.preventDefault();

		// If no category button was clicked		
		if($(".moreItems").length == 0) {
			alert("Please select a gif category first.");
		} else {
			$(".moreItems:hidden").slice(0, numShown).show(); // select next set of hidden gifs and show them
		}
		
		// If no more hidden search results
		if($(".moreItems:hidden").length == 0 && $(".moreItems").length != 0 ){ // check if any hidden divs still exist
			$("#loadMore").fadeOut('slow');
			$("#alert").append("<h3>All search results have been displayed.</h3>");
        }
    });
});
