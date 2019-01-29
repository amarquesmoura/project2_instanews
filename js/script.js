/* Problem: Retrieve content from the NYT Top Stories API and add it to our site.
 If we don't get a successful response, let the user know it. */

$(function() {
  // Listen for the select menu to change and capture its value
  $(".selector").on("change", function() {
    const section = $(this).val();

    // If the select value is "" do nothing and return from the function immediately.
    if (section === "") return;

    // Clear out old stories and show a loader to the user.
    $(".articles").empty();
    $(".loader").show();

    // Make the ajax request
    $.ajax({
      method: "GET",
      dataType: "json",
      url:
        "https://api.nytimes.com/svc/topstories/v2/" +
        section +
        ".json?api-key=N8PTNVMsydAsVz1zZpGLuJV22NbJOlQB"
    })
      .done(function(data) {
        // Filter out articles without an image
        const filtered = data.results.filter(function(value) {
          return value.multimedia.length;
        });

        // Reduce the number of article to a max of 12
        const twelve = filtered.slice(0, 12);

        // Run a function for each article and append HTML strings to articles section
        $.each(twelve, function(key, value) {
          $(".articles").append(
            "<li>" +
              '<a href="' +
              value.url +
              '" target="_blank">' +
              '<div class="article_box" style="background-image:url(' +
              value.multimedia[4].url +
              ')">' +
              '<div class="abstract"><p>' + value.abstract +
              "</p></div></a></li>"
          );
        });
      })
      // Alert the user for errors
      .fail(function() {
        $.alert("Something went wrong. Please try again.");
      })
      .always(function() {
        // Hide the loader
        $(".loader").hide();
      });
  });
});
