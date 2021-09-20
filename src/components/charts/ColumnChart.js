import "./ColumnChart.css";
import { Bar } from 'react-chartjs-2';

const ColumnChart = (props) => {
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: props.chartTitle
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: props.xAxisLabel
        }
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: props.yAxisLabel
        },
      }
    }
  };

  const columnChartStyle = {
    position: "relative",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0"
  }

  return (
    <Bar style={columnChartStyle} data={props.data} options={options} />
  );
}

export default ColumnChart;