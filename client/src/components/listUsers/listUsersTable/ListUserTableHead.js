import React from 'react';

class ListUserTableHead extends React.Component {
  constructor() {
    super();
    
  }

  render() {
    return <React.Fragment>
<thead>

<tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Type</th>
      <th scope="col">Status</th>
    </tr>
</thead>

    </React.Fragment>;
  }

}

export default ListUserTableHead;
