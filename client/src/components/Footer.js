import React from 'react';
import { withRouter } from 'react-router-dom';
import GetUpdates from '../components/GetUpdates';

class Footer extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisplay: { display: 'none' }
    };
  }
  makeVisible = (data) => {
    this.setState({ isDisplay: data });
  }
  redirectToOther = () => {
    window.location.href = 'https://psucompbio.org/';
  };

  addFooterClass = () => {
    if (this.props.location.pathname === '/Contact') {
      return 'contact__page';
    } else if (this.props.location.pathname === '/About') {
      return 'about__page';
    } else if (this.props.location.pathname === '/Profile') {
      return 'profile__page';
    } else if (this.props.location.pathname === '/OrganizationAdmin') {
      return 'organization_team';
    } else if (this.props.location.pathname === '/profile') {
      return 'profile__page';
    } else if (this.props.location.pathname === '/Sports') {
      return 'sport__page';
    }
  };

  showModal = () => {
    if (this.state.isDisplay.display === 'none') {
      this.setState({ isDisplay: {display:'flex'} });
    } else {
      this.setState({ isDisplay: {display:'none'} });
    }
  };

  render() {
    const redirectToOther = () => {
      window.location.href = 'https://psucompbio.org/';
    };
    return (
      <div className={`footer ${this.addFooterClass()}`}>
        <GetUpdates isVisible={this.state.isDisplay} makeVisible={this.makeVisible} />
        <div style={{ background: '' }} className="container">
          <div className="row pt-4">
            <div className="col-sm-6 col-md-6 col-lg-6">
              <img className="logo" src="/img/icon/logo.png" alt="" />
            </div>
            <div className="col-sm-6  col-md-6 col-lg-6">
              <button
                type="button"
                onClick={this.showModal}
                className="btn btn-primary float-right"
              >
                Get Updates
              </button>
            </div>
            <hr />
          </div>
          <div className="row">
            <div className="col-sm-9 col-md-6 col-lg-6">
              <p>
                Contact Us: info@NSFCAREER.IO <br />
                <span onClick={() => window.open('')}> IP </span> | Privacy
                Policy &amp; <span onClick={() => window.open('')}> IRB </span>{' '}
                | Collaborate
              </p>
            </div>
            <div className="col-sm-3 col-md-6 col-lg-6">
              {/* <div className="icon-container">
            <a href="">
              <img className="px-2" src="/img/FooterImg/facebook-logo.svg" alt="" />
            </a>
            <a href="">
              <img className="px-2" src="/img/FooterImg/twitter-logo-silhouette.svg" alt="" />
            </a>
            <a href="">
              <img className="px-2" src="/img/FooterImg/icon.svg" alt="" />
            </a>
          </div> */}
            </div>
          </div>
          <div className="row text-center">
            <div className="col-md-12 pb-3">
              <p onClick={redirectToOther} className="copyright">
                © 2019 Copyright: Penn State Computational Biomechanics Group
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Footer);
