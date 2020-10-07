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
import remove from './remove.png';


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
  getBrainSimulationLogFile,
  removeVideo,
  setVideoTime,
  getCumulativeAccelerationTimeRecords,
  getSimulationDetail
} from '../../../apis';
import axios from 'axios';

import { Form, ProgressBar } from 'react-bootstrap';



import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import Spinner from '../../Spinner/Spinner';

import ScrollToTop from 'react-scroll-up';
import $ from 'jquery';

import { getStatusOfDarkmode } from '../../../reducer';
let lock_time = 0;
let lock_percent = 0;
let called = false;
let lock_time_2 = 0;
let lock_percent_2 = 0;
let called_2 = false;
class Details extends React.Component {
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
      IsAcceleration: false,
      label_remove_video: 'Remove Video',
      video_time: 0,
      video_time_2: 0,
      video_lock_time: false,
      video_lock_time_2:false,
      isTimeUpdating: false,
      isTimeUpdating_2: false,
      image_id: this.props.match.params.image_id,
      player_id: this.props.match.params.player_id,
      simulation_data: '',
      simulationData: ''
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
  handalRemoveVideo = () =>{
    console.log('remove')
     this.setState({
      label_remove_video: 'Removing...',
      isLoading: false
    })
    removeVideo({'image_id':this.state.image_id})
    .then(res => {
      console.log(res)
      if(res.data.message == 'success'){
        this.setState({
          label_remove_video: 'Removed'
        })
        var the = this;
        setTimeout(function(){
          the.setState({impact_video_url: ''})
        },2000)
      }else{
        alert(res.data.err);
      }
    }).catch(err =>{
      console.log(err)
    })
  }

  upload =(file)=>{
     const data = new FormData() 
    data.append('file',file);
    data.append('image_id',this.state.image_id );
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

  vidocontrol =()=>{
    const player = document.querySelector('.player');
    const video = player.querySelector('.viewer');
    
    const progressBar = document.querySelector('.progress__filled');
    const lockButton = document.querySelector('.lock_video');
    
    let the = this;
    let controls = {
      //Updating scroller to video time
      handleProgress:  ()=> {
        const percent = (video.currentTime / video.duration) * 100;
        $('.progress__filled').val(percent);
        lock_percent = percent
      },
      scrub: (e) =>{
        const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
        if(scrubTime){
          video.currentTime = scrubTime;
        }
      },
      lockVideo:()=>{
        console.log('clicked');
        lock_time = video.currentTime;
        const percent2 = (video.currentTime / video.duration) * 100;
        lock_percent = percent2;
        setTimeout(()=>{$('.progress__filled').val(percent2)},1000);
        
      },
      setvideoTime:(time)=>{
        console.log('time',time)
        video.currentTime = time
      }
    }
    if(video && this.state.video_lock_time){
      controls.setvideoTime(this.state.video_lock_time);
    }
    video.addEventListener('timeupdate', controls.handleProgress);
    progressBar.addEventListener('click', controls.scrub);
    lockButton.addEventListener('click', controls.lockVideo);
    let mousedown = false;
    progressBar.addEventListener('mousemove', (e) => mousedown && controls.scrub(e));
    progressBar.addEventListener('mousedown', () => mousedown = true);
    progressBar.addEventListener('mouseup', () => mousedown = false);
  }

   vidocontrol2 =()=>{
    const player = document.querySelector('.Simulationvideo');
    const video = player.querySelector('.viewer_2');
    
    const progressBar = document.querySelector('.progress__filled_2');
    const lockButton = document.querySelector('.lock_video_2');
    
    let the = this;
    let controls = {
      //Updating scroller to video time
      handleProgress:  ()=> {
        const percent = (video.currentTime / video.duration) * 100;
        $('.progress__filled_2').val(percent);
        lock_percent_2 = percent;
      },
      scrub: (e) =>{
        const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
        if(scrubTime){
          video.currentTime = scrubTime;
        }
      },
      lockVideo:()=>{
        console.log('clicked');
        lock_time_2 = video.currentTime;
        const percent2 = (video.currentTime / video.duration) * 100;
        lock_percent_2 = percent2;
        setTimeout(()=>{$('.progress__filled_2').val(percent2)},1000);
        
      },
      setvideoTime:(time)=>{
        console.log('time',time)
        video.currentTime = time
      }
    }
    if(video && this.state.video_lock_time_2){
      controls.setvideoTime(this.state.video_lock_time_2);
    }
    video.addEventListener('timeupdate', controls.handleProgress);
    progressBar.addEventListener('click', controls.scrub);
    lockButton.addEventListener('click', controls.lockVideo);
    let mousedown = false;
    progressBar.addEventListener('mousemove', (e) => mousedown && controls.scrub(e));
    progressBar.addEventListener('mousedown', () => mousedown = true);
    progressBar.addEventListener('mouseup', () => mousedown = false);
  }

  handlelock_video =()=>{
    console.log('lock_time',lock_time)
    if(this.state.video_lock_time){
      this.setState({video_lock_time: 0});
      this.setVideoTime(0);
    }else{
      this.setState({video_lock_time: lock_time});
      this.setVideoTime(lock_time);
    }
    
  }
  handlelock_video_2=()=>{
    console.log('lock_time',lock_time_2)
    if(this.state.video_lock_time_2){
      this.setState({video_lock_time_2: 0});
      this.setVideoTime_2(0);
    }else{
      this.setState({video_lock_time_2: lock_time_2});
      this.setVideoTime_2(lock_time_2);
    }
    
  }
   //Setting video lockTime
  setVideoTime_2 =(time)=>{
    this.setState({isTimeUpdating_2: true})
    setVideoTime({image_id:this.state.image_id,video_lock_time:time,type:'setVideoTime_2'})
    .then((response) => {
      console.log(response)
      if(response.data.message == 'success'){
        this.setState({isTimeUpdating_2: false});
        $('.progress__filled_2').val(lock_percent_2);
        $('.progress__filled').val(lock_percent);
         console.log(lock_percent_2,lock_percent)
      }else{
        this.setState({isTimeUpdating_2: false});
         $('.progress__filled_2').val(lock_percent_2);
         $('.progress__filled').val(lock_percent);
      }
    }).catch(err=>{
      console.log('err',err)
    })
  }
  //Setting video lockTime
  setVideoTime =(time)=>{
    this.setState({isTimeUpdating: true})
    setVideoTime({image_id:this.state.image_id,video_lock_time:time,type: 'setVideoTime'})
    .then((response) => {
      console.log(response)
      if(response.data.message == 'success'){
        this.setState({isTimeUpdating: false});
        $('.progress__filled').val(lock_percent);
        console.log(lock_percent_2,lock_percent)
        $('.progress__filled_2').val(lock_percent_2);
      }else{
        this.setState({isTimeUpdating: false});
         $('.progress__filled').val(lock_percent);
         $('.progress__filled_2').val(lock_percent_2);
      }
    }).catch(err=>{
      console.log('err',err)
    })
  }

  handleChangeRange =(event)=>{
    this.setState({video_time: event.target.value});
  }
  handleChangeRange_2=(event)=>{
    this.setState({video_time_2: event.target.value});
  }
  render() {
    if (!this.state.isAuthenticated && !this.state.isCheckingAuth) {
      return <Redirect to="/Login" />;
    }
    if (!this.props.match.params.image_id) {
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
    var the = this;
    if(this.state.impact_video_url && !called){
      setTimeout(()=>{the.vidocontrol()},1000);
      called = true;
    }
    if(this.state.movie_link && !called_2){
      setTimeout(()=>{the.vidocontrol2()},1000);
      called_2 = true
    }
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
                  {/*<div className="backbutton">
                    <Link 
                      to={{
                        pathname: '/TeamAdmin/user/dashboard/',
                       state: this.props.location.state.state
                    }}
                    >&lt; Back To Player
                    </Link>
                  </div>*/}
                  <h1 className="top-heading__login brain-simlation-details-title" >Brain Simulation Details</h1>
                  {/* this.state.simulation_log_path && <p className="top-heading__login brain-simlation-details-title" ><a href={this.state.simulation_log_path} target="_blank">Simulation Log File</a></p>*/}
                  <div style={{'text-align':'center','width':'100%'}}>

                    <Link 
                    to={{
                      pathname: '/TeamAdmin/user/dashboard/brainSimulationDetails/BrainSimulationLog',
                      state: {
                        image_id: this.state.image_id
                      }
                    }}>
                   
                      Simulation Log File
                    </Link>
                  </div>
                  <h4 className="brain-simlation-details-subtitle">Player and Impact Number Details</h4>
                </div>
                <div className="col-md-12" > 
                  <div className="user-simlation-details">
                    <p>Name: {this.state.simulation_data.sensor_data.player['first-name'] +' '+this.state.simulation_data.sensor_data.player['last-name'] }</p>
                    <p>Impact ID: </p>
                    <p>Position: {this.state.simulation_data.sensor_data.player['position']}</p>
                  </div>
                </div>

                {/*Graph section start*/}
                <div className="col-md-12 col-lg-12 brain-simlation-details-graph">
                  <h4 className="brain-simlation-details-subtitle">Input From Sensor</h4>
                 <div className="col-md-6" style={{'float':'left'}}>
                    
                      <HeadLinearAccelerationAllEvents   data={this.state.simulation_data}/>
                    
                  </div>
                  <div className="col-md-6" style={{'float':'left'}}>
                    
                      <HeadAngularAccelerationAllEvents   data={this.state.simulation_data}/>
                    
                    
                  </div>
                </div>
                {/*Graph section end*/}

                {/*Movie section start*/}
                  <div className="col-md-12 col-lg-12 brain-simlation-details-movie">
                    <h4 className="brain-simlation-details-subtitle">Video Verification of Skull Kinematics</h4>
                    <div className="col-md-12">
                      <div className="movie">
                        <div className="Replace-video Replace-video-desktop">
                          <div>
                            {this.state.impact_video_url &&
                              <React.Fragment>
                                <label for="uploadFile"><img src={upload} />  Replace Video</label>
                                <input type="file" id="uploadFile" onChange={this.uploadFile} />
                                 <label onClick={this.handalRemoveVideo}><img src={remove} />  {this.state.label_remove_video}</label>
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
                              <video src={this.state.movie_link} style={{'width':'100%'}} className="player__video_2 viewer_2" controls></video>
                            }
                          </div>
                          <div>
                            {this.state.isTimeUpdating_2 ?<div> <i className="fa fa-spinner fa-spin" style={{'font-size':'24px'}}></i> </div>: ''}
                            <img src={this.state.video_lock_time_2? lock : unlock} className="unlock-img lock_video_2" onClick={this.handlelock_video_2}/>
                            <input type="range" min="0" max="100" step="0.05" value={this.state.video_time_2}  onChange={this.handleChangeRange_2} className="MyrangeSlider1 progress__filled_2" id="MyrangeSlider1" />
                            <p style={{'font-weight':'600'}}>Drag slider to set the zero frame</p>
                          </div>
                        </div>
                        <div className="Replace-video Replace-video-mobile">
                          <div>
                            {this.state.impact_video_url &&
                              <React.Fragment>
                                <label for="uploadFile"><img src={upload} />  Replace Video</label>
                                <input type="file" id="uploadFile" onChange={this.uploadFile} />
                                 <label onClick={this.handalRemoveVideo}><img src={remove} />  {this.state.label_remove_video}</label>
                              </React.Fragment>
                            }
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
                            : 
                              <div className="player">
                                <video src={this.state.impact_video_url} style={{'width':'100%'}} className="player__video viewer" controls></video>
                              </div>
                             
                          }

                          <div>
                          {this.state.isTimeUpdating ? <i className="fa fa-spinner fa-spin" style={{'font-size':'24px'}}></i> : ''}
                          </div>
                          <div>
                            <img src={this.state.video_lock_time? lock : unlock} className="unlock-img lock_video" onClick={this.handlelock_video}/>
                            <input type="range" min="0" max="100" step="0.05" value={this.state.video_time}  onChange={this.handleChangeRange} className="MyrangeSlider1 progress__filled" id="MyrangeSlider1" />
                            <p style={{'font-weight':'600'}}>Drag slider to set the zero frame</p>
                          </div>
                          <div>
                            <img src={unlock} className="unlock-img"/>
                            <input type="range" min="1" max="100" className="MyrangeSlider2" id="MyrangeSlider2" />
                            <p style={{'font-weight':'600'}}>Adjust the frame rate</p>
                          </div>
                        </div>
                        <div className="" style={{'padding': '0px 14px'}}>
                          <div>
                            <img src={unlock} className="unlock-img2"/>
                            <input type="range"  min="1" max="100" value="50" className="MyrangeSlider3" id="MyrangeSlider3" />
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
                            <img class="img-fluid svg" width="100%" height="60%" src={this.state.simulationData.simulationImage ? 'data:image/png;base64,' + this.state.simulationData.simulationImage : simulationLoading} alt="" />
                            
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
  getSimlationImage =()=>{
    getSimulationDetail({image_id: this.state.image_id})
    .then(response => {
        this.setState({
            simulationData: response.data.data,
        });
    })
  }
  componentDidMount() {
    const params = new URLSearchParams(window.location.search)
    console.log('this.props.match.params.player_id',params.get('org'))
    let organization = params.get('org');
    let team = params.get('t');
    isAuthenticated(JSON.stringify({}))
      .then((value) => {
        
          if (value.data.message === 'success') {
            getUserDBDetails()
              .then((response) => {
                  this.setState({
                      user: true,
                      userDetails: response.data.data,
                  })
                  getBrainSimulationMovie(this.state.image_id).then((response) => {
                  console.log('movie_link',response)
                    this.setState({
                        movie_link:response.data.movie_link,
                        impact_video_url: response.data.impact_video_url,
                        video_lock_time: response.data.video_lock_time, 
                        video_lock_time_2: response.data.video_lock_time_2, 
                        
                    });
                    this.getSimlationImage();
                    getCumulativeAccelerationTimeRecords({  organization: organization, player_id: this.state.player_id, team: team })
                    .then(res=>{
                      console.log('res',res);
                      if(res.data.message != "failure" && res.data.data[0]){
                        console.log('success')
                        console.log('res',res);
                        this.setState({
                          simulation_data: res.data.data[0],
                          isLoaded: true,
                          isAuthenticated: true,
                          isCheckingAuth: true
                        })
                      }else{
                        console.log('error')
                         this.setState({
                            isAuthenticated: false,
                            isCheckingAuth: false
                        });
                      }
                    }).catch(err=>{
                      console.log('err',err);
                      this.setState({
                          isLoaded: true,
                          userDetails: {},
                          isAuthenticated: false,
                          isCheckingAuth: false
                      });
                    })
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

export default Details;
