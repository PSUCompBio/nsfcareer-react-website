import React from 'react';
import { Redirect } from 'react-router-dom';
import { svgToInline } from '../config/InlineSvgFromImg';
import CountryCode from '../config/CountryCode.json';
// import DarkMode from './DarkMode';
import Footer from './Footer';
// import $ from 'jquery';
import './Buttons/Buttons.css';
import './Dashboard/Dashboard.css';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { subYears } from 'date-fns';
// import { formDataToJson } from '../utilities/utility';
import {
  getUserDBDetails,
  isAuthenticated,
  InviteUser
} from '../apis';

// import { Form } from 'react-bootstrap';
import { UncontrolledAlert,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Row
} from 'reactstrap';




import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';

import Spinner from './Spinner/Spinner';

import ScrollToTop from 'react-scroll-up';



class InviteUsers extends React.Component {
  constructor(props) {
    super(props);
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
      CountryCode: [CountryCode],
      selectedCountryCode: '+1',
      slectedCountryName: 'USA',
      dob:'',
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      user_type: '',
      sex: '',
      isLoading: false,
      isFetching: false,
      totalBrand: '',
      lavelFor: '',
      failuer: false,
      invited: false,
      organization: '',
      sensorBrandList: '',
      TeamList: '',
      team: '',
      IsOrg: false,
      isRedirect:false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }



  componentDidUpdate() {
    svgToInline();
  }

  handleInputChange(e){
    const name = e.target.name;
    console.log(e.target.value)
    if(name === 'phone_number'){
       var value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
       if(value.length < 11){
         this.setState({[name]: [value]});
        }
    }else{
      this.setState({[name]: e.target.value});
    }
  }
 
  handleSubmit(e) {
      console.log('Update user details clicked');
      e.preventDefault();
      // eslint-disable-next-line
      const {first_name, last_name,email, lavelFor,organization,sensor,team} = this.state;
      var level = lavelFor
      console.log(first_name, last_name, lavelFor)
      this.setState({isLoading:true})
      // converting formData to JSON
      const rand=()=>Math.random(0).toString(36).substr(2);
      const token=(length)=>(rand()+rand()+rand()+rand()).substr(0,length);

      var tokens = token(40);
     
      const formJsonData = {
        'first_name':this.state.first_name, 
        'last_name':this.state.last_name,
        'email':this.state.email, 
        'level':level,
        'InviteToken':tokens,
        'user_name':tokens,
        'organization':organization,
        'sensor':sensor,
        'team': team
      };
      var the  = this;
      console.log('formJsonData',formJsonData);
      InviteUser(formJsonData).then((response) => {
        console.log('response',response);
        if(response.data.message === 'Success'){
          this.setState({
            first_name: '',
            last_name: '',
            email: '',
            failuer: false,
            invited: true,
            isLoading: false
          });
          setTimeout(()=>{
            the.setState({isRedirect:true})
          },2000);
        }else{
          this.setState({
            failuer: true,
            invited: false,
            isLoading: false
          })
        }
        
      }).catch((error) => {
          console.log('error',error)
          this.setState({
            failuer: true,
            invited: false,
            isLoading: false
          })
      });;
  }
  gotoTop = () => {
    window.scrollTo({ top: '0', behavior: 'smooth' });
  };

  selectOption=(data,heading,type) =>  {
    return(
      <FormGroup row>
        <Label for="exampleEmail" sm={2}>{heading}</Label>
        <Col sm={8}>
        <div className="input-group">
          <Input
            type="select"
            name={type}
            id={type}
            className="profile-input"
            aria-label={type}
            style={{'width': '100%','padding': '6px'}}
            onChange={this.handleInputChange}
          >
            <option defaultValue>{heading}</option>
            {data &&
              data.map((value)=>
                <option value={value[type]}>{value[type]}</option>
              )
            }
          </Input>
          </div>
        </Col>
    </FormGroup>

      
    )
  }
  selectOption2=(data,heading,type,name) =>  {
    return(
      <FormGroup row>
        <Label for="exampleEmail" sm={2}>{heading}</Label>
        <Col sm={8}>
        <div className="input-group">
          <Input
            type="select"
            name={name}
            id={name}
            className="profile-input"
            aria-label={type}
            style={{'width': '100%','padding': '6px'}}
            onChange={this.handleInputChange}
          >
            <option defaultValue>{heading}</option>
            {data &&
              data.map((value)=>
                <option value={value[type]}>{value[type]}</option>
              )
            }
          </Input>
          </div>
        </Col>
    </FormGroup>

      
    )
  }

 
  render() {
    const isLoaded = this.state.user;

    if (!this.state.isAuthenticated && !this.state.isCheckingAuth && this.props.location.state.lavelFor) {
      return <Redirect to="/Login" />;
    }
    if(this.state.isRedirect){
      console.log(this.props.location.state.lavelFor)
      if(this.props.location.state.lavelFor === '300'){
        return <Redirect 
          to={{
              pathname: '/TeamAdmin',
              state: {
                  brand: {
                      brand:  this.props.location.state.data.data.brand.brand,
                      organization: this.props.location.state.data.data.brand.organization,
                      user_cognito_id: this.props.location.state.data.data.brand.user_cognito_id
                  }
              }
          }}
        />;
      }else if(this.props.location.state.lavelFor === '1000'){
        return <Redirect 
            to='/AdminDashboard'
          />;
      }else if(this.props.location.state.lavelFor === '400'){
        return <Redirect 
          to={{
              pathname: '/OrganizationAdmin',
              state: this.state.bk_data
          }}
        />;
      }else if(this.props.location.state.lavelFor === '200'){
        return <Redirect 
          to={{
              pathname: '/TeamAdmin/team/players',
              state: this.state.bk_data
          }}
        />;
      }
    }
    if (!isLoaded) return <Spinner />;
    if (this.state.isFetching) {
          return <Spinner />;
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

        <div className="container pl-5 pr-5 profile-mt animated zoomIn mb-5 pb-2 bottom-margin" style={{'margin-top': '10%'}}>
            <div class="section-title animated zoomIn profile-section-title" style={{'align-content': 'center', 'text-align': 'center'}}>
              <h1 class="font-weight-bold">Invite User</h1>
            </div>
            <div className="row profile-container" style={{'border': '2px solid rgb(15, 129, 220)', 'border-radius': '1.8rem'}}>
              <div className="col-md-10 ml-4 mt-2 pt-2 ">
                <p class="player-dashboard-sub-head" style={{'padding-left':'0px'}}>User Information</p>
                <Form className="mt-2" onSubmit={this.handleSubmit}>
                  <FormGroup row>
                   <Label for="exampleEmail" sm={2}>Name</Label>
                    <Col sm={8}>
                      <Row>
                        <Col md={6} sm={12}>
                          <div className="input-group">
                            <input name="first_name" id="first_name" placeholder="First Name" type="text" className="profile-input form-control" value={this.state.first_name} onChange={this.handleInputChange} required/>
                          </div>
                        </Col>
                        <Col md={6} sm={12}>
                          <div className="input-group">
                            <input name="last_name" id="exampleEmail" placeholder="Last Name" type="text" className="profile-input form-control" value={this.state.last_name} onChange={this.handleInputChange} required/>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="exampleEmail" sm={2}>Email</Label>
                    <Col sm={8}>
                      <div className="input-group">
                        <input  name="email" id="exampleEmail" placeholder="abc@example.com" type="text" className="profile-input form-control"  value={this.state.email} onChange={this.handleInputChange} required/>
                      </div>
                    </Col>
                  </FormGroup>
                  
                    {this.state.selectioptions && 
                      this.state.selectioptions 
                    }
                  {this.state.sensorBrandList &&
                    this.state.sensorBrandList
                  }
                  {/*this.state.TeamList &&
                    this.state.TeamList
                  */}
                  <div style={{'margin-bottom': '24px'}}>
                    <button class="btn btn-primary">{this.state.isLoading ? (
                        <div className="d-flex justify-content-center">
                            <div
                                className="spinner-border "
                                role="status"
                                style={{'color': '#ffffff !important'}}
                                >
                                
                            </div>
                        </div>
                    ) : 'Invite'}</button>

                     {this.state.invited ? (
                            <UncontrolledAlert
                                color="success"
                                style={{ marginTop: '5px' }}
                                >
                                Invited successfully.
                            </UncontrolledAlert>
                        ) : null}
                        {this.state.failuer ? (
                            <UncontrolledAlert
                                style={{ marginTop: '5px' }}
                                color="danger"

                                >
                               Failed Try Again

                            </UncontrolledAlert>
                        ) : null}
                    
                  </div>
                </Form>

              </div>
            </div>

        </div>
        <div style={{
            position: "absolute",
            width: "100%",
            bottom: '0'
        }}>
            <Footer />
        </div>
      </React.Fragment>
    );
  }
  componentDidMount() {
    if(this.props.location.state.lavelFor){
      
      var location = this.props.location.state.data;
      if(location.type === 'organization'){
        // console.log('sensorOrgList',this.selectOption(location.sensorOrgList,'Organization','organization'));
        this.setState({
          selectioptions: this.selectOption(location.sensorOrgList,'Organization','organization'),
          sensor:location.sensor
        });  
      }
      else if(location.type === 'TeamnAdmin'){
        
         this.setState({
          sensor:location.bk_data.team.brand,
          organization:location.bk_data.team.organization,
          team: location.bk_data.team.team_name,
          bk_data:location.bk_data
        }); 
      }
      else if(location.type === 'sensorAdmin'){
        console.log('location',location.sensorBrandList);
         this.setState({
          sensor: location.sensor,
          bk_data: location.bk_data
        }); 
      }else if(location.type === 'Family'){
        console.log('location',location.sensorBrandList);
         this.setState({
          sensorBrandList: this.selectOption(location.sensorBrandList,'Sensor','sensor'),
        }); 
      }else if(location.type === 'OrgAdmin'){
        console.log('location',this.props.location);
        this.setState({
          sensor:location.data.brand.brand,
          organization:location.data.brand.organization,
          IsOrg: true,
        })
      }
    }
    isAuthenticated(JSON.stringify({}))
      .then((value) => {
        
          if (value.data.message === 'success') {
            getUserDBDetails()
              .then((response) => {
                  this.setState({
                      user: true,
                      userDetails: response.data.data,
                       isAuthenticated: true,
                        isCheckingAuth: false,
                        lavelFor: this.props.location.state.lavelFor
                  })
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

export default InviteUsers;
