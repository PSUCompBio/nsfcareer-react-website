import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import store from '../../Store';
import { resetSignedInSucceeded, userDetails } from '../../Actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { isAuthenticated, getUserDetails } from '../../apis';
class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      signOutClass: 'sign-out-hide',
      userProfile: '',
      userName: '',
      dashboardLinks: { display: 'none' },
      countMouseEnter: 0
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

  // componentWillMount() {
  //   console.log(store.getState());
  //   if (store.getState().isSignedInSuccess === false) {
  //     store.dispatch(userDetails({}));
  //   }
  // }

  componentWillUnmount() {
    // document.removeEventListener('mousedown');
  }

  // componentDidMount() {
  //   isAuthenticated(JSON.stringify({}))
  //     .then((value) => {
  //       if (value.data.message === 'success') {
  //         this.setState({});
  //         getUserDetails()
  //           .then((response) => {
  //             store.dispatch(userDetails(response.data));
  //             console.log(response.data);
  //             this.setState({userProfile:response.data.profile_picture_url, userName:response.data.first_name+' '+response.data.last_name})
  //           })
  //           .catch((error) => {});
  //       } else {
  //         // this.setState({ isAuthenticated: false, isCheckingAuth: false });
  //       }
  //     })
  //     .catch((err) => {
  //       // this.setState({ isAuthenticated: false, isCheckingAuth: false });
  //     });
  // }

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
      dashboardLinks: { display: 'none' }
    });
  };

  signOut = () => {
    store.dispatch(resetSignedInSucceeded());
    this.setState({ signOutClass: 'sign-out-hide' });
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
          <div
            className={
              this.props.location.pathname === '/About' ? 'active-link' : ''
            }
          />
        </li>
        <li className="nav-item make-active">
          <Link className="nav-link" to={'/Contact'}>
            Contact
          </Link>
          <div
            className={
              this.props.location.pathname === '/Contact' ? 'active-link' : ''
            }
          />
        </li>
        {this.props.location.pathname !== '/SignUp' ? (
          <li className="nav-item make-active active">
            <Link className="nav-link" to={'/Login'}>
              Dashboard <span className="sr-only">(current)</span>
            </Link>
            <div
              className={
                this.props.location.pathname === '/Login' ? 'active-link' : ''
              }
            />
          </li>
        ) : (
          <li className="nav-item make-active">
            <Link className="nav-link" to={'/SignUp'}>
              Sign up
            </Link>
            <div
              className={
                this.props.location.pathname === '/SignUp' ? 'active-link' : ''
              }
            />
          </li>
        )}
      </ul>
    );
  };

  dashboardDropDownList = () => {
    return (
      <div
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
          <div
            className={
              this.props.location.pathname === '/About' ? 'active-link' : ''
            }
          />
        </li>
        <li className="nav-item make-active active">
          <Link className="nav-link" to={'/Sports'}>
            Sports <span className="sr-only">(current)</span>
          </Link>
          <div
            className={
              this.props.location.pathname === '/Sports' ? 'active-link' : ''
            }
          />
        </li>

        <li className="nav-item make-active">
          <Link className="nav-link" to={'/Contact'}>
            Contact
          </Link>
          <div
            className={
              this.props.location.pathname === '/Contact' ? 'active-link' : ''
            }
          />
        </li>

        {this.props.location.pathname !== '/SignUp' ? (
          <li
            onMouseEnter={this.hideSignOut}
            className="nav-item dashboard-hover make-active active"
          >
            <Link className="nav-link" to={'/Login'}>
              Dashboard <span className="sr-only">(current)</span>
            </Link>
            <div
              className={
                this.props.location.pathname === '/Login' ||
                this.props.location.pathname === '/dashboard' ||
                this.props.location.pathname === '/TeamAdmin' ||
                this.props.location.pathname === '/OrganizationAdmin'
                  ? 'active-link'
                  : ''
              }
            />
            {this.dashboardDropDownList()}
          </li>
        ) : (
          <li className="nav-item make-active">
            <Link className="nav-link" to={'/SignUp'}>
              Sign up
            </Link>
            <div
              className={
                this.props.location.pathname === '/SignUp' ? 'active-link' : ''
              }
            />
          </li>
        )}
        <li className=" nav-item profile-nav-icon">
          <div onMouseEnter={this.showLogOut} className="name">
            R K
          </div>

          <div
            onMouseLeave={this.showLogOut}
            ref="signOut"
            className={`${this.state.signOutClass}`}
          >
            <div className="nav-item make-active profile-user active">
              <Link className="nav-link" to={'/Profile'}>
                Profile <span className="sr-only">(current)</span>
              </Link>
              <div
                className={
                  this.props.location.pathname === '/Profile'
                    ? 'active-link'
                    : ''
                }
              />
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
            {/* <img src={localStore.userInfo.data.profile_picture_url} alt="" /> */}
            {/* <p>
              {localStore.userInfo.data.first_name +
                ' ' +
                localStore.userInfo.data.last_name}
            </p> */}
            <div className="mobile-user-profile">RK</div>

            <div className="user-profile-dropdown__mobile">
              <ul>
                <li>
                  <Link to="profile">Profile</Link>
                </li>
                <img
                  onClick={this.signOut}
                  className=" mt-3 img-fluid w-25"
                  src="/img/icon/powerBtn.svg"
                  alt=""
                />
              </ul>
            </div>
          </div>

          <Link className="nav-link" to={'/Home'}>
            Home <span className="sr-only">(current)</span>
          </Link>
          <div
            className={
              this.props.location.pathname === '/Home' ? 'active-link' : ''
            }
          />
          <Link className="nav-link" to={'/About'}>
            About <span className="sr-only">(current)</span>
          </Link>
          <div
            className={
              this.props.location.pathname === '/About' ? 'active-link' : ''
            }
          />
          {this.props.isLoggedIn === true ? (
            <React.Fragment>
              <Link className="nav-link" to={'/Sports'}>
                Sports <span className="sr-only">(current)</span>
              </Link>
              <div
                className={
                  this.props.location.pathname === '/Sports'
                    ? 'active-link'
                    : ''
                }
              />

              <Link className="nav-link" to={'/Profile'}>
                Profile <span className="sr-only">(current)</span>
              </Link>
              <div
                className={
                  this.props.location.pathname === '/Profile'
                    ? 'active-link'
                    : ''
                }
              />
            </React.Fragment>
          ) : (
            ''
          )}

          <Link className="nav-link" to={'/Contact'}>
            Contact
          </Link>
          <div
            className={
              this.props.location.pathname === '/Contact' ? 'active-link' : ''
            }
          />
          {this.props.location.pathname !== '/SignUp' ? (
            <React.Fragment>
              <Link className="nav-link mobie-dashboard-hover" to={'/Login'}>
                Dashboard <span className="sr-only">(current)</span>
                {/* {localStore.isSignedInSuccess === true ? ( */}
                <div className="mobile-dashboard-dropdown">
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
                {/* ) : (
                  ''
                )} */}
              </Link>
              <div
                className={
                  this.props.location.pathname === '/Login' ? 'active-link' : ''
                }
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link className="nav-link" to={'/SignUp'}>
                Sign up
              </Link>
              <div
                className={
                  this.props.location.pathname === '/SignUp'
                    ? 'active-link'
                    : ''
                }
              />
            </React.Fragment>
          )}
        </nav>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isSignedInSuccess
  };
}
export default compose(
  withRouter,
  connect(mapStateToProps)
)(Nav);
