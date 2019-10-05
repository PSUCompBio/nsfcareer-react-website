import React from 'react';

class LoadingAnalyseBtn extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <button type="button" className="loding-btn">
        {this.props.content}
      </button>
    );
  }
}

export default LoadingAnalyseBtn;
