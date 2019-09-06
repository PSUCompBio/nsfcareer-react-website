import React from 'react';
import Footer from '../../components/Footer';
import { getStatusOfDarkmode } from '../../reducer';

class AboutPage extends React.Component {
  changeHtmlBg = (hexCode) => {
    document.getElementsByTagName('body')[0].style.backgroundColor = hexCode;
  };

  componentWillMount() {
    if (getStatusOfDarkmode().status === true) {
      this.changeHtmlBg('#fff');
    }
  }

  componentWillUnmount() {
    if (getStatusOfDarkmode().status === true) {
      this.changeHtmlBg('#171b25');
      console.log('unmounting')
    }
  }


  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row pt-5 mt-5">
            <div className="col-md-12 col-lg-12 text-center">
              <div className={`section-title animated zoomIn`}>
                <h1 className="font-weight-bold">ABOUT US</h1>
              </div>
              <p className={`animated fadeInUp about-lines`}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
                <br />
                <br />
                <br />
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
                <br />
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
