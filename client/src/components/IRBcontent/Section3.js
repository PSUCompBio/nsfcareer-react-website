import React from 'react';
import Collapsible from 'react-collapsible';

class Section3 extends React.Component {
  render() {
    return (
      <Collapsible trigger="3.0 Inclusion and Exclusion Criteria">
        <p>
          Create a numbered list below in sections 3.1 and 3.2 of criteria
          subjects must meet to be eligible for study enrollment (e.g., age,
          gender, diagnosis, etc.). Indicate specifically whether you will
          include any of the following vulnerable populations: (You may not
          include members of these populations as subjects in your research
          unless you indicate this in your inclusion criteria.) Review the
          corresponding checklists to ensure that you have provided the
          necessary information.
        </p>
        <Collapsible trigger="Adults unable to consent">
          <p>
            Review “CHECKLIST: Cognitively Impaired Adults (HRP-417)” to ensure
            that you have provided sufficient information. HRP-417 can be
            accessed by clicking the Library link in CATS IRB
            (http://irb.psu.edu).
          </p>
        </Collapsible>
        <Collapsible trigger="Individuals who are not yet adults (infants, children, teenagers)">
          <p>
            If the research involves persons who have not attained the legal age
            for consent to treatments or procedures involved in the research
            (“children”), review the “CHECKLIST: Children (HRP-416)” to ensure
            that you have provided sufficient information. HRP-416 can be
            accessed by clicking the Library link in CATS IRB
            (http://irb.psu.edu).
          </p>
        </Collapsible>
        <Collapsible trigger="Pregnant women">
          <p>
            Review “CHECKLIST: Pregnant Women (HRP-412)” to ensure that you have
            provided sufficient information. HRP-412 can be accessed by clicking
            the Library link in CATS IRB (http://irb.psu.edu).
          </p>
        </Collapsible>
        <Collapsible trigger="Prisoners">
          <p>
            Review “CHECKLIST: Prisoners (HRP-415)” to ensure that you have
            provided sufficient information. HRP-415 can be accessed by clicking
            the Library link in CATS IRB (http://irb.psu.edu).
          </p>
        </Collapsible>
        <Collapsible trigger="Neonates of uncertain viability or non-viable neonates">
          <p>
            Review “CHECKLIST: Neonates (HRP-413)” or “CHECKLIST: Neonates of
            Uncertain Viability (HRP-414)” to ensure that you have provide
            sufficient information. HRP-413 and HRP-414 can be accessed by
            clicking the Library link in CATS IRB (http://irb.psu.edu).
          </p>
        </Collapsible>
        <Collapsible trigger="3.1 Inclusion Criteria">
          <p>
            List the criteria that define who will be included in your study.
          </p>
          <Collapsible trigger="For the research portion of the work">
            <p>
              Student athletes (ages 6-24) who have been medically cleared to
              play by their school. <br /> Also: <br /> 1. Student-athletes
              without any history of concussion. <br /> 2. Student non-athletes
              without history of concussion. <br /> 3. Students who can speak
              English. <br /> 4. Student without any metal implants (to avoid
              problems during MRI). <br /> 5. In addition, signed consent will
              be obtained for all participants.
            </p>
          </Collapsible>
          <Collapsible trigger="In the youth and community educational and outreach of the work">
            <p>
              1. Any member of youth or community is eligible to participate.
            </p>
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            <p>
              1. Any member of the enrolled course is eligible to participate or
              are they teaching a course that could benefit from the
              computational tools course (e.g. ME 360 or ME 440). <br />
              2. In addition, signed consent will be obtained for all
              participants.
            </p>
          </Collapsible>
        </Collapsible>
        <Collapsible trigger="3.2 Exclusion Criteria">
          <p>
            List the criteria that define who will be excluded in your study.
          </p>
          <Collapsible trigger="For the research portion of the work">
            <p>
              1. Students with previous history of concussion or neurotrauma.{' '}
              <br />
              2. Students with any type of implants in their bodies. <br />
              3. Student who cannot speak English. <br />
              4. Consent withdrawal.
            </p>
          </Collapsible>
          <Collapsible trigger="In the youth and community educational and outreach of the work">
            1. Individuals who cannot speak English. <br />
            2. Consent withdrawal.
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            1. Individuals who cannot speak English. <br />
            2. Consent withdrawal.
          </Collapsible>
        </Collapsible>

        <Collapsible trigger="3.3 Early Withdrawal of Subjects">
          <Collapsible trigger="3.3.1 Criteria for removal from study">
            <p>
              Insert subject withdrawal criteria (e.g., safety reasons, failure
              of subject to adhere to protocol requirements, subject consent
              withdrawal, disease progression, etc.).
            </p>
            <Collapsible trigger="For the research portion of the work">
              <p>
                Subjects will be removed from the study if they fail to satisfy
                all the inclusion criteria mentioned above. They will be removed
                from the study if it is found that they provided PI with wrong
                information about their eligibility criterion.
              </p>
            </Collapsible>
            <Collapsible trigger="In the youth and community educational and outreach of the work">
              <p>n/a</p>
            </Collapsible>
            <Collapsible trigger="In the university engineering educational portion of the work">
              <p>n/a</p>
            </Collapsible>
          </Collapsible>
          <Collapsible trigger="3.3.2 Follow-up for withdrawn subjects">
            <p>
              Describe when and how to withdraw subjects from the study; the
              type and timing of the data to be collected for withdrawal of
              subjects; whether and how subjects are to be replaced; the
              follow-up for subjects withdrawn from investigational treatment.
            </p>
            <Collapsible trigger="For the research portion of the work">
              <p>
                Subjects will be taken out of the research if they failed to
                satisfy the above inclusion criteria. A letter will be given
                explaining the reason for the withdrawal of the subject to the
                athletic trainer, parents and student by the PI.
              </p>
            </Collapsible>
            <Collapsible trigger="In the youth and community educational and outreach of the work">
              <p>n/a</p>
            </Collapsible>
            <Collapsible trigger="In the university engineering educational portion of the work">
              <p>n/a</p>
            </Collapsible>
          </Collapsible>
        </Collapsible>
      </Collapsible>
    );
  }
}

export default Section3;
