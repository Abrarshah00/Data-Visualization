import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import dataset from '../data/wine-dataset.json';
import '../styles/chartstyles.css';

const BarChart = () => {
  const [averageMalicAcidDataSet, setAverageMalicAcidDataset] = useState([]);
  function customTooltipFormatter(params) {
    // Extract the x and y values from the data
    const xValue = params.name;
    const yValue = params.data;

    // Format the tooltip content with the x and y values
    return `<br>Alcohol Type: ${xValue}<br>Average Malic Acid: ${yValue}`;
  }

  // Configuring the chart options
  const chartOptions = {
    title: {
      text: 'Average Malic Acid by Alcohol Category',
      textStyle: {
        fontSize: 14,
      },
    },
    xAxis: {
      type: 'category',
      name: 'Alcohol Type',
      nameTextStyle: {
        fontSize: 10,
        fontWeight: 'bold',
      },
      data: averageMalicAcidDataSet.map((data) => data.alcoholType),
      axisLabel: {
        rotate: 45,
      },
    },
    tooltip: {
      formatter: customTooltipFormatter,
    },
    yAxis: {
      type: 'value',
      name: 'Average Malic Acid',
      nameTextStyle: {
        fontSize: 10,
        fontWeight: 'bold',
      },
    },
    series: [
      {
        type: 'bar',
        data: averageMalicAcidDataSet.map((data) => data.averageMalicAcid),
        color: '#023e8a',
      },
    ],
  };

  function getFormattedData() {
    // Group data by Alcohol type
    const groupedData = {};
    dataset.forEach((obj) => {
      const alcoholType = obj['Alcohol'];
      //here we check if a key with alocohol type already exists or not
      if (!groupedData[alcoholType]) {
        //if no key present we append an empty array
        groupedData[alcoholType] = [];
      }
      //if a key present we push the value to the array with the key
      groupedData[alcoholType].push(obj);
    });
    // Calculate average Malic Acid for each Alcohol type
    const averages = [];
    for (const alcoholType in groupedData) {
      const objs = groupedData[alcoholType];
      let totalMalicAcid = 0;
      objs.forEach((obj) => {
        totalMalicAcid += obj['Malic Acid'];
      });
      const avgMalicAcid = totalMalicAcid / objs.length;
      averages.push({ alcoholType, averageMalicAcid: avgMalicAcid });
    }
    // setting the dataset state here
    setAverageMalicAcidDataset(averages);
  }
  useEffect(() => {
    getFormattedData();
  }, []);
  return (
    <div id='chart'>
      <ReactECharts notMerge={true} lazyUpdate={true} option={chartOptions} />
    </div>
  );
};

export default BarChart;
