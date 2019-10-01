import React from 'react';
import Collapsible from 'react-collapsible';

class Section9 extends React.Component {
  render() {
    return (
      <Collapsible trigger="9.0 Confidentiality, Privacy and Data Management ">
        <p>
          <b>
            For research being conducted at Penn State Hershey or by Penn State
            Hershey researchers only,
          </b>
          the research data security and integrity plan is submitted using
          “HRP-598 – Research Data Plan Review Form Application Supplement”,
          which is available in the Library in CATS IRB (http://irb.psu.edu).
          Refer to Penn State College of Medicine IRB’s “Standard Operating
          Procedure Addendum: Security and Integrity of Human Research Data”,
          which is available on the IRB’s website.
          <b>
            In order to avoid redundancy, for this section state “See the
            Research Data Plan Review Form” in section 9.0 if you are conducting
            Penn State Hershey research and move on to section 10.
          </b>
        </p>
        <p>
          <b>For all other research,</b> in the sections below, describe the
          steps that will be taken to secure the data during storage, use and
          transmission.
        </p>
        <Collapsible trigger="9.1 Confidentiality">
          <Collapsible trigger="9.1.1 Identifiers associated with data and/or specimens">
            <p>
              List the identifiers that will be included or associated with the
              data and/or specimens in any way (e.g., names, addresses,
              telephone/fax numbers, email addresses, dates (date of birth,
              admission/discharge dates, etc.), medical record numbers, social
              security numbers, health plan beneficiary numbers, etc.). If no
              identifiers will be included or associated with the data in any
              way, whether directly or indirectly, please indicate this instead.
            </p>
            <Collapsible trigger="For the research portion of the work">
              <p>
                Identifiers the PI can think of currently includes: names,
                position, team, school, date of birth, guardian name, telephone,
                “player ID”, image of player, finite element mesh, email
                address, IRB consent form.
              </p>
            </Collapsible>
            <Collapsible trigger="9.1.1.1 Use of Codes, Master List">
              <p>
                If identifiers will be associated with the data and/or specimens
                (as indicated in section 9.1.1 above), describe whether a master
                record or list containing a code (i.e., code number, pseudonyms)
                will be used to separate the data collected from identifiable
                information, where that master code list will be stored, who
                will have access to the master code list, and when it will be
                destroyed. If identifiers are included or associated with the
                data as described in section 9.1.1 above, but no master record
                or list containing a code will be used, it will be assumed by
                the IRB that the investigator plans to directly link the
                identifiers with the data.
              </p>
              <Collapsible trigger="For the research portion of the work">
                <p>
                  A “player ID” will be used when discussing data. The PI and
                  his research team will hold a master list that may be linked
                  with identifiable information. This list will be destroyed
                  after the completion of the study. The storage location of the
                  master list will be on the PI’s PSU owned computer which is
                  also stored on PSU Box cloud system. The same security applied
                  to the PI’s PSU-owned laptop will thus be applied to the
                  master list. In addition, since one goal of the study is to
                  develop and validate a sensor-enabled cloud-based computing
                  platform, data (as described in Section 9.1.1) will be stored
                  on the Penn State sponsored cloud (e.g. AWS, IBM, Google or
                  Azure).{' '}
                </p>
              </Collapsible>
              <Collapsible trigger="In the youth and community educational and outreach of the work">
                <p>None</p>
              </Collapsible>
              <Collapsible trigger="In the university engineering educational portion of the work">
                <p>
                  A “student ID” will be used when discussing data. The PI and
                  select graduate student working for PI will hold a master list
                  that may be linked with identifiable information. This list
                  will be destroyed after the completion of the study.{' '}
                </p>
              </Collapsible>
            </Collapsible>
          </Collapsible>
          <Collapsible trigger="9.1.2 Storage of Data and/or Specimens">
            <p>
              IDescribe where, how and for how long the data (hardcopy (paper)
              and/or electronic data) and/or specimens will be stored. NOTE:
              Data can include paper files, data on the internet or websites,
              computer files, audio/video files, photographs, etc. and should be
              considered in the responses. Refer to the “Investigator Manual
              (HRP-103)” for information about how long research records must be
              stored following the completion of the research prior to
              completing this section. HRP-103 can be accessed by clicking the
              Library link in CATS IRB (http://irb.psu.edu). Please review Penn
              State’s Data Categorization Project for detailed information
              regarding the appropriate and allowable storage of research data
              collected according to Penn State Policy AD71. Although the IRB
              can impose greater confidentiality/security requirements
              (particularly for sensitive data), the IRB cannot approve storage
              of research data in any way or using any service that is not
              permissible by Penn State Policy AD71.
            </p>
            <Collapsible trigger="For the research portion of the work">
              <p>
                Sensor data stored on sensor companies (in this case Mbient
                Lab’s or Prevent Biometrics cloud). Details on Mbient Lab’s and
                Prevent Biometrics privacy policies are included in the
                supporting IRB documents. Accounts would be created by the
                sensor company representative, the study team members, the
                guardian, the player or an authorized user (such as coach or
                athletic trainer). The procedure would be to use an email or
                user ID and password and assign unique sensor ID with the
                account. Penn State would gain access to data as soon as the
                data is uploaded to cloud, typically within a few hours of an
                impact. By agreeing to be in this study you also grant us
                permission to access your sensor data. In addition, since one
                goal of the study is to develop and validate a sensor-enabled
                cloud-based computing platform, data (as described in Section
                9.1.1) will be stored on the Penn State sponsored cloud (e.g.
                AWS, IBM, Google or Azure).{' '}
              </p>
            </Collapsible>
            <Collapsible trigger="Data Security and Privacy:">
              <p>
                * All data stored on a secure PSU server or PSU sponsored cloud
                (e.g. AWS, IBM, Google or Azure), and will be encrypted. <br />
                Access to database requires user authentication with password{' '}
                <br />
                * Data access based on individual’s role on project <br />
                * Logging and audit trails on all data interactions <br />* Data
                will be stored for duration of project while it is active (5
                years). There may be one extra year if study team is using data
                for a scientific publication.
              </p>
            </Collapsible>
          </Collapsible>
          <Collapsible trigger="9.1.3 Access to Data and/or Specimens">
            <p>
              Identify who will have access to the data and/or specimens. This
              information should not conflict with information provided in
              section 9.1.1.1 regarding who has access to identifiable
              information, if applicable.{' '}
            </p>
            <Collapsible trigger="For the research portion of the work">
              <p>The PI and research team will have access to data.</p>
            </Collapsible>
            <Collapsible trigger="In the youth and community educational and outreach of the work">
              <p>The PI and research team will have access to data.</p>
            </Collapsible>
            <Collapsible trigger="In the university engineering educational portion of the work">
              <p>The PI and research team will have access to data.</p>
            </Collapsible>
          </Collapsible>
          <Collapsible trigger="9.1.4 Transferring Data and/or Specimens">
            <p>
              If the data and/or specimens will be transferred to and/or from
              outside collaborators, identify the collaborator to whom the data
              and/or specimens will be transferred and how the data and/or
              specimens will be transferred. This information should not
              conflict with information provided in section 9.1.1.1 regarding
              who has access to identifiable information, if applicable.
            </p>
            <Collapsible trigger="For the research portion of the work">
              <p>
                Sensor companies could grant PI and research team access to
                sensor data. The PI could share brain simulations based on that
                sensor data to sensor companies. The unique player ID would be
                used to communicate which simulation is for which athlete. Data
                will be transferred using encrypted communication protocols or
                password protected sharing platforms.
              </p>
            </Collapsible>
            <Collapsible trigger="In the youth and community educational and outreach of the work">
              <p>n/a</p>
            </Collapsible>
            <Collapsible trigger="In the university engineering educational portion of the work">
              <p>Data will not be shared outside of Penn State. </p>
            </Collapsible>
          </Collapsible>
        </Collapsible>

        <Collapsible trigger="9.2 Subject Privacy">
          <p>
            This section must address subject privacy and NOT data
            confidentiality. Indicate how the research team is permitted to
            access any sources of information about the subjects. Describe the
            steps that will be taken to protect subjects’ privacy interests.
            “Privacy interest” refers to a person’s desire to place limits on
            whom they interact with or to whom they provide personal
            information. Describe what steps you will take to make the subjects
            feel at ease with the research situation in terms of the questions
            being asked and the procedures being performed. “At ease” does not
            refer to physical discomfort, but the sense of intrusiveness a
            subject might experience in response to questions, examinations, and
            procedures.
          </p>

          <Collapsible trigger="For the research portion of the work">
            <p>
              Only the PI and research team will be able to access source of
              information on the subjects. Data will be stored on PSU resources
              (including PSU sponsored cloud systems, e.g. AWS, IBM, Google or
              Azure).The data collection procedures will occur on the sports
              fields and in the MRI facilities on the University Park campus or
              collaborating organizations.
            </p>
          </Collapsible>
          <Collapsible trigger="In the youth and community educational and outreach of the work">
            <p>
              Only the PI and research team will be able to access source of
              information on the subjects. Data will be stored on PSU resources
              and data will be deidentified. The data collection procedures will
              occur in the State College community.{' '}
            </p>
          </Collapsible>
          <Collapsible trigger="In the university engineering educational portion of the work">
            <p>
              Only the PI and research team will be able to access source of
              information on the subjects. Data will be stored on PSU resources
              and data will be deidentified. The data collection procedures will
              occur in the PI’s classroom on the University Park campus.{' '}
            </p>
          </Collapsible>
        </Collapsible>
      </Collapsible>
    );
  }
}

export default Section9;
