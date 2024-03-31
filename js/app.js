// Define the URL for fetching exchange rates
const URL =
  "https://v6.exchangerate-api.com/v6/6cdfc0da475dffb2b349875a/latest/USD";

// Select elements from the DOM
const fromDropdown = document.querySelector("#fromExchange");
const toDropdown = document.querySelector("#toExchange");
const amount = document.querySelector(".amount input");
const result = document.querySelector(".result p");

// Loop through currency codes to populate 'From' and 'To' dropdowns
for (let i = 0; i < currencyCodes.length; i++) {
  // Create an option element for each currency code in the array
  const currency = currencyCodes[i];
  const currOption = document.createElement("option");
  currOption.innerText = currency;
  currOption.value = currency;
  // Append the option to the 'From' dropdown
  fromDropdown.appendChild(currOption);
}

// Repeat the process for the 'To' dropdown
for (let i = 0; i < currencyCodes.length; i++) {
  const currency = currencyCodes[i];
  const currOption = document.createElement("option");
  currOption.innerText = currency;
  currOption.value = currency;
  toDropdown.appendChild(currOption);
}

// Add event listener to the button for performing currency conversion
document.querySelector("button").addEventListener("click", async () => {
  // Get the value entered in the amount input field
  const amtValue = amount.value;

  // Check if amount is provided and greater than 0
  if (amtValue.length != 0 && amtValue > 0) {
    // Fetch exchange rate data from the API
    const response = await fetch(URL);
    const data = await response.json();
    const conversionRate = data.conversion_rates;

    // Get the conversion rates for the selected currencies
    const fromCurrency = conversionRate[fromDropdown.value];
    const toCurrency = conversionRate[toDropdown.value];

    // Calculate the exchanged amount
    const exchangeRate = (amtValue / fromCurrency) * toCurrency;

    // Prepare and display the conversion message
    const msg = `${amtValue} ${fromDropdown.value} = ${exchangeRate.toFixed(
      2
    )} ${toDropdown.value}`;
    result.innerText = msg;
  } else {
    // If amount is not provided or less than or equal to 0, display an alert
    alert("Please enter a valid amount greater than 0.");
  }
});
