import React from 'react'

class LineUnderLink extends React.Component {
  constructor() {
    super();
  }
  linkeMaker (segment){
    let addClassName = '';
    if (window.location.pathname === segment) {
      addClassName = 'active-link';
      return addClassName;
    }
  };
}


export default new LineUnderLink;
