// Create number formatter
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const historyOptions = (timeFormat) => {
  return {
    lineHeightAnnotation: {
      always: true,
      hover: false,
      lineWeight: 1.5,
    },
    animation: {
      duration: 2000,
    },
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false,
      // boxWidth: 0,
      labels: {
        fontColor: "#e0e0e0",
        fontFamily: "Open Sans",
        // fontSize: "1rem",
      },
    },
    tooltips: {
      displayColors: false,
      callbacks: {
        label: function (tooltipItem, data) {
          /* Display y-value formatted to dollar when hovering a point in the graph */
          return "Price: " + formatter.format(tooltipItem.yLabel);
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          distribution: "linear",
          time: {
            stepSize: "2",
            // Make the unit "hours" when plotting 24 hours, otherwise "day"
            unit: timeFormat === "24h" ? "hour" : "day",
          },
          ticks: {
            fontColor: "#bbbbbb",
            fontFamily: "Open Sans",
          },
          gridLines: {
            color: "transparent",
            lineWidth: 0.5,
            // drawOnChartArea: false,
            zeroLineColor: "transparent",
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: "#bbbbbb",
            // fontColor: "#3371CE",
            fontFamily: "Open Sans",
            callback: function (value, index, values) {
              // Turn axis value into $USD format
              if (parseInt(value) >= 1000) {
                return (
                  "$" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                );
              } else {
                return "$" + value;
              }
            },
          },
          gridLines: {
            color: "rgba(255, 255, 255, 0.26)",
            lineWidth: 0.5,
            drawBorder: false,
          },
        },
      ],
    },
  };
};
