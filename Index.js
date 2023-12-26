let TRANSACTION_BALANCE= 2000
let economic_rates = {
  TAX_RATE: 0.24,
  GOVERNMENT_EXPENDITURE_RATE: 0.45,
  AVERAGE_PROPENSITY_TO_CONSUME: 0.7,
  INVESTMENT_RATE: 0.50,
  AVERAGE_PROPENSITY_IMPORT: 0.5,
};

function updateValue(sliderName, elemId) {
  let x = document.getElementById(sliderName);
  economic_rates[sliderName] = +x.value / x.max;
  document.getElementById(elemId).innerHTML = `${x.value}%`;
}

function initializeValues() {
  let economic_rates_list = Object.entries(economic_rates)
  for(let i = 0; i < economic_rates_list.length; i++){
    let x = document.getElementById(economic_rates_list[i][0]);
     x.value= economic_rates_list[i][1]*100
    document.getElementById(economic_rates_list[i][0]+"_VALUE").innerHTML = `${x.value}%`;
  }
}

initializeValues() 