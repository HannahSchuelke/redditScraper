// $(document).ready(function () {

// Grab the articles as a json
$.getJSON("/articles", function (data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    // $("#articles").append("col-md-6" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    // $("#articles).append('col-md-6' + data[i]._id + data[i].title + "<br>" + data[i].link + </div>");
    // $("#articles").append("<div data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</div>");
    $("#articles").append("<results'" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</div>");
  };
});

// Whenever someone clicks a div tag
// $(document).on("click", "div", function () {
//   // Empty the notes from the note section
//   // $("#notes").empty();
//   // Save the id from the p tag
//   var thisId = $(this).attr("data-id");

//   // Now make an ajax call for the Article
//   $.ajax({
//     method: "GET",
//     url: "/articles/" + thisId
//   })
//   // With that done, add the note information to the page
//   .then(function (data) {
//     console.log(data);
//     // The title of the article
//     $("#notes").append("<div>" + data.title + "</div>");
//     // An input to enter a new title
//     $("#notes").append("<input id='titleinput' name='title' >");
//     // A textarea to add a new note body
//     $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//     // A button to submit a new note, with the id of the article saved to it
//     $("#notes").append("<button>'" + data._id + "</button>");

//     // If there's a note in the article
//     if (data.note) {
//       // Place the title of the note in the title input
//       $("#titleinput").val(data.note.title);
//       // Place the body of the note in the body textarea
//       $("#bodyinput").val(data.note.body);
//     }
//   });
// })


// When you click the savenote button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section (this is commented out as)
      // $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

// TRIGGER SEARCH BUTTON REQUEST
$(document).on("click", "#search", function () {
  // CLIENT-SIDE CALLING THIS WOULD GO IN APP.JS{
  $.ajax({
    url: '/scrape',
    type: 'GET',
  })
    .then(function (results) {
      console.log(results)
      alert(results.message)
      console.log(results.Articledb)
      // APPEND RESULTS RIGHT HERE
      for (let i in results.Articledb) {
          let headline = results.Articledb[i].headline
          let link = results.Articledb[i].link
          let summary = results.Articledb[i].summary
          let newsDiv = `
          <a href='`+ link +`'><div>`+headline + `</div></a>
          <div>`+summary + `</div>
          `
          $("#newsResults").append(newsDiv)
      }
    })
});

