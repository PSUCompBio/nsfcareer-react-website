import React from 'react';
import ScrollIndicator from './ScrollIndicator';
import { Route } from 'react-router-dom';

import Nav from './Nav';
import HomePage from './HomePage';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp'
class HomePage2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        };
    }

    onPageChange = (pageNo) => {
        this.setState({
            currentPage: pageNo
        })
    }

    render() {

        console.log("this.state.currentPage", this.state.currentPage);
        

        return (
            <React.Fragment>
                <ScrollIndicator currentPage={this.state.currentPage} />
                <Nav currentPage={this.state.currentPage} />
                <Route exact path='/' render={(props) => <HomePage {...props} onPageChange={this.onPageChange} />} />
                <Route exact path='/Home' render={(props) => <HomePage {...props} onPageChange={this.onPageChange} />} />
                <Route exact path='/Login' component={Login} />
                <Route exact path='/SignUp' component={SignUp} />
            </React.Fragment>
        )
    }
}

export default HomePage2;