import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import store from '../../Store';
import { resetSignedInSucceeded } from '../../Actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import LineUnderLink from '../../utilities/LineUnderLink.js';

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      signOutClass: 'sign-out-hide',
      userProfile: '',
      userName: '',
      dashboardLinks: { display: 'none' },
      dashboardLinksIsOpen: false,
      countMouseEnter: 0,
      userProfileIconLinksIsOpen: false,
      logoutBox: { display: 'none' }
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillUpdate() {
    document.addEventListener(
      'mousedown',
      function(event) {
        if (event.detail > 1) {
          event.preventDefault();
        }
      },
      false
    );
  }

  handleClick() {
    const body = document.getElementsByTagName('body')[0];
    const menu = document.getElementById('cbp-spmenu-s2');
    if (!this.state.isOpen) {
      body.classList.add('cbp-spmenu-push-toleft');
      menu.classList.add('cbp-spmenu-open');
      this.setState({ isOpen: true });
    } else {
      body.classList.remove('cbp-spmenu-push-toleft');
      menu.classList.remove('cbp-spmenu-open');
      this.setState({ isOpen: false });
    }
  }

  showLogOut = () => {
    if (this.state.signOutClass === 'sign-out-hide') {
      this.setState({ signOutClass: 'sign-out' });
    } else {
      this.setState({ signOutClass: 'sign-out-hide' });
    }
    this.setState({ userProfileIconLinksIsOpen: false });
  };

  showLogOutOption = () => {
    this.setState({ signOutClass: 'sign-out' });
  };

  hideSignOut = (e) => {
    if (this.state.dashboardLinks.display === 'none') {
      this.setState({
        dashboardLinks: { display: 'block' },
        signOutClass: 'sign-out-hide',
        countMouseEnter: this.state.countMouseEnter + 1
      });
    }
  };

  hideLinks = (e) => {
    this.setState({
      dashboardLinks: { display: 'none' },
      dashboardLinksIsOpen: false
    });
  };

  StopHiding = () => {
    this.setState({ dashboardLinksIsOpen: true });
  };

  hideDashboardsLinkIfNotEnter = () => {
    setTimeout(() => {
      if (this.state.dashboardLinksIsOpen === false) {
        this.setState({
          dashboardLinks: { display: 'none' }
        });
      }
    }, 100);
  };

  signOut = () => {
    store.dispatch(resetSignedInSucceeded());
    this.setState({ signOutClass: 'sign-out-hide' });
    this.props.history.push('/Home');
  };

  hideUserIconLinks = () => {
    this.setState({ userProfileIconLinksIsOpen: true });
  };

  hideUserIconLinksIfnotEnter = () => {
    setTimeout(() => {
      if (this.state.userProfileIconLinksIsOpen === false) {
        this.setState({ signOutClass: 'sign-out-hide' });
      }
    }, 100);
  };

  mobileNav = () => {
    return (
      <ul className="navbar-nav ml-auto text-center">
        <li className="nav-item make-active active">
          <Link className="nav-link" to={'/Home'}>
            Home <span className="sr-only">(current)</span>
          </Link>
          <div
            className={
              this.props.location.pathname === '/Home' ||
              this.props.location.pathname === '/'
                ? 'active-link'
                : ''
            }
          />
        </li>
        <li className="nav-item make-active active">
          <Link className="nav-link" to={'/About'}>
            About <span className="sr-only">(current)</span>
          </Link>
          <div className={LineUnderLink.linkeMaker('/About')} />
        </li>
        <li className="nav-item make-active">
          <Link className="nav-link" to={'/Contact'}>
            Contact
          </Link>
          <div className={LineUnderLink.linkeMaker('/Contact')} />
        </li>
        {this.props.location.pathname !== '/SignUp' ? (
          <li className="nav-item make-active active">
            <Link className="nav-link" to={'/Login'}>
              Dashboard <span className="sr-only">(current)</span>
            </Link>
            <div className={LineUnderLink.linkeMaker('/Login')} />
          </li>
        ) : (
          <li className="nav-item make-active">
            <Link className="nav-link" to={'/SignUp'}>
              Sign up
            </Link>
            <div className={LineUnderLink.linkeMaker('/SignUp')} />
          </li>
        )}
      </ul>
    );
  };

  showLogOutOptions = () => {
    if (this.state.logoutBox.display === 'none') {
      this.setState({ logoutBox: { display: 'block' } });
    } else {
      this.setState({ logoutBox: { display: 'none' } });
    }
  };

  dashboardDropDownList = () => {
    if (this.props.userType === 'Admin') {
      return (
        <div
          onMouseEnter={this.StopHiding}
          onMouseLeave={this.hideLinks}
          style={this.state.dashboardLinks}
          className="dashboard-links"
        >
          <ul>
            <li>PSU</li>
            <li>
              <Link to="TeamAdmin">Team Admin</Link>
            </li>
            <li>
              <Link to="OrganizationAdmin">Organization Admin</Link>
            </li>
          </ul>
        </div>
      );
    }
  };

  laptopNav = () => {
    return (
      <ul className="navbar-nav ml-auto text-center">
        <li className="nav-item make-active active">
          <Link className="nav-link" to={'/Home'}>
            Home <span className="sr-only">(current)</span>
          </Link>
          <div
            className={
              LineUnderLink.linkeMaker('/Home') || LineUnderLink.linkeMaker('/')
            }
          />
        </li>
        <li className="nav-item make-active active">
          <Link className="nav-link" to={'/About'}>
            About <span className="sr-only">(current)</span>
          </Link>
          <div className={LineUnderLink.linkeMaker('/About')} />
        </li>
        {/* <li className="nav-item make-active active">
          <Link className="nav-link" to={'/Sports'}>
            Sports <span className="sr-only">(current)</span>
          </Link>
          <div className={LineUnderLink.linkeMaker('/Sports')} />
        </li> */}

        <li className="nav-item make-active">
          <Link className="nav-link" to={'/Contact'}>
            Contact
          </Link>
          <div className={LineUnderLink.linkeMaker('/Contact')} />
        </li>

        {this.props.location.pathname !== '/SignUp' ? (
          <li
            onMouseEnter={this.hideSignOut}
            onMouseLeave={this.hideDashboardsLinkIfNotEnter}
            className="nav-item dashboard-hover make-active active"
          >
            <Link className="nav-link" to={'/Login'}>
              Dashboard <span className="sr-only">(current)</span>
            </Link>
            <div
              className={
                LineUnderLink.linkeMaker('/Login') ||
                LineUnderLink.linkeMaker('/Dashboard') ||
                LineUnderLink.linkeMaker('/TeamAdmin') ||
                LineUnderLink.linkeMaker('/OrganizationAdmin')
              }
            />
            {this.dashboardDropDownList()}
          </li>
        ) : (
          <li className="nav-item make-active">
            <Link className="nav-link" to={'/SignUp'}>
              Sign up
            </Link>
            <div className={LineUnderLink.linkeMaker('/SignUp')} />
          </li>
        )}
        <li className=" nav-item profile-nav-icon">
          <div
            onMouseEnter={this.showLogOutOption}
            onMouseLeave={this.hideUserIconLinksIfnotEnter}
            className="name"
          >
            R K
          </div>

          <div
            onMouseEnter={this.hideUserIconLinks}
            onMouseLeave={this.showLogOut}
            ref="signOut"
            className={`${this.state.signOutClass}`}
          >
            <div className="nav-item make-active profile-user active">
              <Link className="nav-link" to={'/Profile'}>
                Profile <span className="sr-only">(current)</span>
              </Link>
              <div className={LineUnderLink.linkeMaker('/Profile')} />
            </div>
            <Link to="">
              <img
                onClick={this.signOut}
                className="img-fluid"
                src="/img/icon/powerBtn.svg"
                alt=""
              />
            </Link>

            <div>Sign out</div>
          </div>
        </li>
      </ul>
    );
  };

  render() {
    const localStore = JSON.parse(localStorage.getItem('state'));
    return (
      <nav
        className={`navbar navbar-dark  navbar-expand-lg navbar-padding ${
          (this.props.location.pathname !== '/Home' &&
            this.props.location.pathname !== '/') ||
          this.props.currentPage !== 1
            ? 'navbar-bg-change'
            : ''
        }`}
      >
        <Link className="navbar-brand" to={'/Home'}>
          <img src="img/icon/logo.png" alt="" />
        </Link>
        <button
          onClick={this.handleClick}
          className="navbar-toggler menu-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {this.props.screenWidth >= 768 ? (
          <div className="collapse navbar-collapse" id="navbarNav">
            {localStore === null
              ? this.mobileNav()
              : localStore.isSignedInSuccess === true
              ? this.laptopNav()
              : this.mobileNav()}
          </div>
        ) : (
          ''
        )}
        <nav
          className="cbp-spmenu cbp-spmenu-vertical cbp-spmenu-right"
          id="cbp-spmenu-s2"
        >
          <div className="mobile-profile-container">
            <i
              onClick={this.handleClick}
              className=" close-mobile_nave fa fa-times-circle"
              aria-hidden="true"
            ></i>
            {/* <img src={localStore.userInfo.data.profile_picture_url} alt="" /> */}
            {/* <p>
              {localStore.userInfo.data.first_name +
                ' ' +
                localStore.userInfo.data.last_name}
            </p> */}
            <div
              onClick={this.showLogOutOptions}
              className="mobile-user-profile"
            >
              RK
            </div>

            <div
              style={this.state.logoutBox}
              className="user-profile-dropdown__mobile"
            >
              <ul>
                <li onClick={this.handleClick}>
                  <Link to="profile">Profile</Link>
                </li>
                <img
                  onClick={() => {
                    this.signOut();
                    this.handleClick();
                  }}
                  className=" mt-3 img-fluid w-25"
                  src="/img/icon/powerBtn.svg"
                  alt=""
                />
              </ul>
            </div>
          </div>

          <Link onClick={this.handleClick} className="nav-link" to={'/Home'}>
            Home <span className="sr-only">(current)</span>
          </Link>
          <div className={LineUnderLink.linkeMaker('/Home')} />
          <Link onClick={this.handleClick} className="nav-link" to={'/About'}>
            About <span className="sr-only">(current)</span>
          </Link>
          <div className={LineUnderLink.linkeMaker('/About')} />
          {this.props.isLoggedIn === true ? (
            <React.Fragment>
              <Link className="nav-link" to={'/Sports'}>
                Sports <span className="sr-only">(current)</span>
              </Link>
              <div className={LineUnderLink.linkeMaker('/Sports')} />

              <Link
                onClick={this.handleClick}
                className="nav-link"
                to={'/Profile'}
              >
                Profile <span className="sr-only">(current)</span>
              </Link>
              <div className={LineUnderLink.linkeMaker('/Profile')} />
            </React.Fragment>
          ) : (
            ''
          )}

          <Link onClick={this.handleClick} className="nav-link" to={'/Contact'}>
            Contact
          </Link>
          <div className={LineUnderLink.linkeMaker('/Contact')} />
          {this.props.location.pathname !== '/SignUp' ? (
            <React.Fragment>
              <Link className="nav-link mobie-dashboard-hover" to={'/Login'}>
                Dashboard <span className="sr-only">(current)</span>
                {/* {localStore.isSignedInSuccess === true ? ( */}
                <div className="mobile-dashboard-dropdown">
                  <ul>
                    <li>PSU</li>
                    <li onClick={this.handleClick}>
                      <Link to="TeamAdmin">Team Admin</Link>
                    </li>
                    <li onClick={this.handleClick}>
                      <Link to="OrganizationAdmin">Organization Admin</Link>
                    </li>
                  </ul>
                </div>
                {/* ) : (
                  ''
                )} */}
              </Link>
              <div className={LineUnderLink.linkeMaker('/Login')} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link
                onClick={this.handleClick}
                className="nav-link"
                to={'/SignUp'}
              >
                Sign up
              </Link>
              <div className={LineUnderLink.linkeMaker('/SignUp')} />
            </React.Fragment>
          )}
        </nav>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    isLoggedIn: state.isSignedInSuccess,
    userType: state.userInfo
  };
}
export default compose(
  withRouter,
  connect(mapStateToProps)
)(Nav);
