import React from 'react';
import Collapsible from 'react-collapsible';

class Section17 extends React.Component {
  render() {
    return (
      <Collapsible trigger="17.0	Other Approvals">
        <Collapsible trigger="17.1	Other Approvals from External Entities">
          <p>
            Describe any approvals that will be obtained prior to commencing the
            research (e.g., from cooperating institutions, community leaders,
            schools, external sites, funding agencies).
          </p>
          <Collapsible trigger="For the research portion of the work">
            <p>
              School administrators may need to authorize approval for student
              athletes. If needed, a written letter stating access will be
              obtained from school administrators.
            </p>
          </Collapsible>
          <Collapsible trigger="In the youth and community educational and outreach of the work">
            <p>n/a</p>
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            <p>n/a</p>
          </Collapsible>
        </Collapsible>
        <Collapsible trigger="17.2	Internal PSU Committee Approvals">
          <p>
            <b>Check all that apply:</b>
          </p>

          <p>
            <b>Anatomic Pathology –</b>
            Hershey only – Research involves the collection of tissues or use of
            pathologic specimens. Upload a copy of HRP-902 - Human Tissue For
            Research Form on the “Supporting Documents” page in CATS IRB. This
            form is available in the CATS IRB Library.{' '}
          </p>
          <p>
            <b>Animal Care and Use – </b> All campuses – Human research involves
            animals and humans or the use of human tissues in animals
          </p>

          <p>
            <b>Biosafety – </b> All campuses – Research involves biohazardous
            materials (human biological specimens in a PSU research lab,
            biological toxins, carcinogens, infectious agents, recombinant
            viruses or DNA or gene therapy).
          </p>

          <p>
            <b>Clinical Laboratories – Hershey only –</b> Collection, processing
            and/or storage of extra tubes of body fluid specimens for research
            purposes by the Clinical Laboratories; and/or use of body fluids
            that had been collected for clinical purposes, but are no longer
            needed for clinical use. Upload a copy of HRP-901 - Human Body
            Fluids for Research Form on the “Supporting Documents” page in CATS
            IRB. This form is available in the CATS IRB Library.
          </p>

          <p>
            <b>Clinical Research Center (CRC) Advisory Committee – </b> All
            campuses – Research involves the use of CRC services in any way.
          </p>
          <p>
            <b>Conflict of Interest Review – All campuses – </b>Research has one
            or more of study team members indicated as having a financial
            interest.
          </p>
          <p>
            <b>Radiation Safety – Hershey only – </b>Research involves
            research-related radiation procedures. All research involving
            radiation procedures (standard of care and/or research-related) must
            upload a copy of HRP-903 - Radiation Review Form on the “Supporting
            Documents” page in CATS IRB. This form is available in the CATS IRB
            Library.
          </p>
          <p>
            <b>IND/IDE Audit – All campuses – </b>Research in which the PSU
            researcher holds the IND or IDE or intends to hold the IND or IDE.
          </p>
          <p>
            <b>Scientific Review – Hershey only – </b>All investigator-written
            research studies requiring review by the convened IRB must provide
            documentation of scientific review with the IRB submission. The
            scientific review requirement may be fulfilled by one of the
            following: (1) external peer-review process; (2)
            department/institute scientific review committee; or (3) scientific
            review by the Clinical Research Center Advisory committee. NOTE:
            Review by the Penn State Hershey Cancer Institute Scientific Review
            Committee is required if the study involves cancer prevention
            studies or cancer patients, records and/or tissues. For more
            information about this requirement see the IRB website at:
            http://www.pennstatehershey.org/web/irb/home/resources/investigator
          </p>
          </Collapsible>
      </Collapsible>
    );
  }
}

export default Section17;
