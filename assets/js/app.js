$(document).ready(function () {

    //globes
    var topics = ['Shiba Inu', 'Fennec Fox', 'Quoll', 'Serval'];

    //function 1 - Adds buttons to the page
    function initialButtons() {
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button class='btn btn-light'>");
            a.addClass('giphy');
            a.attr("src", topics[i]);
            a.text(topics[i]);
            $('#buttons').append(a);
        }
    }
    
    // function 2 - mr. ajax
    function ajaxFunk() {

        $('#newGifs').empty();
        
        topics = $(this).attr("src");
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=k2mFEQxVnbiikmEUFqyX8cKLOTkglRzd&q=" + topics + "&limit=15&offset=0&rating=R&PG&G&lang=en" // leaving in the R rating incase my users are spicy 
        //note the rating ^

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            
            var result = response.data;
            // Loops through the results and adds a bunch of things to the result
            for (var i = 0; i < result.length; i++) {
                var gifDiv = $('<div class="col-3">')
                var ratingTag = $('<p>').text('Rating: ' + result[i].rating)
                var image = $('<img>')
                // Grabs the still and animated images
                var imgURL = result[i].images.original_still.url;
                var gifURL = result[i].images.fixed_width.url;
                // Allows the picture to switch between still and animated
                image.attr('data-image', imgURL);
                image.attr('data-status', 'still');
                image.attr("data-gif", gifURL)
                image.attr('src', imgURL);
                // Takes all those results and adds them to the page
                $('#newGifs').append(gifDiv);
                $(gifDiv).append(image);
                $(gifDiv).append(ratingTag);
                
            }

            // function 4 - if the user clicks on the img, change it to a gif/ vice versa
            $('img').on('click', function () {

                var status = $(this).attr('data-status');
                
                if (status === 'still') {
                    var newURL = $(this).attr('data-gif');
                    $(this).attr('src', newURL);
                    $(this).attr('data-status', 'animated');
                    console.log(status);
                   
                } else {
                    var newURL = $(this).attr('data-image');
                    $(this).attr('src', newURL);
                    $(this).attr('data-status', 'still');
                    console.log(status)

                }

            })

        })

    }

    // function 3 - takes the users search and adds it to the globes 
    $("#find-gif").on('click', function (event) {
        event.preventDefault();
        var search = $('#gif-input').val().trim();
        topics = [];
        topics.push(search);
        initialButtons();
    })

    // calls function 1
    initialButtons();
    // calls function 2
    $(document).on('click', ".giphy", ajaxFunk);

})