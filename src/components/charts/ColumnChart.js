import "./ColumnChart.css";
import { Bar } from 'react-chartjs-2';

const ColumnChart = (props) => {
  const options = {
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

  return (
    <Bar height="100%" width="100%" data={props.data} options={options} />
  );
}

export default ColumnChart;