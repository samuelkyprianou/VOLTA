import React, { Component } from "react";
import carlist from "../cardb";

import { XYPlot, VerticalBarSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from "react-vis";

export default class Chart extends Component {
  state = { option: "rangemiles" };

  render() {
    let data = carlist.map(car => {
      return { x: `${car.make} ${car.model}`, y: car.rangemiles };
    });

    console.log(data);
    return (
      <div>
          <div className="options"></div>
        <XYPlot height={600} width={1000}  xType="ordinal">
          
          <XAxis />
          <YAxis />
          <VerticalBarSeries data={data} animation/>
        </XYPlot>
      </div>
    );
  }
}
