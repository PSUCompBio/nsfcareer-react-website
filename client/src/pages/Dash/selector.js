import React from "react";
import { Dropdown } from "semantic-ui-react";
class StrainMetric extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friendOptions: [
        {
          key: "Maximum Principal Strain",
          text: "Maximum Principal Strain",
          value: "max-ps"
        },
        {
          key: "Minimum Principal Strain",
          text: "Minimum Principal Strain",
          value: "min-ps"
        },
        {
          key: "CSDM-15",
          text: "CSDM-15",
          value: "csdm"
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <Dropdown
          placeholder="Maximum Principal Strain"
          fluid
          selection
          options={this.state.friendOptions}
          onChange={(e, v) => {
            this.props.strain(e, v);
          }}
        />
      </div>
    );
  }
}

export default StrainMetric;
