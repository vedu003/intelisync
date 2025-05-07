import { useEffect } from "react";
import {
  Chart,
  BarController,
  BarElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  Tooltip,
} from "chart.js";

function ChartDummy({ categoryData }) {
  useEffect(() => {
    // Register the necessary Chart.js components for a bar chart
    Chart.register(
      BarController,
      BarElement,
      PointElement,
      LinearScale,
      Title,
      CategoryScale,
      Legend,
      Tooltip // Register the Legend for displaying legends
    );

    var ctx = document.getElementById("myChart").getContext("2d");

    // Create gradients for Pass and Fail bars
    var gradientPass = ctx.createLinearGradient(0, 0, 0, 200);
    gradientPass.addColorStop(0, "#00ff00"); // Light green
    gradientPass.addColorStop(1, "#000"); // Darker green

    var gradientFail = ctx.createLinearGradient(0, 0, 0, 300);
    gradientFail.addColorStop(0, "#ff0000"); // Light red
    gradientFail.addColorStop(1, "#000"); // Darker red
    var myChart = new Chart(ctx, {
      type: "bar", // Bar chart
      data: {
        labels: categoryData.map((item) =>
          item?.date ? item?.date : item?.date
        ),
        datasets: [
          {
            data: categoryData.map((item) => (item?.WON ? item?.WON : "0")),
            label: "Pass",
            borderColor: "#00ff00", // Outline color (can be optional)
            backgroundColor: gradientPass, // Gradient fill for "Pass"
            fill: false,
            borderRadius: 10, // Add border radius to bars
            barThickness: 10, // Set bar thickness (optional)
          },
          {
            data: categoryData.map((item) => (item?.LOSS ? item?.LOSS : "0")),
            label: "Fail",
            borderColor: "#ff0000", // Outline color (can be optional)
            backgroundColor: gradientFail, // Gradient fill for "Fail"
            fill: false,
            borderRadius: 10, // Add border radius to bars
            barThickness: 10, // Set bar thickness (optional)
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true, // Enable legend
            position: "top", // Position it on the top
            align: "start", // Align it to the left
          },
          tooltip: {
            enabled: true, // Enable tooltips (default is true)
            callbacks: {
              label: function (tooltipItem) {
                let datasetLabel = tooltipItem.dataset.label || "";
                let value = tooltipItem.raw;
                return `${datasetLabel}: ${value}`;
              },
            },
          },
        },
        maintainAspectRatio: false, // Disable maintaining aspect ratio for full width
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [categoryData]);

  return (
    <>
      <div style={{ height: "241px" }}>
        <canvas id="myChart" width="100%"></canvas>
      </div>
    </>
  );
}

const dummyData = [
  {
    date: "Jan 1",
    WON: Math.floor(Math.random() * 50) + 30,
    LOSS: Math.floor(Math.random() * 10) + 1,
  },
  {
    date: "Feb 1",
    WON: Math.floor(Math.random() * 50) + 35,
    LOSS: Math.floor(Math.random() * 10) + 2,
  },
  {
    date: "Mar 1",
    WON: Math.floor(Math.random() * 50) + 32,
    LOSS: Math.floor(Math.random() * 10) + 3,
  },
  {
    date: "Apr  1",
    year: 2023,
    WON: Math.floor(Math.random() * 50) + 40,
    LOSS: Math.floor(Math.random() * 10) + 1,
  },
  {
    date: "May  1",
    year: 2023,
    WON: Math.floor(Math.random() * 50) + 40,
    LOSS: Math.floor(Math.random() * 10) + 1,
  },
  {
    date: "June 1",
    year: 2023,
    WON: Math.floor(Math.random() * 50) + 38,
    LOSS: Math.floor(Math.random() * 10) + 2,
  },
  {
    date: "July 1",
    year: 2023,
    WON: Math.floor(Math.random() * 50) + 34,
    LOSS: Math.floor(Math.random() * 10) + 4,
  },
  {
    date: "Aug 1",
    year: 2023,
    WON: Math.floor(Math.random() * 50) + 45,
    LOSS: Math.floor(Math.random() * 10) + 5,
  },
  {
    date: "Sept 1",
    year: 2023,
    WON: Math.floor(Math.random() * 50) + 36,
    LOSS: Math.floor(Math.random() * 10) + 6,
  },
  {
    date: "Oct 1",
    year: 2023,
    WON: Math.floor(Math.random() * 50) + 39,
    LOSS: Math.floor(Math.random() * 10) + 2,
  },
  {
    date: "Nov 1",
    year: 2023,
    WON: Math.floor(Math.random() * 50) + 37,
    LOSS: Math.floor(Math.random() * 10) + 1,
  },
  {
    date: "Dec 1",
    year: 2023,
    WON: Math.floor(Math.random() * 50) + 47,
    LOSS: Math.floor(Math.random() * 10) + 3,
  },
];

export default function TransBar() {
  return <ChartDummy categoryData={dummyData} />;
}
