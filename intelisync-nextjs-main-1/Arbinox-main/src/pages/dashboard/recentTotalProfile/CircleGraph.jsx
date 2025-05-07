import React from "react";
import dynamic from "next/dynamic";
import { Typography } from "@mui/material";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

class CircleGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        parseFloat(props.totalProfit),
        parseFloat(props.totalCapital - props.totalProfit),
      ],
      options: {
        chart: {
          width: 350,
          height: 350,
          type: "donut",
        },
        plotOptions: {
          pie: {
            donut: {
              size: "55%",
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        responsive: [
          {
            breakpoint: 1024,
            options: {
              chart: {
                width: 150,
                height: 150,
              },
            },
          },
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 150,
                height: 150,
              },
              legend: {
                show: false,
              },
            },
          },
        ],
        legend: {
          position: "right",
          offsetY: 0,
          height: 250,
          show: false,
        },
        stroke: {
          show: false,
          width: 15,
          colors: ["#806DFF", "#222024"],
        },
        fill: {
          colors: ["#806DFF", "#222024"],
        },
        tooltip: {
          enabled: false,
        },
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.totalCapital !== this.props.totalCapital ||
      prevProps.totalProfit !== this.props.totalProfit
    ) {
      this.setState({
        series: [
          parseFloat(this.props.totalProfit),
          parseFloat(this.props.totalCapital - this.props.totalProfit),
        ],
      });
    }
  }

  calculateProfitPercentage = () => {
    const { totalCapital, totalProfit } = this.props;
    const capital = parseFloat(totalCapital);
    const profit = parseFloat(totalProfit);
    if (capital === 0) return 0;
    const percentage = (profit / capital) * 100;
    return parseFloat(percentage.toFixed(3));
  };

  render() {
    return (
      <div className="chart-wrap" style={{ position: "relative" }}>
        <div
          style={{ marginLeft: "-13px", marginTop: "-16px" }}
          className="piechartBox"
        >
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="donut"
            width={190}
            height={300}
          />
        </div>
        <div className="valueChartBox">
          <Typography variant="body2" color="primary">
            {this.calculateProfitPercentage()}%
          </Typography>
        </div>
      </div>
    );
  }
}

export default CircleGraph;
