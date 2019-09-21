let dataset = [];
let ctx = document.getElementById('myChart');
let stackedLine = new Chart(ctx, {
    type: 'line',
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Average Fitness By Generation'
        }
    },
    data: {
        labels: [],
        datasets: [
            {
                label: 'Gen Scores',
                data: [],
                backgroundColor: `rgba(255, 0, 0, 0.2)`,
                borderColor: `rgba(255, 0, 0, 0.2)`,
                fill: true
            }
        ]
    }
});

function addData(dataObj) {
    stackedLine.data.labels.push(`Gen ${dataObj.x}`);
    stackedLine.data.datasets[0].data.push(dataObj.y);

    stackedLine.update();
}
