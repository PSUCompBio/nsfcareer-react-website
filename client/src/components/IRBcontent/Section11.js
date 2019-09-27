import React from 'react';
import Collapsible from 'react-collapsible';

class Section11 extends React.Component {
  render() {
    return (
      <Collapsible trigger="11.0 Risks">
        <p>
          List the reasonably foreseeable risks, discomforts, hazards, or
          inconveniences to the subjects related the subjects’ participation in
          the research. For each potential risk, describe the probability,
          magnitude, duration, and reversibility. Consider all types of risk
          including physical, psychological, social, legal, and economic risks.
          If applicable, indicate which procedures may have risks to the
          subjects that are currently unforeseeable. If applicable, indicate
          which procedures may have risks to an embryo or fetus should the
          subject be or become pregnant. If applicable, describe risks to others
          who are not subjects. Please keep in mind that loss of confidentiality
          is a potential risk when conducting human subject research and should
          be addressed as such.
        </p>
        <Collapsible trigger="For the research portion of the work">
          <p>Loss of confidentiality.</p>
          <Collapsible trigger="In the youth and community educational and outreach of the work">
            <p>Loss of confidentiality.</p>
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            <p>Loss of confidentiality.</p>
          </Collapsible>
        </Collapsible>
      </Collapsible>
    );
  }
}

export default Section11;
