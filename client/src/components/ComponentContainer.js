import React from 'react';
import ReactDOM from 'react-dom';
import ReactPageScroller from 'react-page-scroller';

import Banner from './Banner/Banner';
import AboutTheProduct from './AboutTheProduct/AboutTheProduct'
import ResearchArea from './ResearchArea/ReseachArea';
import TechnologiesWeUse from './TechnolgiesWeUse/TechnologiesWeUse'

import './assets/css/Style.css'
import './assets/js/Script'

 class ComponentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentPage: 1};
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

        const pagesNumbers = this.getPagesNumbers();

        return <React.Fragment>
            <ReactPageScroller ref={c => this._pageScroller = c} pageOnChange={this.pageOnChange}>
                <Banner />
                <AboutTheProduct/>
                <ResearchArea />
                <TechnologiesWeUse/>
            </ReactPageScroller>
        </React.Fragment>
    }
}

export default ComponentContainer;