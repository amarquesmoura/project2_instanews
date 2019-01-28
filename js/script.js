$(function() {
  // console.log("Yup! We are connected!");

  // Problem: Retrieve content from the NYT Top Stories API and add it to our site.
  // If we don't get a successful response, let the user know it.

  // 1a. Listen for the select menu to change (watching its value)

  $(".selector").on("change", function() {
    const section = $(this).val();
    // console.log(section);

    // 1b. If the select value is "" do nothing and return from the function immediately.
    if (section === "") return;

    // 1c. Show a loader to the user clear out old stories.
    $(".loader").toggle();
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
        // 3. for each article, create constants for image URL, title and link
        // 4. make an HTML string for the article, using the constants we just created
        // 5. append strings to stories section

        $.each(data.results, function(key, value) {
          if (value.multimedia !== "[]") {
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
          } else {
            $.append(
              '<p class="error">Your search produced no results. Please try another subject.</p>'
            );
          }
        });
      })
      .fail(
        function() {
          $.alert("Something went wrong. Please try again.");
        }.always(function() {
          // hide the loader
          $(".loader").toggle();
        })
      );
  });
});
