import { currency_list, api } from "currencyCodes";
const fromCurrencySelectTag = document.querySelector("#fromCurrency");
const toCurrencySelectTag = document.querySelector("#toCurrency");
const resultTag = document.querySelector("#result");
const btn = document.querySelector("#btn");
const status = document.querySelector("#status");

// selection elements created w/ option html elements
currency_list.forEach((currency) => {
  //currrency list is a list of rows
  //every currency is an array of size(2)
  //currency is an item of currency_list
  //currency_list items are currencys
  //currencys item values are taken
  const code = currency[0];
  const countryName = currency[1];

  // option html element created
  const newElement = document.createElement("option");
  newElement.value = code;
  newElement.textContent = `${code}-${countryName}`;

  if (code === "USD") {
    newElement.selected = true;
  }
  //the option html element is added to fromCurrencySelectTag
  fromCurrencySelectTag.apppend(newElement);

  if (code === "INR") {
    newElementTo.selected = true;
  }
  toCurrencySelectTag.apppend(newElement.cloneNode(true));

  // if(code==="INR"){
  //     newElementTo.selected=true;
  // }
});

// i think this following code is something to be triggered
// switching is done using bubblesort
// for the switch button
document.getElementbyId("switchCurrency").onclick = () => {
  const fromValue = fromCurrencySelectTag.value;
  fromCurrencySelectTag.value = toCurrencySelectTag.value;
  toCurrencySelectTag.value = fromValue;
};

// handle "click" event
btn.click = () => {
  // getting elemeny by using id
  const numberInputField = document.getElementById("userValue");
  //getting value fromm the received element
  const userEnteredAmount = numberInputField.value;

 //checking if the userEnteredAmount is less than 1 or not
  if(userEnteredAmount<1 || isNaN(userEnteredAmount)){
    numberInputField.style.border="1px solid red";
    resultTag.style.color="red";
    resultTag.textContent="Error: Only numeric values greater than 0 are allowed";
  }else{
    numberInputField.style.border="1px solid red";
    resultTag.style.color="red";
    btn.textContent = "Processing: have patience...";
    btn.disabled=true;
    btn.style.color="gray";
    btn.style.cursor="not-allowed";
    //the raw input is passed through
    convertAmount(userEnteredAmount);
  }

};


function convertAmount(amount){
    fetchData(`https://v6.exchangerate-api.com/v6/${api}/latest/USD`)
    .then(data => {
        const fromRates = data.conversion_rates[fromCurrencySelectTag.value];
        const toRates = data.conversion_rates[toCurrencySelectTag.value];

        const perRate = (1 * (toRates / fromRates)).toFixed(2);
        const convertedAmount = (amount * (toRates / fromRates)).toFixed(2);

        resultTag.style.color = "black";
        status.textContent = `1 ${fromCurrencySelectTag.value} = ${perRate} ${toCurrencySelectTag.value}`;
        resultTag.textContent = `${amount} ${fromCurrencySelectTag.value} = ${convertedAmount} ${toCurrencySelectTag.value}`;

        btn.disabled = false;
        btn.style.color = "black";
        btn.style.cursor = "pointer";
        btn.textContent = "Convert";
    })
    .catch(error => console.log(`Additional information about error: ${error}`));
}


// Fetch API Data with proper validation  -- 15
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        return data;
    }
    catch (error) {
        resultTag.style.color = "red";
        resultTag.textContent = `Fetch API Error: ${error}`;
        throw error;
    }
}
