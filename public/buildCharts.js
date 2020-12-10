let sctx = document.getElementById("skillChart").getContext("2d");
let tctx = document.getElementById("timeChart").getContext("2d");
Chart.defaults.global.defaultFontColor = "#f0f7ee";

const processSkillData = (data) => {
  let output = {};

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

  const dataIndexMap = {
    chess: 0,
    go: 1,
    draughts: 2,
    shogi: 3,
    beginner: 0,
    intermediate: 1,
    advanced: 2,
    expert: 3,
  };

  for (let datum of data) {
    let idx = dataIndexMap[datum[0]];
    let dataset = dataIndexMap[datum[1]];
    output.datasets[dataset].data[idx] += 1;
  }

  return output;
};

const buildSkillChart = (data) => {
  let chartData = processSkillData(data);

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

  chart.update();
};

const processTimeData = (data) => {
  let output = {};

  const dataMap = {
    "02h": "0-2 hrs/week",
    "34h": "3-4 hrs/week",
    "56h": "5-6 hrs/week",
    "7+h": "7+ hrs/week",
    expert: "Expert",
    advanced: "Advanced",
    intermediate: "Intermediate",
    beginner: "Beginner",
  };

  output.datasets = [
    {
      label: "Players",
      backgroundColor: "#9ca7d3",
      borderColor: "#6c77a3",
      data: [],
    },
  ];
  let points = output.datasets[0].data;

  for (let datum of data) {
    let found = false;
    for (let point of points) {
      if (point.x == dataMap[datum[2]] && point.y == dataMap[datum[1]]) {
        point.v += 1;
        found = true;
        break;
      }
    }
    if (!found)
      points.push({ x: dataMap[datum[2]], y: dataMap[datum[1]], v: 1 });
  }

  return output;
};

const buildTimeChart = (data) => {
  let chartData = processTimeData(data);

  let chart = new Chart(tctx, {
    type: "bubble",
    data: chartData,
    options: {
      legend: false,
      tooltips: {
        enabled: false
      },
      scales: {
        xAxes: [
          {
            gridLines: { color: "#60675e", zeroLineColor: "#60675e" },
            type: "category",
            labels: [
              "",
              "0-2 hrs/week",
              "3-4 hrs/week",
              "5-6 hrs/week",
              "7+ hrs/week",
              "",
            ],
            ticks: {
              beginAtZero: true,
              padding: 25,
            },
          },
        ],
        yAxes: [
          {
            gridLines: { color: "#60675e", zeroLineColor: "#60675e" },
            type: "category",
            labels: ["", "Expert", "Advanced", "Intermediate", "Beginner", ""],
            ticks: {
              beginAtZero: true
            },
          },
        ],
      },
      elements: {
        point: {
          radius: (context) => {
            var value = context.dataset.data[context.dataIndex];
            var size = context.chart.width;
            var base = Math.sqrt(value.v);
            return Math.round((size * base) / 85);
          },
        },
      },
    },
  });
};

fetch("/api")
  .then((res) => res.json())
  .then((data) => {
    buildSkillChart(data);
    buildTimeChart(data);
  });
