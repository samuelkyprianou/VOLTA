import React, { Component } from "react";
import carlist from "../cardb";
import { Button } from "semantic-ui-react";

import { XYPlot, VerticalBarSeries, XAxis, YAxis, ChartLabel } from "react-vis";

export default class Chart extends Component {
  state = { option: "Range" };

  optionClick = e => {
    this.setState({ option: e.target.innerText });
  };

  render() {
    let data = carlist.map(car => {
      if (this.state.option === "Range") {
        return { x: `${car.make} ${car.model}`, y: car.rangemiles, title: "Range in Miles"};
      } else if (this.state.option === "Acceleration") {
        return { x: `${car.make} ${car.model}`, y: car.acceleration, title: "Acceleration 0 > 60mph (seconds)" };
      } else if (this.state.option === "Top Speed") {
        return { x: `${car.make} ${car.model}`, y: car.topspeedmph, title: "Top Speed (mph)"};
      } else if (this.state.option === "Value") {
        return { x: `${car.make} ${car.model}`, y: car.price, title: "Current Market Value (£)"};
      }
    });

    console.log(data);
    return (
      <div>
        <div className="options">
          <Button
            id="boptions"
            content="Range"
            inverted
            color="teal"
            onClick={e => this.optionClick(e)}
          ></Button>
          <Button
            id="boptions"
            content="Acceleration"
            inverted
            color="teal"
            onClick={e => this.optionClick(e)}
          ></Button>
          <Button
            id="boptions"
            content="Top Speed"
            inverted
            color="teal"
            onClick={e => this.optionClick(e)}
          ></Button>
          <Button
            id="boptions"
            content="Value"
            inverted
            color="teal"
            onClick={e => this.optionClick(e)}
          ></Button>
        </div>
        <h1 className="charttitle">
          Top 10 Cars Shown By Their {this.state.option}
        </h1>
        <XYPlot animation height={500} width={1100} xType="ordinal">
          <VerticalBarSeries
            data={data}
            animation={{ damping: 40, stiffness: 154 }}
          />
          <YAxis animation style={{fill: "aqua", fontSize: "13px"}} />
          <XAxis animation style={{fill: "aqua", fontSize: "13px"}} />

          <ChartLabel
          animation
            text="Car Make/Model"
            className="alt-x-label"
            includeMargin={false}
            xPercent={0.01}
            yPercent={1.2}
          />
          <ChartLabel
          animation
            text={data[0].title}
            className="alt-y-label"
            includeMargin={true}
            xPercent={-0.04}
            yPercent={-0.05}
            style={{
              transform: "rotate(-90)",
              textAnchor: "end"
            }}
          />
        </XYPlot>
      </div>
    );
  }
}
