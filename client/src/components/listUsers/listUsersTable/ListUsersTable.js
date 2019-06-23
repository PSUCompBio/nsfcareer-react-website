import React from 'react';
import ListUsersTableBody from './ListUsersTableBody'
import ListUserTableHead from './ListUserTableHead'

class ListUsersTable extends React.Component {
  constructor() {
    super();
    
  }

  render() {
    return <React.Fragment>
<table className="table table-bordered">
    <ListUserTableHead/>
    <ListUsersTableBody/>

</table>
    </React.Fragment>
  }

}

export default ListUsersTable;
