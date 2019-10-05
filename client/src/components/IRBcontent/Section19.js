import React from 'react';
import Collapsible from 'react-collapsible';

class Section19 extends React.Component {
  render() {
    return (
      <Collapsible trigger="19.0	Adverse Event Reporting">
        <Collapsible trigger="19.1	Reporting Adverse Reactions and Unanticipated Problems to the Responsible IRB">
          <p>
            By submitting this study for review, you agree to the following
            statement – DO NOT ALTER OR DELETE: <br />
            In accordance with applicable policies of The Pennsylvania State
            University Institutional Review Board (IRB), the investigator will
            report, to the IRB, any observed or reported harm (adverse event)
            experienced by a subject or other individual, which in the opinion
            of the investigator is determined to be (1) unexpected; and (2)
            probably related to the research procedures. Harms (adverse events)
            will be submitted to the IRB in accordance with the IRB policies and
            procedures.
          </p>
        </Collapsible>
      </Collapsible>
    );
  }
}

export default Section19;
