import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  getUserDetails,
  isAuthenticated
} from '../../apis';
import Spinner from '../Spinner/Spinner';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      userDetails: null,
      isCheckingAuth: true,
      isLoaded: false
    };
  }

  render() {

    if (!this.state.isLoaded) return <Spinner />;
 
    if (this.state.isAuthenticated && !this.state.isCheckingAuth) {
      if (this.state.userDetails.user_type === "Admin") {
        return <Redirect to="/AdminDashboard" />;
      } else if (this.state.userDetails.is_sensor_company) {
        return <Redirect to={{
          pathname: '/OrganizationAdmin',
          state: {
            brand: {
              brand: this.state.userDetails.sensor,
              user_cognito_id: this.state.cognito_user_id
            }
          }
        }} />;
      } else {
        return <Redirect to={{
          pathname: '/TeamAdmin/user/dashboard',
          state: {
            team: {
              organization: '',
              team_name: ''
            },
            cognito_user_id: this.state.cognito_user_id,
            player_name: this.state.name
          }
        }} />;
      }
      
    } else {
      return <Redirect to="/Login" />;
    }

  }
  componentDidMount() {
      isAuthenticated(JSON.stringify({}))
        .then((value) => {
          if (value.data.message === 'success') {


            getUserDetails()
              .then((response) => {
                console.log(response.data);
                this.setState({
                  userDetails: response.data.data,
                  isLoading: false,
                  isAuthenticated: true,
                  isCheckingAuth: false,
                  isLoaded: true
                });

                // User is authenticate hence load chart data

              })
              .catch((error) => {

                console.log(error);

                this.setState({
                  userDetails: {},
                  isLoading: false,
                  isCheckingAuth: false,
                  isLoaded: true
                });
              });

          } else {
            this.setState({ isAuthenticated: false, isCheckingAuth: false, isLoaded: true });
          }
        })
        .catch((err) => {
          this.setState({ isAuthenticated: false, isCheckingAuth: false, isLoaded: true });
        })
       
    }
}

export default Dashboard;
