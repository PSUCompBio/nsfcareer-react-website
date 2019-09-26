import React from 'react';
import Collapsible from 'react-collapsible';
import Footer from './Footer';

class IRBLinkContent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <React.Fragment>
        <div className="container sport-page">
          <div className="collapsible-text">
            <Collapsible trigger={'1.0	Objectives'}>
              <Collapsible trigger=" 1.1 Study Objectives">
                <p>
                  Describe the purpose, specific aims or objectives. State the
                  hypotheses to be tested.
                </p>
                <p>
                  There are three different studies proposed in this effort.
                  This IRB covers all three. In this document each separate
                  study is separated as 1) For the research portion of the work,
                  2) in the youth and community educational and outreach of the
                  work and 3) in the university engineering educational portion
                  of the work.
                </p>
                <p></p>
                <Collapsible trigger="For the research portion of the work">
                  <p>
                    The purpose of this research is to further understand mild
                    traumatic brain injuries in sports athletes and more broadly
                    to improve safety for players by providing scientific
                    evidence to support simple rule changes, practice
                    management, improved protective equipment, more informed
                    coaching and behavior changes by athletes. This research
                    will also be used to develop the risk functions per player,
                    per position. The central hypothesis of this proposal is
                    that there is a correlation between axonal fiber bundle
                    strain and microstructural tissue changes as seen in
                    diffusion tensor imaging acutely after injury, and this
                    effect can be fully explained through computational
                    predictions. This work will develop a new computational
                    method that is capable of explicitly modeling axonal fiber
                    bundle tracts and monitoring axonal structural damage in
                    brain tissue over time. Using this new method, correlates
                    between axonal fiber bundle strain and neuroimaging measures
                    (e.g., fractional anisotropy) will be explored. This
                    modeling technique will be extended to address the
                    physiology of axonal injury that includes both primary
                    mechanical and secondary Wallerian degeneration (delayed,
                    downstream degeneration). This work relates to a subsequent
                    research question: Can computational brain models combined
                    with reliable wearable sensors be an effective means of
                    capturing similar features of brain tissue changes due to
                    injuries over long periods of time? Specific objectives
                    include:
                  </p>
                  <p>
                    Obtain biomechanical head impact measurements by monitoring
                    the head accelerometer data from the athletes for various
                    sports using commercially available sensor systems. Sensor
                    systems that that will be used are Mbient Labs’s MetaMotionC
                    (https://mbientlab.com/) or Prevent Biometrics mouthguard
                    (https://preventbiometrics.com/). On the future other
                    sensors might be added but would go through the IRB approval
                    first. Any sensor company used in study will have a
                    threshold of data security approved by IRB. Obtain head
                    impact readings from three different age groups of people:
                    collegiate, high school and youth. For this we are
                    collaborating with sensor and brain science companies and
                    schools (high school, middle school, college). Explore
                    alerting measures developed by sensor manufacturers for the
                    head, brain and impact. Use the magnetic resonance imaging
                    (MRI) data merged with sensor data to develop player
                    specific computational models. Although eventually there
                    could be a simulation for each impact, this work will focus
                    on a small subset. The analysis will run in a cloud
                    computing resource (e.g. Amazon’s E2C) and will read from
                    the sensor company’s Application Programming Interface
                    (API). With this platform in place, it will be possible to
                    explore whether computer modeling can be applied to help
                    capture similar features of brain tissue changes due to
                    injury. To explore the feasibility of the concept within the
                    scope of this work, five athletes from high-risk positions
                    will be targeted for this initial study. The predictions
                    from simulations will be correlated with a capturing similar
                    features of brain tissue changes due to injury. Once the
                    concept is demonstrated, it can be scaled up to a full
                    scientific study with controls (beyond the scope of this
                    proposal).
                  </p>
                  <p>
                    The data obtained from this study could provide potentially
                    useful information for the quantitative diagnosis of brain
                    injury. However, this technology can make no formal
                    diagnosis at this time and does not claim to be a diagnostic
                    tool. Subjects are directed to a medical professional for a
                    formal diagnosis of injury. Any evidence of diagnostic
                    capability would be compared to medically established
                    criteria. For TBI, quantitative methods do not exist.
                    Therefore, the only medically established criteria for TBI
                    diagnostic would be evidence provided by a medical doctor.
                    This study may enroll up to 500 athletes and non-athletes.
                  </p>
                </Collapsible>
                <Collapsible trigger="In the youth and community educational and outreach of the work">
                  <p>
                    Funding from this CAREER will enable the PI to formalize his
                    vision and create new initiatives that have broad impact on
                    undergraduate and graduate students, underrepresented
                    populations in STEM fields, and the general public. In this
                    effort the PI will promote awareness of engineering, brain
                    science, and computational medicine through the development
                    of a mobile Sideline Science program for K–12 students and
                    community audiences. There are multiple learning objectives
                    that this Sideline Science curriculum aims to teach and
                    disseminate. Foremost, participants will learn about
                    careers; neurotechnology such as brain simulations; and
                    research related to neuroimaging, neuroscience,
                    high-performance computing, scientific visualization, finite
                    element modeling, and engineering. Additionally,
                    participants will learn about current technology that may
                    help improve safety on the field, as well as the physics
                    that is involved with head impacts and the ways in which
                    engineers contribute to sports safety. The PI aims to leave
                    the impression with participants about the importance of an
                    active lifestyle, the benefits of playing sports, and the
                    functions and applications of neurotechnologies such as EEG
                    in both healthcare and research.
                  </p>
                </Collapsible>
                <Collapsible trigger="In the university engineering educational portion of the work">
                  <p>
                    Conduct a systematic study of a new junior-level
                    undergraduate course focused on modern computational tools
                    for engineers to evaluate its impact on improving engagement
                    and performance in other core subjects and “capstone” design
                    courses. The hypothesis is that, by learning how to simulate
                    these fundamental problems and visualize the solution,
                    students will become more engaged and have greater ability
                    to grasp concepts they learn in the traditional core classes
                    (machine design, heat transfer, and fluid mechanics). In
                    addition, a further hypothesis is that students will
                    demonstrate improved performance in capstone design courses
                    with an additional year of simulation training. Research
                    questions: (1) Does participation in a computer modeling
                    course for junior-level students increase performance in
                    core mechanical engineering courses, such as machine design,
                    fluid dynamics, and heat transfer? (2) Does a computer
                    modeling course for junior-level students increase
                    performance of those students as seniors enrolled in the
                    flagship “capstone design” course?
                  </p>
                </Collapsible>
              </Collapsible>

              <Collapsible trigger="1.2 Primary Study Endpoints">
                <p>
                  State the primary endpoints to be measured in the study.
                  Clinical trials typically have a primary objective or
                  endpoint. Additional objectives and endpoints are secondary.
                  The endpoints (or outcomes), determined for each study
                  subject, are the quantitative measurements required by the
                  objectives. Measuring the selected endpoints is the goal of a
                  trial (examples: response rate and survival).
                </p>
                <Collapsible trigger="For the research portion of the work">
                  <p>
                    The research could focus on athletes playing a wide range of
                    sports where there is a high chance of head injury. Primary
                    study endpoints in the first phase of study involving human
                    subjects include:
                  </p>
                  <p>
                    1. Impact measurements from the athletes. <br />
                    2. If neuroimaging is available, use pre- and
                    post-concussive scans from the subjects to create finite
                    element models and explore changes in diffusional measures.{' '}
                    <br />
                    3. Run impact simulations using the sensor data in the
                    cloud.
                  </p>
                </Collapsible>
                <Collapsible trigger="In the youth and community educational and outreach of the work">
                  <p>
                    There are multiple learning objectives that this Sideline
                    Science curriculum aims to teach and disseminate. Foremost,
                    participants will learn about careers; neurotechnology such
                    as brain simulations; and research related to neuroimaging,
                    neuroscience, high-performance computing, scientific
                    visualization, finite element modeling, and engineering.
                    Additionally, participants will learn about current
                    technology that may help improve safety on the field, as
                    well as the physics that is involved with head impacts and
                    the ways in which engineers contribute to sports safety. The
                    PI aims to leave the impression with participants about the
                    importance of an active lifestyle, the benefits of playing
                    sports, and the functions and applications of
                    neurotechnologies such as EEG in both healthcare and
                    research. Each year, the PI will coordinate the schedule for
                    the Sideline Science curriculum for the upcoming year with
                    community partners. He has already partnered with the Penn
                    State Center for Science and the Schools (CSATS), whose
                    staff will provide guidance regarding the development,
                    implementation, and assessment of the curriculum. The
                    primary educational research question to be investigated is
                    whether the Sideline Science curriculum increases awareness
                    of brain health in students in grades K–12. A series of
                    surveys will be offered before and after participating in
                    the Sideline Science activities. A log of participants will
                    likewise be maintained in order to determine the breadth of
                    the Sideline Science tent’s reach in promoting community
                    awareness of brain injury and knowledge about brain
                    mechanics and engineering.
                  </p>
                </Collapsible>
                <Collapsible trigger="In the university engineering educational portion of the work">
                  <p>
                    The hypothesis is that, by learning how to simulate these
                    fundamental problems and visualize the solution, students
                    will become more engaged and have greater ability to grasp
                    concepts they learn in the traditional core classes (machine
                    design, heat transfer, and fluid mechanics). In addition, a
                    further hypothesis is that students will demonstrate
                    improved performance in capstone design courses with an
                    additional year of simulation training. Research questions:
                    (1) Does participation in a computer modeling course for
                    junior-level students increase performance in core
                    mechanical engineering courses, such as machine design,
                    fluid dynamics, and heat transfer? (2) Does a computer
                    modeling course for junior-level students increase
                    performance of those students as seniors enrolled in the
                    flagship “capstone design” course? Study population: The
                    study will be multi-year and will include both comparison (n
                     30 per year) and intervention groups (n  30 per year).
                    Comparison populations will include junior-level students
                    not enrolled in ME 330 and taking machine design, fluids, or
                    heat transfer in the same cohort as the intervention group.
                    The intervention population will include students who are
                    enrolled in ME 330 and taking machine design, fluids, or
                    heat transfer in the same cohort as the comparison group.
                    Study Design: After IRB approval, data will be collected for
                    at least three years, beginning in the first year of the
                    award. Demographics will be collected to show that
                    comparison and intervention groups are similar in nature and
                    will include measures such as prior GPA or engineering GPA,
                    gender, ethnicity, and year in school. In comparing the two
                    groups, an independent t-test or a multivariate version of a
                    t-test will be used to analyze the data. To evaluate the two
                    groups, the PI will examine test and homework scores for
                    problems that are co-taught in the core and new
                    computational course. In addition, he will solicit feedback
                    from course instructors to get a sense if students are more
                    engaged.
                  </p>
                </Collapsible>
              </Collapsible>
              <Collapsible trigger="1.3 Secondary Study Endpoints">
                <p>
                  State the secondary endpoints to be measured in the study. n/a
                </p>
              </Collapsible>
            </Collapsible>
            <Collapsible trigger="2.0 Background">
              <Collapsible trigger="2.1 Scientific Background and Gaps">
                <p>
                  Describe the scientific background and gaps in current
                  knowledge.
                </p>
                <Collapsible trigger="For the research portion of the work">
                  <p>
                    TBI affects both military and civilian populations; for
                    example, 1.6 to 3.8 million individuals in the United States
                    experience a sports-related concussion annually, with a
                    growing number of these concussions experienced by youth.
                    White matter tissue is particularly vulnerable to mild TBI,
                    and damage to fiber tracts is believed to play a role in the
                    formation of neurologic and cognitive deficits that can
                    persist for years after a concussion is first experienced.
                    Little is understood about the underlying pathophysiology
                    that leads to long-term deficits after repeated brain
                    injuries or even after repetitive sub-concussive insults. A
                    single axonal fiber tract bundle may have hundreds to tens
                    of thousands of neurons. The mesoscopic length scale that
                    describes axonal organization is important because it helps
                    define the structural pathways of the brain. This proposal
                    is motivated by the need for greater detail and accuracy in
                    modeling the mesoscopic length scale in the brain,
                    specifically at the axonal tract level needed to enhance our
                    understanding of diffuse axonal injury and to pave the way
                    for quantitative means of capturing similar features of
                    brain tissue changes due to injury using the emerging field
                    of precision computational medicine.
                  </p>
                </Collapsible>
                <Collapsible trigger="In the youth and community educational and outreach of the work">
                  <p>
                    The importance of informal science learning experiences has
                    been documented as contributing to the interest and
                    understanding of science and engineering for all age groups.
                    The goal is to disseminate information about brain science,
                    biomechanics, and engineering research through the use of
                    engaging posters, demonstrations, and hands-on activities.
                    The plan includes a targeted collaboration to implement
                    Sideline Science curriculum at school districts with
                    populations of underrepresented minority students and will
                    include undergraduate and graduate students to work
                    alongside the PI to educate the general community. This
                    activity will employ a tailgate tent with the Sideline
                    Science banner, including the NSF logo proudly displayed.
                    These activities will be offered at one sporting or
                    community event per month, starting in Year 2. The
                    curriculum development is spread across the five years in
                    order to permit the development of well-designed content and
                    to include undergraduate and graduate students in the
                    creation and implementation of the curriculum. For instance,
                    the PI will leverage Penn State’s Learning Factory to work
                    with undergraduate students to develop the Sideline Science
                    demonstrations and hands-on activities during their senior
                    capstone design projects. The costs for these projects are
                    included in the budget. Design of the activities and
                    Sideline Science displays will follow recommended strategies
                    for optimizing audience participation and learning in
                    science, including engaging demonstrations and hands-on
                    content, concise summary of key facts, and interdependent
                    concepts across lessons.
                  </p>
                </Collapsible>
                <Collapsible trigger="In the university engineering educational portion of the work">
                  <p>
                    The PI’s passion for teaching computational mechanics more
                    broadly extends to his academic teaching responsibilities as
                    well. This year, the PI was approached by his department to
                    help design and implement a new course for junior-level
                    engineering students focused on modern computational tools.
                    The intention is to make this a required, core class for
                    junior-level students that establishes a “pipeline” of
                    training for computational methods. The course is aimed at
                    giving students perspective and introductory skills on the
                    use of modern computational tools for solving mechanical
                    engineering problems. The course will use SolidWorks
                    Simulation to study fundamental problems in solid mechanics
                    and fluids. Many of the applications are very similar to
                    problems students see in core subjects (also offered during
                    their junior year), including machine design, heat transfer,
                    and fluid mechanics. Through the implementation of the
                    course, the PI has identified two primary pedological
                    questions that would benefit from a systematic study
                    (described below). The addition of the new required, core
                    computational tools course, referred to as ME 330, could
                    have a significant impact on the department. Due to credit
                    limits, if this course is added, a different course must be
                    removed from the existing curriculum. In addition, there are
                    pedological questions that remain about the course.
                    Therefore, a systematic study of this course is greatly
                    needed. By conducting this systematic study, the PI will
                    further his CAREER goal of training students skilled in the
                    art of computational mechanics. A short description of the
                    study follows.
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
                    Combining improved understanding of changes that occur in
                    the brain at the time of impact with sideline video replay
                    of the behaviors that caused the impacts during game play
                    and practice will influence players to change their behavior
                    and develop safer techniques. This behavioral change will
                    steadily decrease the number and severity of dangerous
                    sub-concussive and concussive impacts that players
                    experience over the course of the season.severity of
                    dangerous sub-concussive and concussive impacts that players
                    experience over the course of the season.
                  </p>
                </Collapsible>
                <Collapsible trigger="In the youth and community educational and outreach of the work">
                  <p>
                    The importance of informal science learning experiences has
                    been documented as contributing to the interest and
                    understanding of science and engineering for all age groups.
                    The goal is to disseminate information about brain science,
                    biomechanics, and engineering research through the use of
                    engaging posters, demonstrations, and hands-on activities.
                  </p>
                </Collapsible>
                <Collapsible trigger="In the university engineering educational portion of the work">
                  <p>
                    This year, the PI was approached by his department to help
                    design and implement a new course for junior-level
                    engineering students focused on modern computational tools.
                    The intention is to make this a required, core class for
                    junior-level students that establishes a “pipeline” of
                    training for computational methods. The course is aimed at
                    giving students perspective and introductory skills on the
                    use of modern computational tools for solving mechanical
                    engineering problems. The course will use SolidWorks
                    Simulation to study fundamental problems in solid mechanics
                    and fluids. Many of the applications are very similar to
                    problems students see in core subjects (also offered during
                    their junior year), including machine design, heat transfer,
                    and fluid mechanics. Through the implementation of the
                    course, the PI has identified two primary pedological
                    questions that would benefit from a systematic study
                    (described below). The addition of the new required, core
                    computational tools course, referred to as ME 330, could
                    have a significant impact on the department. Due to credit
                    limits, if this course is added, a different course must be
                    removed from the existing curriculum. In addition, there are
                    pedological questions that remain about the course.
                    Therefore, a systematic study of this course is greatly
                    needed.
                  </p>
                </Collapsible>
              </Collapsible>
            </Collapsible>
            <Collapsible trigger="3.0 Inclusion and Exclusion Criteria">
              <p>
                Create a numbered list below in sections 3.1 and 3.2 of criteria
                subjects must meet to be eligible for study enrollment (e.g.,
                age, gender, diagnosis, etc.). Indicate specifically whether you
                will include any of the following vulnerable populations: (You
                may not include members of these populations as subjects in your
                research unless you indicate this in your inclusion criteria.)
                Review the corresponding checklists to ensure that you have
                provided the necessary information.
              </p>
              <Collapsible trigger="Adults unable to consent">
                <p>
                  Review “CHECKLIST: Cognitively Impaired Adults (HRP-417)” to
                  ensure that you have provided sufficient information. HRP-417
                  can be accessed by clicking the Library link in CATS IRB
                  (http://irb.psu.edu).
                </p>
              </Collapsible>
              <Collapsible trigger="Individuals who are not yet adults (infants, children, teenagers)">
                <p>
                  If the research involves persons who have not attained the
                  legal age for consent to treatments or procedures involved in
                  the research (“children”), review the “CHECKLIST: Children
                  (HRP-416)” to ensure that you have provided sufficient
                  information. HRP-416 can be accessed by clicking the Library
                  link in CATS IRB (http://irb.psu.edu).
                </p>
              </Collapsible>
              <Collapsible trigger="Pregnant women">
                <p>
                  Review “CHECKLIST: Pregnant Women (HRP-412)” to ensure that
                  you have provided sufficient information. HRP-412 can be
                  accessed by clicking the Library link in CATS IRB
                  (http://irb.psu.edu).
                </p>
              </Collapsible>
              <Collapsible trigger="Prisoners">
                <p>
                  Review “CHECKLIST: Prisoners (HRP-415)” to ensure that you
                  have provided sufficient information. HRP-415 can be accessed
                  by clicking the Library link in CATS IRB (http://irb.psu.edu).
                </p>
              </Collapsible>
              <Collapsible trigger="Neonates of uncertain viability or non-viable neonates">
                <p>
                  Review “CHECKLIST: Neonates (HRP-413)” or “CHECKLIST: Neonates
                  of Uncertain Viability (HRP-414)” to ensure that you have
                  provide sufficient information. HRP-413 and HRP-414 can be
                  accessed by clicking the Library link in CATS IRB
                  (http://irb.psu.edu).
                </p>
              </Collapsible>
              <Collapsible trigger="3.1 Inclusion Criteria">
                <p>
                  List the criteria that define who will be included in your
                  study.
                </p>
                <Collapsible trigger="For the research portion of the work">
                  <p>
                    Student athletes (ages 6-24) who have been medically cleared
                    to play by their school. <br /> Also: <br /> 1.
                    Student-athletes without any history of concussion. <br />{' '}
                    2. Student non-athletes without history of concussion.{' '}
                    <br /> 3. Students who can speak English. <br /> 4. Student
                    without any metal implants (to avoid problems during MRI).{' '}
                    <br /> 5. In addition, signed consent will be obtained for
                    all participants.
                  </p>
                </Collapsible>
                <Collapsible trigger="In the youth and community educational and outreach of the work">
                  <p>
                    1. Any member of youth or community is eligible to
                    participate.
                  </p>
                </Collapsible>
                <Collapsible trigger="In the university engineering educational portion of the work">
                  <p>
                    1. Any member of the enrolled course is eligible to
                    participate or are they teaching a course that could benefit
                    from the computational tools course (e.g. ME 360 or ME 440).{' '}
                    <br />
                    2. In addition, signed consent will be obtained for all
                    participants.
                  </p>
                </Collapsible>
              </Collapsible>
              <Collapsible trigger="3.2 Exclusion Criteria">
                <p>
                  List the criteria that define who will be excluded in your
                  study.
                </p>
                <Collapsible trigger="For the research portion of the work">
                  <p>
                    1. Students with previous history of concussion or
                    neurotrauma. <br />
                    2. Students with any type of implants in their bodies.{' '}
                    <br />
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
                    Insert subject withdrawal criteria (e.g., safety reasons,
                    failure of subject to adhere to protocol requirements,
                    subject consent withdrawal, disease progression, etc.).
                  </p>
                  <Collapsible trigger="For the research portion of the work">
                    <p>
                      Subjects will be removed from the study if they fail to
                      satisfy all the inclusion criteria mentioned above. They
                      will be removed from the study if it is found that they
                      provided PI with wrong information about their eligibility
                      criterion.
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
                    Describe when and how to withdraw subjects from the study;
                    the type and timing of the data to be collected for
                    withdrawal of subjects; whether and how subjects are to be
                    replaced; the follow-up for subjects withdrawn from
                    investigational treatment.
                  </p>
                  <Collapsible trigger="For the research portion of the work">
                    <p>
                      Subjects will be taken out of the research if they failed
                      to satisfy the above inclusion criteria. A letter will be
                      given explaining the reason for the withdrawal of the
                      subject to the athletic trainer, parents and student by
                      the PI.
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
            <Collapsible trigger="4.0 Recruitment Methods">
              <Collapsible trigger="4.1 Identification of subjects">
                <p>
                  Describe the methods that will be used to identify potential
                  subjects or the source of the subjects. If not recruiting
                  subjects directly (e.g., database query for eligible records
                  or samples) state what will be queried, how and by whom.
                </p>
                <Collapsible trigger="For the research portion of the work">
                  <p>
                    Potential subjects will be identified through meetings with
                    school administrators, trainers and coaches will take place
                    to find suitable research partners or they could be a
                    customer of the sensor companies partnered with. The number
                    of subjects will depend on the goals of the study or number
                    of teams and athlete/parents willing to participate, as well
                    as the work load of the research team and capabilities of
                    the method to do larger numbers. The grant states that at
                    least 5 players will be examined, but the PI would like to
                    do more if possible. Using sensors on entire teams of
                    approximately 30 players or more is not difficult and is
                    completely possible, however the modeling portion of the
                    research could take more time. At this time, it is not clear
                    if greater than 5 players can be modeled. If the PI finds
                    that the modeling is going fast, the number of participants
                    may be added that could reach into the 100s of players. For
                    the collegiate and high school athletes, the athletic
                    trainers will identify potential subjects. All the age
                    matched individuals (non-athletes) will be selected based on
                    information provided by school. For non-athletes, a school
                    administrator such as an athletic trainer or principle would
                    be asked to provide teachers and staff information about the
                    study. If students are interested to participate, they would
                    need to have research documents signed. The research team
                    would only be working with school administrators until the
                    documents are signed.
                  </p>
                </Collapsible>
                <Collapsible trigger="In the youth and community educational and outreach of the work">
                  <p>
                    Potential subjects will be youth and community members that
                    stop by the activity booth and express interest. Activity
                    booth will be a tailgate tent with NSF and PSU logo and the
                    words Sideline Science on the side. This will be set up near
                    sports events where there is space and outside in visitor
                    area of Discovery Space in State College.
                  </p>
                </Collapsible>
                <Collapsible trigger="In the university engineering educational portion of the work">
                  <p>
                    Potential subjects will be students enrolled in
                    computational tools course. Or if they are participating as
                    professors, they would be teaching a course that might
                    benefit from the new computational tools course.
                  </p>
                </Collapsible>
              </Collapsible>
              <Collapsible trigger="4.2 Recruitment process">
                <p>
                  Describe how, where and when potential subjects will be
                  recruited (e.g., approaching or providing information to
                  potential subjects for participation in this research study).
                </p>
                <Collapsible trigger="For the research portion of the work">
                  <p>
                    Administrators of school districts, youth or club
                    organizations will be invited based on the objective of the
                    research study. A letter explaining the nature, participant
                    expectations and the purpose of the study will be provided.
                    Subjects will be recruited in person or through letter
                    through contacts with the sensor companies or collaborations
                    we make with schools.
                  </p>
                </Collapsible>
                <Collapsible trigger="In the youth and community educational and outreach of the work">
                  <p>
                    Subjects will be recruited in person by asking people who
                    walk by booth.
                  </p>
                </Collapsible>
                <Collapsible trigger="In the university engineering educational portion of the work">
                  <p>
                    Subjects will be recruited in person by asking in beginning
                    of course. If they are professors they will be asked prior
                    to the beginning of the course.
                  </p>
                </Collapsible>
              </Collapsible>
              <Collapsible trigger="4.3 Recruitment materials">
                <p>
                  List the materials that will be used to recruit subjects. Add
                  recruitment documents to your study in CATS IRB
                  (http://irb.psu.edu) on the “Consent Forms and Recruitment
                  Materials” page. For advertisements, upload the final copy of
                  printed advertisements. When advertisements are taped for
                  broadcast, attach the final audio/video tape. You may submit
                  the wording of the advertisement prior to taping to preclude
                  re-taping because of inappropriate wording, provided the IRB
                  reviews the final audio/video tape. See Section 4.2 for letter
                  that will be provided to school leaders, youth and community
                  audiences and engineering students.
                </p>
              </Collapsible>
              <Collapsible trigger="4.4 Eligibility/screening of subjects">
                <p>
                  If potential subjects will be asked eligibility questions
                  before obtaining informed consent, describe the process. Add
                  the script documents and a list of the eligibility questions
                  that will be used to your study in CATS IRB
                  (http://irb.psu.edu) on the “Consent Forms and Recruitment
                  Materials” page. See attached documents.
                </p>
                <Collapsible trigger="For the research portion of the work">
                  <p>
                    The screening process will take place at the locations of
                    the participating research teams. The study team will ask
                    and confirm with participants and/or guardians if they meet
                    the inclusion criteria and confirm they do not meet the
                    exclusion criteria.
                  </p>
                </Collapsible>
                <Collapsible trigger="In the youth and community educational and outreach of the work">
                  <p>
                    The screening process will take place at the locations of
                    the schools, community events and locations (e.g. Discovery
                    Space). The study team will ask and confirm with
                    participants and/or guardians if they meet the inclusion
                    criteria and confirm they do not meet the exclusion
                    criteria.
                  </p>
                </Collapsible>
                <Collapsible trigger="In the university engineering educational portion of the work">
                  <p>
                    The screening process of potential subjects will take place
                    at University Park classroom. The study team will ask
                    participants and confirm if they meet the inclusion criteria
                    and confirm they do not meet the exclusion criteria.
                    Professors teaching a course that might benefit would be
                    eligible.
                  </p>
                </Collapsible>
              </Collapsible>
            </Collapsible>
            <Collapsible trigger="5.0 Consent Process and Documentation ">
              <p>
                Refer to “SOP: Informed Consent Process for Research (HRP-090)”,
                for information about the process of obtaining informed consent
                from subjects. HRP-090 can be accessed by clicking the Library
                link in CATS IRB (http://irb.psu.edu).
              </p>
              <Collapsible trigger="5.1 Consent Process">
                <Collapsible trigger="5.1.1 Obtaining Informed Consent">
                  <Collapsible trigger="5.1.1.1 Timing and Location of Consent">
                    <p>
                      Describe where and when the consent process will take
                      place.
                    </p>
                    <Collapsible trigger="For the research portion of the work">
                      <p>
                        The consent process will take place at the locations of
                        the participating research teams.
                      </p>
                    </Collapsible>
                    <Collapsible trigger="In the youth and community educational and outreach of the work">
                      <p>
                        The consent process will take place at the locations of
                        the schools, community events and locations (e.g.
                        Discovery Space).
                      </p>
                    </Collapsible>
                    <Collapsible trigger="In the university engineering educational portion of the work">
                      <p>
                        Potential subjects will be students enrolled in
                        computational tools course and will be asked about it in
                        class. Professors would be asked before the start of the
                        course.
                      </p>
                    </Collapsible>
                  </Collapsible>
                  <Collapsible trigger="5.1.1.2 Coercion or Undue Influence during Consent">
                    <p>
                      Describe the steps that will be taken to minimize the
                      possibility of coercion or undue influence in the consent
                      process.
                    </p>
                    <Collapsible trigger="For the research portion of the work">
                      <p>
                        We will explain the research study once and provide only
                        one invitation. After that, we will not ask again.
                      </p>
                    </Collapsible>
                    <Collapsible trigger="In the youth and community educational and outreach of the work">
                      <p>
                        We will explain the research study once and provide only
                        one invitation. After that, we will not ask again.
                      </p>
                    </Collapsible>
                    <Collapsible trigger="In the university engineering educational portion of the work">
                      <p>
                        We will explain the research study once and provide only
                        one invitation. After that, we will not ask again. The
                        instructor of the engineering course will be a member of
                        the research team. Therefore, another member of the team
                        (a graduate student, to be named) consents. However, the
                        study is no way tied to course grades or graded
                        assignments for the participating study.
                      </p>
                    </Collapsible>
                  </Collapsible>
                </Collapsible>
                <Collapsible trigger="5.1.2 Waiver or alteration of the informed consent requirement">
                  <p>
                    If you are requesting a waiver or alteration of consent
                    (consent will not be obtained, required information will not
                    be disclosed, or the research involves deception), describe
                    the rationale for the request in this section. If the
                    alteration is because of deception or incomplete disclosure,
                    explain whether and how subjects will be debriefed. Add any
                    debriefing materials or document(s) to your study in CATS
                    IRB (http://irb.psu.edu) on the “Supporting Documents” page.
                    NOTE: Review the “CHECKLIST: Waiver or Alteration of Consent
                    Process (HRP-410)” to ensure you have provided sufficient
                    information for the IRB to make these determinations.
                    HRP-410 can be accessed by clicking the Library link in CATS
                    IRB (http://irb.psu.edu).{' '}
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
              <Collapsible trigger="5.2 Consent Documentation">
                <Collapsible trigger="5.2.1 Written Documentation of Consent">
                  <p>
                    Refer to “SOP: Written Documentation of Consent (HRP-091)”
                    for information about the process to document the informed
                    consent process in writing. HRP-091 can be accessed by
                    clicking the Library link in CATS IRB (http://irb.psu.edu).
                    If you will document consent in writing, describe how
                    consent of the subject will be documented in writing. Add
                    the consent document(s) to your study in CATS IRB
                    (http://irb.psu.edu) on the “Consent Forms and Recruitment
                    Materials” page. Links to Penn State’s consent templates are
                    available in the same location where they are uploaded and
                    their use is required.
                  </p>
                  <Collapsible trigger="For the research portion of the work">
                    <p>
                      A copy of the consent document will be provided for
                      participants records.{' '}
                    </p>
                  </Collapsible>
                  <Collapsible trigger="In the youth and community educational and outreach of the work">
                    <p>
                      A copy of the consent document will be provided for
                      participants records.{' '}
                    </p>
                  </Collapsible>
                  <Collapsible trigger="In the university engineering educational portion of the work">
                    <p>
                      A copy of the consent document will be provided for
                      participants records (both students and faculty
                      participating).
                    </p>
                  </Collapsible>
                </Collapsible>
                <Collapsible trigger="5.2.2 Waiver of Documentation of Consent (Implied consent, Verbal consent, etc.)">
                  <p>
                    If you will obtain consent (verbal or implied), but not
                    document consent in writing, describe how consent will be
                    obtained. Add the consent script(s) and/or information
                    sheet(s) to your study in CATS IRB (http://irb.psu.edu) on
                    the “Consent Forms and Recruitment Materials” page. Links to
                    Penn State’s consent templates are available in the same
                    location where they are uploaded and their use is required.
                    Review “CHECKLIST: Waiver of Written Documentation of
                    Consent (HRP-411)” to ensure that you have provided
                    sufficient information. HRP-411 can be accessed by clicking
                    the Library link in CATS IRB (http://irb.psu.edu). If your
                    research presents no more than minimal risk of harm to
                    subjects and involves no procedures for which written
                    documentation of consent is normally required outside of the
                    research context, the IRB will generally waive the
                    requirement to obtain written documentation of consent.
                  </p>
                </Collapsible>
              </Collapsible>
            </Collapsible>
          </div>
        </div>
        {/* <Footer /> */}
      </React.Fragment>
    );
  }
}

export default IRBLinkContent;
