import React from 'react';

class WhiteBtn extends React.Component{
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return <button type="button" className="dynamic-white-btn m-3">{this.props.content}</button>
  }
}

export default WhiteBtn;