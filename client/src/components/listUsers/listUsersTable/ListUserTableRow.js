import React from 'react';
import { enableUser, disableUser } from './../../../apis';

class ListUserTableRow extends React.Component {
  constructor(props) {
    super();
    console.log(props);

    (this.state = props.userDetail), (this.state['index'] = props.index);
  }

  toggleUserAccountStatus = (event) => {
    // code here to activate or deactivate user
    console.log('Clicked to activate users');
    if (this.isEnabled()) {
      // api to deactivate user
      disableUser(JSON.stringify({ user_name: this.state.user_cognito_id }))
        .then((response) => {
          if (response.data.message === 'success') {
            this.setState({
              Enabled: false
            });
          } else {
            console.log('failed to deactivate');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // api to enable user
      enableUser(JSON.stringify({ user_name: this.state.user_cognito_id }))
        .then((response) => {
          if (response.data.message === 'success') {
            this.setState({
              Enabled: true
            });
          } else {
            console.log('failed to activate');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  isEnabled = () => {
    // return true or false
    if (this.state.Enabled) {
      return true;
    } else {
      return false;
    }
  };
  getAccountStatus = () => {
    if (this.state.Enabled) {
      return 'ACTIVATED';
    } else {
      return 'DEACTIVATED';
    }
  };

  render() {
    return (
      <React.Fragment>
        <tr>
          <td>{this.state.index + 1}</td>
          <td>
            {this.state.first_name} {this.state.last_name}
          </td>
          <td>{this.state.email}</td>
          <td>{this.state.user_type}</td>
          <td>
            <button
              className={
                this.isEnabled() ? 'btn btn-success' : 'btn btn-danger'
              }
              onClick={(e) => {
                this.toggleUserAccountStatus(e);
              }}
            >
              {this.getAccountStatus()}
            </button>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default ListUserTableRow;
