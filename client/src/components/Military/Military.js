import React from 'react';
import MilitaryCardComponent from '../Military/MilitaryCardComponent';

class Military extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <div className="container pt-5 mt-5">
          <div className="row">
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-12">
                  <MilitaryCardComponent
                    isRequired={true}
                    btnContent="Loading"
                    cardBtn1Content="Generate Graph"
                    cardBtn2Content="Import Loading"
                  />

                  <MilitaryCardComponent
                    isRequired={true}
                    btnContent="Loading"
                    cardBtn1Content="Generate Graph"
                    cardBtn2Content="Import Loading"
                  />

                  <MilitaryCardComponent
                    isRequired={false}
                    imageSource="/img/icon/militaryChart.svg"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <MilitaryCardComponent
                isRequired={false}
                imageSource="/img/icon/militaryChart.svg"
              />
              <div className="align-end-chart">
              <MilitaryCardComponent
                isRequired={false}
                imageSource="/img/icon/militaryChart.svg"
                />
                </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Military;
