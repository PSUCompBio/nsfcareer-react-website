import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './AnimateMobileMenu';

class Nav extends React.Component {
  constructor(props) {
    super();
    this.state = {
      onScrollChangeBackground: 'navbar-bg'
    }

  }

  render() {
    return (
      <nav className={`navbar navbar-light  navbar-expand-lg navbar-padding ${(this.props.currentPage > 1) ? this.state.onScrollChangeBackground : ''} ${(this.props.location.pathname !== '/Home' && this.props.location.pathname !== '/') ? 'navbar-bg-change' : ''}`}>
        <Link className="navbar-brand" to={'/Home'}><img src="img/BannerImg/logo.png" alt="" /></Link>
        <button className="navbar-toggler menu-toggler" type="button" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`${this.props.screenWidth < 768 ? 'mobile-menu' : 'collapse navbar-collapse'}`} id="navbarNav">
          {this.props.screenWidth < 768 ?
            <li className="close-btn-box ">
              <i className="fa fa-times close-btn" aria-hidden="true"></i>
            </li>
            :
            ''
          }
          <ul className="navbar-nav ml-auto text-center">
            <li className="nav-item make-active active">
              <Link className="nav-link" to={'/Home'}>Home <span className="sr-only">(current)</span></Link>
              <div className={(this.props.location.pathname === '/Home') ? 'active-link' : ''} />
            </li>
            <li className="nav-item make-active active">
              <Link className="nav-link" to={'/About'}>About <span className="sr-only">(current)</span></Link>
              <div className={(this.props.location.pathname === '/About') ? 'active-link' : ''} />
            </li>
            <li className="nav-item make-active">
              <Link className="nav-link" to={'/Contact'}>Contact</Link>
              <div className={(this.props.location.pathname === '/Contact') ? 'active-link' : ''} />
            </li>
            {this.props.location.pathname !== '/SignUp' ?
              <li className="nav-item make-active">
                <Link className="nav-link" to={'/Login'}>Login</Link>
                <div className={(this.props.location.pathname === '/Login') ? 'active-link' : ''} />
              </li>
              :
              <li className="nav-item make-active">
                <Link className="nav-link" to={'/SignUp'}>Sign up</Link>
                <div className={(this.props.location.pathname === '/SignUp') ? 'active-link' : ''} />
              </li>
            }
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Nav);