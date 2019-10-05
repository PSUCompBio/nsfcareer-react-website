import React from 'react';
import Collapsible from 'react-collapsible';

class Section14 extends React.Component {
  render() {
    return (
      <Collapsible trigger="15.0 Economic Burden to Subjects">
        <Collapsible trigger="15.1 Costs">
          <p>
            Describe any costs that subjects may be responsible for because of
            participation in the research.
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
        <Collapsible trigger="15.2 Compensation for research-related injury">
          <p>
            <b>
              If the research involves more than Minimal Risk to subjects,
              describe the available compensation in the event of research
              related injury.
            </b>
          </p>
          <p>
            <b>
              If there is no sponsor agreement that addresses compensation for
              medical care for research subjects with a research-related injury,
              include the following text as written - DO NOT ALTER OR DELETE:
            </b>
          </p>
          <p>
            It is the policy of the institution to provide neither financial
            compensation nor free medical treatment for research-related injury.
            In the event of injury resulting from this research, medical
            treatment is available but will be provided at the usual charge.
            Costs for the treatment of research-related injuries will be charged
            to subjects or their insurance carriers.
          </p>
          <p>
            <b>
              For sponsored research studies with a research agreement with the
              sponsor that addresses compensation for medical care for
              research-related injuries, include the following text as written -
              DO NOT ALTER OR DELETE:
            </b>
            It is the policy of the institution to provide neither financial
            compensation nor free medical treatment for research-related injury.
            In the event of injury resulting from this research, medical
            treatment is available but will be provided at the usual charge.
            Such charges may be paid by the study sponsor as outlined in the
            research agreement and explained in the consent form.
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

export default Section14;
