import React from "react";

import { Chart } from "react-charts";

export default function Grafico(props) {
  const axes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" }
    ],
    []
  );
  console.log("grafico props.showData: ", props.showData);
  const data = React.useMemo(() => [props.showData], []);
  return (
    // A react-chart hyper-responsively and continuously fills the available
    // space of its parent element automatically
    <div
      style={{
        width: "700px",
        height: "400px"
      }}
    >
      <h3>{props.showData.label}</h3>
      <Chart data={data} axes={axes} />
    </div>
  );
}
