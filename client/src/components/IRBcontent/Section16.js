import React from 'react';
import Collapsible from 'react-collapsible';

class Section16 extends React.Component {
  render() {
    return (
      <Collapsible trigger="16.0 Resources Available">
        <Collapsible trigger="16.1 Facilities and locations">
          <p>
            Identify and describe the facilities, sites and locations where
            recruitment and study procedures will be performed. If research will
            be conducted outside the United States, describe site-specific
            regulations or customs affecting the research, and describe the
            process for obtaining local ethical review. Also, describe the
            principal investigator’s experience conducting research at these
            locations and familiarity with local culture.
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
        <Collapsible trigger="16.2 Feasibility of recruiting the required number of subjects">
          <p>
            Indicate the number of potential subjects to which the study team
            has access. Indicate the percentage of those potential subjects
            needed for recruitment.
          </p>

          <Collapsible trigger="For the research portion of the work">
            <p>
              This is an exploratory study. We hope to have anywhere from 5-500
              athletes to participate.
            </p>
          </Collapsible>
          <Collapsible trigger="In the youth and community educational and outreach of the work">
            <p>
              In the youth and community educational and outreach of the work
              This will be various youth and community members at events –
              should be easy to obtain subjects,
            </p>
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            <p>
              There should be plenty of students at UP willing to participate.
            </p>
          </Collapsible>
        </Collapsible>
        <Collapsible trigger="16.3 PI Time devoted to conducting the research">
          <p>
            Describe how the PI will ensure that a sufficient amount of time
            will be devoted to conducting and completing the research. Please
            consider outside responsibilities as well as other on-going research
            for which the PI is responsible. Since this is for an NSF CAREER
            proposal the PI will be very connected to the work.
          </p>
        </Collapsible>
        <Collapsible trigger="16.4 Availability of medical or psychological resources">
          <p>
            Describe the availability of medical or psychological resources that
            subject might need as a result of their participation in the study,
            if applicable.
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
        <Collapsible trigger="16.5 Process for informing Study Team">
          <p>
            Describe the training plans to ensure members of the research team
            are informed about the protocol and their duties, if applicable.
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
      </Collapsible>
    );
  }
}

export default Section16;
