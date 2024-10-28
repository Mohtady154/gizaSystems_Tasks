// class TimeSeriesButtons {
//     constructor() {
//         this.buttons = document.querySelectorAll('.time-series button');
//         this.initializeButtons();
//     }

//     initializeButtons() {
//         this.buttons.forEach(button => {
//             button.addEventListener('click', () => this.handleButtonClick(button));
//         });
//     }

//     handleButtonClick(clickedButton) {
//         this.buttons.forEach(btn => btn.classList.remove('active'));
        
//         clickedButton.classList.add('active');
        
//         const timeFrame = clickedButton.dataset.timeframe;
//         this.updateChart(timeFrame);
//     }

//     updateChart(timeFrame) {
//         console.log(`Updating chart for timeframe: ${timeFrame}`);
//     }
// }


// class TimeSeriesButtons {
//     constructor() {
//         this.buttons = document.querySelectorAll('.time-series button');
//         this.initializeButtons();
//     }

//     initializeButtons() {
//         this.buttons.forEach(button => {
//             button.addEventListener('click', async () => {
//                 this.handleButtonClick(button);
//                 const timeFrame = button.dataset.timeframe;
//                 const data = await fetchTimeSeriesData(timeFrame);
//                 createChart(data);
//             });
//         });
//     }

//     handleButtonClick(clickedButton) {
//         this.buttons.forEach(btn => btn.classList.remove('active'));
//         clickedButton.classList.add('active');
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     new TimeSeriesButtons();
// });

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
                const data = await fetchTimeSeriesData(timeFrame);
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
