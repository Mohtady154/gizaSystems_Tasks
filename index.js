
const apiKey = 'mOWFNCX3QmrOeIYOlMoa';
let myChartInstance = null;

// function createChart(timeSeriesData) {
//     const ctx = document.getElementById('myChart');
    
//     if (!ctx) {
//         console.error('Could not find canvas element');
//         return;
//     }

//     if (!timeSeriesData || !Array.isArray(timeSeriesData)) {
//         console.error('Invalid time series data:', timeSeriesData);
//         return;
//     }
//     if (myChartInstance) {
//         myChartInstance.destroy();
//     }

//     const data = {
//         labels: timeSeriesData.map(item => item.date),
//         datasets: [{
//             label: '',
//             data: timeSeriesData.map(item => item.close),
//             fill: true,
//             borderColor: 'rgb(180, 222, 128)',
//             backgroundColor: 'rgb(242, 250, 234)',
//             tension: 0.1,
//             pointRadius: 0,
//             drawActiveElementsOnTop: false,
//             pointHoverRadius: 0,
//             pointHoverBorderWidth: 0,
//             pointHoverBackgroundColor: 'transparent',
//             pointHoverBorderColor: 'transparent',
//             borderWidth: 2,
//         }]
//     };

//     try {
//         myChartInstance = new Chart(ctx, {
//             type: 'line',
//             data: data,
//             options: {
//                 responsive: true,
//                 plugins: {
//                     legend: {
//                         display: false
//                     }
//                 },
//                 scales: {
//                     y: {
//                         display: false,
//                         beginAtZero: true,
//                         grid: {
//                             display: false
//                         }
//                     },
//                     x: {
//                         display: false,
//                         grid: {
//                             display: false
//                         }
//                     }
//                 }
//             }
//         });
//     } catch (error) {
//         console.error('Error creating chart:', error);
//     }
// }

function createChart(timeSeriesData) {
    const ctx = document.getElementById('myChart');
    
    if (!ctx) {
        console.error('Could not find canvas element');
        return;
    }

    if (!timeSeriesData || !Array.isArray(timeSeriesData)) {
        console.error('Invalid time series data:', timeSeriesData);
        return;
    }
    if (myChartInstance) {
        myChartInstance.destroy();
    }

    const data = {
        labels: timeSeriesData.map(item => item.date), 
        datasets: [{
            label: 'Currency Exchange Rate',
            data: timeSeriesData.map(item => item.close), 
            fill: true,
            borderColor: 'rgb(180, 222, 128)',
            backgroundColor: 'rgb(242, 250, 234)',
            tension: 0.1,
            pointRadius: 0,
            borderWidth: 2,
        }]
    };

    try {
        myChartInstance = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        display: true,
                        beginAtZero: false,
                        grid: {
                            display: true
                        }
                    },
                    x: {
                        display: true,
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating chart:', error);
    }
}


function populateDropdowns(currencies){
    const dropDown1 = document.getElementById('dropDown1');
    const dropDown2 = document.getElementById('dropDown2');

     // dropDown1.innerHTML = '';
    // dropDown2.innerHTML = '';
    
    Object.entries(currencies).forEach(([key, value]) => {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        option1.value = key;
        option1.textContent = value;
        option2.value = key;
        option2.textContent = value;
        dropDown1.appendChild(option1);
        dropDown2.appendChild(option2);
    });
    dropDown1.addEventListener('change', showExchange);
    dropDown2.addEventListener('change', showExchange);
}

async function showExchange() {
    const dropDown1 = document.getElementById('dropDown1');
    const dropDown2 = document.getElementById('dropDown2');
    const currency1 = dropDown1.value;
    const currency2 = dropDown2.value;

    try {
        const response = await axios.get(`https://marketdata.tradermade.com/api/v1/convert?api_key=${apiKey}&from=${currency1}&to=${currency2}&amount=1`);
        console.log(response.data);
        showResult(response.data.total);
    } catch (error) {
        console.error("Error: ", error);
    }
} 

function showResult(total){
const myExchange = document.getElementById('exchange');
myExchange.textContent = `${total}`;
}

async function fetchCurrencies() {
    try {
        const response = await axios.get(`https://marketdata.tradermade.com/api/v1/live_currencies_list?api_key=${apiKey}`);
        populateDropdowns(response.data.available_currencies);
    } catch (error) {
        console.error("Error: ", error);
    }
}

// async function fetchTimeSeriesData(timeframe) {
//     const now = new Date();
//     let startDate = new Date(now);
//     let interval;

//     const formatDateTime = (date) => {
//         return date.toISOString().slice(0, 16).replace('T', '-');  
//     };

//     switch(timeframe) {
//         case '15M':
//             startDate.setUTCMinutes(now.getUTCMinutes() - 15);
//             interval = 'minute';
//             break;
//         case '1H':
//             startDate.setUTCHours(now.getUTCHours() - 1);
//             interval = 'minute';
//             break;
//         case '1D':
//             startDate.setUTCDate(now.getUTCDate() - 1);
//             interval = 'hourly';
//             break;
//         case '1W':
//             startDate.setUTCDate(now.getUTCDate() - 7);
//             interval = 'hourly';
//             break;
//         case '1M':
//             startDate.setUTCMonth(now.getUTCMonth() - 1);
//             interval = 'daily';
//             break;
//     }

//     const formattedEndDate = interval === 'minute' ? formatDateTime(now) : now.toISOString().slice(0, 10);
//     const formattedStartDate = interval === 'minute' ? formatDateTime(startDate) : startDate.toISOString().slice(0, 10);

//     const currencyPair = `${currency1}${currency2}`;
//     console.log("API Request Parameters:", {
//         currencyPair,
//         startDate: formattedStartDate,
//         endDate: formattedEndDate,
//         interval
//     });
    
//     try {
//         const response = await axios.get(`https://marketdata.tradermade.com/api/v1/timeseries?`, {
//             params: {
//                 api_key: apiKey,
//                 currency: currencyPair,
//                 start_date: formattedStartDate,
//                 end_date: formattedEndDate,
//                 interval: interval,
//                 format: 'records'
//             }
//         });
        
//         console.log("API Response:", response.data);
        
//         if (response.data && Array.isArray(response.data.quotes)) {
//             return response.data.quotes;
//         } else {
//             console.error('Invalid response format:', response.data);
//             return [];
//         }
//     } catch (error) {
//         console.error('Error details:', error.response?.data || error.message);
//         return [];
//     }
// }

async function fetchTimeSeriesData(timeframe) {
    const now = new Date();
    let startDate = new Date(now);
    let interval;
    switch (timeframe) {
        case '15M':
            startDate.setUTCMinutes(now.getUTCMinutes() - 15);
            interval = 'minute';
            break;
        case '1H':
            startDate.setUTCHours(now.getUTCHours() - 1);
            interval = 'minute';
            break;
        case '1D':
            startDate.setUTCDate(now.getUTCDate() - 1);
            interval = 'hourly';
            break;
        case '1W':
            startDate.setUTCDate(now.getUTCDate() - 7);
            interval = 'daily';
            break;
        case '1M':
            startDate.setUTCMonth(now.getUTCMonth() - 1);
            interval = 'daily';
            break;
        default:
            console.error('Unsupported timeframe');
            return [];
    }
    const formatDateTime = date => date.toISOString().slice(0, 16).replace('T', '-');
    const formattedStartDate = interval === 'minute' ? formatDateTime(startDate) : startDate.toISOString().slice(0, 10);
    const formattedEndDate = interval === 'minute' ? formatDateTime(now) : now.toISOString().slice(0, 10);
    const currencyPair = `${currency1}${currency2}`;

    try {
        const response = await axios.get(`https://marketdata.tradermade.com/api/v1/timeseries`, {
            params: {
                api_key: apiKey,
                currency: currencyPair,
                start_date: formattedStartDate,
                end_date: formattedEndDate,
                interval: interval,
                format: 'records'
            }
        });

        // let avg = Math.abs(response.data.quotes[0].close - response.data.quotes[quotes.length-1].open);
        // console.log(avg);

        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data.quotes)) {
            return response.data.quotes;
        } else {
            console.error('Invalid response format:', response.data);
            return [];
        }
    } catch (error) {
        console.error('Error fetching time series data:', error.response?.data || error.message);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TimeSeriesButtons();
});
document.addEventListener('DOMContentLoaded', createChart);
document.addEventListener('DOMContentLoaded', fetchCurrencies);
function updateFlag1(currency1){
    const flag1 = document.getElementById('flag1');
    flag1.classList.remove('fi-us');
    flag1.classList.add(`fi-${currency1.toLowerCase()}`);
}
function updateFlag2(currency2){
    const flag2 = document.getElementById('flag2');
    flag2.classList.remove('fi-eu');
    flag2.classList.add(`fi-${currency2.toLowerCase()}`);
}

// function updateCurrencyPair1(currency1 ){ 
//     const currencyPair = document.getElementById('currency-pair');
//     currencyPair.textContent = `${currency1}`;
// }
// function updateCurrencyPair2(currency2){
//     const currencyPair = document.getElementById('currency-pair');
//     currencyPair.textContent = `${currencyPair.textContent}/${currency2}`;
// }

let currentCurrency1 = ''; 
let currentCurrency2 = ''; 
function updateCurrencyPair1(newCurrency1) {
    currentCurrency1 = newCurrency1;
    const currencyPair = document.getElementById('currency-pair');
    currencyPair.textContent = `${currentCurrency1}/${currentCurrency2}`;
}

function updateCurrencyPair2(newCurrency2) {
    currentCurrency2 = newCurrency2; 
    const currencyPair = document.getElementById('currency-pair');
    currencyPair.textContent = `${currentCurrency1}/${currentCurrency2}`;
}

const currencyCode = {
        "AED": "ae",
        "ARS": "ar",
        "AUD": "au",
        "BHD": "bh",
        "BRL": "br",
        "CAD": "ca",
        "CHF": "ch",
        "CLP": "cl",
        "CNY": "cn",
        "COP": "co",
        "CZK": "cz",
        "DKK": "dk",
        "EUR": "eu",
        "GBP": "gb",
        "HKD": "hk",
        "HRK": "hr",
        "HUF": "hu",
        "IDR": "id",
        "ILS": "il",
        "INR": "in",
        "ISK": "is",
        "JPY": "jp",
        "KRW": "kr",
        "KWD": "kw",
        "MAD": "ma",
        "MXN": "mx",
        "MYR": "my",
        "NGN": "ng",
        "NOK": "no",
        "NZD": "nz",
        "OMR": "om",
        "PEN": "pe",
        "PHP": "ph",
        "PLN": "pl",
        "RON": "ro",
        "RUB": "ru",
        "SEK": "se",
        "SGD": "sg",
        "THB": "th",
        "TRY": "tr",
        "TWD": "tw",
        "USD": "us",
        "VND": "vn",
        "ZAR": "za",
        "EGP": "eg"
}

const dropDown1 = document.getElementById('dropDown1');
const dropDown2 = document.getElementById('dropDown2');
let currency1 = dropDown1.value;
let currency2 = dropDown2.value;
let selectedTimeframe = '15M';

document.getElementById('time-series-1').addEventListener('click', async () => {
    selectedTimeframe = '15M';
    if (currency1 && currency2) {
        const data = await fetchTimeSeriesData(selectedTimeframe);
        createChart(data);
    }
});

document.getElementById('time-series-2').addEventListener('click', async () => {
    selectedTimeframe = '1H';
    if (currency1 && currency2) {
        const data = await fetchTimeSeriesData(selectedTimeframe);
        createChart(data);
    }
});

document.getElementById('time-series-3').addEventListener('click', async () => {
    selectedTimeframe = '1D';
    if (currency1 && currency2) {
        const data = await fetchTimeSeriesData(selectedTimeframe);
        createChart(data);
    }
});

document.getElementById('time-series-4').addEventListener('click', async () => {
    selectedTimeframe = '1W';
    if (currency1 && currency2) {
        const data = await fetchTimeSeriesData(selectedTimeframe);
        createChart(data);
    }
});

document.getElementById('time-series-5').addEventListener('click', async () => {
    selectedTimeframe = '1M';
    if (currency1 && currency2) {
        const data = await fetchTimeSeriesData(selectedTimeframe);
        createChart(data);
    }
});

dropDown1.addEventListener('change', async () => {
    currency1 = dropDown1.value;
    updateCurrencyPair1(currency1);
    updateFlag1(currencyCode[currency1]);
    if (currency1 && currency2) {
        const data = await fetchTimeSeriesData(selectedTimeframe);
        createChart(data);
    }
});

dropDown2.addEventListener('change', async () => {
    currency2 = dropDown2.value;
    updateCurrencyPair2(currency2);
    updateFlag2(currencyCode[currency2]);
    if (currency1 && currency2) {
        const data = await fetchTimeSeriesData(selectedTimeframe);
        createChart(data);
    }
});






