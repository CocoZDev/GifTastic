
console.log ("app.js file has started.");
// ================================================================================
//------Buttons------

	// Topic Array. Your app should take the topics in this array and create buttons in your HTML.
	var topics = ["bunny", "kitten", "puppy", "penguin", "panda", "hamster", "guinea pig", "hedgehog"];
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
		  // Adding button type
		  a.attr("type", "button");
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

$(".btn").on("click", function generateGifs(){
	//Clear any existing gifs
	$("#gifs").empty();

	// In this case, the "this" keyword refers to the button that was clicked
	var searchTerm = $(this).attr("data-input");
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
			imageCropper.attr("class", "img-cropper")
			imageCropper.append(animalImage);

			var imageContainerDiv = $("<div>");
			imageContainerDiv.attr("class", "col-md-4")
			imageContainerDiv.append(imageCropper);
			imageContainerDiv.append("<p> Rating: " + results[j].rating + "</p>");

			$("#gifs").append(imageContainerDiv);
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
});

// Animated Background Gradient


var colors = new Array(
	[62,35,255],
	[60,255,60],
	[255,35,98],
	[45,175,230],
	[255,0,255],
	[255,128,0]);
  
  var step = 0;
  //color table indices for: 
  // current color left
  // next color left
  // current color right
  // next color right
  var colorIndices = [0,1,2,3];
  
  //transition speed
  var gradientSpeed = 0.002;
  
  function updateGradient()
  {
	
	if ( $===undefined ) return;
	
  var c0_0 = colors[colorIndices[0]];
  var c0_1 = colors[colorIndices[1]];
  var c1_0 = colors[colorIndices[2]];
  var c1_1 = colors[colorIndices[3]];
  
  var istep = 1 - step;
  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  var color1 = "rgb("+r1+","+g1+","+b1+")";
  
  var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  var color2 = "rgb("+r2+","+g2+","+b2+")";
  
   $('#gradient').css({
	 background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
	  background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
	
	step += gradientSpeed;
	if ( step >= 1 )
	{
	  step %= 1;
	  colorIndices[0] = colorIndices[1];
	  colorIndices[2] = colorIndices[3];
	  
	  //pick two new target color indices
	  //do not pick the same as the current one
	  colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
	  colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
	  
	}
  }
  
  setInterval(updateGradient,10);