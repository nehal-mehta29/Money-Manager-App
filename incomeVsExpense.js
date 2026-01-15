/*================================== Chart Manager ==================================*/

export default class IncomeVsExpenseChart{
    constructor(chartElementId){

        //Get the chart canvas element by ID
        this.chartElement = document.getElementById(chartElementId);

        //Placeholder for Chart.js
        this.chart = null;

        //Initialize the chart
        this.initChart();
    }

    //Initialize the chart
    initChart(){

        this.chart = new Chart(this.chartElement, {

            //Type of chart
            type: "pie",
            data: { 
                labels: ["Income", "Expense"],
                datasets: [{
                    labels: "Income vs Expense",

                    //Initial data
                    date:[0,0],
                    backgroundColor: ["#57ec5cff", "#ee5e53ff"],
                    borderWidth: 1
                }]
            },
            options: {

                //To make chart responsive
                reponsive: true,
                plugins: {
                    legend: {
                        position: "top"
                    }
                }
            }
        });
    }

    //To update the chart with new data
    updateChart(transactions){

        //Calculate totals
        const income = transactions.filter(t => t.category === "Income").reduce((sum,t) => sum + t.amount, 0);
        const expense = transactions.filter(t => t.category === "Expense").reduce((sum,t) => sum + t.amount, 0);

        //Updating char data
        this.chart.data.datasets[0].data = [income, expense];
        this.chart.update();

    }
}
