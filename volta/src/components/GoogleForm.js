import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import InputRange from 'react-input-range';



class GoogleForm extends Component {
  state = { from: "", to: "", value: 50 };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    this.props.searchTerms(this.state);

  }

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
            <Button content="Submit" inverted color='teal'>
            </Button>
          </Form.Group>
        </Form>
        <div className="slider">
          <h4>Current Battery State</h4>
        <InputRange
        formatLabel={value => `${value}%`}
        maxValue={100}
        minValue={0}
        value={this.state.value}
        onChange={value => this.setState({ value })} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchTerms: results =>
      dispatch({ type: "SEARCH_TERMS", payload: { results } }),
  };
};

export default connect(null, mapDispatchToProps)(GoogleForm);
