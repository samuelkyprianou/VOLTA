import React, { Component } from "react";
import { Divider } from 'semantic-ui-react'

export default class EquipmentDetails extends Component {
  render() {
    let { connector } = this.props;
    return (
      <div>
        <Divider />
        <p><span>{connector.ConnectionType.Title}</span></p>
        <p><span>{connector.PowerKW}Kw</span></p>
        <p><span>{connector.CurrentType.Title}</span></p>
        {connector.Amps && <p><span>
          {connector.Amps}A {connector.Voltage}V
        </span></p> }
      </div>
    );
  }
}
