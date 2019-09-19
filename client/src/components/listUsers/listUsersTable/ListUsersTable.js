import React from 'react';
import ListUsersTableBody from './ListUsersTableBody';
import ListUserTableHead from './ListUserTableHead';
import { listUsers } from './../../../apis';

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
      return <h3>Loading...</h3>;
    }
    return (
      <React.Fragment>
        <table className="table table-bordered">
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
