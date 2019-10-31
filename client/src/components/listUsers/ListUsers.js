import React from 'react';
import ListUsersTable from './listUsersTable/ListUsersTable'

class ListUsers extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <React.Fragment>
        <div ref="table" className="commander-data-table table-responsive ">
        <ListUsersTable/>
        </div>
    </React.Fragment>
  }

}

export default ListUsers;
