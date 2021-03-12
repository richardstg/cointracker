import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import Chartjs from "chart.js";
import { historyOptions } from "../../../utils/chartConfigs";

import classes from "./chart.module.scss";

// Define the chartInstance-variable in the global scope so that it can be destroyed
let chartInstance;

const Chart = ({ data }) => {
  const {
    day,
    week,
    twoWeeks,
    month,
    threeMonths,
    sixMonths,
    year,
    max,
    detail,
  } = data;

  const [timeFormat, setTimeFormat] = useState("24h");

  const timeSpans = useMemo(
    () => ["24h", "7d", "14d", "30d", "90d", "180d", "1y", "Max"],
    []
  );

  const chartData = useCallback(() => {
    switch (timeFormat) {
      case timeSpans[0]:
        return day;
      case timeSpans[1]:
        return week;
      case timeSpans[2]:
        return twoWeeks;
      case timeSpans[3]:
        return month;
      case timeSpans[4]:
        return threeMonths;
      case timeSpans[5]:
        return sixMonths;
      case timeSpans[6]:
        return year;
      case timeSpans[7]:
        return max;
      default:
        return day;
    }
  }, [
    day,
    week,
    twoWeeks,
    month,
    threeMonths,
    sixMonths,
    year,
    max,
    timeFormat,
    timeSpans,
  ]);

  const chartRef = useRef();

  useEffect(() => {
    if (chartRef && chartRef.current && detail) {
      // Create the chart
      chartInstance = new Chartjs(chartRef.current, {
        type: "line",
        data: {
          datasets: [
            {
              label: `${detail.name} price $USD`,
              data: chartData(),
              backgroundColor: "rgba(163, 211, 255, 0.025)",
              borderColor: "rgba(163, 211, 255, 1)",
              pointRadius: 0,
            },
          ],
        },
        options: {
          ...historyOptions(timeFormat),
        },
      });
    }
  }, [timeFormat, detail, chartData]);

  return (
    <div className={classes.chart}>
      <div className={classes.header}>
        <img alt="logo" src={detail.image.small} />
        <h5>{detail.name} Chart</h5>
      </div>
      <div>
        <canvas ref={chartRef} id="myChart" width={250} height={250}></canvas>
      </div>
      <div className={classes.buttons}>
        {timeSpans.map((timeSpan) => (
          <button
            key={timeSpan}
            disabled={timeFormat === timeSpan}
            onClick={() => {
              chartInstance.destroy();
              setTimeFormat(timeSpan);
            }}
            className={`${classes.timeSpan} ${
              timeFormat === timeSpan && classes.active
            }`}
          >
            {timeSpan}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chart;
