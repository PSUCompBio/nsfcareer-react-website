import React from 'react';
import { withRouter } from 'react-router-dom';
import GetUpdates from '../components/GetUpdates';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    console.log("Footer props", props);
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
    let setClassName='';
    if (this.props.location.pathname === '/Contact') {
      setClassName = 'contact__page';
    } else if (this.props.location.pathname === '/About') {
      setClassName = 'about__page';
    } else if (this.props.location.pathname === '/Profile') {
      setClassName = 'profile__page';
    } else if (this.props.location.pathname === '/OrganizationAdmin') {
      setClassName = 'organization_team';
    } else if (this.props.location.pathname === '/profile') {
      setClassName = 'profile__page';
    } else if (this.props.location.pathname === '/Sports') {
      setClassName = 'sport__page';
    }
    return setClassName;
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
      <div style={(this.props.screenWidth && this.props.screenWidth < 765) ? {position : "relative"} : {position : "relative", height : "inherit"}} className={`footer ${this.addFooterClass()}`}>

        <GetUpdates isVisible={this.state.isDisplay} makeVisible={(this.props.makeVisible)? this.props.makeVisible : this.makeVisible} />
        <div style={{ background: '' }} className="container">
          <div className="row pt-4">
            <div className="col-sm-6 col-md-6 col-lg-6 footer-title">
              <img className="logo" src="/img/icon/logo.png" alt="" />
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 footer-update-button">
              <button
                type="button"
                onClick={(this.props.showGetUpdateModal)? this.props.showGetUpdateModal : this.showModal}
                className="btn btn-primary float-right"
              >
                Get Updates
              </button>
            </div>
            <hr />
          </div>
          <div className="row text-center">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <p>
                 <a href="mailto:info@nsfcareer.io?cc=reuben.kraft@psu.edu" style={{'color':'white'}}><i class="fa fa-envelope" aria-hidden="true"></i> info@NSFCAREER.IO </a><br />
                <span className="ip-irb-link" onClick={()=>this.props.history.push('/IP')}> IP </span> | Privacy
                    Policy &amp;{' '}
                    <span className="ip-irb-link" onClick={() => this.props.history.push('/IRB')}> IRB </span> |
                    Collaborate
              </p>
            </div>
          </div>
          <div className="row text-center">
            <div className="col-md-12 pb-3">
              <p onClick={redirectToOther} className="copyright">
                © 2020 Copyright: Penn State Computational Biomechanics Group
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Footer);
