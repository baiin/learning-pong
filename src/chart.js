let dataset = [];
let ctx = document.getElementById("myChart");
let stackedLine = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Gen Scores",
        data: [],
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
