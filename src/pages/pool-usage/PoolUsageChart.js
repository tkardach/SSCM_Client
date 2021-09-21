import "./PoolUsageChart.css";
import React, { useEffect, useState } from "react";
import { Filter, getMemberSigninsByFilter } from "../../services/statistics";
import ColumnChart from '../../components/charts/ColumnChart';

const PoolUsageChart = (props) => {
  const [data, setData] = useState({labels: [], items: []});

  // Get pool usage data from API
  useEffect(() => {
    getMemberSigninsByFilter(Filter.MONTH, props.memberId)
    .then((data) => {
      // Get member data
      let memberDataset = Object.values(data.memberFiltered);
      const datasets = [];

      // If member data exists, add another set of data
      if (data.memberTotal !== 0) {
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
      
      setData({
        labels: Object.keys(data.filtered),
        datasets: datasets,
      });
    });
  }, [props.memberId])


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