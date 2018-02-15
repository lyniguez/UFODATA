// set references
var $tbody = document.querySelector("tbody");

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
// render full dataSet first load
renderTable();

