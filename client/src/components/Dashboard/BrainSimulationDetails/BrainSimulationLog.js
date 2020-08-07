import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import PlayerDetails from '../../PlayerDetails/PlayerDetails';
import Dropzone from 'react-dropzone';

import DarkMode from '../../DarkMode';
import Footer from '../../Footer';
import simulationLoading from '../../simulationLoading.png';
import videoSimulationLoading from './videoSimulationLoading.png';
import uploadicon from './upload-icon.png'
import 'jquery';
import '../../Buttons/Buttons.css';
import '.././Dashboard.css';
import { svgToInline } from '../../../config/InlineSvgFromImg';
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

import { Form } from 'react-bootstrap';



import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import Spinner from '../../Spinner/Spinner';

import ScrollToTop from 'react-scroll-up';

import { getStatusOfDarkmode } from '../../../reducer';
class BrainSimulationLog extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = (files) => {
      console.log('files',files);
      console.log(files.length)
      if(files.length > 1){
        alert('You can upload only one file');
      }else{
        this.setState(files)
        const data = new FormData() 
        data.append('file', files[0]);
        data.append('image_id',this.props.location.state.data.sensor_data.image_id );
        console.log(this.props.location.state.user_cognito_id)
        data.append('user_cognito_id',this.props.location.state.user_cognito_id );
        this.setState({isLoading:true})

        uploadSidelineImpactVideo(data)
        .then(res => { 
          if(res.data.message == 'success'){
            this.setState({impact_video_url: res.data.impact_video_url});
          }else{
            this.setState({status: res.data.data.message})

          }
          this.setState({isLoading:false})

        }). catch(err =>{
          console.log('err',err)
        })
        // var fileType = this.getUploadFileExtension3(files[0].name);
        // console.log('fileType',fileType)
      }
    };
    // console.log('User Dashboard For Admin Is ',this.props);
    console.log("USER DASHBOARD PROPS", this.props)
    this.state = {
      isAuthenticated: true,
      user: null,
      isCheckingAuth: true,
      linearUnit: 'gs',
      linearUnitGsActive: true,
      linearUnitMsActive: true,
      cumulativeEventData: {},
      movie_link: '',
      files: [],
      isLoading: false,
      status: '',
      impact_video_url: '',
      simulation_log_path: ''
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

  gotoTop = () => {
    window.scrollTo({ top: '0', behavior: 'smooth' });
  };


 
  render() {
    console.log('props',this.props.location.state)
    // const isLoaded = this.state.user;
    console.log(this.state.user);
    // if (!this.state.isAuthenticated && !this.state.isCheckingAuth) {
    //   return <Redirect to="/Login" />;
    // }
    if (!this.props.location.state) {
      return <Redirect to="/Login" />;
    }
    if (!this.state.isLoaded) return <Spinner />;
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
                
                <p style={{'width': '100%'}}>{this.props.location.state && this.props.location.state.data.log_file}</p>
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
                      isLoaded: true,
                          isAuthenticated: true,
                          isCheckingAuth: true
                  })
              }).catch((error) => {
                  this.setState({
                     user: true,
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

export default BrainSimulationLog;
