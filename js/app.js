const URL =
  "https://v6.exchangerate-api.com/v6/6cdfc0da475dffb2b349875a/latest/USD";

const fromDropdown = document.querySelector("#fromExchange");
const toDropdown = document.querySelector("#toExchange");
const amount = document.querySelector(".amount input");
const result = document.querySelector(".result p");

for (let i = 0; i < currencyCodes.length; i++) {
  const currency = currencyCodes[i];
  const currOption = document.createElement("option");
  currOption.innerText = currency;
  currOption.value = currency;
  fromDropdown.appendChild(currOption);
}
for (let i = 0; i < currencyCodes.length; i++) {
  const currency = currencyCodes[i];
  const currOption = document.createElement("option");
  currOption.innerText = currency;
  currOption.value = currency;
  toDropdown.appendChild(currOption);
}

document.querySelector("button").addEventListener("click", async () => {
  const amtValue = amount.value;
  if (amtValue.length != 0 && amtValue > 0) {
    const response = await fetch(URL);
    const data = await response.json();
    const conversationRate = data.conversion_rates;
    const fromCurrency = conversationRate[fromDropdown.value];
    const toCurrency = conversationRate[toDropdown.value];
    const exchangeRate = (amtValue / fromCurrency) * toCurrency;
    const msg = `${amtValue} ${fromDropdown.value} = ${exchangeRate.toFixed(
      2
    )} ${toDropdown.value}`;
    result.innerText = msg;
  } else {
    alert`Firstly enter amount or enter amount bigger than 0`;
  }
});
