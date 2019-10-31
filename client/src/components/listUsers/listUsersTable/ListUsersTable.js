import React from 'react';
import ListUsersTableBody from './ListUsersTableBody';
import ListUserTableHead from './ListUserTableHead';
import { listUsers } from './../../../apis';

import Spinner from './../../Spinner/Spinner';

class ListUsersTable extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      data: []
    };
  }

  render() {

        if (this.state.isLoading) {
            return <Spinner />;
        }
      return (<React.Fragment>
        <table className="table">
          <ListUserTableHead />
          <ListUsersTableBody usersList={this.state.data} />
        </table>
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    listUsers()
      .then((response) => {
        console.log(response.data.data);

        this.setState((prevState) => ({
          data: prevState.data.concat(response.data.data),
          isLoading: false
        }));
      })
      .catch((error) => {
        this.setState({ data: [], isLoading: false });
      });
  }
}

export default ListUsersTable;
