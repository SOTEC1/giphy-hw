var i;
// Initial array of buttons
var buttons = ["skunk", "lion"];

renderButtons();



// Function for displaying movie data
function renderButtons() {

  // Deleting the movie buttons prior to adding new movie buttons
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
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Vm4B2VYM0r514xSsQO14zU0W4grZOe4p&q=dogs&limit=25&offset=0&rating=G&lang=en"
  ;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(displayPage);
}

function displayPage(picsData) {
  console.log(picsData);
  console.log(picsData.data.length);
  //console.log(picsData.data[0]);
 for (var i = 0; i < picsData.data.length; i++) {
 
  console.log(i);
  var gifsDiv = $("<div class='gifs'>");

  var imgURL = picsData.data[i].images.downsized.url; 
  console.log(imgURL);
  //console.log(picsData.data[0]);

  var image = $("<img>").attr("src", imgURL);

  gifsDiv.append(image);

  $("#gifsMain").prepend(gifsDiv);
 }

}

