import React from 'react';
import ReactDOM from 'react-dom';
import ReactPageScroller from 'react-page-scroller';
import Banner from './Banner/Banner';
import AboutTheProduct from './AboutTheProduct/AboutTheProduct';
import ResearchArea from './ResearchArea/ReseachArea';
import TechnologiesWeUse from './TechnolgiesWeUse/TechnologiesWeUse';
import './HomePage.css';
import 'hover.css/css/hover.css';
import 'animate.css/animate.min.css';
import { getStatusOfDarkmode } from '../../reducer';
import 'bootstrap/dist/js/bootstrap.bundle';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      blockScrollDown: false,
      scrollY: 0,
      styleMobileScroll: '',
      mobilePageCount: 1,
      scrollBottomTouched: false,
      scrollTopTouched: false
    };
    this._pageScroller = null;
  }
  componentDidMount() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  }
  componentWillMount() {
    // const doc = document.getElementById("root").getElementsByTagName('div');
    // console.log(doc[9])
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

  updateAccToMouseWheel = (e) => {
    console.log(this.state.mobilePageCount);
    if (e.deltaY > 0 && this.state.mobilePageCount === 1) {
      this.setState(
        {
          styleMobileScroll: 'mobile-scroll-1'
        },
        () => {
          setTimeout(() => {
            this.setState({ mobilePageCount: 2 });
          }, 1000);
        }
      );
    } else if (
      e.deltaY > 0 &&
      this.state.mobilePageCount === 2 &&
      this.state.scrollBottomTouched === true
    ) {
      this.setState(
        {
          styleMobileScroll: 'mobile-scroll-2'
        },
        () => {
          setTimeout(() => {
            this.setState({ mobilePageCount: 3 });
          }, 1000);
        }
      );
    } else if (
      e.deltaY > 0 &&
      this.state.mobilePageCount === 3 &&
      this.state.scrollBottomTouched === true
    ) {
      this.setState({
        styleMobileScroll: 'mobile-scroll-3'
      });
    } else if (
      e.deltaY < 0 &&
      this.state.mobilePageCount === 3 &&
      this.state.scrollTopTouched === true
    ) {
      this.setState(
        {
          styleMobileScroll: 'mobile-scroll-back-2'
        },
        () => {
          setTimeout(() => {
            this.setState({ mobilePageCount: 2 });
          }, 1000);
        }
      );
    } else if (
      e.deltaY < 0 &&
      this.state.mobilePageCount === 2 &&
      this.state.scrollTopTouched === true
    ) {
      this.setState(
        {
          styleMobileScroll: 'mobile-scroll-back-1'
        },
        () => {
          setTimeout(() => {
            this.setState({ mobilePageCount: 1 });
          }, 1000);
        }
      );
    } else if (
      e.deltaY < 0 &&
      this.state.mobilePageCount === 1 &&
      this.state.scrollTopTouched === true
    ) {
      this.setState({
        styleMobileScroll: 'mobile-scroll-back-0'
      });
    }
  };

  bottomTouch() {
    console.log('bottom touching');
    this.setState({ scrollBottomTouched: true });
    setTimeout(() => {
      this.setState({ scrollBottomTouched: false });
    });
  }

  topTouch() {
    console.log('Top touching');
    this.setState({ scrollTopTouched: true });
    setTimeout(() => {
      this.setState({ scrollTopTouched: false });
    });
  }

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
              showmodal={this.props.showformModal}
            />
          </ReactPageScroller>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div
            ref="box"
            style={{ height: '100vh' }}
            className={this.state.styleMobileScroll}
            onWheel={this.updateAccToMouseWheel}
          >
            <Banner screenWidth={this.props.screenWidth} />
            <AboutTheProduct
              scrollBarTouchBottom={() => this.bottomTouch()}
              scrollBarTouchTop={() => this.topTouch()}
              screenWidth={this.props.screenWidth}
            />
            <ResearchArea
              scrollBarTouchBottom={() => this.bottomTouch()}
              scrollBarTouchTop={() => this.topTouch()}
              screenWidth={this.props.screenWidth}
            />
            <TechnologiesWeUse
              currentPage={this.props.currentPage}
              screenWidth={this.props.screenWidth}
              scrollBarTouchBottom={() => this.bottomTouch()}
              scrollBarTouchTop={() => this.topTouch()}
              onWheel={this.onFooterScroll}
              mouseScroll={this.state.scrollY}
            />
          </div>
        </React.Fragment>
      );
    }
  }
}

export default HomePage;
