// Available Skills Chart
const ctx1 = document.getElementById("availableSkillsChart").getContext("2d");
const availableSkillsChart = new Chart(ctx1, {
  type: "line",
  data: {
    labels: ["React", "Node.js", "Big Data", "ASP.NET"],
    datasets: [
      {
        label: "Skills",
        data: [2, 2, 1.2, 1],
        borderColor: ["#f542dd", "#2b62f5", "#f5ce42", "#3c3c3c"],
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// Utilized Skills Chart
const ctx2 = document.getElementById("utilizedSkillsChart").getContext("2d");
const utilizedSkillsChart = new Chart(ctx2, {
  type: "bar",
  data: {
    labels: ["React", "Node.js", "Node.js", "UI/UX", "Node.js"],
    datasets: [
      {
        label: "Utilized Skills",
        data: [1.8, 2, 1.2, 1.5, 1],
        backgroundColor: [
          "#f5b742",
          "#d9d9d9",
          "#f48edb",
          "#b1d0ff",
          "#f5d842",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
