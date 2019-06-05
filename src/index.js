import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

// NAVIGATION
import Nav from "./components/Nav";
// PAGES
import Home from "./pages/Home/HomePage";
import About from "./pages/About/AboutPage";
import Sports from "./pages/Sports/SportsPage";
import Military from "./pages/Military/MilitaryPage";
import Contact from "./pages/Contact/ContactPage";

import "./index.css";
import "./pages/Home/HomePage.css";

const App = () => (
  <div>
    <Nav />
    <div className="container">
      <Route exact={true} path="/" component={Home} />
      <Route exaxt path="/about" component={About} />
			<Route exaxt path="/sports" component={Sports} />
 			<Route exact path="/military" component={Military} />
      <Route exact path="/contact" component={Contact} />
    </div>
  </div>
);

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
