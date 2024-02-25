document.addEventListener('DOMContentLoaded', function(){

const amountInput = document.getElementById('amountInput');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const converterBtn = document.getElementById('converterBtn');
const resultsDiv = document.getElementById('results');

function fetchCurrencyData(typeOfCurrency){
    const apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${typeOfCurrency}.json`;
 
    fetch(apiUrl)
    .then((res) => {
        if (!res.ok) {
            throw new Error('Issue with the Networks response');
        } else
        return res.json();
    })
    .then((data) => {
        const currencies = object.currencies(data);
        console.log(currencies);
    })

}
})