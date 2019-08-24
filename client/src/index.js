import React from "react";

import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

// NAVIGATION
// import Nav from "./components/Nav";
// import Footer from "./components/Footer";

// PAGES
// import Home from "./pages/Home/HomePage";
// import About from "./pages/About/AboutPage";
// import Sports from "./pages/Sports/SportsPage";
// import Military from "./pages/Military/MilitaryPage";
// import Contact from "./pages/Contact/ContactPage";
// import Login from "./pages/Login/Login";
// import LogOutComponent from "./components/Authentication/LogOutComponent"
import Routing from './pages/Home/Routing'

// // Components
// import ListUsers from "./components/listUsers/ListUsers"
// import Profile from "./components/profile/Profile"

import "./index.css";

// MDReact css
import 'font-awesome/css/font-awesome.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.css';

// API
// import { verifyUser } from './apis.js'

class Index extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <Router>
        <Routing />
      </Router>
    )
  }
}
// Here we call fetch API to check if user is authenticted or not
// verifyUser().then((response)=>{
// if(response.data.message=="success"){
//   ReactDOM.render(   
//     <Router>
//     <Index isAuthenticated={true} isAdmin={response.data.isAdmin}/>
//   </Router>  
//     ,
//     document.getElementById('root')        
//   );
// }
// else{
//   ReactDOM.render(   
//     <Router>
//     <Index isAuthenticated={false} isAdmin={false}/>
//   </Router>  
//     ,
//     document.getElementById('root')        
//   );
// }
// }).catch((err)=>{

// console.log(err);
//   ReactDOM.render(   
// <h1>Internal Service Error </h1> 
//     ,
//     document.getElementById('root')        
//   );

// })


ReactDOM.render(
  <Index isAuthenticated={true} isAdmin={true} />,
  document.getElementById('root')
);

export default Index;
