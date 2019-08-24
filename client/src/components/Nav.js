import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

// import { BurgerIcon } from './'
import styled from "styled-components";

const Navigation = styled.header`
  width: 100%;
  z-index: 4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 100px 0;
  height: 90px;
  margin-bottom: 0px;
	position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */


  .logo a {
    padding-top: 33px;
    display: flex;
    flex-direction: column;
    clear: both;
    padding-bottom: 30px;
    text-decoration: none;
		font-size: 35px;
		font-weight: bold;

    p {
      width: 500px;
      display: block;
			color: #0d47a1;
    }
    em {
      font-size: 0.5em;
      float: left;
      display: block;
      img {
        display: inline-block;
        margin-top: 5px;
        width: 15px;
        float: left;
      }
      .letterhead {
        display: inline-block;
        line-height: 260%;
        float: left;
      }
    }
  }
  .gray {
    color: #ccc;
  }
  a {
    color: #fff;
    transition: all 0.6s;
    color: #fff;
    font-size: 1em;
    position:relative;
  }
  a:hover {
    opacity: 1;
  }
  .fa-bars {
    display: none;
    color: #222;
    font-size: 2rem;
  }
  .border-rounded{
    background: #fff;
    height: 1px;
    border: 2px solid white;
    border-radius: 5px;
    width: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -15px;
    margin-top: 20px;
  }
  nav {
    ul {
      display: flex;
      justify-content: space-between;
    }
    li {
      margin: 0 15px;
      justify-content: space-between;
      font-size: 1em;
    }
    a {
      font-size: 1em;
      text-decoration: none;
      text-transform: capitalize;
      font-weight: 400;
      .active {
        color: tomato;
      }
    }
    a.active {
      color: #fff;
    }
  }

  @media only screen and (max-width: 800px) {
    padding: 0px;
    .logo {
      padding-left: 15px;
      padding-top: 0px !important;
			a {
				font-size: 30px;
			}
    }
  }
  @media only screen and (max-width: 600px) {
    height: auto;
    min-height: 50px;
    display: block;
    position: relative;
    .logo {
      width: 100%;
      display: block;
      padding-top: 20px;
      margin: 0px;
      margin-left: -5px;
      a {
        padding: 20px 0px;
				font-size: 25px;
      }
    }
    .fa-bars {
      display: inline-block;
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
    ul.collapsed {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-wrap: wrap;

      overflow: hidden;
      max-height: 0;
      -moz-transition-duration: 0.4s;
      -webkit-transition-duration: 0.4s;
      -o-transition-duration: 0.4s;
      transition-duration: 0.4s;
      -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      transition-timing-function: cubic-bezier(0, 1, 0.5, 1);

      &.is-expanded {
        overflow: hidden;
        max-height: 500px; /* approximate max height */
        -moz-transition-duration: 0.4s;
        -webkit-transition-duration: 0.4s;
        -o-transition-duration: 0.4s;
        transition-duration: 0.4s;
        -moz-transition-timing-function: ease-in;
        -webkit-transition-timing-function: ease-in;
        -o-transition-timing-function: ease-in;
        transition-timing-function: ease-in;
      }
      li {
        padding: 15px 10px;
        margin: 0px 0px;
        width: 100%;
      }
    }
  }
`;

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }
  handleToggle(e) {
    e.preventDefault();
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }
  render() {
    const { isExpanded } = this.state;

    return (
      <Navigation>
        <div className="logo">
          <Link to="/">
            <p>NSFCAREER.IO</p>
          </Link>
        </div>
        <nav className="nav">
          <i
            className="fa fa-bars"
            aria-hidden="true"
            onClick={e => this.handleToggle(e)}
          />
          <ul className={`collapsed ${isExpanded ? "is-expanded" : ""}`}>
            <NavLink  activeClassName="active" to="/">
              <li>home</li>
              <div className="border-rounded"></div>
            </NavLink>
            <NavLink activeClassName="active" to="/about">
              <li>about</li>
              <div className=""></div>

            </NavLink>
            {this.props.isAuthenticated ?
              <NavLink activeClassName="active" to="/sports">
                <li>sports</li>
              <div className=""></div>
                
            </NavLink>
             :null}
						
						<NavLink activeClassName="active" to="/military">
              <li>military</li>
              <div className=""></div>

            </NavLink>
            <NavLink activeClassName="active" to="/contact">
              <li>contact</li>
              <div className=""></div>

            </NavLink>
            {!this.props.isAuthenticated ?
            <NavLink activeClassName="active" to="/login">
              <li>login</li>
              <div className=""></div>

            </NavLink>
            : 
            this.props.isAdmin? <NavLink activeClassName="active" to="/listUsers">
            <li>users</li>
          </NavLink>
          :null
            }
            {this.props.isAuthenticated ?           
            <React.Fragment><NavLink activeClassName="active" to="/profile">
            <li>profile</li>
          </NavLink>
          <NavLink activeClassName="active" to="/logout">
          <li>logout</li>
        </NavLink>
        </React.Fragment>
         : null}
            
          </ul>
        </nav>
      </Navigation>
    );
  }
}

export default Nav;
