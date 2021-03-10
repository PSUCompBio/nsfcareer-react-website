import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import Footer from '../../Footer';

import 'jquery';
import '../../Buttons/Buttons.css';
import '.././Dashboard.css';
import { svgToInline } from '../../../config/InlineSvgFromImg';
import {
  getUserDBDetails,
  isAuthenticated,
  getBrainSimulationLogFile,
  downloadLogFileFromS3
  
} from '../../../apis';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Spinner from '../../Spinner/Spinner';
import ScrollToTop from 'react-scroll-up';

class BrainSimulationLog extends React.Component {
  constructor(props) {
    super(props);
    
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
      simulation_log_path: '',
      simulation_log: '',
	  showResults: false,
	  buttonText: "Load More"
    };
  }
  componentDidUpdate() {
    svgToInline();
  }

  gotoTop = () => {
    window.scrollTo({ top: '0', behavior: 'smooth' });
  };
	handledownloadlog =(e)=>{
        e.preventDefault();        
        downloadLogFileFromS3(this.props.location.state.image_id)
        .then(response=>{
			const link = document.createElement('a');
			link.href = response.data.data;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
           // console.log('response',response.data.data);
        })
        
    }
	handleloadmore =(e)=>{
        e.preventDefault();        
         this.setState({
		  buttonText: "Loading...",
		});
		setTimeout(()=>{
			this.setState({
		  showResults: true
		});			
		},1000)         
    }

 
  render() {
    console.log('props',this.props.location.state)
    if(this.state.simulation_log){
      var logs = this.state.simulation_log;
      logs = logs.split('\n');
	 var showresult = this.state.showResults;
      var log = logs.map(function (log, key) {
		  if(key <= 100 ){
		  return <p>{log}</p>;
		  }else{
		   return <p style={{ display: showresult?"block":"none" }} >{log}</p>;  
		  }
      })
    }
	if (!this.state.isAuthenticated && !this.state.isCheckingAuth) {
		return <Redirect to="/Login" />;
	}
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
                <div className="backbutton">
                  <Link 
                    to={this.props.location.state.return_url}
                  >&lt; Back To Details
                  </Link>
                </div>			
                <div className="downloadbutton" style={{position: 'absolute',left:'40%',marginTop:"39px"}} >				
				{this.state.simulation_log && 
                  <button style={{fontSize: '20px',backgroundColor:'#0a538d',border:'1px solid #0a538d',color:'#ffffff',padding:"7px",textDecoration: "none"}}
                    onClick={this.handledownloadlog}
                  > Download Log
                  </button>
				  }
                </div>
                <p style={{'width': '100%','margin-top': '114px'}}>{this.state.simulation_log && log}</p>
                {!this.state.simulation_log && 
                  <p>No Logs available</p>
                }
					<div className="downloadbutton" style={{textAlign: 'center',width:'100%',margin:"10px"}} >	
						<button style={{fontSize: '20px',backgroundColor:'#0a538d',border:'1px solid #0a538d',color:'#ffffff',padding:"7px",textDecoration: "none",display: showresult?"none":"inline-block" }}
							onClick={this.handleloadmore}
						  > {this.state.buttonText}
						  </button>
					</div>
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
                          isAuthenticated: true,
                          isCheckingAuth: true
                  })
                  getBrainSimulationLogFile(this.props.location.state.image_id).then((response) => {
                    console.log('response',typeof response.data.data)
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
