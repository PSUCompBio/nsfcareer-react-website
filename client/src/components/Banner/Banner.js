import React from 'react';
import ReactDOM from 'react-dom';
import BrainImg from './BannerImg/Brain.jpg';
import Nsf from './BannerImg/NSF.png';
import Penstate from './BannerImg/penState.png';
import Ibm from './BannerImg/ibm.png';
import AmazonImg from './BannerImg/amazon.png';
import CyberScienceImg from './BannerImg/cyberscience.png'

class Banner extends React.Component{
    
    render() {
        return (
            <div>
              <ul className="scroll-indicator">
                <li className="active-indicator" />
                <li />
                <li />
                <li />
              </ul>
              <div className="section-one-container">
                <div className="container-fluid pl-0 pr-0">
                  <div className="section-one">
                    <img src={BrainImg} alt="" />
                    <div className="header-navbar">
                      <nav className="navbar navbar-light navbar-expand-lg navbar-padding">
                        <a className="navbar-brand" href="#">NSFCARRIER.IO</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                          <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                          <ul className="navbar-nav ml-auto">
                            <li className="nav-item make-active active">
                              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                              <div className="active-link" />
                            </li>
                            <li className="nav-item make-active active">
                              <a className="nav-link" href="#">About <span className="sr-only">(current)</span></a>
                              <div className />
                            </li>
                            <li className="nav-item make-active">
                              <a className="nav-link" href="#">Military</a>
                              <div className />
                            </li>
                            <li className="nav-item make-active">
                              <a className="nav-link" href="#">Contact</a>
                              <div className />
                            </li>
                            <li className="nav-item make-active">
                              <a className="nav-link" href="#">Login</a>
                              <div className />
                            </li>
                          </ul>
                        </div>
                      </nav>
                      <div className="container-fluid heading-container">
                        <div className="row">
                          <div className="col-md-10 col-lg-10 header-heading">
                            <h1>TRANSFORM YOUR SENSOR DATA</h1>
                            <h4>Accurate brain simulations help extend your </h4>
                            <h4>sensor data research. </h4>
                            <p>Support By</p>
                            <hr />
                          </div>
                          <div className="col-md-2 col-lg-2" />
                        </div>
                        <div className="row">
                          <div className="col-md-12 col-lg-12 image-padding">
                            <img className="img-fluid" src={Nsf} alt="" />
                            <img className="img-fluid" src={Penstate} alt="" />
                            <img className="img-fluid" src={Ibm} alt="" />
                          </div>
                        </div>
                        <div className="row pt-5 mt-5">
                          <div className="col-md-12 col-lg-12 image-padding">
                            <img className="img-fluid" src={AmazonImg} alt="" />
                            <img className="img-fluid" src={CyberScienceImg} alt="" />
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