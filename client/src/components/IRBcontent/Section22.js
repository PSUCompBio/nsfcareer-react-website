import React from 'react';
import Collapsible from 'react-collapsible';

class Section19 extends React.Component {
  render() {
    return (
      <Collapsible trigger="22.0	References">
        <p>
          List relevant references in the literature which highlight methods,
          controversies, and study outcomes.
        </p>
        <Collapsible trigger="For the research portion of the work">
          <p>n/a</p>
        </Collapsible>
        <Collapsible trigger="In the youth and community educational and outreach of the work">
          <p>n/a</p>
        </Collapsible>
        <Collapsible trigger="In the university engineering educational portion of the work">
          <p>n/a</p>
        </Collapsible>
      </Collapsible>
    );
  }
}

export default Section19;
