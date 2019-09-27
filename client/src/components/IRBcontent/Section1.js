import React from 'react';
import Collapsible from 'react-collapsible';

class Section1 extends React.Component {
  render() {
    return (
      <Collapsible trigger={'1.0	Objectives'}>
        <Collapsible trigger=" 1.1 Study Objectives">
          <p>
            Describe the purpose, specific aims or objectives. State the
            hypotheses to be tested.
          </p>
          <p>
            There are three different studies proposed in this effort. This IRB
            covers all three. In this document each separate study is separated
            as 1) For the research portion of the work, 2) in the youth and
            community educational and outreach of the work and 3) in the
            university engineering educational portion of the work.
          </p>
          <p></p>
          <Collapsible trigger="For the research portion of the work">
            <p>
              The purpose of this research is to further understand mild
              traumatic brain injuries in sports athletes and more broadly to
              improve safety for players by providing scientific evidence to
              support simple rule changes, practice management, improved
              protective equipment, more informed coaching and behavior changes
              by athletes. This research will also be used to develop the risk
              functions per player, per position. The central hypothesis of this
              proposal is that there is a correlation between axonal fiber
              bundle strain and microstructural tissue changes as seen in
              diffusion tensor imaging acutely after injury, and this effect can
              be fully explained through computational predictions. This work
              will develop a new computational method that is capable of
              explicitly modeling axonal fiber bundle tracts and monitoring
              axonal structural damage in brain tissue over time. Using this new
              method, correlates between axonal fiber bundle strain and
              neuroimaging measures (e.g., fractional anisotropy) will be
              explored. This modeling technique will be extended to address the
              physiology of axonal injury that includes both primary mechanical
              and secondary Wallerian degeneration (delayed, downstream
              degeneration). This work relates to a subsequent research
              question: Can computational brain models combined with reliable
              wearable sensors be an effective means of capturing similar
              features of brain tissue changes due to injuries over long periods
              of time? Specific objectives include:
            </p>
            <p>
              Obtain biomechanical head impact measurements by monitoring the
              head accelerometer data from the athletes for various sports using
              commercially available sensor systems. Sensor systems that that
              will be used are Mbient Labs’s MetaMotionC
              (https://mbientlab.com/) or Prevent Biometrics mouthguard
              (https://preventbiometrics.com/). On the future other sensors
              might be added but would go through the IRB approval first. Any
              sensor company used in study will have a threshold of data
              security approved by IRB. Obtain head impact readings from three
              different age groups of people: collegiate, high school and youth.
              For this we are collaborating with sensor and brain science
              companies and schools (high school, middle school, college).
              Explore alerting measures developed by sensor manufacturers for
              the head, brain and impact. Use the magnetic resonance imaging
              (MRI) data merged with sensor data to develop player specific
              computational models. Although eventually there could be a
              simulation for each impact, this work will focus on a small
              subset. The analysis will run in a cloud computing resource (e.g.
              Amazon’s E2C) and will read from the sensor company’s Application
              Programming Interface (API). With this platform in place, it will
              be possible to explore whether computer modeling can be applied to
              help capture similar features of brain tissue changes due to
              injury. To explore the feasibility of the concept within the scope
              of this work, five athletes from high-risk positions will be
              targeted for this initial study. The predictions from simulations
              will be correlated with a capturing similar features of brain
              tissue changes due to injury. Once the concept is demonstrated, it
              can be scaled up to a full scientific study with controls (beyond
              the scope of this proposal).
            </p>
            <p>
              The data obtained from this study could provide potentially useful
              information for the quantitative diagnosis of brain injury.
              However, this technology can make no formal diagnosis at this time
              and does not claim to be a diagnostic tool. Subjects are directed
              to a medical professional for a formal diagnosis of injury. Any
              evidence of diagnostic capability would be compared to medically
              established criteria. For TBI, quantitative methods do not exist.
              Therefore, the only medically established criteria for TBI
              diagnostic would be evidence provided by a medical doctor. This
              study may enroll up to 500 athletes and non-athletes.
            </p>
          </Collapsible>
          <Collapsible trigger="In the youth and community educational and outreach of the work">
            <p>
              Funding from this CAREER will enable the PI to formalize his
              vision and create new initiatives that have broad impact on
              undergraduate and graduate students, underrepresented populations
              in STEM fields, and the general public. In this effort the PI will
              promote awareness of engineering, brain science, and computational
              medicine through the development of a mobile Sideline Science
              program for K–12 students and community audiences. There are
              multiple learning objectives that this Sideline Science curriculum
              aims to teach and disseminate. Foremost, participants will learn
              about careers; neurotechnology such as brain simulations; and
              research related to neuroimaging, neuroscience, high-performance
              computing, scientific visualization, finite element modeling, and
              engineering. Additionally, participants will learn about current
              technology that may help improve safety on the field, as well as
              the physics that is involved with head impacts and the ways in
              which engineers contribute to sports safety. The PI aims to leave
              the impression with participants about the importance of an active
              lifestyle, the benefits of playing sports, and the functions and
              applications of neurotechnologies such as EEG in both healthcare
              and research.
            </p>
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            <p>
              Conduct a systematic study of a new junior-level undergraduate
              course focused on modern computational tools for engineers to
              evaluate its impact on improving engagement and performance in
              other core subjects and “capstone” design courses. The hypothesis
              is that, by learning how to simulate these fundamental problems
              and visualize the solution, students will become more engaged and
              have greater ability to grasp concepts they learn in the
              traditional core classes (machine design, heat transfer, and fluid
              mechanics). In addition, a further hypothesis is that students
              will demonstrate improved performance in capstone design courses
              with an additional year of simulation training. Research
              questions: (1) Does participation in a computer modeling course
              for junior-level students increase performance in core mechanical
              engineering courses, such as machine design, fluid dynamics, and
              heat transfer? (2) Does a computer modeling course for
              junior-level students increase performance of those students as
              seniors enrolled in the flagship “capstone design” course?
            </p>
          </Collapsible>
        </Collapsible>

        <Collapsible trigger="1.2 Primary Study Endpoints">
          <p>
            State the primary endpoints to be measured in the study. Clinical
            trials typically have a primary objective or endpoint. Additional
            objectives and endpoints are secondary. The endpoints (or outcomes),
            determined for each study subject, are the quantitative measurements
            required by the objectives. Measuring the selected endpoints is the
            goal of a trial (examples: response rate and survival).
          </p>
          <Collapsible trigger="For the research portion of the work">
            <p>
              The research could focus on athletes playing a wide range of
              sports where there is a high chance of head injury. Primary study
              endpoints in the first phase of study involving human subjects
              include:
            </p>
            <p>
              1. Impact measurements from the athletes. <br />
              2. If neuroimaging is available, use pre- and post-concussive
              scans from the subjects to create finite element models and
              explore changes in diffusional measures. <br />
              3. Run impact simulations using the sensor data in the cloud.
            </p>
          </Collapsible>
          <Collapsible trigger="In the youth and community educational and outreach of the work">
            <p>
              There are multiple learning objectives that this Sideline Science
              curriculum aims to teach and disseminate. Foremost, participants
              will learn about careers; neurotechnology such as brain
              simulations; and research related to neuroimaging, neuroscience,
              high-performance computing, scientific visualization, finite
              element modeling, and engineering. Additionally, participants will
              learn about current technology that may help improve safety on the
              field, as well as the physics that is involved with head impacts
              and the ways in which engineers contribute to sports safety. The
              PI aims to leave the impression with participants about the
              importance of an active lifestyle, the benefits of playing sports,
              and the functions and applications of neurotechnologies such as
              EEG in both healthcare and research. Each year, the PI will
              coordinate the schedule for the Sideline Science curriculum for
              the upcoming year with community partners. He has already
              partnered with the Penn State Center for Science and the Schools
              (CSATS), whose staff will provide guidance regarding the
              development, implementation, and assessment of the curriculum. The
              primary educational research question to be investigated is
              whether the Sideline Science curriculum increases awareness of
              brain health in students in grades K–12. A series of surveys will
              be offered before and after participating in the Sideline Science
              activities. A log of participants will likewise be maintained in
              order to determine the breadth of the Sideline Science tent’s
              reach in promoting community awareness of brain injury and
              knowledge about brain mechanics and engineering.
            </p>
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            <p>
              The hypothesis is that, by learning how to simulate these
              fundamental problems and visualize the solution, students will
              become more engaged and have greater ability to grasp concepts
              they learn in the traditional core classes (machine design, heat
              transfer, and fluid mechanics). In addition, a further hypothesis
              is that students will demonstrate improved performance in capstone
              design courses with an additional year of simulation training.
              Research questions: (1) Does participation in a computer modeling
              course for junior-level students increase performance in core
              mechanical engineering courses, such as machine design, fluid
              dynamics, and heat transfer? (2) Does a computer modeling course
              for junior-level students increase performance of those students
              as seniors enrolled in the flagship “capstone design” course?
              Study population: The study will be multi-year and will include
              both comparison (n  30 per year) and intervention groups (n  30
              per year). Comparison populations will include junior-level
              students not enrolled in ME 330 and taking machine design, fluids,
              or heat transfer in the same cohort as the intervention group. The
              intervention population will include students who are enrolled in
              ME 330 and taking machine design, fluids, or heat transfer in the
              same cohort as the comparison group. Study Design: After IRB
              approval, data will be collected for at least three years,
              beginning in the first year of the award. Demographics will be
              collected to show that comparison and intervention groups are
              similar in nature and will include measures such as prior GPA or
              engineering GPA, gender, ethnicity, and year in school. In
              comparing the two groups, an independent t-test or a multivariate
              version of a t-test will be used to analyze the data. To evaluate
              the two groups, the PI will examine test and homework scores for
              problems that are co-taught in the core and new computational
              course. In addition, he will solicit feedback from course
              instructors to get a sense if students are more engaged.
            </p>
          </Collapsible>
        </Collapsible>
        <Collapsible trigger="1.3 Secondary Study Endpoints">
          <p>State the secondary endpoints to be measured in the study. n/a</p>
        </Collapsible>
      </Collapsible>
    );
  }
}

export default Section1;
