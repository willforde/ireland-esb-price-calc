let euroIELocale = Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
});

class ElectricProvider {
  constructor(details, plan, usageData) {
    this.name = details.name;
    this.standingCharge = plan.standingCharge;
    this.dayRate = plan.dayRate;
    this.nightRate = plan.nightRate || null;
    this.days = usageData.days;
    this.dayUnits = usageData.dayUnits;
    this.nightUnits = usageData.nightUnits;
    this.freeallowance = usageData.freeallowance;
    this.standardDiscount = details.standardDiscount;
    this.startingDiscount = details.startingDiscount;
    this.currentDiscount = null;
    this.serviceCharge = details.serviceCharge || null;
    this.url = details.url;
  }

  calcBaseCosts() {
    // Calc standing charge and POS for given period
    let cost = (this.standingCharge / 365) * this.days;
    cost = cost + (PSO / 365) * this.days;

    // Add service charge if we have one. Pay as You go.
    if (this.serviceCharge !== null) {
      cost = cost + (this.serviceCharge * this.days);
    }
    return cost;
  }

  calcUnitCosts(discount) {
    // Calc day usage cost
    let cost = (this.dayUnits * this.dayRate);

    // Calc night usage cost
    if (this.nightUnits && this.nightRate) {
      cost = cost + (this.nightUnits * this.nightRate);
    }

    // Apply discount
    if (discount) {
      cost = cost - (cost * discount);
    }
    return cost;
  }

  calcFinalCost(discount) {
    let cost = this.calcBaseCosts();
    cost = cost + this.calcUnitCosts(discount)

    // Add free allowance discount
    if (this.freeallowance) {
      cost = cost - (FREEUNITS * this.days)
    }
    return cost;
  }

  get yearOneCost() {
    return this.calcFinalCost(this.startingDiscount);
  }

  get yearOneDiscount() {
    return this.startingDiscount * 100;
  }

  get yearTwoCost() {
    return this.calcFinalCost(this.standardDiscount);
  }

  get yearTwoDiscount() {
    return this.standardDiscount * 100
  }

  get serviceCost() {
    return this.calcBaseCosts();
  }

  get isCurrent() {
    return this.currentDiscount !== null;
  }

  get currentCost() {
    return this.calcFinalCost(this.currentDiscount);
  }
}

function renderCurrency() {
  return function (text, render) {
    return euroIELocale.format(render(text));
  }
}

// Create providers table showing costs
function createTableView(providerArray, currentProvider) {
  let template = `
  {{#current}}
  <table class="table table-borderless table-striped caption-top" style="font-size:0.8em">
    <caption>Current Provider</caption>
    <tr class="table-warning">
      <td>{{name}}</td>
      <td>{{#currency}}{{currentCost}}{{/currency}}</td>
    </tr>
  </table>
  {{/current}}

  <table class="table table-borderless table-striped table-hover caption-top" style="font-size:0.8em">
    <caption>Costs per provider</caption>
    <thead class="table-info" style="white-space: nowrap">
      <tr id="sortable-table-row">
        <th class="sortable" data-sort-key="name" onclick="handleFormSort(this);" scope="col">Providers</th>
        <th class="sortable" data-sort-key="yearOneCost" onclick="handleFormSort(this);" title="With initial discount" scope="col">1st Year</th>
        <th class="sortable" data-sort-key="yearTwoCost" onclick="handleFormSort(this);" title="With standard discount" scope="col">Year 2+</th>
      </tr>
    </thead>
    <tbody class="table-group-divider">
      {{#providers}}
      <tr {{#isCurrent}}class="table-success"{{/isCurrent}}>
        <td data-bs-toggle="tooltip" data-bs-placement="left" title="Service Charge: {{#currency}}{{serviceCost}}{{/currency}}"><a href="{{url}}" target="_blank">{{name}}</a></td>
        <td data-bs-toggle="tooltip" data-bs-placement="left" title="Discount {{yearOneDiscount}}%">{{#currency}}{{yearOneCost}}{{/currency}}</td>
        <td data-bs-toggle="tooltip" data-bs-placement="left" title="Discount {{yearTwoDiscount}}%">{{#currency}}{{yearTwoCost}}{{/currency}}</td>
      </tr>
      {{/providers}}
    </tbody>
  </table>
  `
  // Sort provider array by sort key before rendering table
  providerArray.sort(function(a, b){return a[currentSortField] > b[currentSortField]});
  if (currentSortReverse) providerArray.reverse();
  let rendered = Mustache.render(template, {providers: providerArray, current: currentProvider, currency: renderCurrency});
  document.getElementById("data-table").innerHTML = rendered;
  refreshTooltip()

  // Show/Hide header sort icons
  document.getElementById("sortable-table-row").querySelectorAll("th.sortable").forEach(element => {
    // Mark header as sorted to add sort icon
    if (element.dataset.sortKey === currentSortField) {
      element.classList.add("sorted");
      element.classList.add(currentSortReverse ? "sorted-des" : "sorted-asc");
    } else {
      // Remove sorted to hide sort icon
      element.classList.remove("sorted");
    }
  })
}

// Clear the providers table
function clearTableView() {
  document.getElementById("data-table").innerHTML = "";
}

// Return the selected form radio selection element
function getRadioSelection(formObject) {
  let radioElements = formObject.region;
  for(var i=0; i < radioElements.length; i++) {
    if (radioElements[i].checked) {
        return radioElements[i];
    }
  }
}

// Process user data and return a list of electric providers
function processFormData(formObject) {
  // Get form values
  let usageData = {
    days: Number(formObject.days.value),
    dayUnits: Number(formObject.dayunits.value),
    nightUnits: (formObject.nightunits.value) ? Number(formObject.nightunits.value) : null,
    freeallowance: formObject.freeallowance.checked,
  }

  let region = getRadioSelection(formObject).value
  let meterType = (usageData.nightUnits) ? "night":"day"
  var currentProvider = null;
  var providers = [];

  for (const provider of ELECTRICPROVIDERS) {
    var selectedPlan = null;

    // Search for the correct plan using provided data
    for (const plan of provider.plans) {
      if (plan.region === region && plan.meter === meterType) {
        selectedPlan = plan;
        break;
      }
    }

    // Instantiate Provider object
    let planData = new ElectricProvider(provider.details, selectedPlan, usageData);
    providers.push(planData);

    // Check for current provider
    if (formObject.currentprovider.value === provider.details.name) {
      planData.currentDiscount = formObject.currentdiscount.value / 100;
      currentProvider = planData;
    }
  }
  createTableView(providers, currentProvider);
}

// Refresh bootstrap tooltips
// Required everytime a tooltip changes
function refreshTooltip() {
  for (const tooltipTriggerEl of document.querySelectorAll('[data-bs-toggle="tooltip"]')) {
    new bootstrap.Tooltip(tooltipTriggerEl)
  }
}
