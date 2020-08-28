import React from 'react';
import Section0 from './IRBcontent/Section0';
import Section1 from './IRBcontent/Section1';
import Section2 from './IRBcontent/Section2';
import Section3 from './IRBcontent/Section3';
import Section4 from './IRBcontent/Section4';
import Section5 from './IRBcontent/Section5';
import Section6 from './IRBcontent/Section6';
import Section7 from './IRBcontent/Section7';
import Section8 from './IRBcontent/Section8';
import Section9 from './IRBcontent/Section9';
import Section10 from './IRBcontent/Section10';
import Section11 from './IRBcontent/Section11';
import Section12 from './IRBcontent/Section12';
import Section13 from './IRBcontent/Section13';
import Section14 from './IRBcontent/Section14';
import Section15 from './IRBcontent/Section15';
import Section16 from './IRBcontent/Section16';
import Section17 from './IRBcontent/Section17';
import Section18 from './IRBcontent/Section18';
import Section19 from './IRBcontent/Section19';
import Section20 from './IRBcontent/Section20';
import Section21 from './IRBcontent/Section21';
import Section22 from './IRBcontent/Section22';
import { getStatusOfDarkmode } from '../reducer';
import SignatureCanvas from 'react-signature-canvas'
import Footer from './Footer';
import { signUp } from '../apis';
import Spinner from './Spinner/Spinner';
import { Redirect ,Link} from 'react-router-dom';
import template_data from './../config/template_images.json'
import "./irb.css"


class IRBLinkContent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user_details : JSON.parse(this.props.location.state.formData),
            isLoading : false,
            signatureTemplate : template_data.template_image.sign_here,
            blankSignTemplate : template_data.template_image.blank_sign_here,
        }

        console.log('IRB link props', props, );
        this.cleanPlaceholderTemplate = this.cleanPlaceholderTemplate.bind(this);
    }
    userSignature = {}
    flag = 0

    clear = () => {
        this.userSignature.clear()
    }
    clearPlaceholder(){
        alert("HELLO");
        this.clear();
    }

    componentDidMount() {
        this.userSignature.fromDataURL(this.state.signatureTemplate);
        if (getStatusOfDarkmode().status === true) {
            document.getElementsByTagName('body')[0].style.background = '#171b25';
        } else {
            const element = document.getElementsByClassName('Collapsible__contentInner');
            for (let i = 0; i < element.length; i++){
                element[i].style.background = "#fff";
                element[i].style.color = "#000";

            }
        }
    }
    cleanPlaceholderTemplate(){
        console.log("Hello");
        if(this.flag == 0){
            this.flag = 1
            this.userSignature.fromDataURL(this.state.blankSignTemplate);

        }

    }
    render() {

        var height = 100;
        console.log(window.innerWidth);
        if(window.innerWidth <= 480){
            height = 300;  
        }
        console.log('width',height)
        return (
            <React.Fragment>
            <div style={{gridTemplateColumns: "1fr auto", marginTop: "10vh", padding : "5px",paddingLeft : "25px", height : "400px", overflow : "scroll",overflowX: "hidden"}} class="container">

                <br></br>
                <br></br>
                <div class="irb-bold-400 irb-top-title">CONSENT FOR RESEARCH</div>
                <div class="irb-bold-400 irb-center irb-top-title">The Pennsylvania State University</div>
                <br></br>
                <div class="irb-center-text">Title of Project: CAREER: Multiscale Modeling of Axonal Fiber Bundles in the Brain</div>
                <div class="irb-center-text">    Principal Investigator: Dr. Reuben H. Kraft</div>
                <div class="irb-center-text">Address: 320 Leonhard Building, University Park, PA 16802</div>
                <div class="irb-center-text">Telephone Number: 814-867-4570</div>
                <br></br>
                <div style={{border : "none", padding : "0px"}} class="irb-border-box">
                    <p>
                        We are asking you to be in a research study. This form gives you information about the research.
                        Whether or not you take part is up to you. You can choose not to take part. You can agree to take part
                        and later change your mind. Your decision will not be held against you.
                    </p>
                    <p>
                        Please ask questions about anything that is unclear to you and take your time to make your choice.
                    </p>
                </div>
                <br></br>
                <p>
                    Some of the people who are eligible to take part in this research study may not be able to give consent because they are less than 18 years of age (a minor).  Instead we will ask their parent(s)/guardian(s) to give permission for their participation in the study, and we may ask them to agree (give assent) to take part.  Throughout the consent form, “you” always refers to the person who takes part in the research study.
                </p>
                <br></br>
                <ol>
                    <li style={{fontWeight : "bold"}}>
                        <div style={{fontWeight : "bold"}} >Why is this research study being done?</div>
                        <span style={{fontWeight : "normal"}} >
                            <p>
                                We are asking you to be in this research because we want to understand more about head
                                acceleration events in sports and more broadly how engineering might improve safety for players.
                                This research is being done to find out if the combination of sports sensors and modeling can help us
                                understand head acceleration events better.
                                This study may enroll up to 500 athletes and non-athletes.
                                The data obtained from this study could provide potentially useful information for the quantitative
                                diagnosis of brain injury. However, this technology can make no formal diagnosis at this time and does
                                not claim to be a diagnostic tool. Subjects are directed to a medical professional for a formal diagnosis
                                of injury.
                            </p>
                        </span>
                    </li>
                    <li style={{fontWeight : "bold"}}>
                        <div style={{fontWeight : "bold"}} >What will happen in this research study?</div>
                        <span style={{fontWeight : "normal"}}>
                            <p>
                                In this research subjects will be asked to wear the impact sensors. The impact sensors monitor/record every
                                significant incidence of head impact (single or multiple impacts) sustained during the game or practice. They
                                measure the magnitude (both linear and rotational acceleration), location, direction and duration as well as
                                the exact time of each impact. Subjects may also be asked to get an MRI scan at the beginning of season and
                                after the subject experienced concussion. Also note the following items:
                            </p>
                            <ul>
                                <li>screening procedures that occur after signing the consent form - you will be asked some questions.</li>
                                <li>screening procedures that occur after signing the consent form - you will be asked some questions.</li>

                                <li>If a significant head impact occurs during the study, participants should consult with a medical
                                    physician who can provide a medically acceptable comparison. If a concussion or mild traumatic brain
                                    injury is diagnosed, participates will share outcome of diagnosis with study team.</li>

                            </ul>
                            <br></br>
                            <p>
                                If you are a non-athlete (a control in the study) you will not be wearing sensors or
                                participant in contact sports. You may only be needed for brain imaging taken at the
                                same time as the subjects playing contact sports so a comparison can be made.
                            </p>
                        </span>
                    </li>
                    <li style={{fontWeight : "bold"}}>
                        <div style={{fontWeight : "bold"}} >What are the risks and possible discomforts from being in this research study?</div>
                        <span style={{fontWeight : "normal"}} >
                            <p>
                                There is a risk of loss of confidentiality if
                                your information or your identity isobtained by someone other than the investigators,
                                but precautions will be taken toprevent this from happening.
                                The confidentiality of your electronic data created byyou or by the
                                researchers will be maintained to the degree permitted by thetechnology used.
                                Absolute confidentiality cannot be guaranteed.
                            </p>
                        </span>
                    </li>
                    <li style={{fontWeight : "bold"}}>
                        <div style={{fontWeight : "bold"}} >What are the possible benefits from being in this research study?</div>
                        <div>4a. What are the possible benefits to you?</div>
                        <span style={{fontWeight : "normal"}} >
                            <p>
                                Your taking part in this research participation provides the
                                investigator(s) with a greater understanding of how the brain recovers
                                from mild brain injury, which will contribute to scientific knowledge and may be
                                useful in the development of beneficial clinical treatments of mild traumatic brain
                                injury. This research, in fact,benefits particpants by letting the sports trainer
                                or military commander know if the impact levels during an activity are too high.
                            </p>
                        </span>
                        <div>4b. What are the possible benefits to others?</div>
                        <span style={{fontWeight : "normal"}} >
                            <p>
                                The benefits to society include better
                                understanding the possible consequences of concussion
                                and predicting whether individuals are at high risk for concussion.
                            </p>
                        </span>
                    </li>
                    <li style={{fontWeight : "bold"}}>
                        <div style={{fontWeight : "bold"}} >What other options are available instead of being in this research study?</div>
                        <span style={{fontWeight : "normal"}} >
                            <p>
                                You may decide not to participate in this research.
                            </p>
                        </span>
                    </li>
                    <li style={{fontWeight : "bold"}}>
                        <div style={{fontWeight : "bold"}} >How long will you take part in this research study?</div>
                        <span style={{fontWeight : "normal"}} >
                            <p>
                                Being in this research study may require some additional time on your part. For example, magnetic resonance imaging before the start of the season and after a head injury event is required. Each scan would last about 1 hour, so an estimated 2 hours plus travel time would be required.
                            </p>
                        </span>
                    </li>
                    <li style={{fontWeight : "bold"}}>
                        <div style={{fontWeight : "bold"}} >How will your privacy and confidentiality be protected if you decide to take part in this research study?</div>
                        <div style={{fontWeight : "normal"}} >
                            <p>
                                Efforts will be made to limit the use and sharing of your personal research information to people who
                                have a need to review this information. Participation information of the subject in this research is
                                sensitive. All possible steps have been taken to assure subjects’ privacy. For all procedures, subjects will
                                be assigned a code number that will be used throughout the session. Only this code (and never a
                                    name) will be used when analyzing or reporting the data. Any identifying information will be kept in a
                                    locked (physical and cyberspace) location and password-protected electronic files. The Pennsylvania
                                    State University’s Office for Research Protections, the Institutional Review Board, and the Office for
                                    Human Research Protections in the Department of Health and Human Services may review records
                                    related to this research study. All the biomechanical readings and the MRI data will be coded properly
                                    saved and secured. Only you (as the participant) the PI and his research team will have access to the
                                    participant’s identity and access to the data. All records associated with a subject’s participation in the
                                    study will be subject to the usual confidentiality standards applicable to medical records (e.g., such as
                                        records maintained by physicians, hospitals, etc.). In the event of any publication resulting from the

                                        research, no personally identifiable information will be disclosed. In the event of any publication or
                                        presentation resulting from the research, no personally identifiable information will be shared.
                                        We will do our best to keep your participation in this research study confidential to the extent
                                        permitted by law. However, it is possible that other people may find out about your participation in this
                                        research study. For example, the following people/groups may check and copy records about this
                                        research.
                                    </p>
                                    <ul>
                                        <li>The Office for Human Research Protections in the U. S. Department of Health and Human
                                            Services</li>
                                        <li>The research study sponsor, National Science Foundation.</li>

                                        <li>The Institutional Review Board (a committee that reviews and approves research studies) and</li>
                                        <li>The Office for Research Protections.</li>
                                        <li>U.S. Food and Drug Administration (FDA)</li>

                                    </ul>
                                    <br></br>
                                    <p>
                                        Some of these records could contain information that personally identifies you. Reasonable efforts will
                                        be made to keep the personal information in your research record private. However, absolute
                                        confidentiality cannot be guaranteed.
                                    </p>
                                    <p style={{fontSize : ".8rem", fontStyle : "italic"}}>
                                        Note that when data is collected from the sensor, the data will originally be stored on the sensor
                                        company servers before being transferred to Penn State. Furthermore, this data may also be used in
                                        accordance with their internal privacy policies unrelated to research purposes.
                                    </p>
                                </div>
                            </li>
                            <li style={{fontWeight : "bold"}}>

                                <div style={{fontWeight : "bold"}} >What are the costs of taking part in this research study?</div>
                                <div>8a. What will you have to pay for if you take part in this research study?</div>
                                <span style={{fontWeight : "normal"}}>
                                    <p>
                                        There are no costs associated with the participation for the subjects.
                                    </p>
                                </span>
                                <div>8b. What happens if you are injured as a result of taking part in this research study?</div>
                                <span style={{fontWeight : "normal"}}>
                                    <p>
                                        In the unlikely event you become injured as a result of your participation in this study, medical care
                                        is available. It is the policy of this institution to provide neither financial compensation nor free
                                        medical treatment for research-related injury. By signing this document, you are not waiving any
                                        rights that you have against The Pennsylvania State University for injury resulting from negligence of
                                        the University or its investigators.
                                    </p>
                                </span>
                            </li>
                            <li style={{fontWeight : "bold"}}>
                                <div style={{fontWeight : "bold"}} >Will you be paid or receive credit to take part in this research study?</div>
                                <span style={{fontWeight : "normal"}} >
                                    <p>
                                        You will not be paid to participate in this research study.
                                    </p>
                                </span>
                            </li>
                            <li style={{fontWeight : "bold"}}>
                                <div style={{fontWeight : "bold"}} >Who is paying for this research study?</div>
                                <span style={{fontWeight : "normal"}} >
                                    <p>
                                        The National Science Foundation is paying for this study. <br></br><br></br>Kraft has a financial interest in Digital Brain Technologies and BrainSim Technologies, a companies which could potentially benefit from the results of this research. This interest has been reviewed by Penn State University in accordance with its Individual Conflict of Interest policy for the purpose of maintaining the objectivity and integrity in research and is being managed. No data used in this study will be used with the companies.
                                    </p>
                                </span>
                            </li>
                            <li style={{fontWeight : "bold"}}>
                                <div style={{fontWeight : "bold"}} >What are your rights if you take part in this research study?</div>
                                <span style={{fontWeight : "normal"}} >
                                    <div>Taking part in this research study is voluntary.</div>

                                    <ul>
                                        <li>You do not have to be in this research.</li>
                                        <li>If you choose to be in this research, you have the right to stop at any time.</li>

                                        <li>If you decide not to be in this research or if you decide to stop at a later date, there will be no
                                            penalty or loss of benefits to which you are entitled.</li>
                                        <li>Note that all data collected up to the point of withdrawal remains part of the study
                                            database and may not be removed.</li>
                                    </ul>
                                </span>
                            </li>
                            <li style={{fontWeight : "bold"}}>
                                <div style={{fontWeight : "bold"}} > If you have questions or concerns about this research study, whom should you call?</div>
                                <span style={{fontWeight : "normal"}} >
                                    <p>
                                        Please call the head of the research study (principal investigator), Reuben Kraft at 814-867-4570 if you:
                                    </p>
                                    <ul>
                                        <li>Have questions, complaints or concerns about the research.</li>
                                        <li>Believe you may have been harmed by being in the research study.</li>
                                    </ul>
                                    <br></br>
                                    <div>You may also contact the Office for Research Protections at (814) 865-1775, ORProtections@psu.edu
                                        if you:
                                    </div>
                                    <ul>
                                        <li>Have questions regarding your rights as a person in a research study.</li>
                                        <li>Have concerns or general questions about the research.</li>
                                        <li>You may also call this number if you cannot reach the research team or wish to offer input or
                                            to talk to someone else about any concerns related to the research.</li>
                                    </ul>
                                </span>
                            </li>
                            <li style={{fontWeight : "bold"}}>
                                <div style={{fontWeight : "bold"}} >Who is paying for this research study?</div>
                                <span style={{fontWeight : "normal"}} >
                                    <p>
                                        The National Science Foundation is paying for this study. <br></br><br></br>Kraft has a financial interest in Digital Brain Technologies and BrainSim Technologies, a companies which could potentially benefit from the results of this research. This interest has been reviewed by Penn State University in accordance with its Individual Conflict of Interest policy for the purpose of maintaining the objectivity and integrity in research and is being managed. No data used in this study will be used with the companies.
                                    </p>
                                </span>
                            </li>


                        </ol>
                        <br></br>


                                </div>
                                <div style={{gridTemplateColumns: "1fr auto", marginTop:"1%"}} class="container">

                                <SignatureCanvas penColor='black'
                                    onBegin={this.cleanPlaceholderTemplate}
                                    canvasProps={{height: height, className: 'sigCanvas'}} ref={(ref) => { this.userSignature = ref;}}/>
                                <button type="button"
                                    onClick={(e)=> {
                                        let user_details = this.state.user_details
                                        user_details["user_signature"] = this.userSignature.toDataURL("base64string");
                                        console.log("USER DETAILS ARE ", user_details)
                                        this.setState({
                                            isLoading : true
                                        })
                                        signUp(JSON.stringify(user_details))
                                        .then((response) => {
                                            console.log("RESPONSE FROM SERVER IS ", response)
                                            if(response.data.message == "success") {
                                                this.props.history.push({
                                                    pathname : '/Login',
                                                    state : {
                                                        message : response.data.message_details
                                                    }
                                                })
                                            } else {
                                                // Check if error is valid object
                                                if(response.data.error){
                                                    if(user_details.InviteToken){
                                                         this.props.history.push({
                                                            pathname : '/SignUp/'+user_details.InviteToken,
                                                            state : {
                                                                message : response.data.error
                                                            }
                                                        })
                                                    }else{
                                                        this.props.history.push({
                                                            pathname : '/SignUp',
                                                            state : {
                                                                message : response.data.error
                                                            }
                                                        })
                                                    }
                                                }
                                                else{
                                                    this.props.history.push({
                                                        pathname : '/SignUp',
                                                        state : {
                                                            message : "Failed to Sign Up!"
                                                        }
                                                    })
                                                }

                                            }

                                        }
                                        // Now update the state with data that we added
                                        // if (response.data.message === 'success') {
                                        //   // show alert
                                        //   // this.setState({
                                        //   //   isSignUpError: false,
                                        //   //   isSignUpConfirmed: true,
                                        //   //   isLoading: false
                                        //   // });
                                        //   window.location.href = "/Login"
                                        //
                                        // } else {
                                        //   // this.setState({
                                        //   //   isSignUpError: true,
                                        //   //   isSignUpConfirmed: false,
                                        //   //   isLoading: false,
                                        //   //   signUpError: response.data.error
                                        //   // });
                                        //   window.location.href="/SignUp"
                                        // }
                                        )
                                        .catch((err) => {

                                        this.props.history.push({
                                        pathname : '/SignUp',
                                        state : {
                                        message : "Failed to Sign Up !"
                                        }
                                        })
                                        });
                                        }
                                        }
                                        className="singup-sbumit-btn"
                                        style={{
                                        width: "100%",
                                        lineHeight: "50px",
                                        textAlign: "center",
                                        color: "#fff",
                                        fontSize: "18px",
                                        fontWeight: "900",
                                        border: "1px solid #fff",
                                        cursor: "pointer",
                                        marginTop: "1%",

                                        }}> Submit</button>
                                        <Link to={{ 
                                            pathname: '/SignUp',
                                        state: {}
                                        }}
                                         ><button className="btn singup-cancel-btn">Cancel</button></Link>
                                        {this.state.isLoading ? (
                                        <div style={{textAlign : "center", marginTop: "1%",
                                        marginBottom: "10%"}}>
                                        <div style={{marginLeft : "2px", marginRight : "2px"}} class="spinner-grow spinner-grow-sm text-dark" role="status">
                                        <span class="sr-only">Loading...</span>
                                        </div>
                                        <div style={{marginLeft : "2px", marginRight : "2px"}} class="spinner-grow spinner-grow-sm text-dark" role="status">
                                        <span class="sr-only">Loading...</span>
                                        </div>
                                        <div style={{marginLeft : "2px", marginRight : "2px"}} class="spinner-grow spinner-grow-sm text-dark" role="status">
                                        <span class="sr-only">Loading...</span>
                                        </div>

                                        </div>


                                        ) : null}
                                        </div>
                                        </React.Fragment>
                                );
                                }
                                }

                                export default IRBLinkContent;
