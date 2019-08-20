import React from 'react';
import ScrollIndicator from './ScrollIndicator';
import { Route, withRouter, Redirect } from 'react-router-dom';

import Nav from './Nav';
import HomePage from './HomePage';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';


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
        return (
            <React.Fragment>
                {(this.props.location.pathname == '/Home') ?
                    <ScrollIndicator currentPage={this.state.currentPage} />
                    :
                    ''
                }
                <Nav currentPage={this.state.currentPage} />
                <Redirect exact path='/' to='/Home'></Redirect>
                <Route exact path='/Home' render={(props) => <HomePage {...props} onPageChange={this.onPageChange} />} />
                <Route exact path='/Login' component={Login} />
                <Route exact path='/SignUp' component={SignUp} />
            </React.Fragment>
        )
    }
}

export default withRouter(HomePage2);