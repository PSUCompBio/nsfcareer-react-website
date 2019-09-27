import React from 'react';
import Collapsible from 'react-collapsible';

class Section2 extends React.Component {
  render() {
    return (
      <Collapsible trigger="2.0 Background">
        <Collapsible trigger="2.1 Scientific Background and Gaps">
          <p>
            Describe the scientific background and gaps in current knowledge.
          </p>
          <Collapsible trigger="For the research portion of the work">
            <p>
              TBI affects both military and civilian populations; for example,
              1.6 to 3.8 million individuals in the United States experience a
              sports-related concussion annually, with a growing number of these
              concussions experienced by youth. White matter tissue is
              particularly vulnerable to mild TBI, and damage to fiber tracts is
              believed to play a role in the formation of neurologic and
              cognitive deficits that can persist for years after a concussion
              is first experienced. Little is understood about the underlying
              pathophysiology that leads to long-term deficits after repeated
              brain injuries or even after repetitive sub-concussive insults. A
              single axonal fiber tract bundle may have hundreds to tens of
              thousands of neurons. The mesoscopic length scale that describes
              axonal organization is important because it helps define the
              structural pathways of the brain. This proposal is motivated by
              the need for greater detail and accuracy in modeling the
              mesoscopic length scale in the brain, specifically at the axonal
              tract level needed to enhance our understanding of diffuse axonal
              injury and to pave the way for quantitative means of capturing
              similar features of brain tissue changes due to injury using the
              emerging field of precision computational medicine.
            </p>
          </Collapsible>
          <Collapsible trigger="In the youth and community educational and outreach of the work">
            <p>
              The importance of informal science learning experiences has been
              documented as contributing to the interest and understanding of
              science and engineering for all age groups. The goal is to
              disseminate information about brain science, biomechanics, and
              engineering research through the use of engaging posters,
              demonstrations, and hands-on activities. The plan includes a
              targeted collaboration to implement Sideline Science curriculum at
              school districts with populations of underrepresented minority
              students and will include undergraduate and graduate students to
              work alongside the PI to educate the general community. This
              activity will employ a tailgate tent with the Sideline Science
              banner, including the NSF logo proudly displayed. These activities
              will be offered at one sporting or community event per month,
              starting in Year 2. The curriculum development is spread across
              the five years in order to permit the development of well-designed
              content and to include undergraduate and graduate students in the
              creation and implementation of the curriculum. For instance, the
              PI will leverage Penn State’s Learning Factory to work with
              undergraduate students to develop the Sideline Science
              demonstrations and hands-on activities during their senior
              capstone design projects. The costs for these projects are
              included in the budget. Design of the activities and Sideline
              Science displays will follow recommended strategies for optimizing
              audience participation and learning in science, including engaging
              demonstrations and hands-on content, concise summary of key facts,
              and interdependent concepts across lessons.
            </p>
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            <p>
              The PI’s passion for teaching computational mechanics more broadly
              extends to his academic teaching responsibilities as well. This
              year, the PI was approached by his department to help design and
              implement a new course for junior-level engineering students
              focused on modern computational tools. The intention is to make
              this a required, core class for junior-level students that
              establishes a “pipeline” of training for computational methods.
              The course is aimed at giving students perspective and
              introductory skills on the use of modern computational tools for
              solving mechanical engineering problems. The course will use
              SolidWorks Simulation to study fundamental problems in solid
              mechanics and fluids. Many of the applications are very similar to
              problems students see in core subjects (also offered during their
              junior year), including machine design, heat transfer, and fluid
              mechanics. Through the implementation of the course, the PI has
              identified two primary pedological questions that would benefit
              from a systematic study (described below). The addition of the new
              required, core computational tools course, referred to as ME 330,
              could have a significant impact on the department. Due to credit
              limits, if this course is added, a different course must be
              removed from the existing curriculum. In addition, there are
              pedological questions that remain about the course. Therefore, a
              systematic study of this course is greatly needed. By conducting
              this systematic study, the PI will further his CAREER goal of
              training students skilled in the art of computational mechanics. A
              short description of the study follows.
            </p>
          </Collapsible>
        </Collapsible>
        <Collapsible trigger="2.2 Previous Data">
          <p>Describe any relevant preliminary data.</p>
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

        <Collapsible trigger="2.3 Study Rationale">
          <p>Provide the scientific rationale for the research.</p>
          <Collapsible trigger="For the research portion of the work">
            <p>
              Combining improved understanding of changes that occur in the
              brain at the time of impact with sideline video replay of the
              behaviors that caused the impacts during game play and practice
              will influence players to change their behavior and develop safer
              techniques. This behavioral change will steadily decrease the
              number and severity of dangerous sub-concussive and concussive
              impacts that players experience over the course of the
              season.severity of dangerous sub-concussive and concussive impacts
              that players experience over the course of the season.
            </p>
          </Collapsible>
          <Collapsible trigger="In the youth and community educational and outreach of the work">
            <p>
              The importance of informal science learning experiences has been
              documented as contributing to the interest and understanding of
              science and engineering for all age groups. The goal is to
              disseminate information about brain science, biomechanics, and
              engineering research through the use of engaging posters,
              demonstrations, and hands-on activities.
            </p>
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            <p>
              This year, the PI was approached by his department to help design
              and implement a new course for junior-level engineering students
              focused on modern computational tools. The intention is to make
              this a required, core class for junior-level students that
              establishes a “pipeline” of training for computational methods.
              The course is aimed at giving students perspective and
              introductory skills on the use of modern computational tools for
              solving mechanical engineering problems. The course will use
              SolidWorks Simulation to study fundamental problems in solid
              mechanics and fluids. Many of the applications are very similar to
              problems students see in core subjects (also offered during their
              junior year), including machine design, heat transfer, and fluid
              mechanics. Through the implementation of the course, the PI has
              identified two primary pedological questions that would benefit
              from a systematic study (described below). The addition of the new
              required, core computational tools course, referred to as ME 330,
              could have a significant impact on the department. Due to credit
              limits, if this course is added, a different course must be
              removed from the existing curriculum. In addition, there are
              pedological questions that remain about the course. Therefore, a
              systematic study of this course is greatly needed.
            </p>
          </Collapsible>
        </Collapsible>
      </Collapsible>
    );
  }
}

export default Section2;
