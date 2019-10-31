import React from 'react';
import ListUserTableRow from './ListUserTableRow';

class ListUsersTableBody extends React.Component {
  constructor(props) {
    super(props);
    console.log("RECEVIED VALUES USER DATA", this.props.usersList);
  }

  render() {
    return (
      <React.Fragment>
          <tbody class="player-table">
        {
            this.props.usersList.map((user, i) => (
            user.first_name && user.user_type ? <ListUserTableRow key={i} userDetail={user} index={i} /> : null

            ))}
    </tbody>
      </React.Fragment>
    );
  }
}

export default ListUsersTableBody;
