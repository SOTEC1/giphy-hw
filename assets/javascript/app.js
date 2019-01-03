var i;
// Initial array of buttons
var buttons = ["Skunks", "Rocky Balboa", "Spaceships", "NBA", "Dat Boi"];

renderButtons();



// Function for displaying movie data
function renderButtons() {

  // Deleting the movie buttons prior to adding new movie buttons
  $("#buttons").empty();
  // (this is necessary otherwise we will have repeat buttons)
  // $("#gifs").empty();

  // Looping through the array of movies
  for (var i = 0; i < buttons.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
     a.addClass("gif-button");
    // Adding a data-attribute with a value of the movie at index i
    a.attr("data-name", buttons[i]);
    // Providing the button's text with a value of the movie at index i
    a.text(buttons[i]);
    // Adding the button to the HTML
    $("#buttons").append(a);
  }
}

$(document).on("click", ".gif-button", displayGifs);

function displayGifs() {

  var input = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=Vm4B2VYM0r514xSsQO14zU0W4grZOe4p&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(displayPage);
}

function displayPage(picsData) {
  console.log(picsData);
  
  var results = picsData.data;

 for (var i = 0; i < results.length; i++) {
 
  var gifsDiv = $("<div class='gifs'>");

  var rating = results[i].rating;

  var p = $("<p>").text("Rating: " + rating)

  var imgURL = results[i].images.original_still.url; 

  var image = $("<img>").attr("src", imgURL);

  image.attr("data-still", results[i].images.original_still.url);
  image.attr("data-animate", results[i].images.fixed_height.url);
  image.attr("data-state", "still");
  image.attr("src", results[i].images.original_still.url);
  image.on("click", animate);
  image.css("width", 300);
  image.css("height", 300);

  gifsDiv.append(p);
  gifsDiv.append(image);

  $("#gifsMain").prepend(gifsDiv);
 }

}

 // This function handles events where a movie button is clicked
 $("#add-gif").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var input = $("#gif-input").val().trim();

  // Adding movie from the textbox to our array
  buttons.push(input);

  // Calling renderButtons which handles the processing of our movie array
   renderButtons();
});

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

