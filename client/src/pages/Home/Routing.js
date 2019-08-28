import React from 'react';
import ScrollIndicator from './ScrollIndicator';
import { Route, Redirect, withRouter } from 'react-router-dom';
import Async from 'react-promise';

import { svgToInline } from '../../config/InlineSvgFromImg';

import Nav from './Nav';
import HomePage from './HomePage';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Profile from '../../components/profile/Profile'
import Dashboard from '../../components/Dashboard/Dashboard';
import ForgotPassword from '../../components/ForgotPassword';
import { isAuthenticated } from '../../apis';

class Routing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      windowWidth: 0,
      gotoPageNo: 0,
      isLoggedIn:false
    };
  }

  onPageChange = (pageNo) => {
    this.setState({
      currentPage: pageNo
    })
  }

  gotoPage = (pageNumber) => {
    this.setState({ gotoPageNo: pageNumber });
  }


  updateDimensions = () => {
    this.setState({ windowWidth: window.innerWidth });
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillMount() {
    this.setState({ windowWidth: window.innerWidth })
  }

  componentDidUpdate() {
    svgToInline();
  }

  settingAuthentication = (value) => {
    this.setState({ isLoggedIn: value })
  }

  render() {
    return (
      <React.Fragment>
        {(this.props.location.pathname === '/Home' || this.props.location.pathname === '/') ?
          <ScrollIndicator screenWidth={this.state.windowWidth} gotoPage={this.gotoPage} currentPage={this.state.currentPage} />
          :
          ''
        }
        <Nav screenWidth={this.state.windowWidth} isAuthenticated={this.state.isLoggedIn} currentPage={this.state.currentPage} />
        <Route exact path='/' render={(props) => <HomePage {...props} screenWidth={this.state.windowWidth} gotoPage={this.state.gotoPageNo} currentPage={this.state.currentPage} onPageChange={this.onPageChange} />} />
        <Route exact path='/Home' render={(props) => <HomePage {...props} screenWidth={this.state.windowWidth} gotoPage={this.state.gotoPageNo} currentPage={this.state.currentPage} onPageChange={this.onPageChange} />} />
        <Route exact path='/Login' render={(props) => <Login {...props} isAuthenticated={(value) => this.settingAuthentication(value)}/>}/>
        <Route exact path='/Profile' component={Profile} />
        <Route exact path='/SignUp' component={SignUp} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/Forgot-Password' component={ForgotPassword} />
      </React.Fragment>
    )
  }
}

export default withRouter(Routing);
