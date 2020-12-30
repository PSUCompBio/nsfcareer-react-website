import React from 'react';
import Footer from '../../components/Footer';
import { getStatusOfDarkmode } from '../../reducer';
import ResearchArea from './../Home/ResearchArea/ReseachArea';
// import DarkMode from './../../components/DarkMode';

class AboutPage extends React.Component {
    // constructor(props){
    //     super(props);

    // }
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
          <div
              style={{marginTop : "10vh"}}
              className="row">
            <div className="col-md-12 col-lg-12 padding-about__page-new text-center">
              <div className={`section-title animated zoomIn`}>
                <h1 ref="h1" className="font-weight-bold">
                  Details
                </h1>
              </div>
              <p className={`animated fadeInUp about-lines`}>
                  <span style={{fontSize : "0.95rem"}} className="top-heading__login">
                      <img className="svg img-fluid details-section-svg" style={{width : "5%"}} src="/img/icon/bullseye-with-arrow.svg" alt="" /> {this.props.screenWidth > 768 ? '' : <br></br> } Mission: Provide a sensor-enabled, cloud-based platform for modeling brain injuries.</span>
              </p>

                 <span style={{color : "#595959", fontSize : "0.95rem"}} className="top-heading__login" >
                     {this.props.screenWidth > 768 ? '' : <br></br> }
                     <img className="svg img-fluid details-section-svg" style={{width : "5%"}} src="/img/icon/eye.svg" alt="" />
                     {this.props.screenWidth > 768 ? '' : <br></br> }
                         Vision: To be used by the sports and militiary communities in order to develop an FDA-approved medically diagnostic tool.</span>

                <br />
                <div className="row">
                    <div className="col-md-6">
                        <div className={`animated fadeInUp about-lines`} >
                            <p  style={{fontSize : "1.2rem", marginBottom : "1rem"}} className="top-heading__login" >
                                Learn  more about the vision of our <br/> effort in this video
                            </p>
                        </div>

                        <div style={{marginBottom : "1rem",marginTop : "1rem", paddingLeft : "5%", paddingRight : "5%"}} className="col-md-12 col-sm-12">
                            <iframe title="youtube video 1" width="100%" height="300px"
                                allowfullscreen="allowfullscreen"
                                mozallowfullscreen="mozallowfullscreen"
                                msallowfullscreen="msallowfullscreen"
                                oallowfullscreen="oallowfullscreen"
                                webkitallowfullscreen="webkitallowfullscreen"
                                src="https://www.youtube.com/embed/ZlxsK5JRPrQ?rel=0">
                            </iframe>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className={`animated fadeInUp about-lines`} >
                            <p  style={{fontSize : "1.2rem", marginBottom : "1rem"}} className="top-heading__login" >
                                Learn  more about the technology <br/> of our  effort in this video
                            </p>

                        </div>

                        <div style={{marginBottom : "1rem",marginTop : "1rem", paddingLeft : "5%", paddingRight : "5%"}} className="col-md-12 col-sm-12">
                            <iframe title="youtube video 2" width="100%" height="300px"
                                allowfullscreen="allowfullscreen"
                                mozallowfullscreen="mozallowfullscreen"
                                msallowfullscreen="msallowfullscreen"
                                oallowfullscreen="oallowfullscreen"
                                webkitallowfullscreen="webkitallowfullscreen"
                                src="https://www.youtube.com/embed/CdCvEOWjK9Q?rel=0">
                            </iframe>
                        </div>
                    </div>
                    <br/>
                    <div className="col-md-12">
                        <span style={{fontSize : "1.5rem", border : "none", marginTop : "1rem"}} className="top-heading__login">

                            <img className="svg img-fluid details-section-bulb-svg" style={{width : "5%"}} src="/img/icon/intelligence.svg" alt="" />
                            {this.props.screenWidth > 768 ? '' : <br></br> }We provide solutions for both contact sports and occupational blast exposures.</span>
                        
                    </div>
                    <div
                        style={{
                            background: "#f5f5f5",
                            paddingTop: "2%",
                            marginTop: "3%"
                        }}
                        className="col-md-12">
                        <ResearchArea hideTitle="true" screenWidth={this.props.screenWidth} />
                    </div>

                </div>
                <br />
                <br />

            </div>

          </div>
        </div>
        {/*<DarkMode isDarkMode={this.props.isDarkModeSet} />*/}

        <Footer />
      </React.Fragment>
    );
  }
}

export default AboutPage;
