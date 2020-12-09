let ctx = document.getElementById("chart").getContext("2d");
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
    let dataset;
    switch (datum[0]) {
      case "chess":
        dataset = 0;
        break;
      case "go":
        dataset = 1;
        break;
      case "draughts":
        dataset = 2;
        break;
      case "shogi":
        dataset = 3;
    }

    let idx;
    switch (datum[1]) {
      case "beginner":
        idx = 0;
        break;
      case "intermediate":
        idx = 1;
        break;
      case "advanced":
        idx = 2;
        break;
      case "expert":
        idx = 3;
    }

    output.datasets[dataset].data[idx]++;
  }

  return output;
};

fetch("/api")
  .then((res) => res.json())
  .then((data) => {
    let chartData = processData(data);
    console.log(chartData);

    let chart = new Chart(ctx, {
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
  });
