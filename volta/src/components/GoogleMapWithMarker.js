import React from "react";
import { connect } from "react-redux";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import MapDirectionsRenderer from "./MapDirectionsRenderer";
import InfoBox from "./InfoBox"
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
      {props.markers && props.mVisible &&
        props.markers.map(marker => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => props.handleMarkerClick(marker)}
            animation={window.google.maps.Animation.DROP}
          />
        ))}

      {props.isInfoboxVisible && (
        <InfoWindow
          position={{
            lat: props.markerLat,
            lng: props.markerLng
          }}
          // onCloseClick={() => props.handleInfoboxClick()}
        >
          <div id="infobox">
          <InfoBox stationInfo={props.station} closeInfoBox={() => props.handleInfoboxClick()} />
          </div>
        </InfoWindow>
      )}


      {props.from && <MapDirectionsRenderer />}
    </GoogleMap>
    </div>
  ))
);

const mapStateToProps = state => {
  return {
    location: state.currentLocation,
    from: state.from,
    markers: state.markers,
    mVisible: state.mVisible
  };
};

// Export Google Map component
export default connect(mapStateToProps, null)(GoogleMapComponentWithMarker);
