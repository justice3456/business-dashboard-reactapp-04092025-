//imports
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

//components
function Chart() {
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
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
        data: [28000, 19000, 32000, 18000, 41000, 30000, 26000],
      },
    ],
  };
  return (
    <>
    
    <div className="chart-position">
      <ReactECharts option={option} />
    </div>
    </>
  );
}

export default Chart;
