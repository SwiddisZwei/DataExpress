let sctx = document.getElementById("skillChart").getContext("2d");
Chart.defaults.global.defaultFontColor = "#f0f7ee";

const processData = (data) => {
  output = {};

  output.labels = ["Chess", "Go", "Draughts", "Shogi"];

  output.datasets = [
    {
      label: "Beginner",
      backgroundColor: "#91b766",
      borderColor: "#618736",
      borderWidth: 2,
      data: [0, 0, 0, 0],
    },
    {
      label: "Intermediate",
      backgroundColor: "#e99f0c",
      borderColor: "#b96f00",
      borderWidth: 2,
      data: [0, 0, 0, 0],
    },
    {
      label: "Advanced",
      backgroundColor: "#9ca7d3",
      borderColor: "#6c77a3",
      borderWidth: 2,
      data: [0, 0, 0, 0],
    },
    {
      label: "Expert",
      backgroundColor: "#ec8c6f",
      borderColor: "#bc5c3f",
      borderWidth: 2,
      data: [0, 0, 0, 0],
    },
  ];

  for (let datum of data) {
    let idx;
    switch (datum[0]) {
      case "chess":
        idx = 0;
        break;
      case "go":
        idx = 1;
        break;
      case "draughts":
        idx = 2;
        break;
      case "shogi":
        idx = 3;
    }

    let dataset;
    switch (datum[1]) {
      case "beginner":
        dataset = 0;
        break;
      case "intermediate":
        dataset = 1;
        break;
      case "advanced":
        dataset = 2;
        break;
      case "expert":
        dataset = 3;
    }

    output.datasets[dataset].data[idx] += 1;
  }

  return output;
};

fetch("/api")
  .then((res) => res.json())
  .then((data) => {
    let chartData = processData(data);

    let chart = new Chart(sctx, {
      type: "horizontalBar",
      data: chartData,
      options: {
        scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: { color: "#60675e", zeroLineColor: "#60675e" },
            },
          ],
          yAxes: [
            {
              stacked: true,
              gridLines: { color: "#60675e", zeroLineColor: "#60675e" },
            },
          ],
        },
      },
    });

    console.log(chart.data);
    console.log(chart.options);

    chart.update();
  });
