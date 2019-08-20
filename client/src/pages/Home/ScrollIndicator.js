import React from 'react';

class scrollIndicator extends React.Component {
    constructor(props) {
        super();
        this.state = {
            changeActiveIndicator: 'active-indicator',
            windowWidth: 0
        }

    }


    updateDimensions = () => {
        this.setState({ windowWidth: window.innerWidth });
    }
    componentWillUpdate() {
        window.addEventListener("resize", this.updateDimensions);
    }

    render() {

        return (
            <ul style={this.state.windowWidth < 725 ? { display: 'none' } : {}} className={(this.props.currentPage > 1) ? 'change-scroll-indicator' : 'scroll-indicator'}>
                <li className={(this.props.currentPage === 1) ? this.state.changeActiveIndicator : ''} />
                <li className={(this.props.currentPage === 2) ? 'active-change-scroll-indicator' : ''} />
                <li className={(this.props.currentPage === 3) ? 'active-change-scroll-indicator' : ''} />
                <li className={(this.props.currentPage === 4) ? 'active-change-scroll-indicator' : ''} />
            </ul>
        )
    }
}

export default scrollIndicator;