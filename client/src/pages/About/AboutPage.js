import React from 'react';
import Footer from '../../components/Footer';
import { getStatusOfDarkmode } from '../../reducer';

class AboutPage extends React.Component {
    constructor(props){
        super(props);

    }
  changeHtmlBg = (hexCode) => {
    document.getElementsByTagName('body')[0].style.backgroundColor = hexCode;
  };

  componentDidMount() {
    // Scrolling winddow to top when user clicks on about us page
    window.scrollTo(0, 0)
    if (getStatusOfDarkmode().status === true) {
      this.refs.h1.style.color = '#fff';
      document.getElementsByTagName('body')[0].style.background = '#171b25';
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container align-center__about-page">
          <div className="row pt-5 mt-5">
            <div className="col-md-12 col-lg-12 padding-about__page text-center">
              <div className={`section-title animated zoomIn`}>
                <h1 ref="h1" className="font-weight-bold">
                  ABOUT US
                </h1>
              </div>
              <p className={`animated fadeInUp about-lines`}>
                  <span style={{fontSize : "1.5rem !important"}} className="top-heading__login">Mission: Provide a sensor-enabled, cloud-based platform for modeling brain injuries.</span>
                <br />
                <br />
                 <span style={{color : "#595959", fontSize : "1.5rem !important"}} className="top-heading__login" >Vision: To be used by the sports and militiary communities in order to develop an FDA-approved medically diagnostic tool.</span>

                <br />
                <br />
                    <div style={{marginBottom : "1rem", paddingLeft : "5%", paddingRight : "5%"}} className="col-md-12 col-sm-12">
                        <iframe width="100%" height="400px"
                            allowfullscreen="allowfullscreen"
                            mozallowfullscreen="mozallowfullscreen"
                            msallowfullscreen="msallowfullscreen"
                            oallowfullscreen="oallowfullscreen"
                            webkitallowfullscreen="webkitallowfullscreen"
                            src="https://www.youtube.com/embed/afg_U1JDUQk?autoplay=1">
                        </iframe>
                    </div>
                <br />
                <br />
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default AboutPage;
