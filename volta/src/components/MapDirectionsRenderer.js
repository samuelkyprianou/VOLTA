import React, { Component } from "react";
import { DirectionsRenderer } from "react-google-maps";
import { connect } from "react-redux";
import equal from "fast-deep-equal";
import API from "./API";

class MapDirectionsRenderer extends Component {
  state = {
    directions: null,
    error: null,
    distance: null,
    duration: null,
    start_address: "",
    end_address: "",
    station_address: "Please Select a Station"
  };

  componentDidMount() {
    let { from, to, waypoints } = this.props;
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: from,
        destination: to,
        travelMode: "DRIVING",
        waypoints: waypoints
      },
      (result, status) => {
        console.log(result);
        if (status === window.google.maps.DirectionsStatus.OK) {
          console.log(result);
          let polyline = result.routes[0].overview_polyline;
          this.setMarkers(polyline);
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
    if (!equal(this.props, prevProps)) {
      // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
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
    let distinKM = Math.round((totalDist / 1000) * 10) / 10;
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

  render() {
    if (this.state.error) {
      return <h1>{this.state.error}</h1>;
    }

    return (
      <div>
        <DirectionsRenderer directions={this.state.directions} />
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
          <p>
            <span className="label">{"Station:  "} </span>{" "}
            {this.props.selectedstations.length
              ? this.props.selectedstations[0].AddressInfo.Title
              : "Please Add a Station"}{" "}
          </p>
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
    selectedstations: state.selectedStations
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
