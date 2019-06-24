import React from "react";

import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from 'react-router';

// NAVIGATION
import Nav from "./components/Nav";
import Footer from "./components/Footer";



// PAGES
import Home from "./pages/Home/HomePage";
import About from "./pages/About/AboutPage";
import Sports from "./pages/Sports/SportsPage";
import Military from "./pages/Military/MilitaryPage";
import Contact from "./pages/Contact/ContactPage";
import Login from "./pages/Login/Login";

// Components
import ListUsers from "./components/listUsers/ListUsers"
import Profile from "./components/profile/Profile"

import "./index.css";

// MDReact css
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

class Index extends React.Component {
  constructor(props) {
    super();
    console.log(props);
  }
  render() {
    return <div>
    <Nav isAuthenticated={this.props.isAuthenticated} isAdmin ={this.props.isAdmin}/>
    <div className="container">
      <Route exact={true} path="/" component={Home} />
      <Route exaxt path="/about" component={About} />
			<Route exaxt path="/sports" component={Sports} />
 			<Route exact path="/military" component={Military} />
      <Route exact path="/contact" component={Contact} />
      {this.props.isAdmin?<Route exact path="/listUsers" component={ListUsers} /> :null}
      {this.props.isAuthenticated?<Route exact path="/profile" component={Profile} /> :<Route exact path="/login" component={Login} /> }     
      {this.props.isAuthenticated?<Redirect push to="/" />:null}
    </div>
		<Footer />
  </div>
  }
}
ReactDOM.render(   
  <Router>
  <Index isAuthenticated={false} isAdmin={false}/>
</Router>  
  ,
  document.getElementById('root')        
);
export default Index;
