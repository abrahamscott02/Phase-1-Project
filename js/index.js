document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amountInput');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const converterBtn = document.getElementById('converterBtn');
    const resultsDiv = document.getElementById('results');

    let currencyRates = [];

    function fetchCurrencyData() {
        const apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json`;

        fetch(apiUrl)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Issue with the Networks response');
                }
                return res.json();
            })
            .then((data) => {
                const currencyData = data.eur;
                currencyRates = Object.entries(currencyData).map(([currency, rate]) => ({ currency, rate }));
                console.log(currencyRates);

                currencyRates.forEach(currencyRate => {
                    // Options for the 'fromCurrency' Dropdown
                    const option1 = document.createElement('option');
                    option1.value = currencyRate.currency; //  Set the value of the option to the currency
                    option1.textContent = currencyRate.currency; // Set the text content of the option to the currency
                    fromCurrencySelect.appendChild(option1); // Appending the option to the 'fromCurrency' Dropdown

                    // Options for the 'toCurrency' Dropdown
                    const option2 = document.createElement('option');
                    option2.value = currencyRate.currency;
                    option2.textContent = currencyRate.currency;
                    toCurrencySelect.appendChild(option2);
                });

                // Capitalize all entries in the dropdowns
                fromCurrencySelect.querySelectorAll('option:not(:first-child)').forEach(option => {
                    option.textContent = option.textContent.toUpperCase();
                });

                fromCurrencySelect.querySelectorAll('option:not(:first-child)').forEach(option => {
                    option.textContent = option.textContent.toUpperCase();
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Adding the "click" event listener to the "amountInput" box
    amountInput.addEventListener('focus', function() {
        amountInput.classList.add('highlight-red');
    });

    amountInput.addEventListener('input', function() {
        if (amountInput.value.trim() !== ''){
            amountInput.classList.remove('highlight-red');
        }
    });

    // Adding the "submit" event listener to the "convertBtn"
    converterBtn.addEventListener('click', function(event) {
        event.preventDefault();

        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value; 
        const toCurrency = toCurrencySelect.value;

        const fromRate = currencyRates.find(rate => rate.currency === fromCurrency)?.rate;
        const toRate = currencyRates.find(rate => rate.currency === toCurrency)?.rate;

        const convertedAmount = (amount / fromRate) * toRate;

        const roundedAmount = convertedAmount.toFixed(2);
        resultsDiv.innerHTML = `${amount} ${fromCurrency} = ${roundedAmount} ${toCurrency}`;
    });

    // Fetching currency data initially for 'fromCurrency' dropdown
    fetchCurrencyData(); // You can set the default currency here
});