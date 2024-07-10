var flagCalculated = false;
var currentSortField = "yearOneCost";
var currentSortReverse = false;

// Handles Form Submition
function handleFormSubmit(formObject) {
  currentSortField = "yearOneCost";
  currentSortReverse = false;
  processFormData(formObject);
  flagCalculated = true;
  return false;
}

// Handles Form Reset
function handleFormReset(formObject) {
  flagCalculated = false;
  formObject.reset();
  clearTableView();
}

// Handles Form Activity
function handleFormActivity() {
  // Only update view after the calculate button is clicked
  // This forces the form values to be valid before updating
  if (flagCalculated) {
    let formObject = document.getElementById("entry-form");
    processFormData(formObject);
  }
}

// Sort table before Re-Populating
function handleFormSort(headerElement) {
  let sortKey = headerElement.dataset.sortKey;
  if (currentSortField === sortKey) {
    // Toggle sorting order when sorting by the same field again
    currentSortReverse = !currentSortReverse;
  } else {
    // Default by Alphabetical order when changing sortKey field
    currentSortReverse = false;
    currentSortField = sortKey;
  }
  let formObject = document.getElementById("entry-form");
  processFormData(formObject);
}

// Populate the selection of current electric providers
function populateOptions() {
  let select = document.getElementById("select-current-provider");
  for (const provider of ELECTRICPROVIDERS) {
    var el = document.createElement("option");
    el.textContent = provider.details.name;
    el.value = provider.details.name;
    select.appendChild(el);
  }
}

// Set allowance checkbox title to current free unit rate (Dynamically)
function updateTitles() {
  let checkbox = document.getElementById("checkbox-allowance");
  checkbox.nextElementSibling.title = "Currently " + euroIELocale.format(FREEUNITS) + " a day";
  refreshTooltip();
}

// Populate form options on page load
document.addEventListener("DOMContentLoaded", populateOptions);
document.addEventListener("DOMContentLoaded", updateTitles);
