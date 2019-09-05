import React from 'react';
import ReactPageScroller from 'react-page-scroller';
import Banner from './Banner/Banner';
import AboutTheProduct from './AboutTheProduct/AboutTheProduct';
import ResearchArea from './ResearchArea/ReseachArea';
import TechnologiesWeUse from './TechnolgiesWeUse/TechnologiesWeUse';
import './HomePage.css';
import 'hover.css/css/hover.css';
import 'animate.css/animate.min.css';
import { getStatusOfDarkmode } from '../../reducer';
// import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      blockScrollDown: false,
      scrollY: 0
    };
    this._pageScroller = null;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.screenWidth > 725) {
      this.goToPage(nextProps.gotoPage);
    }
  }

  componentWillUpdate() {
    const darkThemeOnOff = getStatusOfDarkmode();
    if (darkThemeOnOff.status === true) {
      const h1Length = document.getElementsByTagName('h1');
      const h4Length = document.getElementsByTagName('h4');
      for (let i = 0; i < h1Length.length; i++) {
        h1Length[i].style.color = '#fff';
      }
      for (let i = 0; i < h4Length.length; i++) {
        h4Length[i].style.color = '#fff';
      }

      if (this.props.currentPage === 2)
        document.getElementsByClassName(
          'research-area-bg'
        )[0].style.background = '#000';
    }
  }

  componentWillUnmount() {
    this.resetPage();
  }

  goToPage = (eventKey) => {
    this._pageScroller.goToPage(eventKey);
  };

  pageOnChange = (number) => {
    this.props.onPageChange(number);
  };

  resetPage = () => {
    setTimeout(() => this.pageOnChange(1), 500);
  };

  onFooterScroll = (e) => {
    this.setState({ scrollY: e.deltaY });
  };

  render() {
    if (this.props.screenWidth >= 725) {
      return (
        <React.Fragment>
          <ReactPageScroller
            ref={(c) => (this._pageScroller = c)}
            pageOnChange={this.pageOnChange}
            scrollUnavailable={this.lastSlide}
            blockScrollDown={this.state.blockScrollDown}
          >
            <Banner screenWidth={this.props.screenWidth} />
            <AboutTheProduct screenWidth={this.props.screenWidth} />
            <ResearchArea screenWidth={this.props.screenWidth} />
            <TechnologiesWeUse
              currentPage={this.props.currentPage}
              screenWidth={this.props.screenWidth}
              onWheel={this.onFooterScroll}
              mouseScroll={this.state.scrollY}
            />
          </ReactPageScroller>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Banner screenWidth={this.props.screenWidth} />
          <AboutTheProduct screenWidth={this.props.screenWidth} />
          <ResearchArea screenWidth={this.props.screenWidth} />
          <TechnologiesWeUse
            currentPage={this.props.currentPage}
            screenWidth={this.props.screenWidth}
            onWheel={this.onFooterScroll}
            mouseScroll={this.state.scrollY}
          />
        </React.Fragment>
      );
    }
  }
}

export default HomePage;
