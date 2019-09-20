$(document).ready(function () {

    //globes
    var topics = ['Raccoon Dog', 'Fennec Fox', 'Quoll', 'Serval'];

    //function 1
    function initialButtons() {
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass('giphy');
            a.attr("src", topics[i]);
            a.text(topics[i]);
            $('#buttons').append(a);
        }
    }
    // calls function 1
    initialButtons();
   
    // function 2 ajaz
    function ajaxFunk() {
        //e.preventDefault();
        $('#newGifs').empty();
        topics = $(this).attr("src");
        console.log(topics);

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=k2mFEQxVnbiikmEUFqyX8cKLOTkglRzd&q=" + topics + "&limit=15&offset=0&rating=G&lang=en"
        //note the rating ^
        // the offset can change the gifs loaded


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            
            var result = response.data;
            
            for (var i = 0; i < result.length; i++) {

                var ratingTag = $('<p>').text('Rating: ' + result[i].rating)
                var image = $('<img>')

                var imgURL = result[i].images.original_still.url;
                var gifURL = result[i].images.fixed_width.url;
                
                image.attr('data-image', imgURL);
                image.attr('data-status', 'still');
                image.attr("data-gif", gifURL)
                image.attr('src', imgURL);

                $('#newGifs').append(ratingTag);
                $('#newGifs').append(image);

            }
            // function 4
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

    // function 3
    $("#find-gif").on('click', function (event) {
        event.preventDefault();
        var search = $('#gif-input').val().trim();
        topics = [];
        topics.push(search);
        initialButtons();
    })

    

    // calls function 2
    $(document).on('click', ".giphy", ajaxFunk);

})