import React from 'react';
import ReactECharts from 'echarts-for-react';
import dataset from '../data/wine-dataset.json';
import '../styles/chartstyles.css';

const ScatterChart = () => {
  // Define the custom tooltip formatter function
  function customTooltipFormatter(params) {
    // Extract the x and y values from the data
    const xValue = params.value[0];
    const yValue = params.value[1];

    // Format the tooltip content with the x and y values
    return `<br>Color Intensity: ${xValue}<br>Hue: ${yValue}`;
  }

  // Initialize the chart and assign the options

  const options = {
    title: {
      text: 'Color Intensity vs Hue Scatter Plot',
      textStyle: {
        fontSize: 14,
      },
    },

    xAxis: {
      name: 'Color Intensity',
      nameTextStyle: {
        fontSize: 10,
        fontWeight: 'bold',
      },
    },
    yAxis: {
      name: 'Hue',
      nameTextStyle: {
        fontSize: 10,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      formatter: customTooltipFormatter,
    },
    series: [
      {
        type: 'scatter',
        data: dataset?.map((data) => [data[`Color intensity`], data?.Hue]),
        label: {
          emphasis: {
            show: true,
            position: 'top',
          },
        },
        itemStyle: {
          color: '#007bff',
        },
      },
    ],
  };

  return (
    <div id='chart'>
      <ReactECharts option={options} />
    </div>
  );
};

export default ScatterChart;
