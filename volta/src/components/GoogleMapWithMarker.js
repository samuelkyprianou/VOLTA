import React from "react";
import { connect } from "react-redux";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap

} from "react-google-maps";
import MapDirectionsRenderer from "./MapDirectionsRenderer";

import GoogleForm from "./GoogleForm";
const styles = require("./GoogleMapStyles.json");

const GoogleMapComponentWithMarker = withScriptjs(
  withGoogleMap(props => (
    <div>
      <GoogleForm />
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{
          lat: props.location.latitude, // latitude for the center of the map
          lng: props.location.longitude // longitude for the center of the map
        }}
        defaultOptions={{
          disableDefaultUI: true, // disable default map UI
          draggable: true, // make map draggable
          keyboardShortcuts: false, // disable keyboard shortcuts
          scaleControl: true, // allow scale controle
          scrollwheel: true, // allow scroll wheel
          styles: styles // change default map styles
        }}
      >

        {props.from && (
          <MapDirectionsRenderer
            isInfoboxVisible={props.isInfoboxVisible} // Show/hide info window
            station={props.station} // Message shown in info window
            handleInfoboxClick={props.handleInfoboxClick} // Handle closing of the info window
            handleMarkerClick={props.handleMarkerClick} // Handle click on Marker component
            markerLat={props.markerLat} // Y coordinate for positioning info window
            markerLng={props.markerLng}
          />
        )}
      </GoogleMap>
    </div>
  ))
);

const mapStateToProps = state => {
  return {
    location: state.currentLocation,
    from: state.from
  };
};

// Export Google Map component
export default connect(mapStateToProps, null)(GoogleMapComponentWithMarker);
