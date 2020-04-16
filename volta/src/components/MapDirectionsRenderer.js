import React, { Component } from "react";
import { DirectionsRenderer, Marker, InfoWindow } from "react-google-maps";
import { connect } from "react-redux";
import equal from "fast-deep-equal";
import API from "./API";
import InfoBox from "./InfoBox";
import icon from "../assets/markericon.png"

class MapDirectionsRenderer extends Component {
  state = {
    directions: null,
    error: null,
    distance: null,
    duration: null,
    start_address: "",
    end_address: "",
    resultMarkers: []
  };

  componentDidMount() {
    let { from, to, waypoints } = this.props;
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: from,
        destination: to,
        travelMode: "DRIVING",
        waypoints: waypoints,
        unitSystem: window.google.maps.UnitSystem.IMPERIAL
      },
      (result, status) => {
        console.log(result);
        if (status === window.google.maps.DirectionsStatus.OK) {
          console.log(result);
          let polyline = result.routes[0].overview_polyline;
          console.log(result.routes[0].legs[0].start_location)
          // let destinationMarker = new window.google.maps.Geocoder({"placeId": result.geocoded_waypoints[result.geocoded_waypoints.length - 1].place_id})
          if (!this.props.waypoints.length) {
            this.setMarkers(polyline);
          }
          this.totalDistance(result);
          this.totalDuration(result);
          this.locations(result);
          this.setState({
            directions: result
          });
        } else {
          this.setState({ error: result });
        }
      }
    );
  }
  componentDidUpdate(prevProps) {
    if (!equal(this.props.waypoints, prevProps.waypoints)) {
      this.componentDidMount();
    }
  }

  setMarkers = polyline => {
    API.searchWaypoints(polyline).then(stations => {
      let markers = stations.map(station => ({
        id: station.ID,
        lat: station.AddressInfo.Latitude,
        lng: station.AddressInfo.Longitude
      }));
      this.props.setMarkers(markers);
      this.props.setStations(stations);
    });
  };

  totalDistance = results => {
    let distanceArr = results.routes[0].legs.map(leg => leg.distance.value);
    let totalDist = distanceArr.reduce((total, amount) => {
      return total + amount;
    });
    let distinKM = Math.round(totalDist / 1000);
    this.setState({
      distance: distinKM
    });
  };

  totalDuration = results => {
    let durationArr = results.routes[0].legs.map(leg => leg.duration.value);
    let totalDur = durationArr.reduce((total, amount) => {
      return total + amount;
    });
    let durInMin = Math.round(totalDur / 60);
    this.setState({
      duration: durInMin
    });
  };

  locations = results => {
    let routeArr = results.routes[0].legs;
    let startingAddress = routeArr[0].start_address;
    let stationAddress = routeArr[0].start_address;
    let destination = routeArr[routeArr.length - 1].end_address;
    console.log(routeArr.length);
    if (routeArr.length < 2) {
      this.setState({
        start_address: startingAddress,
        end_address: destination
      });
    } else {
      this.setState({
        start_address: startingAddress,
        station_address: stationAddress,
        end_address: destination
      });
    }
  };

  // lastStation = results => {
  //   let distanceArr = results.routes[0].legs.map(leg => leg.distance.value);
  //   let totalDist = distanceArr.reduce((total, amount) => {
  //     return total + amount;
  //   });
  //   let distinKM = Math.round(totalDist / 1000);
  //   let rangeKM = Math.round(this.props.range / 0.621372);
  //   let stationDistance = this.props.range - 2;
  //   if (rangeKM < distinKM && stationDistance > 0) {
  //   let latlng = polyline.decode(results.routes[0].overview_polyline);
  //   let line = turf.lineString(latlng);
  //   let options = { units: "miles" };
  //   let along = turf.along(line, stationDistance, options);
  //   API.searchSuggested(along.geometry.coordinates[0], along.geometry.coordinates[1]).then(station => {
  //     console.log(station[0])
  //     let location = new window.google.maps.LatLng(
  //       station[0].AddressInfo.Latitude,
  //       station[0].AddressInfo.Longitude
  //     );
  //     let waypoint = { location: location, stopover: true };
  //       this.props.setSuggestedStation(station, waypoint)
  //   })
  //   }

  // };

  render() {
    if (this.state.error) {
      return <h1>{this.state.error}</h1>;
    }
    
    console.log(this.state.directions)
    return (
      <div>
      <DirectionsRenderer directions={this.state.directions} options={{suppressMarkers: true}} 
      />

    {this.state.directions && [<Marker position={ this.state.directions.routes[0].legs[0].start_location }/>,
    <Marker position={ this.state.directions.routes[0].legs[this.state.directions.routes[0].legs.length - 1].end_location }/>] }   
        {this.props.markers &&
          this.props.mVisible && 
          this.props.markers.map(marker => (
            <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => this.props.handleMarkerClick(marker)}
            animation={window.google.maps.Animation.DROP}
            icon={{url: icon, scaledSize: new window.google.maps.Size(25,45)}}
            />
            ))}

        {this.props.isInfoboxVisible && (
          <InfoWindow
            position={{
              lat: this.props.markerLat,
              lng: this.props.markerLng
            }}
          >
            <div id="infobox">
              <InfoBox
                stationInfo={this.props.station}
                closeInfoBox={() => this.props.handleInfoboxClick()}
              />
            </div>
          </InfoWindow>
        )}

        <div className={"results"}>
          <h2>Details</h2>
          <p>
            <span className="label">{"Total Distance:  "} </span>{" "}
            {this.state.distance} KM
          </p>
          <p>
            <span className="label">{"Total Duration:  "} </span>{" "}
            {this.state.duration} Minutes
          </p>
          <p>
            <span className="label">{"Starting Location:  "} </span>{" "}
            {this.state.start_address}{" "}
          </p>
          <p>
            <span className="label">{"Destination:  "} </span>{" "}
            {this.state.end_address}{" "}
          </p>
          {!this.props.suggestedStation.length ? <p>
           <span className="label">{"Station:  "} </span>{" "}
            {this.props.selectedstations.length
              ? this.props.selectedstations[0].AddressInfo.Title
              : "Please Add a Station"}{" "}
          </p> : <p><span className="label">{"Suggested Station:  "} </span>{" "}
            {this.props.suggestedStation[0].AddressInfo.Title}</p>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    from: state.from,
    to: state.to,
    waypoints: state.waypoints,
    selectedstations: state.selectedStations,
    markers: state.markers,
    mVisible: state.mVisible,
    suggestedStation: state.suggestedStation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setStations: stations =>
      dispatch({ type: "STATIONS", payload: { stations } }),
    setMarkers: markers => dispatch({ type: "MARKERS", payload: { markers } })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapDirectionsRenderer);
