import React from 'react';
import WhiteBtn from '../Buttons/WhiteBtn';
import LoadingAnalyseBtn from '../Buttons/LoadingAnalyseBtn';

class MilitaryCardComponent extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <div className="card-login mb-5">
          {this.props.isRequired === true ? (
            <React.Fragment>
              <div className="btn-container text-left">
                <LoadingAnalyseBtn content={this.props.btnContent} />
              </div>
              <div className="card">
                <WhiteBtn content={this.props.cardBtn1Content} />
                <WhiteBtn content={this.props.cardBtn2Content} />
              </div>
            </React.Fragment>
          ) : (
            <div className="card">
              <img className="img-fluid" src={this.props.imageSource} alt="" />
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default MilitaryCardComponent;
