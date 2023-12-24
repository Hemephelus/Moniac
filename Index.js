let TAX_RATE = 0.5;
let TRANSACTION_BALANCE = 2000;
let GOVERNMENT_EXPENDITURE_RATE = 1.0;
let AVERAGE_PROPENSITY_TO_CONSUME = 0.5;
let INVESTMENT_RATE = 1.0;
let AVERAGE_PROPENSITY_IMPORT = 0.0;

function updateValue(sliderName, elemId) {
    let x = document.getElementById(sliderName)
    TAX_RATE = (+x.value/x.max)
    document.getElementById(elemId).innerHTML = TAX_RATE
    console.log(TAX_RATE);
  }





