import React from 'react';
import Collapsible from 'react-collapsible';

class Section14 extends React.Component {
  render() {
    return (
      <Collapsible trigger="14.0 Subject Stipend (Compensation) and/or Travel Reimbursements">
        <p>
            Describe the amount and timing of any subject stipend/payment or
            travel reimbursement here. If there is no subject stipend/payment or
            travel reimbursement, indicate as not applicable. If course credit
            or extra credit is offered to subjects, describe the amount of
            credit and the available alternatives. Alternatives should be equal
            in time and effort to the amount of course or extra credit offered.
            If an existing, approved student subject pool will be used to enroll
            subjects, please indicate as such and indicate that course credit
            will be given and alternatives will be offered as per the approved
            subject pool procedures.
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

export default Section14;
