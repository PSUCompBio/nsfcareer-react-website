import React from 'react';
import Collapsible from 'react-collapsible';

class Section13 extends React.Component {
  render() {
    return (
      <Collapsible trigger="13.0 Sharing Results with Subjects">
        <Collapsible trigger="For the research portion of the work">
          <p>
            If a player or their guardian asked to see their data, we will show
            them.
          </p>
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

export default Section13;
