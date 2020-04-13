import React from "react";

import GoogleMapComponentWithMarker from "./GoogleMapWithMarker";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import CarSelect from "./CarSelect";

const styles = {
  width: "100%",
  height: "100vh"
};
let apiKey = process.env.REACT_APP_API_KEY;
let url = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`;

class RoutePlanner extends React.PureComponent {
  state = {
    station: {},
    isInfoboxVisible: false,
    markerLat: 0,
    markerLng: 0
  };

  handleMarkerClick = marker => {
    let station = this.props.stations.find(station => station.ID === marker.id);
    this.setState({
      station: station,
      isInfoboxVisible: !this.state.isInfoboxVisible,
      markerLat: marker.lat + 0.006,
      markerLng: marker.lng - 0.0004
    });
  };

  handleInfoboxClick = () => {
    this.setState({
      isInfoboxVisible: false
    });
  };

  handleToggleMarkers = () => {
this.props.toggleMarkers()
  }

  render() {
    return (
      <div style={styles}>
        <GoogleMapComponentWithMarker
          googleMapURL={url}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          isInfoboxVisible={this.state.isInfoboxVisible} // Show/hide info window
          station={this.state.station} // Message shown in info window
          handleInfoboxClick={this.handleInfoboxClick} // Handle closing of the info window
          handleMarkerClick={this.handleMarkerClick} // Handle click on Marker component
          markerLat={this.state.markerLat} // Y coordinate for positioning info window
          markerLng={this.state.markerLng} // X coordinate for positioning info window
        />
   
        <div className="markertoggle">
        <Button id="markertoggle" content={this.props.mVisible ? "Hide Stations" : "Show Stations"} inverted color='teal' onClick={() => this.handleToggleMarkers()}>
            </Button>
        </div>
    {this.props.showSelectCar && <CarSelect /> }
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    stations: state.stations,
    mVisible: state.mVisible,
    showSelectCar: state.showSelectCar
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleMarkers: () =>
      {
        return dispatch({ type: "SHOWMARKERS", payload: {} });
      },
  }}

export default connect(mapStateToProps, mapDispatchToProps)(RoutePlanner);
