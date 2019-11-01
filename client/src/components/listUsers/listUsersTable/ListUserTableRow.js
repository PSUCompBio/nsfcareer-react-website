import React from 'react';
import { enableUser, disableUser } from './../../../apis';

class ListUserTableRow extends React.Component {
  constructor(props) {
    super(props);

    console.log(props.userDetail);
    // this.state = {
    //     userDetail : props.userDetail,
    //     index : props.index
    // }
    this.state = props.userDetail
    this.state['index'] = props.index
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
        <tr className="player-data-table-row"
            onClick={()=>{
                var win = window.open(`/admin/view/user?id=${this.state.user_cognito_id}`, '_blank');
                  win.focus();

                }}
                 >
          <td>{this.state.index + 1}</td>
          <td>
            {this.state.first_name} {this.state.last_name}
          </td>
          <td>{this.state.email}</td>
          <td>{this.state.user_type === 'StandardUser' ? "Standard" : "Admin"}</td>
        </tr>
      </React.Fragment>
    );
  }
}

export default ListUserTableRow;
