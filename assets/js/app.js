// something to grab the rating of the gif 
// have the gifs appear as image and change gifs on click n vice versa
// -- be sure to clear the old items if they click on a new button 




// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

// 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// 5. Under every gif, display its rating (PG, G, so on).
//    * This data is provided by the GIPHY API.
//    * Only once you get images displaying with button presses should you move on to the next step.

// 6. Add a form to your page that takes a value from a user input box and adds it to your `topics` array. Then make a function call that takes each topic in the array and remakes the buttons on the page.

// everything goes in this guy 
$(document).ready(function () {
    // k2mFEQxVnbiikmEUFqyX8cKLOTkglRzd (API KEY) - valid

    var topics = ['Raccoon Dog', 'Fennec Fox', 'Quoll', 'Serval'];

    function initialButtons() {
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass('giphy');
            a.attr("src", topics[i]);
            a.text(topics[i]);
            $('#gifs').append(a);
        }
    }
    initialButtons();

    function ajaxFunk() {
        //e.preventDefault();
        topics = $(this).attr("src");
        console.log(topics);

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=k2mFEQxVnbiikmEUFqyX8cKLOTkglRzd&q=" + topics + "&limit=25&offset=0&rating=G&lang=en"
        //note the rating ^
        console.log(queryURL);
        
        


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            
            var result = response.data;
            
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                var image = $('<img>')
                var imgURL = result[i].images.fixed_width.url;
                console.log(imgURL);
                image.attr('src', imgURL);
                
                $('#newGifs').append(image);

            }
            
            
            

        })

    }

    $("#find-gif").on('click', function (event) {
        event.preventDefault();
        var search = $('#gif-input').val().trim();
        topics = [];
        topics.push(search);
        initialButtons();
    })
    
    // function displayGifs() {

    // }
    
    
    $(document).on('click', ".giphy", ajaxFunk);













})