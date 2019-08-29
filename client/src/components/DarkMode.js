import React from 'react';

class DarkMode extends React.Component {
  constructor() {
    super();
    this.state = {
      visibility:{display:'none'}
    };
  }

  toggleVisiblity = () => {
    if (this.state.visibility.display === 'none')
      this.setState({ visibility: { display: 'block' } })
    else
    this.setState({ visibility: { display: 'none' } })
  }

  render() {
    return (
      <React.Fragment>
        <div className="dark-mode-container text-center d-flex justify-content-center align-items-center">
          <img onClick={this.toggleVisiblity} className="" src="/img/icon/darkModeSetting.svg" alt="" />
          <div style={this.state.visibility} className="dark-mode-chooser text-center  justify-content-center align-items-center">
          <div></div>
          <div></div>

        </div>
        </div>
        
      </React.Fragment>
    );
  }
}

export default DarkMode;
