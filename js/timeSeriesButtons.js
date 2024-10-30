
class TimeSeriesButtons {
    constructor() {
        this.buttons = document.querySelectorAll('.time-series button');
        this.initializeButtons();
    }
    initializeButtons() {
        this.buttons.forEach(button => {
            button.addEventListener('click', async () => {
                this.handleButtonClick(button);
                
                const timeFrame = button.dataset.timeframe;
                const data = await fetchTimeSeriesData(timeFrame, currency1, currency2);
                createChart(data); 
            });
        });
    }
    handleButtonClick(clickedButton) {
        this.buttons.forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new TimeSeriesButtons();
});
