// set references
var $tbody = document.querySelector("tbody");
var $datetimeInput = document.querySelector("#datetime");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchButton = document.querySelector("#search");

// event lsitener for searchButton
$searchButton.addEventListener("click", handleSearchButtonClick);

// Set filteredUFOData to inital dataSet
var filteredUFOData = dataSet;

// render the filtered dataSet to the tbody
function renderTable() {
    $tbody.innerHTML = "";
    for (var i=0; i<filteredUFOData.length; i++) {
    
        // Get current UFO Data and fields
        var UFOdata = filteredUFOData[i];
        var fields = Object.keys(UFOdata);

        // Create new row in tbody for each data point
        var $row = $tbody.insertRow(i);
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
}

// render full dataSet first load
renderTable();