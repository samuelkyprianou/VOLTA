import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import InputRange from "react-input-range";
import * as turf from "@turf/turf";
import polyline from "@mapbox/polyline";
import API from "./API";

class GoogleForm extends Component {
  state = { from: "", to: "", value: 50 };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    let range = Math.floor(
      (this.state.value / 100) * this.props.selectedCar.rangemiles
    );
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: this.state.from,
        destination: this.state.to,
        travelMode: "DRIVING",
        unitSystem: window.google.maps.UnitSystem.IMPERIAL
      },
      result => {
        let distanceArr = result.routes[0].legs.map(leg => leg.distance.value);
        let totalDist = distanceArr.reduce((total, amount) => {
          return total + amount;
        });
        let distinKM = Math.round(totalDist / 1000);
        let rangeKM = Math.round(range / 0.621372);
        let stationDistance = range - 2;
        if (rangeKM < distinKM && stationDistance > 0) {
          let latlng = polyline.decode(result.routes[0].overview_polyline);
          let line = turf.lineString(latlng);
          let options = { units: "miles" };
          let along = turf.along(line, stationDistance, options);
          API.searchSuggested(
            along.geometry.coordinates[0],
            along.geometry.coordinates[1]
          ).then(station => {
            console.log(station[0]);
            let location = new window.google.maps.LatLng(
              station[0].AddressInfo.Latitude,
              station[0].AddressInfo.Longitude
            );
            console.log(location);
            let waypoint = { location: location, stopover: true };
            let marker = [{
              id: station[0].ID,
              lat: station[0].AddressInfo.Latitude,
              lng: station[0].AddressInfo.Longitude
            }];
            this.props.suggestedSearchTerms({
              from: this.state.from,
              to: this.state.to,
              range: range,
              suggestedStation: station,
              waypoint: waypoint,
              marker: marker
            });
          });
        } else {
          this.props.searchTerms({
            from: this.state.from,
            to: this.state.to,
            range: range
          });
        }
      }
    );
  };

  render() {
    const { from, to } = this.state;

    return (
      <div className="googleform">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder="From"
              name="from"
              value={from}
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder="To"
              name="to"
              value={to}
              onChange={this.handleChange}
            />
            <Button content="Submit" inverted color="teal"></Button>
          </Form.Group>
        </Form>
        <div className="slider">
          <h4>Current Battery State</h4>
          <InputRange
            formatLabel={value => `${value}%`}
            maxValue={100}
            minValue={0}
            value={this.state.value}
            onChange={value => this.setState({ value })}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedCar: state.selectedCar,
    range: state.range
  };
};

const mapDispatchToProps = dispatch => {
  return {
    suggestedSearchTerms: results =>
      dispatch({ type: "SUGGESTED_SEARCH_TERMS", payload: { results } }),
    searchTerms: results =>
      dispatch({ type: "SEARCH_TERMS", payload: { results } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleForm);
