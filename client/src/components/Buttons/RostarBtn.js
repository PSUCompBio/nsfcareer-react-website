import React from 'react';

class RostarBtn extends React.Component{
  constructor() {
    super();
    this.state = {
      
    }
  }

  render() {
    return <button type="button" className="rostar-btn">{this.props.content}</button>
  }
}
export default RostarBtn;