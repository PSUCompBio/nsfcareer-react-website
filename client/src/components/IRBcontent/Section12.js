import React from 'react';
import Collapsible from 'react-collapsible';

class Section12 extends React.Component {
  render() {
    return (
      <Collapsible trigger="12.0 Potential Benefits to Subjects and Others">
        <Collapsible trigger="12.1 Potential Benefits to Subjects">
          <p>
            Describe the potential benefits that individual subjects may
            experience from taking part in the research. If there is no direct
            benefit to subjects, indicate as such. Compensation is not
            considered a benefit. Compensation should be addressed in section
            14.0.
          </p>
          <Collapsible trigger="For the research portion of the work">
            <p>None</p>
          </Collapsible>
          <Collapsible trigger="In the youth and community educational and outreach of the work">
            <p>None</p>
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            <p>None</p>
          </Collapsible>
        </Collapsible>
        <Collapsible trigger="12.2 Potential Benefits to Others">
          <p>Include benefits to society or others.</p>
          <Collapsible trigger="For the research portion of the work">
            <p>
              Brain trauma is a problem that affects all ages, ethnicities,
              genders, and occupations. In the United States, it is estimated
              that 27 million children, aged 6-18 years, participate in some
              form of team sport each year, with exposure to mild yet cumulative
              head trauma. Practical tools, such as the Digital Brain, paired
              with the fundamental insights into injury biomechanics and
              neuroimaging gained through this effort, will have significant
              impact on diverse groups across society.
            </p>
          </Collapsible>
          <Collapsible trigger="In the youth and community educational and outreach of the work">
            <p>
              A mobile “NSF Sideline Science” curriculum to teach and promote
              awareness of brain science and computational medicine for K-12
              students and the general public
            </p>
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            <p>
              A systematic multiyear study of the effectiveness of a new
              junior-level computational tools course for engineering students
              may improve their performance in other core engineering and design
              courses.
            </p>
          </Collapsible>
        </Collapsible>
      </Collapsible>
    );
  }
}

export default Section12;
