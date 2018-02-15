// set references
var $tbody = document.querySelector("tbody");
var $datetimeInput = document.querySelector("#datetime");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchButton = document.querySelector("#search");
var $loadMoreBtn = document.querySelector("#load-btn");


// Set a startingIndex and resultsPerPage variable
var startingIndex = 0;
var resultsPerPage = 50;

// event lsitener for searchButton
$searchButton.addEventListener("click", handleSearchButtonClick);

// Set filteredUFOData to inital dataSet
var filteredUFOData = dataSet;

// render the filtered dataSet to the tbody
function renderTable() {

    //$tbody.innerHTML = "";

    // set value of ending index for results per page
    var endingIndex = startingIndex + resultsPerPage;
    
    // Get a section of the dataSet array to render
    var UFOdataSubset = dataSet.slice(startingIndex, endingIndex);

    
    for (var i=0; i<UFOdataSubset.length; i++) {
    
        // Get current UFO Data and fields
        var UFOdata = UFOdataSubset[i];
        var fields = Object.keys(UFOdata);

        // Create new row in tbody for each data point
        var $row = $tbody.insertRow(i + startingIndex);
        for (var j = 0; j < fields.length; j++) {

            // for every field in data, create new cell and set value to current data point
            var field = fields[j];
            var $cell = $row.insertCell(j);
            $cell.innerText = UFOdata[field];
        }
        
    }
}


function handleSearchButtonClick() {
    // Format search field by trimming value whitespace and changing to lowercase string
    var filterDatetime = $datetimeInput.value;
    var filterCity = $cityInput.value.trim().toLowerCase();
    var filterState = $stateInput.value.trim().toLowerCase();
    var filterCountry = $countryInput.value.trim().toLowerCase();
    var filterShape = $shapeInput.value.trim().toLowerCase();
    
    // set filtered UFO Data to an array of all data that match the datetime filter
    filteredUFOData = dataSet.filter(function(UFOdata) {
        var UFOdatetime = UFOdata.datetime.substring(0, filterDatetime.length);
        var UFOcity = UFOdata.city.substring(0, filterCity.length).toLowerCase();
        var UFOstate = UFOdata.state.substring(0, filterState.length).toLowerCase();
        var UFOcountry = UFOdata.country.substring(0, filterCountry.length).toLowerCase();
        var UFOshape = UFOdata.shape.substring(0, filterShape.length).toLowerCase();
        if (UFOdatetime === filterDatetime && UFOcity === filterCity && UFOstate === filterState && UFOcountry === filterCountry && UFOshape === filterShape) {
          return true;
        }// if true, add datetime to filtered UFO Data
            return false;
    });
renderTable();
};

renderTable();

$loadMoreBtn.addEventListener("click", handleButtonClick);

function handleButtonClick() {
  // Increase startingIndex by 50 and render the next section of the table
  startingIndex += resultsPerPage;
  renderTable();
  // Check to see if there are any more results to render
  if (startingIndex + resultsPerPage >= dataSet.length) {
    $loadMoreBtn.classList.add("disabled");
    $loadMoreBtn.innerText = "All UFO DATA Loaded";
    $loadMoreBtn.removeEventListener("click", handleButtonClick);
  }
};
// render full dataSet first load
renderTable();