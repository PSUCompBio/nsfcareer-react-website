import React from 'react';

class Download3dProfile extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    console.log(this.props.file)
    return (
      <button onClick={()=>window.open(this.props.file)} className={`download-selfie mt-1 mb-5`} type="button">
        {this.props.content}
      </button>
    );
  }
}

export default Download3dProfile;
