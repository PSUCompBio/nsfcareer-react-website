import React from 'react';
import ListUsersTable from './listUsersTable/ListUsersTable'

class ListUsers extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <React.Fragment>
        <h1 className="topspace">Users</h1>
        <ListUsersTable/>
    </React.Fragment>
  }

}

export default ListUsers;
