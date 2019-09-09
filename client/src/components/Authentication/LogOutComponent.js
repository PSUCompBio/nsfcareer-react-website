import React from 'react';
import { logOut } from '../../apis';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Index from '../../index';

class LogOutComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedOut: false
    };
  }

  render() {
    if (this.state.isLoggedOut) {
      return <p className="topspace">Logged out successfully!</p>;
    } else {
      return <p className="topspace">Please wait...logging you out!</p>;
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    logOut({})
      .then((response) => {
        ReactDOM.render(
          <Router>
            <Index isAuthenticated={false} isAdmin={false} />
          </Router>,
          document.getElementById('root')
        );
      })
      .catch((error) => {
        this.setState({ isLoggedOut: true });
      });
  }
}

export default LogOutComponent;
