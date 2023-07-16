"use client";

import { scaleTime } from "d3-scale";
import { discontinuityRange, scaleDiscontinuous } from "d3fc";
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLegend, VictoryLine } from "victory";

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

  const CustomTickLabel = (props: any) => {
    const { x, y, datum } = props;
    const dateLabelY = y + 25;
    const dayLabelY = y + 10;

    const options = {
      day: "numeric" as const,
      month: "numeric" as const,
      year: "numeric" as const,
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(new Date(datum));

    const [month, day, year] = formattedDate.split("/");

    const formattedDateString = `${Number(day)}/${Number(month)}/${Number(year)}`;

    return (
      <g>
        <VictoryLabel
          x={x}
          y={dayLabelY}
          text={new Date(datum).toLocaleDateString("en-US", { weekday: "short" })}
          textAnchor="middle"
        />
        <VictoryLabel x={x} y={dateLabelY} text={formattedDateString} textAnchor="middle" style={{ fontSize: 8 }} />
      </g>
    );
  };

  const discontinuousScale = scaleDiscontinuous(scaleTime())
    .discontinuityProvider(
      discontinuityRange(
        [new Date("2023-01-03"), new Date("2023-01-04")],
        [new Date("2023-01-05"), new Date("2023-01-06")],
        [new Date("2023-01-07"), new Date("2023-01-10")],
        [new Date("2023-01-11"), new Date("2023-01-12")],
        [new Date("2023-01-14"), new Date("2023-01-15")],
        [new Date("2023-01-17"), new Date("2023-01-18")],
        [new Date("2023-01-13"), new Date("2023-01-15")],
        [new Date("2023-01-19"), new Date("2023-01-20")],
        [new Date("2023-01-21"), new Date("2023-01-24")],
        [new Date("2023-01-25"), new Date("2023-01-26")],
        [new Date("2023-01-27"), new Date("2023-01-30")]
      )
    )
    .domain([new Date("2023-01-02"), new Date("2023-01-30")]);

  return (
    <div>
      <VictoryChart
        domain={{
          y: [1.1, 1.7],
        }}
        width={650}
        domainPadding={{ x: 20 }}
        scale={{ x: discontinuousScale }}
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
          tickLabelComponent={<CustomTickLabel />}
          label="Date"
          style={{
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 11, padding: 40 },
            ticks: { stroke: "grey", size: 4 },
            tickLabels: { padding: 5 },
          }}
        />
        <VictoryAxis
          dependentAxis
          label="GBP to USD"
          style={{
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 10, padding: 40 },
            grid: { stroke: (tick: number) => (tick > 0.5 ? "red" : "grey") },
            ticks: { stroke: "grey", size: 5 },
            tickLabels: { fontSize: 10, padding: 5 },
          }}
        />
        <VictoryLine data={filteredTicksAndVictoryLineData.victoryLineData} style={{ data: { stroke: "#034cff" } }} />
        <VictoryLine
          data={filteredTicksAndVictoryLineData.historicVictoryLineData}
          style={{ data: { stroke: "#dddddd", strokeDasharray: "5,5" } }}
        />
      </VictoryChart>
    </div>
  );
}
