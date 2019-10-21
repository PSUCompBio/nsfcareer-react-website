import React from 'react';

class RostarBtn extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  handleTab = (e) => {

    if (this.props.makeActive !== 0) {
          this.props.getBtn(e.target);
          console.log(this.props.currentBtn);

          this.props.currentBtn.classList.remove('active-tab');
          e.target.classList.add('active-tab');
          this.props.tabActive(0);
    } else {
      e.target.classList.add('active-tab');
      this.props.tabActive(1);
      this.props.getBtn(e.target);
    }
  };

  render() {
    return (
      <button
        type="button"
        onClick={this.handleTab}
        className={`rostar-btn ${
          this.props.makeActive === 0 && this.props.content === 'Overview'
            ? 'active-tab'
            : ''
        }`}
      >
        {this.props.content}
      </button>
    );
  }
}
export default RostarBtn;
