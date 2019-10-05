import React from 'react';
import Collapsible from 'react-collapsible';

class Section4 extends React.Component {
  render() {
    return (
      <Collapsible trigger="4.0 Recruitment Methods">
        <Collapsible trigger="4.1 Identification of subjects">
          <p>
            Describe the methods that will be used to identify potential
            subjects or the source of the subjects. If not recruiting subjects
            directly (e.g., database query for eligible records or samples)
            state what will be queried, how and by whom.
          </p>
          <Collapsible trigger="For the research portion of the work">
            <p>
              Potential subjects will be identified through meetings with school
              administrators, trainers and coaches will take place to find
              suitable research partners or they could be a customer of the
              sensor companies partnered with. The number of subjects will
              depend on the goals of the study or number of teams and
              athlete/parents willing to participate, as well as the work load
              of the research team and capabilities of the method to do larger
              numbers. The grant states that at least 5 players will be
              examined, but the PI would like to do more if possible. Using
              sensors on entire teams of approximately 30 players or more is not
              difficult and is completely possible, however the modeling portion
              of the research could take more time. At this time, it is not
              clear if greater than 5 players can be modeled. If the PI finds
              that the modeling is going fast, the number of participants may be
              added that could reach into the 100s of players. For the
              collegiate and high school athletes, the athletic trainers will
              identify potential subjects. All the age matched individuals
              (non-athletes) will be selected based on information provided by
              school. For non-athletes, a school administrator such as an
              athletic trainer or principle would be asked to provide teachers
              and staff information about the study. If students are interested
              to participate, they would need to have research documents signed.
              The research team would only be working with school administrators
              until the documents are signed.
            </p>
          </Collapsible>
          <Collapsible trigger="In the youth and community educational and outreach of the work">
            <p>
              Potential subjects will be youth and community members that stop
              by the activity booth and express interest. Activity booth will be
              a tailgate tent with NSF and PSU logo and the words Sideline
              Science on the side. This will be set up near sports events where
              there is space and outside in visitor area of Discovery Space in
              State College.
            </p>
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            <p>
              Potential subjects will be students enrolled in computational
              tools course. Or if they are participating as professors, they
              would be teaching a course that might benefit from the new
              computational tools course.
            </p>
          </Collapsible>
        </Collapsible>
        <Collapsible trigger="4.2 Recruitment process">
          <p>
            Describe how, where and when potential subjects will be recruited
            (e.g., approaching or providing information to potential subjects
            for participation in this research study).
          </p>
          <Collapsible trigger="For the research portion of the work">
            <p>
              Administrators of school districts, youth or club organizations
              will be invited based on the objective of the research study. A
              letter explaining the nature, participant expectations and the
              purpose of the study will be provided. Subjects will be recruited
              in person or through letter through contacts with the sensor
              companies or collaborations we make with schools.
            </p>
          </Collapsible>
          <Collapsible trigger="In the youth and community educational and outreach of the work">
            <p>
              Subjects will be recruited in person by asking people who walk by
              booth.
            </p>
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            <p>
              Subjects will be recruited in person by asking in beginning of
              course. If they are professors they will be asked prior to the
              beginning of the course.
            </p>
          </Collapsible>
        </Collapsible>
        <Collapsible trigger="4.3 Recruitment materials">
          <p>
            List the materials that will be used to recruit subjects. Add
            recruitment documents to your study in CATS IRB (http://irb.psu.edu)
            on the “Consent Forms and Recruitment Materials” page. For
            advertisements, upload the final copy of printed advertisements.
            When advertisements are taped for broadcast, attach the final
            audio/video tape. You may submit the wording of the advertisement
            prior to taping to preclude re-taping because of inappropriate
            wording, provided the IRB reviews the final audio/video tape. See
            Section 4.2 for letter that will be provided to school leaders,
            youth and community audiences and engineering students.
          </p>
        </Collapsible>
        <Collapsible trigger="4.4 Eligibility/screening of subjects">
          <p>
            If potential subjects will be asked eligibility questions before
            obtaining informed consent, describe the process. Add the script
            documents and a list of the eligibility questions that will be used
            to your study in CATS IRB (http://irb.psu.edu) on the “Consent Forms
            and Recruitment Materials” page. See attached documents.
          </p>
          <Collapsible trigger="For the research portion of the work">
            <p>
              The screening process will take place at the locations of the
              participating research teams. The study team will ask and confirm
              with participants and/or guardians if they meet the inclusion
              criteria and confirm they do not meet the exclusion criteria.
            </p>
          </Collapsible>
          <Collapsible trigger="In the youth and community educational and outreach of the work">
            <p>
              The screening process will take place at the locations of the
              schools, community events and locations (e.g. Discovery Space).
              The study team will ask and confirm with participants and/or
              guardians if they meet the inclusion criteria and confirm they do
              not meet the exclusion criteria.
            </p>
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            <p>
              The screening process of potential subjects will take place at
              University Park classroom. The study team will ask participants
              and confirm if they meet the inclusion criteria and confirm they
              do not meet the exclusion criteria. Professors teaching a course
              that might benefit would be eligible.
            </p>
          </Collapsible>
        </Collapsible>
      </Collapsible>
    );
  }
}

export default Section4;
