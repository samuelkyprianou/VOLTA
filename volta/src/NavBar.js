import React, { Component } from "react";
import { Link } from "react-router-dom";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { Icon } from "semantic-ui-react";

export default class NavBar extends Component {
  render() {
    return (
      <div id="nav">
        <SideNav>
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="">
              <NavIcon>
                <Link to="/">
                  <Icon name="home" color="blue" />
                </Link>
              </NavIcon>
              <NavText>
                <Link to="/">Home</Link>
              </NavText>
            </NavItem>
            <NavItem eventKey="RoutePlanner">
              <NavIcon>
                <Link to="/RoutePlanner">
                  <Icon name="map" color="blue" />
                </Link>
              </NavIcon>
              <NavText>
                <Link to="/RoutePlanner">Route Planner</Link>
              </NavText>
            </NavItem>
            <NavItem eventKey="News">
              <NavIcon>
                <Icon name="newspaper" color="blue" />
              </NavIcon>
              <NavText>News</NavText>
            </NavItem>
            <NavItem eventKey="Reviews">
              <NavIcon>
                <Icon name="road" color="blue" />
              </NavIcon>
              <NavText>Reviews</NavText>
            </NavItem>
            <NavItem eventKey="Statistics">
              <NavIcon>
                <Icon name="pie chart" color="blue" />
              </NavIcon>
              <NavText>Statistics</NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
      </div>
    );
  }
}
