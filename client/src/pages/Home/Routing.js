import React from 'react';
import ScrollIndicator from './ScrollIndicator';
import { Route,  withRouter } from 'react-router-dom';
// import Async from 'react-promise';

import { svgToInline } from '../../config/InlineSvgFromImg';

import Nav from './Nav';
import HomePage from './HomePage';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Profile from '../../components/profile/Profile';
import Dashboard from '../../components/Dashboard/Dashboard';
import ForgotPassword from '../../components/ForgotPassword';
import About from '../About/AboutPage'; 
import Contact from '../Contact/ContactPage';
// import { isAuthenticated } from '../../apis';
import TeamRoster from '../../components/TeamRoaster';
import CommanderTeamView from '../../components/CommanderTeamView'; 
import CommanderDataTable from '../../components/CommanderDataTable';
import Military from '../../components/Military/Military';


class Routing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      windowWidth: 0,
      gotoPageNo: 0,
      isLoggedIn: false,
      isDarkMode: false,
    };
  }
  checkDarkMode = (value) => {
    this.setState({ isDarkMode: value });
  };

  onPageChange = (pageNo) => {
    this.setState({
      currentPage: pageNo
    });
  };

  gotoPage = (pageNumber) => {
    this.setState({ gotoPageNo: pageNumber });
  };

  updateDimensions = () => {
    this.setState({ windowWidth: window.innerWidth });
  };
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillMount() {
    this.setState({ windowWidth: window.innerWidth });
  }

  componentDidUpdate() {
    svgToInline();
  }

  settingAuthentication = (value) => {
    this.setState({ isLoggedIn: value });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.location.pathname === '/Home' ||
        this.props.location.pathname === '/' ? (
          <ScrollIndicator
            screenWidth={this.state.windowWidth}
            gotoPage={this.gotoPage}
            currentPage={this.state.currentPage}
          />
        ) : (
          ''
        )}
        <Nav
          screenWidth={this.state.windowWidth}
          isAuthenticated={this.state.isLoggedIn}
          currentPage={this.state.currentPage}
        />
        <Route
          exact
          path="/"
          render={(props) => (
            <HomePage
              {...props}
              darkModeSet={this.state.isDarkMode}
              screenWidth={this.state.windowWidth}
              gotoPage={this.state.gotoPageNo}
              currentPage={this.state.currentPage}
              onPageChange={this.onPageChange}
            />
          )}
        />
        <Route
          exact
          path="/Home"
          render={(props) => (
            <HomePage
              {...props}
              darkModeSet={this.state.isDarkMode}
              screenWidth={this.state.windowWidth}
              gotoPage={this.state.gotoPageNo}
              currentPage={this.state.currentPage}
              onPageChange={this.onPageChange}
            />
          )}
        />
        <Route
          exact
          path="/Login"
          render={(props) => (
            <Login
              {...props}
              screenWidth={this.state.windowWidth}
              isAuthenticated={(value) => this.settingAuthentication(value)}
            />
          )}
        />
        <Route
          exact
          path="/Profile"
          render={() => <Profile isDarkModeSet={this.checkDarkMode} />}
        />
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/dashboard" render={()=><Dashboard isDarkModeSet={this.checkDarkMode}/>} />
        <Route exact path="/Forgot-Password" component={ForgotPassword} />
        <Route exact path="/About" component={About} />
        <Route exact path="/Contact" component={Contact} />
        <Route exact path="/TeamRoster" component={TeamRoster} />
        <Route exact path="/CommanderTeamView" component={CommanderTeamView} />
        <Route exact path="/CommanderDataTable" component={CommanderDataTable} />
        <Route exact path="/Military" component={Military}/>
      </React.Fragment>
    );
  }
}

export default withRouter(Routing);
