// Service functions will be available globally
const apiKey = 'FzmfcPmV1zAM2MKJiHAL';
function fetchTimeSeriesData(timeframe, currency1, currency2) {
    const now = new Date();
    const startDate = new Date(now);
    let interval;

    switch (timeframe) {
        case '15M':
            startDate.setMinutes(now.getMinutes() - 15);
            interval = 'minute';
            break;
        case '1H':
            startDate.setHours(now.getHours() - 1);
            interval = 'minute';
            break;
        case '1D':
            startDate.setDate(now.getDate() - 1);
            interval = 'hourly';
            break;
        case '1W':
            startDate.setDate(now.getDate() - 7);
            interval = 'daily';
            break;
        case '1M':
            startDate.setMonth(now.getMonth() - 1);
            interval = 'daily';
            break;
        default:
            console.error('Unsupported timeframe');
            return [];
    }

    const formatDateTime = date => date.toISOString().slice(0, 16).replace('T', ' ');
    const formattedStartDate = interval === 'minute' ? formatDateTime(startDate) : startDate.toISOString().slice(0, 10);
    const formattedEndDate = interval === 'minute' ? formatDateTime(now) : now.toISOString().slice(0, 10);

    return axios.get(`https://marketdata.tradermade.com/api/v1/timeseries`,{
        params: {
            api_key: apiKey,
            currency: `${currency1}${currency2}`,
            start_date: formattedStartDate,
            end_date: formattedEndDate,
            interval: interval,
            format: 'records'
        }
    })
    .then(response => response.data.quotes)
    .catch(error => {
        console.error('Error fetching time series data:', error);
        return [];
    });
}

function fetchExchangeRate(currency1, currency2) {
    return axios.get(`https://marketdata.tradermade.com/api/v1/convert`, {
        params: {
            api_key: apiKey,
            from: currency1,
            to: currency2,
            amount: 1
        }
    })
    .then(response => response.data.total)
    .catch(error => {
        console.error("Error fetching exchange rate:", error);
        throw error;
    });
}

function fetchAvailableCurrencies() {
    return axios.get(`https://marketdata.tradermade.com/api/v1/live_currencies_list`, {
        params: {
            api_key: apiKey
        }
    })
    .then(response => response.data.available_currencies)
    .catch(error => {
        console.error("Error fetching currencies:", error);
        throw error;
    });
} 