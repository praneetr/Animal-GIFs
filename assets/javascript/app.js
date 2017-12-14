// create array of animals

var Animal_name = ['Alligator', 'Giraffe', 'Kangaroo', 'Lion', 'Zebra', 'Monkey', 'Butterfly', 'Elephant', 'Hippopotamus', 'Bat', 'Shark', 'Skunk', 'Polar Bear', 'Owl'];


//create buttons for each animal in the array above and append to html

function createButtons(){
  $('#Animal_Buttons').empty();
  for(var i = 0; i < Animal_name.length; i++){
    var AnimalBtn = $('<button>').text(Animal_name[i]).addClass('AnimalBtn').attr({'data-name': Animal_name[i]});
    $('#Animal_Buttons').append(AnimalBtn);
  }

//display gifs on click of each button

  $('.AnimalBtn').on('click', function(){
    $('.display').empty();

    var thisAnimal = $(this).data('name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thisAnimal + "&api_key=CVGZHeVCiTClTpI66RaZVHQmO6SpM7bO&limit=10";
    $.ajax({
      url: queryURL, 
      method: 'GET'
  })


// After data comes back from API request

  .done(function(response){
    console.log(queryURL);
    console.log(response);

      // storing the data from the AJAX request in the results variables
     var currentGif = response.data;
      $.each(currentGif, function(index,value){
        var animatedGif= value.images.original.url;
        var pausedGif = value.images.original_still.url;
        var thisRating = value.rating;

        // Append rating and giphy to html via display class
        var rating = $('<h5>').html('Rated: '+thisRating).addClass('ratingStyle');
        var stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
        var fullGifDisplay = $('<button>').append(rating, stillGif);
        $('.display').append(fullGifDisplay);
      });
    });
  });
}

//animates gif on hover and pauses animation off hover
$(document).on('mouseover','.playOnHover', function(){
      $(this).attr('src', $(this).data('animated'));
 });
 $(document).on('mouseleave','.playOnHover', function(){
      $(this).attr('src', $(this).data('paused'));
 });

//creates a button from input
$('#add_Animal').on('click', function(e){
  e.preventDefault();
  var new_Animal = $('#newAnimalInput').val().trim();
  Animal_name.push(new_Animal);
  createButtons();
});

// to run button function from line 8 above
createButtons();

