import React from 'react';

class HeaderComponent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <thead>
          <tr>
            <th>Id</th>
            <th>Number 1</th>
            <th>Number 2</th>
            <th>Number 3</th>
            <th>Number 4</th>
            <th>Number 5</th>
          </tr>
        </thead>
      </React.Fragment>
    );
  }
}

export default HeaderComponent;
