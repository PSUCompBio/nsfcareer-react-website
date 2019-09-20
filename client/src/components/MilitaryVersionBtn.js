import React from 'react';

class MilitaryVersionBtn extends React.Component{
  render() {
    return (
      <div className="military-version-btn-container">
        {this.props.children}
      </div>
    )
  }
}

export default MilitaryVersionBtn;