import React from 'react';
import Footer from '../../components/Footer';
import { getStatusOfDarkmode } from '../../reducer';
import WebFont from 'webfontloader';
import { svgToInline } from '../../config/InlineSvgFromImg';
import GoogleMap from '../../components/SimpleMap';

WebFont.load({
  google: {
    families: ['Roboto', 'sans-serif']
  }
});

class ContactPage extends React.Component {
  // changeHtmlBg = (hexCode) => {
  //   document.getElementsByTagName('body')[0].style.backgroundColor = hexCode;
  // };

  // componentWillMount() {}

  // componentWillUnmount() {
  //   // if (getStatusOfDarkmode().status === true) {
  //   //   this.changeHtmlBg('#171b25');
  //   // }
  // }


  componentDidMount() {
    if (getStatusOfDarkmode().status === true) {
      document.getElementsByTagName('body')[0].style.background = '#171b25';
      for (let i = 1; i <= 8; i++){
        this.refs['h' + i].style.color = '#fff';
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid  contact__page-center-align pl-0">
          <div className="row pt-surface  animated zoomIn text-center">
            <div  className="col-md-7 order-12 pr-0 contact-img-container">
              {/* <GoogleMap /> */}
              <img className="img-fluid img-contact-us w-50" src="/img/contactus.png" alt=""/>
            </div>
            <div className="col-md-5 order-1 my-auto contact-query">
              <h2 ref="h1">Have Questions? Need Help?</h2>
              <p ref="h2">
                User Support: <span>support@nsfcareer.io</span>
              </p>
              <p ref="h3">
                Sales Inquiries: <span> sales@nsfcareer.io </span>
              </p>
              <p ref="h4" className="mi-mb">
                Media Inquiries:<span> media@nsfcareer.io </span>
              </p>
              <p ref="h5">
                Call us at <span>814-867-4570</span>
              </p>
              <p ref="h6">
                <span>Monday – Friday</span>
              </p>
              <p ref="h6" className="mi-mb">
                <span>8:00a – 5:00p CST</span>
              </p>
              <p ref="h7">NSFCAREER.IO Address</p>
              <p ref="h8">
                <span> 320 Leonhard Building</span> <br />
                <span> University Park,</span> <br /> <span> PA 16802</span>
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default ContactPage;
