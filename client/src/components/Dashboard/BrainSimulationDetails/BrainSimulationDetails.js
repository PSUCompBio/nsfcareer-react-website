import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import PlayerDetails from '../../PlayerDetails/PlayerDetails';
import CumulativeEvents from '../../DashboardEventsChart/CumulativeEvents';
import CumulativeEventsAccelerationEvents from '../../DashboardEventsChart/CumulativeEventsAccelerationEvents';
import HeadAccelerationEvents from '../../DashboardEventsChart/HeadAccelerationEvents';
import { svgToInline } from '../../../config/InlineSvgFromImg';
import HeadLinearAccelerationAllEvents from '../../DashboardEventsChart/HeadLinearAccelerationAllEvents';
import HeadAngularAccelerationAllEvents from '../../DashboardEventsChart/HeadAngularAccelerationAllEvents';
import Dropzone from 'react-dropzone';

import DarkMode from '../../DarkMode';
import Footer from '../../Footer';
import simulationLoading from '../../simulationLoading.png';
import videoSimulationLoading from './videoSimulationLoading.png';
import unlock from './unlock.png';
import lock from './lock.png';
import upload from './upload.png';


import uploadicon from './upload-icon.png'
import 'jquery';
import '../../Buttons/Buttons.css';
import '.././Dashboard.css';
import {
  getUserDetails,
  getUserDBDetails,
  isAuthenticated,
  getCumulativeAccelerationData,
  getSimulationFilesOfPlayer,
  getAllCumulativeAccelerationTimeRecords,
  getBrainSimulationMovie,
  uploadSidelineImpactVideo,
  getBrainSimulationLogFile
} from '../../../apis';
import axios from 'axios';

import { Form, ProgressBar } from 'react-bootstrap';



import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import Spinner from '../../Spinner/Spinner';

import ScrollToTop from 'react-scroll-up';

import { getStatusOfDarkmode } from '../../../reducer';
class BrainSimulationDetails extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = (files) => {
      console.log('files',files);
      console.log(files.length)
      if(files.length > 1){
        alert('You can upload only one file');
      }else{
        this.setState(files)
        this.upload(files[0]);
      }
    };
    // console.log('User Dashboard For Admin Is ',this.props);
    console.log("USER DASHBOARD PROPS", this.props)
    this.state = {
      isAuthenticated: false,
      user: null,
      isCheckingAuth: true,
      linearUnit: 'gs',
      linearUnitGsActive: true,
      linearUnitMsActive: false,
      cumulativeEventData: {},
      movie_link: '',
      files: [],
      isLoading: false,
      status: '',
      impact_video_url: '',
      simulation_log_path: '',
      simulation_log:'',
      uploadPercentage: 0,
      IsAcceleration: false
    };
  }
 
  getUploadFileExtension3(url){
    console.log()
    if(new RegExp(".mp4").test(url)){
        return ".mp4";
    }
    if(new RegExp(".mov").test(url)){
        return ".mov";
    }
    if(new RegExp(".3gp").test(url)){
        return ".3gp";
    }
    if(new RegExp(".ogg").test(url)){
        return ".ogg";
    }
    if(new RegExp(".wmv").test(url)){
        return ".wmv";
    }
    if(new RegExp(".webm").test(url)){
        return ".webm";
    }
    if(new RegExp(".flv").test(url)){
        return ".flv";
    }
    if(new RegExp(".TIFF").test(url)){
        return ".TIFF";
    }
  }
  componentDidUpdate() {
    svgToInline();
  }

  uploadFile = (event) =>{
    console.log('files', event.target.files[0]);
    this.setState({impact_video_url: ''});
    this.upload(event.target.files[0]);
  }

  upload =(file)=>{
     const data = new FormData() 
    data.append('file',file);
    data.append('image_id',this.props.location.state.data.sensor_data.image_id );
    console.log(this.props.location.state.user_cognito_id)
    data.append('user_cognito_id',this.props.location.state.user_cognito_id );
    this.setState({isLoading:true,IsAcceleration:true})
    var myVar = '';
    var the = this;
    const options = {
      onUploadProgress: (progressEvent) => {
        const {loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if(percent < 70){
          this.setState({uploadPercentage:percent})
        }else{
          
          setInterval(function(){
             if(the.state.uploadPercentage < 99){
                the.setState({uploadPercentage: the.state.uploadPercentage + 1});
              }
          }, 2000)
        }
      }
    }
     axios.post(`/uploadSidelineImpactVideo`, data,options,{withCredentials: true})
    .then(function (res) {
      console.log('res',res);
      if(res.data.message == 'success'){
      console.log('impact_video_url',res.data.impact_video_url)
        the.setState({uploadPercentage:100});
        setTimeout(function(){
          the.setState({impact_video_url: res.data.impact_video_url});
        },2000)
      }else{
        the.setState({status: res.data.data.message});
      }
    })
    .catch(function (error) {
      console.log(error)
    });
  }

  gotoTop = () => {
    window.scrollTo({ top: '0', behavior: 'smooth' });
  };


 
  render() {
    console.log('props',this.props.location.state)
    // const isLoaded = this.state.user;
    console.log(this.state.user);
    if (!this.state.isAuthenticated && !this.state.isCheckingAuth) {
      return <Redirect to="/Login" />;
    }
    if (!this.props.location.state) {
      return <Redirect to="/Login" />;
    }
    if (!this.state.isLoaded) return <Spinner />;

 // MyDropzone() {
 //  const onDrop = useCallback(acceptedFiles => {
 //   console.log('uploading');
 //  }, [])
  const files = this.state.files.map(file => (
      <span key={file.name}>
        {file.name} - {file.size} bytes
      </span>
    ));

    return (
      <React.Fragment>
        <div className="center-scroll-up-mobile">
          <ScrollToTop

            showUnder={120}
            style={{
              zIndex: "99"
            }}
          >
            <div

              className=" d-flex align-items-center justify-content-center "
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#0f81dc",
                marginLeft: "auto",
                marginRight: "auto",
                color: "#fff",
                borderRadius: "50%",
                boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.14)",
                alignItems: "center !important"

              }}
            >
              <img src="/img/icon/arrowUp.svg" alt="" />
            </div>
            <div
              style={{

                color: "#0f81dc",
                backgroundColor: "transparent",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              <p className="hide-widget-in-mobile">Back to top</p>
            </div>


          </ScrollToTop>
        </div>

        <div className="container dashboard UserDashboarForAdmin-page-navigation brain-simlation-details">

            <div className="container">
              <div className="row">
                
                <div className="col-md-12 col-lg-12">
                  <div className="backbutton">
                    <Link 
                      to={{
                        pathname: '/TeamAdmin/user/dashboard/',
                       state: this.props.location.state.state
                    }}
                    >&lt; Back To Player
                    </Link>
                  </div>
                  <h1 className="top-heading__login brain-simlation-details-title" >Brain Simulation Details</h1>
                  {/* this.state.simulation_log_path && <p className="top-heading__login brain-simlation-details-title" ><a href={this.state.simulation_log_path} target="_blank">Simulation Log File</a></p>*/}
                  <div style={{'text-align':'center','width':'100%'}}>{this.state.simulation_log && 
                    <Link 
                    to={{
                      pathname: '/TeamAdmin/user/dashboard/brainSimulationDetails/BrainSimulationLog',
                      state: {
                        state: this.props.location.state.state,
                        data: this.props.location.state.data,
                        simulation_log: this.state.simulation_log
                      }
                    }}>
                   
                      Simulation Log File
                    </Link>
                  }</div>
                  <h4 className="brain-simlation-details-subtitle">Player and Impact Number Details</h4>
                </div>
                <div className="col-md-12" > 
                  <div className="user-simlation-details">
                    <p>Name: {this.props.location.state.data.sensor_data.player['first-name'] +' '+this.props.location.state.data.sensor_data.player['last-name'] }</p>
                    <p>Impact ID: </p>
                    <p>Position: {this.props.location.state.data.sensor_data.player['position']}</p>
                  </div>
                </div>

                {/*Graph section start*/}
                <div className="col-md-12 col-lg-12 brain-simlation-details-graph">
                  <h4 className="brain-simlation-details-subtitle">Input From Sensor</h4>
                  <div className="col-md-6" style={{'float':'left'}}>
                    
                      <HeadLinearAccelerationAllEvents  key={this.props.location.state.data} data={this.props.location.state.data} state={this.props.location.state.state}/>
                    
                  </div>
                  <div className="col-md-6" style={{'float':'left'}}>
                    
                      <HeadAngularAccelerationAllEvents  key={this.props.location.state.data} data={this.props.location.state.data} state={this.props.location.state.state}/>
                    
                    
                  </div>
                </div>
                {/*Graph section end*/}

                {/*Movie section start*/}
                  <div className="col-md-12 col-lg-12 brain-simlation-details-movie">
                    <h4 className="brain-simlation-details-subtitle">Video Verification of Skull Kinematics</h4>
                    <div className="col-md-12">
                      <div className="movie">
                        <div className="Replace-video">
                          <div>
                            {this.state.impact_video_url &&
                              <React.Fragment>
                                <label for="uploadFile"><img src={upload} />  Replace Video</label>
                                <input type="file" id="uploadFile" onChange={this.uploadFile} />
                              </React.Fragment>
                            }
                          </div>
                        </div>
                        <div className="col-md-6" style={{'float':'left'}}>
                          <div className="Simulationvideo">
                            {!this.state.movie_link &&
                              <img src={videoSimulationLoading} style={{'width':'50%'}} />
                            }
                            {this.state.movie_link &&
                              <video src={this.state.movie_link} style={{'width':'100%'}} controls></video>
                            }
                          </div>
                          <div>
                            <img src={unlock} className="unlock-img"/>
                            <input type="range" min="1" max="100" className="MyrangeSlider1" id="MyrangeSlider1" />
                            <p style={{'font-weight':'600'}}>Drag slider to set the zero frame</p>
                          </div>
                        </div>
                        <div className="col-md-6" style={{'float':'left'}}>
                          {!this.state.impact_video_url ?
                            (<Dropzone onDrop={this.onDrop}>
                              {({getRootProps, getInputProps}) => (
                                <section className="container">
                                  <div className='impact-video'  {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    
                                     {this.state.isLoading ? (
                                      <div className="d-flex justify-content-center center-spinner" style={{'margin-top':'28%'}}>
                                      <ProgressBar animated now={this.state.uploadPercentage} label={`${this.state.uploadPercentage}%`} />
                                       
                                      </div>
                                    ) : this.state.status ? <p style={{'margin-top':'25%','color':'red'}}>{this.state.status}</p>
                                      :<React.Fragment>
                                        <img src={uploadicon} style={{'width':'40%'}} alt="upload video"/>
                                        <p>Upload Sideline Video of Impact</p>
                                      </React.Fragment>
                                    }
                                  </div>
                                  <p>{files}</p>
                                </section>
                              )}
                            </Dropzone>)
                            : <video src={this.state.impact_video_url} style={{'width':'100%'}} controls></video>
                             
                          }

                               
                          <div>
                            <img src={lock} className="unlock-img"/>
                            <input type="range" min="1" max="100" className="MyrangeSlider1" id="MyrangeSlider1" />
                            <p style={{'font-weight':'600'}}>Drag slider to set the zero frame</p>
                          </div>
                          <div>
                            <img src={unlock} className="unlock-img"/>
                            <input type="range" min="1" max="100" className="MyrangeSlider2" id="MyrangeSlider2" />
                            <p style={{'font-weight':'600'}}>Drag slider to set the zero frame</p>
                          </div>
                        </div>
                        <div className="" style={{'padding': '0px 14px'}}>
                          <div>
                            <img src={unlock} className="unlock-img2"/>
                            <input type="range" min="1" max="100" className="MyrangeSlider3" id="MyrangeSlider3" />
                            <p style={{'font-weight':'600'}}>Drag slider to set the zero frame</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                {/*Movie section start*/}

                {/*Injury metrics section start */}
                <div className="col-md-12 col-lg-12 brain-simlation-details-metrics">
                    <h4 className="brain-simlation-details-subtitle">Resulting Predicted Injury Metrics</h4>
                    <div className="col-md-12">
                      <div className="metrics">
                          <div className="col-md-12">
                            <button className="btn btn-primary">Injury Metrics</button><br/>
                            <button className="btn gray">MPS</button>
                            <button className="btn gray">CSDM</button>
                            <button className="btn gray">MASxSR<sub>15</sub></button>
                          </div>
                          <div className="col-md-12">
                            <img class="img-fluid svg" width="100%" height="60%" src={this.props.location.state.data.simulation_image ? 'data:image/png;base64,' + this.props.location.state.data.simulation_image : simulationLoading} alt="" />
                            
                          </div>
                      </div>
                    </div>
                </div>
                {/*Injury metrics section start */}

              </div>
            </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
  componentDidMount() {
    isAuthenticated(JSON.stringify({}))
      .then((value) => {
        
          if (value.data.message === 'success') {
            getUserDBDetails()
              .then((response) => {
                  this.setState({
                      user: true,
                      userDetails: response.data.data,
                  })
                  getBrainSimulationMovie(this.props.location.state.data.sensor_data.image_id).then((response) => {
                  console.log('movie_link',response)
                    this.setState({
                        movie_link:response.data.movie_link,
                        impact_video_url: response.data.impact_video_url,
                    });
                    getBrainSimulationLogFile(this.props.location.state.data.sensor_data.image_id).then((response) => {
                      console.log('response',response)
                        this.setState({
                          simulation_log:response.data.data,
                          isLoaded: true,
                          isAuthenticated: true,
                          isCheckingAuth: false
                      });
                    }).catch((error) => {
                        this.setState({
                            isLoaded: true,
                            userDetails: {},
                            isCheckingAuth: false
                        });
                    });
                  }).catch((error) => {
                    this.setState({
                        isLoaded: true,
                        userDetails: {},
                        isCheckingAuth: false
                    });
                });
              }).catch((error) => {
                  this.setState({
                      userDetails: {},
                      isCheckingAuth: false
                  });
              });
          }
          else {
             this.setState({
                userDetails: {},
                isCheckingAuth: false
            });
          }
      })
      .catch((err) => {
        this.setState({ isAuthenticated: false, isCheckingAuth: false });
      });
  }
}

export default BrainSimulationDetails;
