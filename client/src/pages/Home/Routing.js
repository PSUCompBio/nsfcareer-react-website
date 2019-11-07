import React from 'react';

import ScrollIndicator from './ScrollIndicator';
import { Route, withRouter } from 'react-router-dom';
import { svgToInline } from '../../config/InlineSvgFromImg';
import IRBLinkContent from '../../components/IRBLinkContent';
import IRBParentConsent from '../../components/IRBParentConsent';
import Nav from './Nav';
import HomePage from './HomePage';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Profile from '../../components/profile/Profile';
import Dashboard from '../../components/Dashboard/Dashboard';
import UserDashboarForAdmin from '../../components/Dashboard/UserDashboarForAdmin';
import ForgotPassword from '../../components/ForgotPassword';
import About from '../About/AboutPage';
import Contact from '../Contact/ContactPage';
import OrganizationAdmin from '../../components/OrganizationAdmin';
import Users from '../../components/Users';
import TeamAdmin from '../../components/CommanderTeamView';
import Military from '../Military/MilitaryPage';
import GetUpdates from '../../components/GetUpdates';
//import Sports from '../Sports';
import Sports from '../Sports/SportsPage';
import Developer from '../Developer/DeveloperPage';
import Dash from '../Dash/DashPage';

class Routing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      windowWidth: 0,
      gotoPageNo: 0,
      isLoggedIn: false,
      isDarkMode: false,
      isDisplay: { display: 'none' },
      isNavbarTransparent : true,
      udetails : null
    };
    this.setUserDetails = this.setUserDetails.bind(this)
    this.settingAuthentication = this.settingAuthentication.bind(this);
  }

  makeVisible = (data) => {
    this.setState({ isDisplay: data });
  };


  showModal = () => {
    if (this.state.isDisplay.display === 'none') {
      this.setState({ isDisplay: {display:'flex'} });
    } else {
      this.setState({ isDisplay: {display:'none'} });
    }
  };

  checkDarkMode = (value) => {
    this.setState({ isDarkMode: value });
  };

  onPageChange = (pageNo) => {
      console.log("ROUTING ,", pageNo);
    if(pageNo != 1){
        this.setState({
          currentPage: pageNo,
          isNavbarTransparent : false
        });
    }
    else{
        this.setState({
          currentPage: pageNo,
          isNavbarTransparent : true
        });
    }

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

    console.log("LOGIN INFORMATION", value, JSON.parse(localStorage.getItem("state")).userInfo);
    this.setState({
        isLoggedIn: value,
        udetails :  JSON.parse(localStorage.getItem("state")).userInfo
    });

  };

  setUserDetails = (value) => {
      console.log("USERDETAILS", value);

  };

  render() {
      console.log("RENDERING COMPONENT");
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

          isNavbarTransparent={this.state.isNavbarTransparent}
          screenWidth={this.state.windowWidth}
          isAuthenticated={this.state.isLoggedIn}
          currentPage={this.state.currentPage}
          setIsAuth={(value) => this.settingAuthentication(value)}
          userDetails={this.state.udetails}
        />
        <GetUpdates
          isVisible={this.state.isDisplay}
          makeVisible={this.makeVisible}
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
              showformModal = {this.showModal}
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
              showformModal = {this.showModal}
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
              setUserDetails={(value) => this.setUserDetails(value)}
            />
          )}
        />
        <Route
          exact
          path="/Profile"
          render={() => <Profile isDarkModeSet={this.checkDarkMode} />}
        />
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/SignUpElse" component={SignUp} />
        <Route
          exact
          path="/dashboard"
          render={() => <Dashboard isDarkModeSet={this.checkDarkMode} />}
        />
        <Route
          exact
          path="/Users"
          render={() => <Users isDarkModeSet={this.checkDarkMode} />}
        />
        <Route
          exact
          path="/TeamAdmin/user/dashboard"
          render={(props) => <UserDashboarForAdmin {...props} isDarkModeSet={this.checkDarkMode} />}
        />
        <Route
          exact
          path="/admin/view/user"
          render={(props) => <Profile {...props} isDarkModeSet={this.checkDarkMode} />}
        />


        <Route exact path="/Forgot-Password" component={ForgotPassword} />
        <Route exact path="/Details" component={About} />
		<Route exact path="/Developer" component={Developer} />
		<Route exact path="/Dash" component={Dash} />
        <Route exact path="/Contact" component={Contact} />
        <Route exact path="/TeamAdmin" component={TeamAdmin} />
        <Route exact path="/OrganizationAdmin" component={OrganizationAdmin} />
        <Route exact path="/Military" component={Military} />
        <Route exact path="/Sports" component={Sports} />
        <Route exact path="/IRB" component={IRBLinkContent} />
        <Route exact path="/IRBParentConsent" component={IRBParentConsent} />
      </React.Fragment>
    );
  }
}

export default withRouter(Routing);
