import React from 'react';
import Collapsible from 'react-collapsible';

class Section8 extends React.Component {
  render() {
    return (
      <Collapsible trigger="8.0 Subject Numbers and Statistical Plan">
        <Collapsible trigger="8.1 Number of Subjects">
          <p>
            Indicate the total number of subjects to be accrued. If applicable,
            distinguish between the number of subjects who are expected to be
            enrolled and screened, and the number of subjects needed to complete
            the research procedures (i.e., numbers of subjects excluding screen
            failures.)
          </p>
          <Collapsible trigger="For the research portion of the work">
            <p>
              In proposal, the PI proposed: to explore the feasibility of the
              concept within the scope of this workathletes from high-risk
              positions will be targeted for this initial study. More may be
              enrolled due to the fact that there may be some withdraws, but the
              PI estimates no more than 500. Fewer participants will be enrolled
              for the non-athlete population. The predictions from simulations
              will be correlated with a capturing similar features of brain
              tissue changes due to injury. Once the concept is demonstrated, it
              can be scaled up to a full scientific study with controls (beyond
              the scope of this proposal).{' '}
            </p>
          </Collapsible>
          <Collapsible trigger="In the youth and community educational and outreach of the work">
            <p>
              As many people participate in activity. The PI anticipates 20-30
              individuals per year for 4 years.
            </p>
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            <p>
              The study will be multi-year that will last the entire duration of
              the grant (5 years) and will include both comparison (n  30 per
              year) and intervention groups (n  30 per year). Comparison
              populations will include junior-level students not enrolled in ME
              330 and taking machine design, fluids, or heat transfer in the
              same cohort as the intervention group. The intervention population
              will include students who are enrolled in ME 330 and taking
              machine design, fluids, or heat transfer in the same cohort as the
              comparison group.
            </p>
          </Collapsible>
        </Collapsible>

        <Collapsible trigger="8.2 Sample size determination">
          <p>
            If applicable, provide a justification of the sample size outlined
            in section 8.1 – to include reflections on, or calculations of, the
            power of the study.
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
        <Collapsible trigger="8.3 Statistical methods">
          <p>
            Describe the statistical methods (or non-statistical methods of
            analysis) that will be employed.
          </p>
          <Collapsible trigger="For the research portion of the work">
            <p>
              Predictions of brain tissue strain will be reported and compared
              to injury studies in literature. Diffusion measures such as
              fractional anisotropy will be analyzed can compared for pre and
              post studies for the athletes and non-athletes.
            </p>
          </Collapsible>
          <Collapsible trigger="In the youth and community educational and outreach of the work">
            <p>
              We expect twenty or so people per year. We will plot the results
              on a bar chart and report averages with standard deviations.
            </p>
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            <p>
              In comparing the two groups, an independent t-test or a
              multivariate version of a t-test will be used to analyze the data.
              To evaluate the two groups, the PI will examine test and homework
              scores for problems that are co-taught in the core and new
              computational course. In addition, he will solicit feedback from
              course instructors to get a sense if students are more engaged.
            </p>
          </Collapsible>
        </Collapsible>
      </Collapsible>
    );
  }
}

export default Section8;
