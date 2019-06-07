import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

// NAVIGATION
import Nav from "./components/Nav";
import Footer from "./components/Footer";

// PAGES
import Home from "./pages/Home/HomePage";
import About from "./pages/About/AboutPage";
import Sports from "./pages/Sports/SportsPage";
import Military from "./pages/Military/MilitaryPage";
import Contact from "./pages/Contact/ContactPage";

import "./index.css";
import "./pages/Home/HomePage.css";

// MDReact css
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

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
		<Footer />
  </div>
);

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
