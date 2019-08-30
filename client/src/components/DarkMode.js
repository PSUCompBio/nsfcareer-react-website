import React from 'react';

class DarkMode extends React.Component {
  constructor() {
    super();
    this.state = {
      visibility: { display: 'none' }
    };
  }

  toggleVisiblity = () => {
    if (this.state.visibility.display === 'none')
      this.setState({ visibility: { display: 'block' } });
    else this.setState({ visibility: { display: 'none' } });
  };

  setDarkMode = (e) => {
    const bg = e.currentTarget.dataset.color;
    const cardBg = e.currentTarget.dataset.card;
    const fontColor = e.currentTarget.dataset.fontcolor;

    document.getElementsByTagName('body')[0].style.backgroundColor = bg;
    document.getElementsByTagName('body')[0].style.zIndex = -5;
    document.getElementsByTagName('html')[0].style.backgroundColor = bg;

    const allParagrap = document.querySelectorAll('div.player-name > p');
    allParagrap.forEach((element) => {
      element.style.color = fontColor;
    });

    const searchElements = ['player-details', 'card', 'dark-bg'];
    searchElements.forEach((element) => {
      const allClasses = document.getElementsByClassName(element);
      [...allClasses].forEach((elements) => {
        elements.style.backgroundColor = cardBg;
      });
    });
    this.setState({ visibility: { display: 'none' } });
  };

  render() {
    return (
      <React.Fragment>
        <div className="dark-mode-container text-center d-flex justify-content-center align-items-center">
          <img
            onClick={this.toggleVisiblity}
            className=""
            src="/img/icon/darkModeSetting.svg"
            alt=""
          />
          <div
            style={this.state.visibility}
            className="dark-mode-chooser text-center  justify-content-center align-items-center"
          >
            <div
              onClick={this.setDarkMode}
              data-fontcolor="#000"
              data-color="#fff"
              data-card="#fff"
            ></div>
            <div
              onClick={this.setDarkMode}
              data-fontcolor="#fff"
              data-color="#171b25"
              data-card="#232838"
            ></div>
            <div class="arrow-right"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DarkMode;
