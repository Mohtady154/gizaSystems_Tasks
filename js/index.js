"use strict";

// Main application code
let myChartInstance = null;
let selectedTimeframe = '15M';
let currency1 = 'EUR';
let currency2 = 'USD';

async function updateChartAndExchangeRate() {
    const timeSeriesData = await fetchTimeSeriesData(selectedTimeframe, currency1, currency2);
    myChartInstance = createChart(timeSeriesData, myChartInstance);

    try {
        const rate = await fetchExchangeRate(currency1, currency2);
        document.getElementById('exchange').textContent = rate;

        // Calculate difference and percentage
        const firstClose = timeSeriesData[0]?.close;
        const lastOpen = timeSeriesData[timeSeriesData.length - 1]?.open;

        if (firstClose !== undefined && lastOpen !== undefined) {
            const difference = firstClose - lastOpen;
            const percentageDifference = ((difference * 100) / rate).toFixed(6);

            // Update difference and percentage in the UI
            document.getElementById('difference').textContent = difference.toFixed(6);
            document.getElementById('difference-percentage').textContent = `(${percentageDifference}%)`;
            // document.getElementById('difference-container').style.color = percentageDifference > 0 ? 'green' : 'red';
        }
    } catch (error) {
        console.error("Error updating exchange rate:", error);
    }
}

async function initializeApp() {
    try {
        const currencies = await fetchAvailableCurrencies();
        const dropDown1 = document.getElementById('dropDown1');
        const dropDown2 = document.getElementById('dropDown2');

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

        dropDown1.value = currency1;
        dropDown2.value = currency2;
        
        updateUI(currency1, currency2);
        await updateChartAndExchangeRate();

        // Event Listeners
        dropDown1.addEventListener('change', async () => {
            currency1 = dropDown1.value;
            updateUI(currency1, currency2);
            await updateChartAndExchangeRate();
        });

        dropDown2.addEventListener('change', async () => {
            currency2 = dropDown2.value;
            updateUI(currency1, currency2);
            await updateChartAndExchangeRate();
        });

        document.querySelectorAll('.time-series button').forEach(button => {
            button.addEventListener('click', async () => {
                selectedTimeframe = button.dataset.timeframe;
                document.querySelectorAll('.time-series button').forEach(btn => 
                    btn.classList.remove('active'));
                button.classList.add('active');
                await updateChartAndExchangeRate();
            });
        });
    } catch (error) {
        console.error("Error initializing app:", error);
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);
