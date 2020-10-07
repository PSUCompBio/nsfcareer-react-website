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
// import verify from '../../components/profile/verifyNumber/verify';

import Dashboard from '../../components/Dashboard/Dashboard';
import UserDashboarForAdmin from '../../components/Dashboard/UserDashboarForAdmin';
import ForgotPassword from '../../components/ForgotPassword';
import About from '../About/AboutPage';
import Contact from '../Contact/ContactPage';
import OrganizationAdmin from '../../components/OrganizationAdmin';
import AdminDashboard from '../../components/AdminDashboard';
import Users from '../../components/Users';
import AddUsers from '../../components/AddUsers';
// import TeamAdmin from '../../components/CommanderTeamView';
import TeamAdmin from '../../components/TeamAdmin';
import TeamStats from '../../components/TeamStats';
import TeamPlayers from '../../components/CommanderTeamView';
import Military from '../Military/MilitaryPage';
import GetUpdates from '../../components/GetUpdates';
//import Sports from '../Sports';
import Sports from '../Sports/SportsPage';
import Developer from '../Developer/DeveloperPage';
import Dash from '../Dash/DashPage';
import Report from '../../components/ReportContent/Report0';
import BrainSimulationDetails from '../../components/Dashboard/BrainSimulationDetails/BrainSimulationDetails';
import Details from '../../components/Dashboard/BrainSimulationDetails/Details';
import InviteUsers from '../../components/InviteUsers';
import BrainSimulationLog from '../../components/Dashboard/BrainSimulationDetails/BrainSimulationLog';
import ProfileImageUpload from '../../components/profile/ProfileImageUpload';
import ModelValidation from '../../components/ModelValidation/ModelValidation';
import ModelValidationPressureResponse from '../../components/ModelValidation/ModelValidationPressureResponse';
import ModelValidationDisplacementResponse from '../../components/ModelValidation/ModelValidationDisplacementResponse';
import ModelValidationStrainResponse from '../../components/ModelValidation/ModelValidationStrainResponse';
import LoginComponentHidden  from '../../components/Authentication/LoginComponentHidden';
import Hardy_et_al from '../../components/ModelValidation/Hardy_et_al';
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
          render={(props) =>
            <Login
              {...this.props}
              screenWidth={this.state.windowWidth}
              isDarkModeSet={this.checkDarkMode}
              isAuthenticated={(value) => this.settingAuthentication(value)}
              setUserDetails={(value) => this.setUserDetails(value)}

            />
          }
        />
        <Route
          exact
          path="/Login-hidden"
          render={(props) =>
            <LoginComponentHidden
              {...this.props}
              screenWidth={this.state.windowWidth}
              isDarkModeSet={this.checkDarkMode}
              isAuthenticated={(value) => this.settingAuthentication(value)}
              setUserDetails={(value) => this.setUserDetails(value)}

            />
          }
        />
        <Route
          exact
          path="/Profile"
          render={(props) => <Profile {...props} isDarkModeSet={this.checkDarkMode} />}
        />
        
        <Route
            exact
            path="/SignUp/:token"
            render={(props) => <SignUp {...props} isDarkModeSet={this.checkDarkMode} />}
        />
        <Route
            exact
            path="/SignUp/"
            render={(props) => <SignUp {...props} isDarkModeSet={this.checkDarkMode} />}
        />
        <Route
            exact
            path="/User/SignUp/"
            render={(props) => <SignUp {...props} isDarkModeSet={this.checkDarkMode} />}
        />
        <Route
            exact
            path="/SignUpElse"
            render={(props) => <SignUp {...props} isDarkModeSet={this.checkDarkMode} />}
        />
        <Route
          exact
          path="/dashboard"
          render={(props) => <Dashboard {...props} isDarkModeSet={this.checkDarkMode} />}
        />
        <Route
          exact
          path="/Users"
          render={(props) => <Users {...props} isDarkModeSet={this.checkDarkMode} />}
        />
         <Route
          exact
          path="/number-verification"
          render={(props) => <AddUsers {...props} isDarkModeSet={this.checkDarkMode} />}
        />
        <Route
          exact
          path="/TeamStats"
          render={(props) => <TeamStats {...props} isDarkModeSet={this.checkDarkMode} />}
        />
        <Route
          exact
          path="/TeamAdmin/user/dashboard"
          render={(props) => <UserDashboarForAdmin {...props} isDarkModeSet={this.checkDarkMode} />}
        />
        <Route
          exact
          path="/TeamAdmin/user/dashboard/brainSimulationDetails"
          render={(props) => <BrainSimulationDetails {...props} isDarkModeSet={this.checkDarkMode} />}
        />

        
        <Route
          exact
          path="/TeamAdmin/user/dashboard/brainSimulationDetails/BrainSimulationLog"
          render={(props) => <BrainSimulationLog {...props} isDarkModeSet={this.checkDarkMode} />}
        />
        <Route
          exact
          path="/admin/view/user"
          render={(props) => <Profile {...props} isDarkModeSet={this.checkDarkMode} />}
        />
        <Route
            exact
            path="/Forgot-Password"
            render={(props) => <ForgotPassword {...props} isDarkModeSet={this.checkDarkMode} />}
        />
        <Route
            exact
            path="/Details"
            render={(props) =>
                <About
                {...props}
                screenWidth={this.state.windowWidth}
                isDarkModeSet={this.checkDarkMode}
                />
        }
        />
		<Route
            exact
            path="/Developer"
            render={(props) => <Developer {...props} isDarkModeSet={this.checkDarkMode} />}
        />
		<Route
            exact
            path="/Dash"
            render={(props) => <Dash {...props} isDarkModeSet={this.checkDarkMode} />}
        />
        <Route
            exact
            path="/Contact"
            render={(props) => <Contact {...props} isDarkModeSet={this.checkDarkMode} /> }
        />
        <Route
            exact
            path="/TeamAdmin"
            render={(props) => <TeamAdmin {...props} screenWidth={this.state.windowWidth} isDarkModeSet={this.checkDarkMode} /> }
        />
        <Route
            exact
            path="/TeamAdmin/team/players"
            render={(props) => <TeamPlayers {...props} screenWidth={this.state.windowWidth} isDarkModeSet={this.checkDarkMode} /> }
        />
        <Route
            exact
            path="/OrganizationAdmin"
            render={(props) => <OrganizationAdmin {...props} isDarkModeSet={this.checkDarkMode} /> }
        />
        <Route
            exact
            path="/InviteUsers"
            render={(props) => <InviteUsers {...props} isDarkModeSet={this.checkDarkMode} /> }
        />
        <Route
            exact
            path="/AdminDashboard"
            render={(props) => <AdminDashboard {...props} isDarkModeSet={this.checkDarkMode} /> }
        />
        <Route
            exact
            path="/Military"
            render={(props) => <Military {...props} isDarkModeSet={this.checkDarkMode} /> }
        />
        <Route
            exact
            path="/Sports"
            render={(props) => <Sports {...props} isDarkModeSet={this.checkDarkMode} /> }
        />
        <Route
            exact
            path="/pdf"
            render={(props) => < Report /> }
        />
        <Route
            exact
            path="/IRB"
            render={(props) => <IRBLinkContent {...props} isDarkModeSet={this.checkDarkMode} /> }
        />
        <Route
            exact
            path="/IRBParentConsent"
            render={(props) => <IRBParentConsent {...props} isDarkModeSet={this.checkDarkMode} /> }
        />
         <Route
            exact
            path="/profile-image-upload"
            render={(props) => <ProfileImageUpload {...props} isDarkModeSet={this.checkDarkMode} /> }
        />
        <Route
            exact
            path="/validation"
            render={(props) => <ModelValidation {...props} isDarkModeSet={this.checkDarkMode} /> }
        />
        <Route
            exact
            path="/model-pressure-response"
            render={(props) => <ModelValidationPressureResponse {...props} isDarkModeSet={this.checkDarkMode} /> }
        />
        <Route
            exact
            path="/model-displacement-response"
            render={(props) => <ModelValidationDisplacementResponse {...props} isDarkModeSet={this.checkDarkMode} /> }
        />
        <Route
            exact
            path="/model-strain-response"
            render={(props) => <ModelValidationStrainResponse {...props} isDarkModeSet={this.checkDarkMode} /> }
        />
        <Route
            exact
            path="/Hardy-et-al"
            render={(props) => <Hardy_et_al {...props} isDarkModeSet={this.checkDarkMode} /> }
        />
        <Route
            exact
            path="/Hardy-et-al/:cases"
            render={(props) => <Hardy_et_al {...props} isDarkModeSet={this.checkDarkMode} /> }
        />
        <Route
            exact
            path="/Details/:image_id/:player_id"
            render={(props) => <Details {...props} isDarkModeSet={this.checkDarkMode} /> }
        />
      </React.Fragment>
    );
  }
}

export default withRouter(Routing);
