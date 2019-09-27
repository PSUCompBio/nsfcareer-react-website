import React from 'react';
import Collapsible from 'react-collapsible';

class Section6 extends React.Component {
  render() {
    return (
      <Collapsible trigger="6.0 HIPAA Research Authorization and/or Waiver or Alteration of Authorization">
        <p>
          This section is about the access, use or disclosure of Protected
          Health Information (PHI). PHI is individually identifiable health
          information (i.e., health information containing one or more 18
          identifiers) that is transmitted or maintained in any form or medium
          by a Covered Entity or its Business Associate. A Covered Entity is a
          health plan, a health care clearinghouse or health care provider who
          transmits health information in electronic form. See the “Investigator
          Manual (HRP-103)” for a list of the 18 identifiers. HRP-103 can be
          accessed by clicking the Library link in CATS IRB
          (http://irb.psu.edu). If requesting a waiver/alteration of HIPAA
          authorization, complete sections 6.2 and 6.3 in addition to section
          6.1. The Privacy Rule permits waivers (or alterations) of
          authorization if the research meets certain conditions. Include only
          information that will be accessed with the waiver/alteration.{' '}
        </p>
        <Collapsible trigger="6.1 Authorization and/or Waiver or Alteration of Authorization for the Uses and Disclosures of PHI For the research portion of the work">
          <p>Check all that apply:</p>
          <p>
            Not applicable, no identifiable protected health information (PHI)
            is accessed, used or disclosed in this study. <br />
             Authorization will be obtained and documented as part of the
            consent process. <br />
             Partial waiver is requested for recruitment purposes only (Check
            this box if patients’ medical records will be accessed to determine
            eligibility before consent/authorization has been obtained). <br />
             Full waiver is requested for entire research study (e.g., medical
            record review studies). <br />
             Alteration is requested to waive requirement for written
            documentation of authorization (verbal authorization will be
            obtained). <br />
            In the youth and community educational and outreach of the work
            <br />
            Check all that apply:
            <br />
             Not applicable, no identifiable protected health information (PHI)
            is accessed, used or disclosed in this study. <br />
             Authorization will be obtained and documented as part of the
            consent process. <br />
          </p>
          <p>
            Partial waiver is requested for recruitment purposes only (Check
            this box if patients’ medical records will be accessed to determine
            eligibility before consent/authorization has been obtained). <br />
             Full waiver is requested for entire research study (e.g., medical
            record review studies). <br />
             Alteration is requested to waive requirement for written
            documentation of authorization (verbal authorization will be
            obtained). <br />
            In the university engineering educational portion of the work
          </p>
          <p>
            Check all that apply: <br />
             Not applicable, no identifiable protected health information (PHI)
            is accessed, used or disclosed in this study. <br />
             Authorization will be obtained and documented as part of the
            consent process. <br />
             Partial waiver is requested for recruitment purposes only (Check
            this box if patients’ medical records will be accessed to determine
            eligibility before consent/authorization has been obtained). <br />
             Full waiver is requested for entire research study (e.g., medical
            record review studies). <br />
             Alteration is requested to waive requirement for written
            documentation of authorization (verbal authorization will be
            obtained). <br />
          </p>
        </Collapsible>
        <Collapsible trigger="6.2 Waiver or Alteration of Authorization for the Uses and Disclosures of PHI">
          <Collapsible trigger="6.2.1 Access, use or disclosure of PHI representing no more than a minimal risk to the privacy of the individual">
            <Collapsible trigger="6.2.1.1 Plan to protect PHI from improper use or disclosure">
              <p>
                nclude the following statement as written – DO NOT ALTER OR
                DELETE unless this section is not applicable because the
                research does not involve a waiver of authorization. If the
                section is not applicable, remove the statement and indicate as
                not applicable.{' '}
              </p>
              <Collapsible trigger="6.2.1.2 Plan to destroy identifiers or a justification for retaining identifiers ">
                <p>
                  Describe the plan to destroy the identifiers at the earliest
                  opportunity consistent with the conduct of the research.
                  Include when and how identifiers will be destroyed. If
                  identifiers will be retained, provide the legal, health or
                  research justification for retaining the identifiers.
                </p>
              </Collapsible>
            </Collapsible>
          </Collapsible>
          <Collapsible trigger="6.2.2 Explanation for why the research could not practicably be conducted without access to and use of PHI">
            <p>
              Provide an explanation for why the research could not practicably
              be conducted without access to and use of PHI.
            </p>
          </Collapsible>
          <Collapsible trigger="6.2.3 Explanation for why the research could not practicably be conducted without the waiver or alteration of authorization">
            <p>
              Provide an explanation for why the research could not practicably
              be conducted without the waiver or alternation of authorization.
            </p>
          </Collapsible>
        </Collapsible>
        <Collapsible trigger="6.3 Waiver or alteration of authorization statements of agreement">
          <p>
            By submitting this study for review with a waiver of authorization,
            you agree to the following statement – DO NOT ALTER OR DELETE unless
            this section is not applicable because the research does not involve
            a waiver or alteration of authorization. If the section is not
            applicable, remove the statement and indicate as not applicable.
          </p>
        </Collapsible>
      </Collapsible>
    );
  }
}

export default Section6;