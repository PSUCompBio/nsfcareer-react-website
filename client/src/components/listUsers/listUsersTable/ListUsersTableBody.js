import React from 'react';
import ListUserTableRow from './ListUserTableRow';

class ListUsersTableBody extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.usersList.map((user, i) => (
          <ListUserTableRow key={i} userDetail={user} index={i} />
        ))}
      </React.Fragment>
    );
  }
}

export default ListUsersTableBody;
