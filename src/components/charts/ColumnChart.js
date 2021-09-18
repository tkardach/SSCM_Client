import "./ColumnChart.css";
import { Bar } from 'react-chartjs-2';

const ColumnChart = (props) => {
  const options = {
    plugins: {
      legend: {
        position: 'right',
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
        },
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

  return (
  <div>
    <Bar data={props.data} options={options} />
  </div>
  );
}

export default ColumnChart;