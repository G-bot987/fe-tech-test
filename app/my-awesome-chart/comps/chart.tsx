"use client";

import { VictoryAxis, VictoryChart, VictoryLegend, VictoryLine } from "victory";

interface ChartDataInterface {
  x: Date;
  y: number;
}

interface filteredTicksAndVictoryLineDataInterface {
  dates: Date[];
  victoryLineData: ChartDataInterface[];
  historicVictoryLineData: ChartDataInterface[];
}

interface dataInterface {
  chartData: ChartDataInterface[];
  historicChartData: ChartDataInterface[];
}
interface propsInterface {
  data: dataInterface;
}

export default function Chart({ data }: propsInterface) {
  function getObjectsWithRequiredDates(data: dataInterface): filteredTicksAndVictoryLineDataInterface {
    const { chartData, historicChartData } = data;

    const requiredDates: number[] = [2, 4, 6, 10, 12, 16, 18, 20, 24, 26, 30];
    const XAxisTicks: Date[] = [];
    const victoryLineData: ChartDataInterface[] = [];
    const historicVictoryLineData: ChartDataInterface[] = [];

    for (const days of chartData) {
      const daysRequired = days.x.getDate();
      if (requiredDates.includes(daysRequired)) {
        XAxisTicks.push(days.x);
        victoryLineData.push(days);
      }
    }

    for (const days of historicChartData) {
      const daysRequired = days.x.getDate();
      if (requiredDates.includes(daysRequired)) {
        historicVictoryLineData.push(days);
      }
    }

    return { dates: XAxisTicks, victoryLineData, historicVictoryLineData };
  }
  const filteredTicksAndVictoryLineData = getObjectsWithRequiredDates(data);

  return (
    <div>
      <VictoryChart
        domain={{
          y: [1.1, 1.7],
        }}
        width={600}
        domainPadding={{ x: 20 }}
        scale={{ x: "time" }}
      >
        <VictoryLegend
          x={200}
          y={15}
          centerTitle
          orientation="horizontal"
          gutter={20}
          style={{ border: { stroke: "black" }, title: { fontSize: 10 } }}
          data={[
            { name: "Jan 2023: GBP to USD", symbol: { fill: "#034cff" } },
            { name: "Jan 2013: GBP to USD", symbol: { fill: "#dddddd" } },
          ]}
        />
        <VictoryAxis
          tickValues={filteredTicksAndVictoryLineData.dates}
          label="Date"
          style={{
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 11, padding: 40 },
            ticks: { stroke: "grey", size: 5 },
            tickLabels: { padding: 5 },
          }}
        />
        <VictoryAxis
          dependentAxis
          label="GBP to USD"
          style={{
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 10, padding: 40 },
            ticks: { stroke: "grey", size: 5 },
            tickLabels: { fontSize: 10, padding: 5 },
          }}
        />
        <VictoryLine data={filteredTicksAndVictoryLineData.victoryLineData} style={{ data: { stroke: "#034cff" } }} />
      </VictoryChart>
    </div>
  );
}
