import React from 'react';
import ReactPageScroller from 'react-page-scroller';

import Banner from './Banner/Banner';
import AboutTheProduct from './AboutTheProduct/AboutTheProduct'
import ResearchArea from './ResearchArea/ReseachArea';
import TechnologiesWeUse from './TechnolgiesWeUse/TechnologiesWeUse'
import Footer from './Footer/Footer'
import './HomePage.css'
import './Script'

 class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentPage: 1, blockScrollDown: false};
        this._pageScroller = null;
    }

    goToPage = (eventKey) => {
        this._pageScroller.goToPage(eventKey);
    };

    pageOnChange = (number) => {
        this.setState({currentPage: number});
    };

    getPagesNumbers = () => {

        const pageNumbers = [];

        for (let i = 1; i <= 5; i++) {
            pageNumbers.push(
                // <Pager.Item key={i} eventKey={i - 1} onSelect={this.goToPage}>{i}</Pager.Item>
            )
        }

        return [...pageNumbers];
    };
     
    render() {
        console.log(this.state.currentPage);
        const pagesNumbers = this.getPagesNumbers();


        return <React.Fragment>
            <ul className="scroll-indicator">
                <li className="active-indicator" />
                <li />
                <li />
                <li />
              </ul>
            <ReactPageScroller ref={c => this._pageScroller = c} pageOnChange={this.pageOnChange} scrollUnavailable={this.lastSlide} blockScrollDown={this.state.blockScrollDown}>
                <Banner />
                <AboutTheProduct/>
                <ResearchArea />
                <TechnologiesWeUse  />
                {/* <Footer/> */}
            </ReactPageScroller>
        </React.Fragment>
    }
}

export default HomePage;