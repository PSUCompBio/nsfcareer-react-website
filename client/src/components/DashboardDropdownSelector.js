import React from 'react';
import { getStatusOfDarkmode } from '../reducer';

class DashboardDropdownSelector extends React.Component {
  constructor() {
    super();
    this.state = {
      rosterValue: 'Lorem ipsum',
      visibilityRosterValueSelector: { display: 'none' }
    };
  }

  setRosterValue = (e) => {
    this.setState({
      rosterValue: e.currentTarget.dataset.item
    });
  };
  makeVisibleSelector = () => {
    if (this.state.visibilityRosterValueSelector.display === 'none')
      this.setState({ visibilityRosterValueSelector: { display: 'block' } });
    else this.setState({ visibilityRosterValueSelector: { display: 'none' } });
  };

  componentDidMount() {
    if (getStatusOfDarkmode().status === true) {
      for (let i = 1; i < 2; i++) {
        this.refs['h' + i].style.color = '#e8e8e8';
      }
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-7">
          <div className="current-rostar-selector d-flex">
            <p ref="h1">Current roster</p>
            <span>
              <img className="w-75" src="/img/icon/breadcrumb.svg" alt="" />
            </span>
            <div
              ref="h2"
              onClick={this.makeVisibleSelector}
              className="roster-value-container"
            >
              {this.state.rosterValue}
              <div
                style={this.state.visibilityRosterValueSelector}
                className="roster-value-set"
              >
                <div className="roster-arrow"></div>
                <ul>
                  <li data-item="Lorem lipsum" onClick={this.setRosterValue}>
                    Lorem lipsum
                  </li>
                  <li
                    data-item="York tech football"
                    onClick={this.setRosterValue}
                  >
                    York tech football
                  </li>
                  <li data-item="Lorem lipsum" onClick={this.setRosterValue}>
                    Lorem lipsum
                  </li>
                  <li
                    data-item="York tech football"
                    onClick={this.setRosterValue}
                  >
                    York tech football
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="season-position text-right ">
            <select name="" id="">
              <option value="">All session</option>
              <option value="">York tech football</option>
              <option value="">Lorem lipsum</option>
              <option value="">York tech football</option>
            </select>
            <select name="" id="">
              <option value="">All position</option>
              <option value="">York tech football</option>
              <option value="">Lorem lipsum</option>
              <option value="">York tech football</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardDropdownSelector;
