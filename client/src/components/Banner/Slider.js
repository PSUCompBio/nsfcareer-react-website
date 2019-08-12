import React from 'react';
import SliderImg1 from './FirstComponentImg/Brain.png';
import SliderImg2 from './FirstComponentImg/Brain.png';
import SliderImg3 from './FirstComponentImg/Brain.png';
import 'jquery/dist/jquery'
import 'bootstrap/dist/js/bootstrap.bundle';

// import "./Slider.css"

import Nav from "../Nav";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from 'react-router';


// PAGES
import Home from "../../pages/Home/HomePage";
import About from "../../pages/About/AboutPage";
import Sports from "../../pages/Sports/SportsPage";
import Military from "../../pages/Military/MilitaryPage";
import Contact from "../../pages/Contact/ContactPage";
import Login from "../../pages/Login/Login";
import LogOutComponent from "../Authentication/LogOutComponent"

// Components
import ListUsers from "../listUsers/ListUsers"
// import Profile from "../profile/Profile"

const Slider = (props) => {
  return (








    <div className="slider">
      <Nav />

      <div className="bd-example">
        <div id="carouselExampleCaptions" className="carousel slide " data-ride="carousel">
          <ol className="carousel-indicators d-inline ml-0 mr-0">
            <li data-target="#carouselExampleCaptions" data-slide-to={0} className="active" />
            <li data-target="#carouselExampleCaptions" data-slide-to={1} />
            <li data-target="#carouselExampleCaptions" data-slide-to={2} />
            <li data-target="#carouselExampleCaptions" data-slide-to={2} />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={SliderImg1} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={SliderImg2} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={SliderImg3} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={SliderImg3} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div className="container">
                <Route exact={true} path="/" component={Home} />
                <Route exaxt path="/about" component={About} />
                <Route exaxt path="/sports" component={Sports} />
                <Route exact path="/military" component={Military} />
                <Route exact path="/contact" component={Contact} />
                {props.isAdmin ? <Route exact path="/listUsers" component={ListUsers} /> : null}
                {props.isAuthenticated ? <React.Fragment><Route exact path="/profile" component={Profile} /><Route exact path="/logout" component={LogOutComponent} /></React.Fragment> : <Route exact path="/login" component={Login} />}
                {props.isAuthenticated ? <Redirect push to="/" /> : null}
        </div>
    </div>
  )
}

export default Slider;