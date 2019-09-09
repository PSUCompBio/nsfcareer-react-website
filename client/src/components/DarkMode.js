import React from 'react';
import store from '../Store';
import { getStatusOfDarkmode } from '../reducer';
import { darkThemeActiveSetter, darkThemeInactiveSetter } from '../Actions';

class DarkMode extends React.Component {
  constructor() {
    super();
    this.state = {
      visibility: { display: 'none' },
      background: '',
      cardBackground: '',
      fontColor: ''
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
    this.setState(
      {
        background: bg,
        cardBackground: cardBg,
        fontColor: fontColor,
        visibility: { display: 'none' }
      },
      () => {
        if (this.state.background === '#171b25') {
          this.props.isDarkMode(true);
          store.dispatch(darkThemeActiveSetter());
        } else {
          store.dispatch(darkThemeInactiveSetter());
          this.props.isDarkMode(false);
        }

        document.getElementsByTagName(
          'body'
        )[0].style.backgroundColor = this.state.background;
        document.getElementsByTagName('body')[0].style.zIndex = -5;
        document.getElementsByTagName(
          'html'
        )[0].style.backgroundColor = this.state.background;

        const allParagrap = document.querySelectorAll('div.player-name > p');
        allParagrap.forEach((element) => {
          element.style.color = this.state.fontColor;
        });

        const searchElements = ['player-details', 'card', 'dark-bg'];
        searchElements.forEach((element) => {
          const allClasses = document.getElementsByClassName(element);
          [...allClasses].forEach((elements) => {
            // console.log(element)
            console.log('cards bg====>', this.state.cardBackground);

            elements.style.backgroundColor = this.state.cardBackground;
          });
        });
      }
    );
  };

  componentDidMount() {
    if (getStatusOfDarkmode().status === true) {
      const searchElements = ['player-details', 'card', 'dark-bg'];
      searchElements.forEach((element) => {
        const allClasses = document.getElementsByClassName(element);
        [...allClasses].forEach((elements) => {
          elements.style.backgroundColor = 'rgb(35, 40, 56)';
        });
      });
    }
  }

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
            <div className="arrow-right"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DarkMode;
