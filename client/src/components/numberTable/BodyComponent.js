import React from 'react';

class BodyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <tbody>
          {this.props.numbersArray.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.number_1}</td>
              <td>{item.number_2}</td>
              <td>{item.number_3}</td>
              <td>{item.number_4}</td>
              <td>{item.number_5}</td>
            </tr>
          ))}
        </tbody>
      </React.Fragment>
    );
  }
}

export default BodyComponent;
