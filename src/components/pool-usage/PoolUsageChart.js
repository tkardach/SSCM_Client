import "./PoolUsageChart.css";
import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Filter, getMemberSigninsByFilter } from "../../services/statistics";
import ColumnChart from "../charts/ColumnChart";

const PoolUsageChart = (props) => {
  const [items, setItems] = useState([]);
  const [labels, setLabels] = useState([])

  useEffect(() => {
    getMemberSigninsByFilter(Filter.MONTH)
    .then((data) => {
      setLabels(Object.keys(data.filtered));

      let memberDataset = Object.values(data.filtered);
      const datasets = [];
      if (memberDataset.length === 0) {
        datasets.push({
          label: "Your Usage",
          data: memberDataset,
          backgroundColor: "#FF9300"
        });
      }
      
      datasets.push({
        label: "Total Club Usage",
        data: Object.values(data.filtered),
        backgroundColor: "#00AFF3"
      });

      setItems(datasets);
    });
  }, [])

  const data = {
    labels: labels,
    datasets: items,
  };

  return (
  <div>
    <ColumnChart 
      data={data} 
      chartTitle="Pool Club Usage"
      xAxisLabel="Month"
      yAxisLabel="Times Used" />
  </div>
  );
}

export default PoolUsageChart;