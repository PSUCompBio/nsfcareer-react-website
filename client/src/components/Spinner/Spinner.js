import React from 'react';
import './Spinner.css'
class Spinner extends React.Component {


  render() {
    return (
      <div className="Spinner__container">
        <div class="spinner"></div>
      </div>
    );
  }
}

export default Spinner;