import React from 'react';

class SideBar extends React.Component {
  constructor() {
    super();
    this.state = {
      isSubListOpen: { display: 'none' }
    };
  }

  showSubList = () => {
    if (this.state.isSubListOpen.display === 'none') {
      this.setState({ isSubListOpen: { display: 'block' } });
    } else {
      this.setState({ isSubListOpen: { display: 'none' } });
    }
  };

  render() {
    return (
      <div className="slidebar-nav">
        <h5>Teams</h5>
        <ul className="list-one">
          <li onClick={this.showSubList}>
            Current Roster <i class="fa fa-chevron-circle-down" aria-hidden="true"></i>
            <ul style={this.state.isSubListOpen} className="list-two">
              <li>Roster 1</li>
              <li>Roster 2</li>
              <li>Roster 3</li>
              <li>Roster 4</li>
              <li>Roster 5</li>
            </ul>
          </li>
          <li>York Tech Football</li>
        </ul>
      </div>
    );
  }
}

export default SideBar;
