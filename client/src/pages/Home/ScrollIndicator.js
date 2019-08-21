import React from 'react';

class scrollIndicator extends React.Component {
  constructor(props) {
    super();
    this.state = {
      changeActiveIndicator: 'active-indicator'
    }

  }

  gotoPage = (pageNumber) => {

  }

  render() {
    return (
      <ul style={this.props.screenWidth < 725 ? { display: 'none' } : {}} className={(this.props.currentPage > 1) ? 'change-scroll-indicator' : 'scroll-indicator'}>
        <li onClick={() => this.props.gotoPage(0)} className={(this.props.currentPage === 1) ? this.state.changeActiveIndicator : ''} />
        <li onClick={() => this.props.gotoPage(1)} className={(this.props.currentPage === 2) ? 'active-change-scroll-indicator' : ''} />
        <li onClick={() => this.props.gotoPage(2)} className={(this.props.currentPage === 3) ? 'active-change-scroll-indicator' : ''} />
        <li onClick={() => this.props.gotoPage(3)} className={(this.props.currentPage === 4) ? 'active-change-scroll-indicator' : ''} />
      </ul>
    )
  }
}

export default scrollIndicator;