import "./ColumnChart.css";
import { Bar } from 'react-chartjs-2';
import { Filter, getMemberSigninsByFilter } from "../../services/statistics";

const ColumnChart = (props) => {
  const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: '# of Red Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: '# of Blue Votes',
        data: [2, 3, 20, 5, 1, 4],
        backgroundColor: 'rgb(54, 162, 235)',
      }
    ],
  };

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
      },
      y: {
        stacked: true
      }
    }
  };

  getMemberSigninsByFilter("65PM", Filter.MONTH)
  

  return (
  <div>
    <Bar data={data} options={options} />
  </div>
  );
}

export default ColumnChart;