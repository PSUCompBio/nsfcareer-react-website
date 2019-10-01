import React from 'react';
import Collapsible from 'react-collapsible';

class Section7 extends React.Component {
  render() {
    return (
      <Collapsible trigger="7.0 Study Design and Procedures">
        <Collapsible trigger="7.1 Study Design">
          <p>Describe and explain the study design.</p>
          <Collapsible trigger="For the research portion of the work">
            <p>
              his is an exploratory to show proof of concept. The proposed
              research grant proposes 5 subjects that will be studied. However
              ideally, we would have more (e.g. n=30). This effort will apply
              the PI’s advanced brain models, including the embedded element
              method, to model fiber tractography. This work will continue a
              collaboration with Athlete Intelligence, a small company that
              focuses on wearable biomechanical sensors. Assuming about 20 days
              of practice per month, there are an estimated 500 impacts
              sustained per season (3 months) for one player. Although
              eventually there could be a simulation for each impact, this work
              will focus on a small subset. The analysis will run in Amazon’s
              E2C computing resource and will read from the Athlete Intelligence
              Application Programming Interface (API). With this platform in
              place, it will be possible to explore whether computer modeling
              can be applied to help capturing similar features of brain tissue
              changes and monitor tissue changes over time. To explore the
              feasibility of the concept within the scope of this work, five
              athletes from high-risk positions will be targeted for this
              initial study. The predictions from simulations will be correlated
              with capturing similar features of brain tissue changes due to
              injury. Once the concept is demonstrated, it can be scaled up to a
              full scientific study with controls (beyond the scope of this
              proposal).
            </p>
          </Collapsible>
          <Collapsible trigger="In the youth and community educational and outreach of the work">
            <p>
              In the first year, the PI will meet with the two committed K–12
              organizations about hosting Sideline Science; present the full
              plan; and obtain feedback on the proposed demonstrations,
              timeline, and required space. Through a prior NSF project, the PI
              has a connection with a high school in York, PA, where the student
              body makeup is 37% minority. The second organization is the
              Discovery Space, located in State College, PA, whose mission is to
              provide engaging science experiences that spark creativity,
              curiosity, and imagination in the preK–5 age groups. Institutional
              Review Board (IRB) approval will be obtained and curriculum
              development will also begin in Year 1 using neuroimaging data from
              the research described. Examples of content that is likely to be
              included are interesting facts about the brain, descriptions of
              new and upcoming neurotechnologies, and captivating images of
              fiber tractography. The creation of hands-on activities will also
              begin in Year 1, with five well-designed activities ready by the
              conclusion of the project. The first year’s activity will be the
              creation of an instrumented, transparent head surrogate that shows
              how head impacts affect intracranial accelerations and
              displacements. The surrogate will consist of a hard, transparent
              plastic material representing the skull (AnatomyWarehouse) with a
              life-like soft brain (ShopAnatomical) inside. A pressure sensor
              (Mbientlabs, Inc., already acquired) will be embedded in the
              polymer gel and will be connected to a laptop for real-time
              visualization. Early in Year 2, the PI will design the Sideline
              Science tent with the NSF logo (budgeted) and plan the best
              placement and flow of demonstrations for participants. In
              addition, in Year 2, the second Sideline Science activity will be
              created. This will entail the use of Paraview (Kitware, Inc.), an
              open-source visualization software, to create a visualization
              scene from brain simulations that will allow participants to
              manipulate and interact with the data. Using Paraview’s built-in
              tools, users will be able to activate various anatomic layers to
              visualize inside the brain. For example, the skull might be made
              transparent so that participants are able to see stress waves
              propagate through the skull and brain. In Year 3, the third
              Sideline Science activity will be created. For this activity,
              MR-DTI will be obtained for an intact celery stalk and a stalk
              with various degrees of induced damage. A poster displaying images
              from pre- and post-damage diffusion imaging will be created. The
              demonstration will include showing participants damage done to
              actual pieces of celery and allowing participants to examine this
              damage under a microscope. In Year 4, the fourth Sideline Science
              demonstration will be created that will focus on the benefits of
              sports on brain health with a hands-on demonstration using
              off-the-shelf electroencephalography (EEG) technology that allows
              players to see their brain waves. Here, the PI believes that it is
              crucial to avoid perpetuating an overly negative narrative
              concerning impact sports. An increase in alpha-1 activity (7.5–10
              Hz) immediately after exercise has been demonstrated and is
              localized to the left frontal gyrus. Using the NeuroSky platform,
              which provides free applications for reading brain waves (alpha-1
              included), interested participants will be able to measure their
              baseline alpha activity, do 20 jumping jacks or run in place for
              20 seconds, and then measure their alpha waves again. In Year 5,
              the fifth Sideline Science activity will modify the head impact
              surrogate activity developed in Year 1 to include commercial
              biomechanical sensors, such as the “Cue” sensor by Athlete
              Intelligence, Inc. The goal is to demonstrate how sensors can be
              used on the sports field.{' '}
            </p>
            <Collapsible trigger="Learning Goals –">
              <p>
                here are multiple learning objectives that this Sideline Science
                curriculum aims to teach and disseminate. Foremost, participants
                will learn about careers; neurotechnology such as brain
                simulations; and research related to neuroimaging, neuroscience,
                high-performance computing, scientific visualization, finite
                element modeling, and engineering. Additionally, participants
                will learn about current technology that may help improve safety
                on the field, as well as the physics that is involved with head
                impacts and the ways in which engineers contribute to sports
                safety. The PI aims to leave the impression with participants
                about the importance of an active lifestyle, the benefits of
                playing sports, and the functions and applications of
                neurotechnologies such as EEG in both healthcare and research.
                The cost of creating these activities are included in the
                budget.
              </p>
            </Collapsible>
            <Collapsible trigger="Measuring Success –">
              <p>
                Each year, the PI will coordinate the schedule for the Sideline
                Science curriculum for the upcoming year with community
                partners. He has already partnered with the Penn State Center
                for Science and the Schools (CSATS), whose staff will provide
                guidance regarding the development, implementation, and
                assessment of the curriculum. The primary educational research
                question to be investigated is whether the Sideline Science
                curriculum increases awareness of brain health in students in
                grades K–12. A series of surveys will be offered before and
                after participating in the Sideline Science activities. A log of
                participants will likewise be maintained in order to determine
                the breadth of the Sideline Science tent’s reach in promoting
                community awareness of brain injury and knowledge about brain
                mechanics and engineering.{' '}
              </p>
            </Collapsible>
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            <Collapsible trigger="Detailed Plan – Hypothesis: ">
              <p>
                The hypothesis is that, by learning how to simulate these
                fundamental problems and visualize the solution, students will
                become more engaged and have greater ability to grasp concepts
                they learn in the traditional core classes (machine design, heat
                transfer, and fluid mechanics). In addition, a further
                hypothesis is that students will demonstrate improved
                performance in capstone design courses with an additional year
                of simulation training. Research questions: (1) Does
                participation in a computer modeling course for junior-level
                students increase performance in core mechanical engineering
                courses, such as machine design, fluid dynamics, and heat
                transfer? (2) Does a computer modeling course for junior-level
                students increase performance of those students as seniors
                enrolled in the flagship “capstone design” course? Study
                population: The study will be multi-year and will include both
                comparison (n  30 per year) and intervention groups (n  30 per
                year). Comparison populations will include junior-level students
                not enrolled in ME 330 and taking machine design, fluids, or
                heat transfer in the same cohort as the intervention group. The
                intervention population will include students who are enrolled
                in ME 330 and taking machine design, fluids, or heat transfer in
                the same cohort as the comparison group. Study Design: After IRB
                approval, data will be collected for at least three years,
                beginning in the first year of the award. Demographics will be
                collected to show that comparison and intervention groups are
                similar in nature and will include measures such as prior GPA or
                engineering GPA, gender, ethnicity, and year in school. In
                comparing the two groups, an independent t-test or a
                multivariate version of a t-test will be used to analyze the
                data. To evaluate the two groups, the PI will examine test and
                homework scores for problems that are co-taught in the core and
                new computational course. In addition, he will solicit feedback
                from course instructors to get a sense if students are more
                engaged. The feedback will be open ended based on their prior
                experience and will be obtained verbally or through email. The
                study team will ask for the instructors to offer any
                observations they can make. Dissemination: The results of the
                multi-year study of the new course will be submitted to
                Engineering Education journals. Connection with Research: In
                addition, some content and lessons developed for the course will
                pertain to the PI’s research. For example, brain tissue will be
                discussed when discussing nonlinear materials models, which is
                one of the topics covered. Also, transient impact simulations
                are discussed as part of the curriculum. A simplified head
                impact simulation will be used from the research to communicate
                some ideas from impact studies. Deidentified course grades will
                be obtained from course instructors (yet to be determined) via
                Penn State email.
              </p>
            </Collapsible>
          </Collapsible>
        </Collapsible>
        <Collapsible trigger="7.2 Study Procedures">
          <p>
            Provide a description of all research procedures being performed and
            when they are being performed (broken out by visit, if applicable),
            including procedures being performed to monitor subjects for safety
            or minimize risks. Include any long-term follow-up procedures and
            data collection, if applicable. Describe where or how you will be
            obtaining information about subjects (e.g., medical records, school
            records, surveys, interview questions, focus group topics, audio or
            video recordings, data collection forms, and collection of specimens
            through invasive or non-invasive procedures to include the amount to
            be collected and how often). Add any data collection instruments
            that will be seen by subjects to your study in CATS IRB
            (http://irb.psu.edu) in the “Supporting Documents” page.
          </p>
          <Collapsible trigger="7.2.1 EXAMPLE: Visit 1 or Day 1 or Pre-test, etc. (format accordingly)">
            <p>
              Provide a description as defined above and format accordingly.
            </p>
            <Collapsible trigger="For the research portion of the work">
              <p>
                The PI and research team will meet individuals at the field. If
                under 18, a research consent approval form will be sent home for
                signature. Athletes will also have to be instrumented or sent
                home with sensors. They will need to agree with data
                policies/constraints and use agreements offered from sensor
                company. MbientLab’s and Prevent Biometrics data and privacy
                details are included in the IBR supporting documents. So, they
                have to accept that as well as our consent form. Once consent is
                complete at athletes have sensors, data can start to be sent to
                cloud for sensor company and the cloud used in this research.
                Athletes would also undergo MRI/DTI scanning. Athletes are not
                expected to perform any special activities other than paly their
                sport as they normally would. They are not constraint on
                location, at long as they are on the near or on the playing
                field sensor data can be collected. For non-athletes enrolled in
                study, they would only need MRI scans near the time of the
                pre-injury scans of the athletes and near post-injury if
                athletes sustain a concussion. They will not be wearing sensors.
                The goal is to compare their MRI brain scan to injured players
                to see if there are differences.
              </p>
              <Collapsible trigger="In the youth and community educational and outreach of the work">
                <p>
                  After consent, participates will be given survey about brain
                  science/health, they will interact with the Sideline Science
                  activities, then on exit they will take another survey.
                </p>
              </Collapsible>
            </Collapsible>
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            <p>
              After consent, participates will just take the course. Surveys
              will be given in later courses and student GPAs and performance
              will be monitored.
            </p>
            <Collapsible trigger="Study population:">
              <p>
                The study will be multi-year and will include both comparison (n
                 30 per year) and intervention groups (n  30 per year).
                Comparison populations will include junior-level students not
                enrolled in ME 330 and taking machine design, fluids, or heat
                transfer in the same cohort as the intervention group. The
                intervention population will include students who are enrolled
                in ME 330 and taking machine design, fluids, or heat transfer in
                the same cohort as the comparison group. If the participants are
                the instructors, they would need to assist the study team in
                collected the data and providing the surveys.
              </p>
            </Collapsible>
          </Collapsible>
          <Collapsible trigger="7.2.2 EXAMPLE: Visit 2 or Day 2 or Post-test, etc. (format accordingly)">
            <p>
              Provide a description as defined above and format accordingly.
            </p>
            <Collapsible trigger="For the research portion of the work">
              <p>
                As long as athletes are wearing sensors, data will be collected,
                and brain simulations could be conducted. Ideally, athletes
                would also undergo post-concussion MRI/DTI scanning. Once
                diagnosed by medical doctor (the medically accepted comparison)
                with a concussion, athletes will communicate the diagnosis to
                the study team and will be requested to receive a post MRI scan.
                They will be accompanied by guardian or friend to travel to MRI.{' '}
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
        <Collapsible trigger="7.3 Duration of Participation">
          <p>
            Describe the duration of an individual subject’s participation in
            the study.
          </p>
          <Collapsible trigger="For the research portion of the work">
            <p>
              As long as athletes are wearing sensors, data will be collected,
              and brain simulations could be conducted. Could be up to 5 years
              if continuous play (length of study).
            </p>
          </Collapsible>
          <Collapsible trigger="In the youth and community educational and outreach of the work">
            <p>
              n/a. The duration of the surveys will be about 1-2 minutes asking
              5 or so questions about the brain. The participants would be
              involved for about 5-10 minutes. However long it takes them to go
              through the activities, which are designed to be fun and
              informative.
            </p>
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            <p>
              3-4 years data will be collected and analyze. Once when taking
              computational tools course and once that they are enrolled in
              senior level courses. The duration of the surveys will be 3-4
              minutes with 10 or so questions.
            </p>
          </Collapsible>
        </Collapsible>
      </Collapsible>
    );
  }
}

export default Section7;
