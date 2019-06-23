import React from 'react';

class ListUserTableRow extends React.Component {
  constructor(props) {
    super();
    this.state={
        user : props.userDetail
    }
  }
  
  render() {
    
    return <React.Fragment>
      <tr>
        <td>0</td>
        <td>Violent</td>
        <td>Admin</td>
        <td><button className="btn btn-success">Activated</button></td>
      </tr>
    </React.Fragment>;
  }
}

export default ListUserTableRow;
