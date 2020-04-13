import React, { Component } from "react";
import { Header, Divider, Table, Icon, Button } from "semantic-ui-react";
import EquipmentDetails from "./EquipmentDetails";
import { connect } from "react-redux";

class InfoBox extends Component {
    node = React.createRef();
  
    
    
    
    componentDidMount() {
    document.addEventListener("mousedown", this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick);
  }

  EquipmentDetails = () => {
    return this.props.stationInfo.Connections.map(connector => (
      <EquipmentDetails key={connector.ID} connector={connector} />
    ));
  };

  addWayPoint = stationInfo => {
    this.props.closeInfoBox();
    let location = new window.google.maps.LatLng(
      stationInfo.AddressInfo.Latitude,
      stationInfo.AddressInfo.Longitude
    );
    let wayPoint = { location: location, stopover: true };
    this.props.setWaypoint(wayPoint, stationInfo);
  };

  handleClick = e => {
    if (this.node.current.contains(e.target)) {
      return;
    }
    this.props.closeInfoBox();
  };

  render() {
    let { stationInfo } = this.props;
    console.log(stationInfo);

    return (
      <div ref={this.node}>
        <Header
          as="h2"
          icon="plug"
          content={
            <div>
              {stationInfo.AddressInfo.Title}{" "}
              <Button
                circular
                icon="plus"
                onClick={() => this.addWayPoint(stationInfo)}
              />
            </div>
          }
          block
        ></Header>

        <Divider horizontal>
          <Header as="h4">
            <Icon name="map" />
            Location Details
          </Header>
        </Divider>

        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={2}>Title:</Table.Cell>
              <Table.Cell>{stationInfo.AddressInfo.Title}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Road:</Table.Cell>
              <Table.Cell>{stationInfo.AddressInfo.AddressLine1}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Town:</Table.Cell>
              <Table.Cell>{stationInfo.AddressInfo.Town}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Postcode:</Table.Cell>
              <Table.Cell>{stationInfo.AddressInfo.Postcode}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Divider horizontal>
          <Header as="h4">
            <Icon name="battery full" />
            Equipment Details
          </Header>
        </Divider>

        <p>
          <span className="label">Number Of Stations/Bays: </span>
          <span>{stationInfo.NumberOfPoints}</span>
        </p>
        {this.EquipmentDetails()}

        <Divider horizontal>
          <Header as="h4">
            <Icon name="building outline" />
            Network/Operator
          </Header>
        </Divider>

        <h6>{stationInfo.OperatorInfo.Title}</h6>

        <p>
          <Icon name="linkify" />
          {stationInfo.OperatorInfo.WebsiteURL}
        </p>

        <p>
          <Icon name="phone" />
          {stationInfo.OperatorInfo.PhonePrimaryContact}
        </p>

        <p>
          <Icon name="mail" />
          {stationInfo.OperatorInfo.ContactEmail}
        </p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setWaypoint: (wayPoint, stationInfo) =>
      dispatch({ type: "WAYPOINTS", payload: { wayPoint, stationInfo } })
  };
};

export default connect(null, mapDispatchToProps)(InfoBox);
