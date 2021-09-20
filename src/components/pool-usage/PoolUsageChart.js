import "./PoolUsageChart.css";
import React, { useEffect, useState } from "react";
import { Filter, getMemberSigninsByFilter } from "../../services/statistics";
import ColumnChart from "../charts/ColumnChart";

const PoolUsageChart = (props) => {
  const [items, setItems] = useState([]);
  const [labels, setLabels] = useState([])

  // Get pool usage data from API
  useEffect(() => {
    getMemberSigninsByFilter(Filter.MONTH)
    .then((data) => {
      // Get labels from total pool usage
      setLabels(Object.keys(data.filtered));

      // Get member data
      let memberDataset = Object.values(data.filtered);
      const datasets = [];

      // If member data exists, add another set of data
      if (memberDataset.length === 0) {
        datasets.push({
          label: "Your Usage",
          data: memberDataset,
          backgroundColor: "#FF9300"
        });
      }
      
      // Add total usage data set
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
    <div style={props.chartStyle}>
      <ColumnChart 
        data={data} 
        chartTitle="Pool Club Usage"
        xAxisLabel="Month"
        yAxisLabel="Times Used" />
    </div>
  );
}

export default PoolUsageChart;