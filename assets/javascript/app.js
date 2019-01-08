
// declaring variable of i 
var i;

// Initial array of buttons
var buttons = ["Skunks", "Rocky Balboa", "Spaceships", "NBA", "Dat Boi"];

// calling render buttons function to make buttons appear on load
renderButtons();

// Function for displaying buttons
function renderButtons() {

  // Deleting the buttons already in array so only new button appears
  $("#buttons").empty();

  // Looping through the array of buttons
  for (var i = 0; i < buttons.length; i++) {

    // using javascript to create buttons in array
    var a = $("<button>");

    // Adding a class
     a.addClass("gif-button");
    
     // Adding a data-attribute with a value of the button at index i
    a.attr("data-name", buttons[i]);

    // Providing the button's text with the value of the button in array
    a.text(buttons[i]);

    // Adding the button to the HTML
    $("#buttons").append(a);
  }
}

// calling display gifs function so when button is clicked gifs appear
$(document).on("click", ".gif-button", displayGifs);

// function to display gifs
function displayGifs() {
  $("#gifsMain").empty();
  
  //creates variable w the value of the button to call in API search 
  var input = $(this).attr("data-name");
  
  // API URL
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=Vm4B2VYM0r514xSsQO14zU0W4grZOe4p&limit=10";

  // AJAX method to get data from giphy and run display page function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(displayPage);
}

// display page function makes all the gifs appear also where
function displayPage(picsData) {
  console.log(picsData);
  
  // making a variable for data from API
  var results = picsData.data;

  // looping through results array from API to create gifs
 for (var i = 0; i < results.length; i++) {
  // creating div for images
  var gifsDiv = $("<div class='parent col-md-6 col-lg-4 col-12 mb-1'>");

  var rating = results[i].rating;

  var p = $("<p>").text("Rating: " + rating);

  var title = results[i].title;

  var pT = $("<p>").text("Title: " + title);

  var imgURL = results[i].images.fixed_height_still.url; 

  var image = $("<img>").attr("src", imgURL);

  // giving image attributes of a still version of image and moving version
  image.attr("data-still", results[i].images.fixed_height_still.url);
  image.attr("data-animate", results[i].images.fixed_height.url);
  image.attr("data-state", "still");
  image.attr("src", results[i].images.fixed_height_still.url);
  // changing the image when clicked from still to animated
  image.on("click", animate);
  // giving all the gifs the same size
  image.css("width", 300);
  image.css("height", 300);

  // appending all the data to gifs div
  gifsDiv.append(image);
  gifsDiv.append(p);
  gifsDiv.append(pT);

  // prepending gifs div to html page
  $("#gifsMain").prepend(gifsDiv);
 }

}
// function to make gifs appear when button is clicked 
 $("#add-gif").on("click", function(event) {
  event.preventDefault();

  // creating variable for input from the textbox
  var input = $("#gif-input").val().trim();
  
  // if else statement so if nothing is typed into text box alert is displayed and no button is created
  if (input === "") {
    alert("You have to enter something");
  }
  else {
    buttons.push(input)
  };

  // Calling render buttons to create buttons
    renderButtons();
});

// animate function to change gif from still to moving
function animate(event) {
  event.preventDefault();
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }  
}

