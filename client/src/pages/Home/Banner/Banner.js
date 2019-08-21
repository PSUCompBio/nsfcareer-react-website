import React from 'react';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Roboto', 'sans-serif']
  }
});
class Banner extends React.Component {


  render() {
    return (
      <div>
        <div className="section-one-container">
          <div className="container-fluid pl-0 pr-0">
            <div className="section-one">
              <img src="/img/BannerImg/Brain.png" alt="" />
              <div className="header-navbar">
                <div className="container-fluid heading-container">
                  <div className="row">
                    <div className={`col-md-10 col-lg-10 header-heading ${this.props.screenWidth < 725 ? 'pt-4' : ''}`}>
                      <h1>TRANSFORM YOUR SENSOR DATA</h1>
                      <h4>Accurate brain simulations help extend your </h4>
                      <h4>sensor data research. </h4>
                      <p>Support By</p>
                      <hr />
                    </div>
                    <div className="col-md-2 " />
                  </div>

                  <div className="row">
                    <div className="col-md-12 col-sm-6  image-padding">
                      <img className="img-fluid" src="/img/BannerImg/NSF.png" alt="" />
                      <img className="img-fluid" src="/img/BannerImg/penState.png" alt="" />
                      <img className="img-fluid" src="/img/BannerImg/ibm.png" alt="" />
                    </div>
                  </div>
                  <div className="row padding-mobile">
                    <div className="col-md-12 col-sm-6  image-padding">
                      <img className="img-fluid" src="/img/BannerImg/amazon.png" alt="" />
                      <img className="img-fluid" src="/img/BannerImg/cyberscience.png" alt="" />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;