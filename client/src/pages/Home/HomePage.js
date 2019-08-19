import React from 'react';
import ReactPageScroller from 'react-page-scroller';
import { BrowserRouter as Router } from 'react-router-dom';
import Banner from './Banner/Banner';
import AboutTheProduct from './AboutTheProduct/AboutTheProduct'
import ResearchArea from './ResearchArea/ReseachArea';
import TechnologiesWeUse from './TechnolgiesWeUse/TechnologiesWeUse'
import ScrollIndicator from './ScrollIndicator';
import Nav from './Nav';
import './HomePage.css'
import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle'

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

    goToPage = (eventKey) => {
        this._pageScroller.goToPage(eventKey);
    };

    pageOnChange = (number) => {
        this.props.onPageChange(number);
    };

    resetPage = () => {
        setTimeout(() => this.pageOnChange(1), 500);
    }

    getPagesNumbers = () => {

        const pageNumbers = [];

        for (let i = 1; i <= 5; i++) {
            pageNumbers.push(
                // <Pager.Item key={i} eventKey={i - 1} onSelect={this.goToPage}>{i}</Pager.Item>
            )
        }

        return [...pageNumbers];
    };


    onFooterScroll = (e) => {
        this.setState({ scrollY: e.deltaY })
    }

    render() {
        const pagesNumbers = this.getPagesNumbers();
        if (window.innerWidth >= 725) {
            return <React.Fragment>

                <ReactPageScroller ref={c => this._pageScroller = c} pageOnChange={this.pageOnChange} scrollUnavailable={this.lastSlide} blockScrollDown={this.state.blockScrollDown}>
                    <Banner />
                    <AboutTheProduct />
                    <ResearchArea />
                    <TechnologiesWeUse onWheel={this.onFooterScroll} mouseScroll={this.state.scrollY} />
                </ReactPageScroller>
            </React.Fragment>
        } else {
            return(
            <React.Fragment>
                <Banner />
                <AboutTheProduct />
                <ResearchArea />
                <TechnologiesWeUse onWheel={this.onFooterScroll} mouseScroll={this.state.scrollY} />
                </React.Fragment>
            )
        }
    }
}

export default HomePage;