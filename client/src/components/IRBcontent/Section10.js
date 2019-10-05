import React from 'react';
import Collapsible from 'react-collapsible';

class Section10 extends React.Component {
  render() {
    return (
      <Collapsible trigger="10.0 Data and Safety Monitoring Plan">
        <p>
          <b>
            This section is required when research involves more than Minimal
            Risk to subjects.{' '}
          </b>
          As defined in “SOP: Definitions (HRP-001)”, available in the Library
          in CATS IRB (http://irb.psu.edu), Minimal Risk is defined as the
          probability and magnitude of harm or discomfort anticipated in the
          research that are not greater in and of themselves than those
          ordinarily encountered in daily life or during the performance of
          routine physical or psychological examinations or tests. For research
          involving prisoners, Minimal Risk is the robability and magnitude of
          physical or psychological harm that is normally encountered in the
          daily lives, or in the routine medical, dental, or psychological
          examination of healthy persons.
          <b>
            Please complete the sections below if the research involves more
            than minimal risk to subjects OR indicate as not applicable.{' '}
          </b>
        </p>
        <Collapsible trigger="10.1 Periodic evaluation of data">
          <p>
            Describe the plan to periodically evaluate the data collected
            regarding both harms and benefits to determine whether subjects
            remain safe.
          </p>
          <Collapsible trigger="For the research portion of the work">
            <p>Not applicable.</p>
          </Collapsible>
          <Collapsible trigger="In the youth and community educational and outreach of the work">
            <p>Not applicable.</p>
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            <p>Not applicable.</p>
          </Collapsible>
        </Collapsible>
        <Collapsible trigger="10.2 Data that are reviewed">
          <p>
            Describe the data that are reviewed, including safety data, untoward
            events, and efficacy data.
          </p>
          <Collapsible trigger="For the research portion of the work">
            <p>Not applicable.</p>
          </Collapsible>
          <Collapsible trigger="In the youth and community educational and outreach of the work">
            <p>Not applicable.</p>
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            <p>Not applicable.</p>
          </Collapsible>
        </Collapsible>

        <Collapsible trigger="10.3 Method of collection of safety information">
          <p>
            Describe the method by which the safety information will be
            collected (e.g., with case report forms, at study visits, by
            telephone calls and with subjects).
          </p>
          <Collapsible trigger="For the research portion of the work">
            <p>Not applicable.</p>
          </Collapsible>
          <Collapsible trigger="In the youth and community educational and outreach of the work">
            <p>Not applicable.</p>
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            <p>Not applicable.</p>
          </Collapsible>
        </Collapsible>
        <Collapsible trigger="10.4 Frequency of data collection">
          <p>
            Describe the frequency of data collection, including when safety
            data collection starts. Not applicable.
          </p>
        </Collapsible>
        <Collapsible trigger="10.5 Individuals reviewing the data">
          <p>
            Identify the individuals who will review the data. The plan might
            include establishing a data and safety monitoring committee and a
            plan for reporting data monitoring committee findings to the IRB and
            the sponsor. Not applicable.
          </p>
        </Collapsible>
        <Collapsible trigger="10.6 Frequency of review of cumulative data">
          <p>Describe the frequency or periodicity of review of cumulative data. Not applicable.</p>
        </Collapsible>
        <Collapsible trigger="10.7 Statistical tests">
          <p>Describe the statistical tests for analyzing the safety data to determine whether harms are occurring.</p>
          <Collapsible trigger="For the research portion of the work">
            <p>N/A. Study is minimal risk to subjects.</p>
          </Collapsible>
          <Collapsible trigger="In the youth and community educational and outreach of the work">
            <p>N/A. Study is minimal risk to subjects.</p>
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            <p>N/A. Study is minimal risk to subjects.</p>
          </Collapsible>
        </Collapsible>
        <Collapsible trigger="10.8 Suspension of research">
          <p>Describe any conditions that trigger an immediate suspension of research.</p>
          <Collapsible trigger="For the research portion of the work	">
            <p>None.</p>
          </Collapsible>
          <Collapsible trigger="In the youth and community educational and outreach of the work">
            <p>None.</p>
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            <p>None.</p>
          </Collapsible>
        </Collapsible>
      </Collapsible>
    );
  }
}

export default Section10;
