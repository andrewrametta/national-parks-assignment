const apiKey = "zNPmpKW83ngSSCSXcC9IEXQiRPuE56vASUy9Ue7s";
const searchURL = "https://developer.nps.gov/api/v1/parks";

// create a watchForm to listen to when submit button is pushed
function watchForm() {
  $("form").submit((event) => {
    // prevent form from be submited
    event.preventDefault();
    // capture state and maxresults in form
    const searchState = $("#js-search-stCode").val();
    const maxResults = $("#js-max-results").val();
    getParks(searchState, maxResults);
  });
}

$(watchForm);

function getParks(searchState, maxResults = 10) {
  // construct url
  const url = `${searchURL}?api_key=${apiKey}&stateCode=${searchState}&limit=${maxResults}`;
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayResults(responseJson))
    .catch((err) => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $("#results-list").empty();
  // iterate through the articles array, stopping at the length of array
  for (let i = 0; i < responseJson.data.length; i++) {
    // for each state in the results
    //array, add a list item to the results
    //list with the park name, url, description, and address
    $("#results-list").append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>
      <p>${responseJson.data[i].description}</p>
      <h4>${responseJson.data[i].addresses[0].line1} ${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode} ${responseJson.data[i].addresses[0].postalCode}</h4>
      </li>`
    );
  }
  //display the results section
  $("#results").removeClass("hidden");
}
