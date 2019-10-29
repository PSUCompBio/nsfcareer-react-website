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
    console.log(this.props.file)
    return (
      <button onClick={() => this.openURL() } className={`profile-download mt-1 mb-4`} type="button">
        {this.props.content}
      </button>
    );
  }
}

export default Download3dProfile;
