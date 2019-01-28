$(function() {
  // console.log("Yup! We are connected!");

  // Problem: Retrieve content from the NYT Top Stories API and add it to our site.
  // If we don't get a successful response, let the user know it.

  // 1a. Listen for the select menu to change (watching its value)

  $(".selector").on("change", function() {
    const section = $(this).val();
    // console.log(section);
    if (section === "") return;

    //show leader
    $(".loader").toggle();

    //clear stories
    $(".articles").empty();

    // make our ajax request
    $.ajax({
      method: "GET",
      dataType: "json",
      url:
        "https://api.nytimes.com/svc/topstories/v2/" +
        section +
        ".json?api-key=N8PTNVMsydAsVz1zZpGLuJV22NbJOlQB"
    })
      .done(function(data) {
        // console.log(data.results[0].title);
        // append all the things
        // 1. filter out articles without an image
        // 2. create .each to run a function for each article in response.results
        $.each(data.results, function(key, value) {
          // console.log(value.title);
          $(".articles").append(
            '<a href="' +
              value.url +
              '" target="_blank">' +
              "<li>" +
              value.title +
              "<img src=" +
              value.multimedia[4].url +
              "></li>"
          );
        });
        // 3. for each article, create constants for image URL, title and link
        // 4. make an HTML string for the article, using the constants we just created
        // 5. append strings to stories section
      })
      // .fail(function() {
      // do stuff here if it doesn't work out
      // })
      .always(function() {
        // hide the loader
        $(".loader").toggle();
      });
  });

  // 1b. If the select value is "" do nothing and return from the function immediately.

  // 1c. Show a loader to the user clear out old stories.

  // 2. Send a request to the NYT API for data based on the value of the select menu

  // 3. If successful, parse the data we get back and decide what parts we want to append to our DOM

  // 4. Append that stuff to the DOM

  // 5. If unsuccessful, append and show a helpful error message to the user in the UI

  // 6. Hide the loader again.
});
