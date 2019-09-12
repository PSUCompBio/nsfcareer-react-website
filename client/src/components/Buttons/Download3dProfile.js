import React from 'react';

class Download3dProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        url : this.props.url
    };
  }
  openURL = ()=>{

    window.open(this.state.url, '_blank');
    }

  render() {
    return (
      <button onClick={() => this.openURL() } className={`download-selfie mt-1 mb-5`} type="button">
        {this.props.content}
      </button>
    );
  }
}

export default Download3dProfile;
