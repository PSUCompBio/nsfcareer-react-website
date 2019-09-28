import React from 'react';
import Collapsible from 'react-collapsible';
import SportQues from '../utilities/SportQuestions.json';
import { getStatusOfDarkmode } from '../reducer';
import Footer from '../components/Footer';

class Sports extends React.Component {
  constructor() {
    super();
    this.state = {
      iconName: 'Collapsible'
    };
  }

  componentDidMount() {
    if (getStatusOfDarkmode().status === true) {
      document.getElementsByTagName('body')[0].style.background = '#171b25';
    } else {
      const element = document.getElementsByClassName('Collapsible__contentInner');
      for (let i = 0; i < element.length; i++){
        element[i].style.background = "#fff";
        element[i].style.color = "#000";

      }
    }
  }



  renderAllQues = () => {
    return SportQues.map((element, index) => {
      const length = Object.values(element).length;
      if (length > 2) {
        return (
          <Collapsible key={index} trigger={Object.values(element)[0]}>
            <Collapsible trigger={Object.values(element)[1]}>
              <p>{Object.values(element)[2]}</p>
            </Collapsible>
            <Collapsible trigger={Object.values(element)[3]}>
              <p>{Object.values(element)[4]}</p>
            </Collapsible>
          </Collapsible>
        );
      }
      return (
        <Collapsible
          key={index}
          onOpening={this.changeIcon}
          trigger={Object.values(element)[0]}
        >
          <p>{Object.values(element)[1]}</p>
        </Collapsible>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container sport-page">
          <div className="collapsible-text">{this.renderAllQues()}</div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Sports;
