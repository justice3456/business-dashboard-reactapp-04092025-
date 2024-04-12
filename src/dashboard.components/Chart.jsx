import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import axios from "axios";
import React, { useState, useEffect } from "react";

//components
function Chart() {
  const [x_Axis, setX_Axis] = useState([]);
  const [y_Axis, setY_Axis] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:80/dashboard_api/chart_data.php/")
      .then(function (response) {
        setY_Axis(response.data.map(entry => entry.total_sales));
        setX_Axis(response.data.map(entry => entry.sale_date));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  const option = {
    grid: {
      left: "25%",
      right: "5%",
      bottom: "3%",
      containLabel: true,
      show: false,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      backgroundColor: "rgba(69,70,74,0.5)",
      borderWidth: 0,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: x_Axis, // Use x_Axis state here
      },
    ],
    yAxis: [{ type: "value", splitLine: { show: false } }],
    series: [
      {
        type: "line",
        smooth: true,
        lineStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(69,70,74,0.5)" },
          ]),
          width: 4,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgb(247,240,232)" },
            { offset: 1, color: "rgb(236,244,247)" },
          ]),
        },
        showSymbol: false,
        data: y_Axis, // Use y_Axis state here
      },
    ],
  };

  return (
    <div className="chart-position">
      <ReactECharts option={option} />
    </div>
  );
}

export default Chart;
