document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amountInput');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const converterBtn = document.getElementById('converterBtn');
    const resultsDiv = document.getElementById('results');

    let currencyRates = [];

    function fetchCurrencyData() {
        // const apiUrl = 'db.json';

        fetch('/db.json')
            .then((res) => {
                if (!res.ok) {  
                    throw new Error('Issue with the Networks response');
                }
                return res.json();
            })
            .then((data) => {
                const currencyData = data.currencies;
                currencyRates = [...currencyData]; // Push each currency object individually, using the spread operator.
                
                currencyRates.forEach(currencyRate => {
                    // Options for the 'fromCurrency' Dropdown
                    const option1 = document.createElement('option');
                    option1.value = currencyRate.code; //  Set the value of the option to the currency code
                    option1.textContent = currencyRate.code; // Set the text content of the option to the currency code
                    fromCurrencySelect.appendChild(option1); // Appending the option to the 'fromCurrency' Dropdown

                    // Options for the 'toCurrency' Dropdown
                    const option2 = document.createElement('option');
                    option2.value = currencyRate.code;
                    option2.textContent = currencyRate.code;
                    toCurrencySelect.appendChild(option2);
                });

                let x = 1
            })
            .catch((error) => {
                console.error(error);
            });
    }

    console.log(x);
    
    // Adding a "focus" event listener to the "amountInput" field to highlight the input box in red when no value is entered.
    amountInput.addEventListener('focus', function() {
        amountInput.classList.add('highlight-red');
    });

    // Adding an "input" event listener to remove the red highlight from the input field when it is no longer empty. 
    // Note: Trim() is used to remove any spaces from the beginning or end of the string, so to not mess up the if statement.
    amountInput.addEventListener('input', function() {
        if (amountInput.value.trim() !== ''){
            amountInput.classList.remove('highlight-red');
        }
    });

    // Adding the "submit" event listener to the "convertBtn"
    converterBtn.addEventListener('click', function(event) {
        event.preventDefault();

        // parseFloat attempts to convert the string into a floating point number (ie.. 12y36 will return 12 instead of throwing an error)
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value; 
        const toCurrency = toCurrencySelect.value;

        // Find the currency object for the fromCurrency
        const fromCurrencyObj = currencyRates.find(currency => currency.code === fromCurrency);

        // Retrieve the exchange rate for the toCurrency from the fromCurrencyObj
        const toRate = fromCurrencyObj.values[toCurrency];

        // Calculate the converted amount
        const convertedAmount = amount * toRate;

        // toFixed(2) will keep the converted result to 2 decimal places.
        const roundedAmount = convertedAmount.toFixed(2);
        resultsDiv.innerHTML = `${amount} ${fromCurrency} = ${roundedAmount} ${toCurrency}`;
    });


    fetchCurrencyData();
});
