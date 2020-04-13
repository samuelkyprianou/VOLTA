import React, { Component } from "react";
import AwesomeSlider from "react-awesome-slider";
import carlist from "../cardb";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";

class CarSelect extends Component {
  addCar = list => {
    return list.map(car => (
      <div
        id={car.id}
        className="carData"
        data-src={require(`../assets/carimages/${car.make}.png`)}
      >
        <div id="cartitle">{`${car.make} ${car.model}`}</div>
        <div id="carinfo">
          <div>{`Body:${car.body}`}</div>
          <div>{`Range: ${car.rangemiles} Miles`}</div>
        </div>
      </div>
    ));
  };

  handleSelect = () => {
    let element = document.getElementsByClassName(
      "awssld__box awssld--active"
    )[0].lastChild;
    let car = carlist.find(car => car.id === parseInt(element.id))
   
    this.props.setCar(car)
  };

  render() {
    return (
      <div className="carselector">
        <AwesomeSlider>{this.addCar(carlist)}</AwesomeSlider>
        <h1>Please Select Your Car..</h1>
        <Button
          circular
          content={"Select"}
          inverted
          color="teal"
          onClick={() => {
            this.handleSelect();
          }}
        ></Button>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
    return {
      setCar: car =>
        {
          return dispatch({ type: "SETCAR", payload: { car } });
        },
    }}

    export default connect(null, mapDispatchToProps)(CarSelect)