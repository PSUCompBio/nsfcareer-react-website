import React from 'react';
import Collapsible from 'react-collapsible';

class Section19 extends React.Component {
  render() {
    return (
      <Collapsible trigger="20.0	Study Monitoring, Auditing and Inspecting">
        <Collapsible trigger="20.1	Auditing and Inspecting">
          <p>
            By submitting this study for review, you agree to the following
            statement – DO NOT ALTER OR DELETE: <br />
            The investigator will permit study-related monitoring, audits, and
            inspections by the Penn State quality assurance program office(s),
            IRB, the sponsor, and government regulatory bodies, of all study
            related documents (e.g., source documents, regulatory documents,
            data collection instruments, study data etc.). The investigator will
            ensure the capability for inspections of applicable study-related
            facilities (e.g., pharmacy, diagnostic laboratory, etc.).
          </p>
        </Collapsible>
      </Collapsible>
    );
  }
}

export default Section19;
