import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      signOutClass: ''
    };
    this.handleClick = this.handleClick.bind(this);
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
    if (this.state.signOutClass === '') {
      this.setState({ signOutClass: 'sign-out' });
    } else {
      this.setState({ signOutClass: '' });
    }
  };

  hideSignOut = () => {
    this.setState({ signOutClass: '' });
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

        <li className="nav-item make-active active">
          <Link className="nav-link" to={'/Profile'}>
            Profile <span className="sr-only">(current)</span>
          </Link>
          <div
            className={
              this.props.location.pathname === '/Profile' ? 'active-link' : ''
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
            onMouseOver={this.hideSignOut}
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

            <div className="dashboard-links">
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
          <div onClick={this.showLogOut} className="name">
            R K
          </div>
          <div ref="signOut" className={this.state.signOutClass}>
            <Link to="SignOut">
              <img src="" alt="" />
            </Link>
          </div>
        </li>
      </ul>
    );
  };

  render() {
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
            {!this.props.isAuthenticated ? this.mobileNav() : this.laptopNav()}
          </div>
        ) : (
          ''
        )}
        <nav
          className="cbp-spmenu cbp-spmenu-vertical cbp-spmenu-right"
          id="cbp-spmenu-s2"
        >
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
              <Link className="nav-link" to={'/Login'}>
                Dashboard <span className="sr-only">(current)</span>
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

export default withRouter(Nav);
