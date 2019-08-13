import React from 'react';

class Nav extends React.Component{
    constructor(props) {
        super();
        this.state = {
            onScrollChangeBackground: 'navbar-bg'
        }
    }
    render() {
        return (
            <nav className={`navbar navbar-light navbar-expand-lg navbar-padding ${(this.props.currentPage>1)? this.state.onScrollChangeBackground : ''}`}>
            <a className="navbar-brand" href="#">NSFCARRIER.IO</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item make-active active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        <div className="active-link" />
                    </li>
                    <li className="nav-item make-active active">
                        <a className="nav-link" href="#">About <span className="sr-only">(current)</span></a>
                        <div className="" />
                    </li>
                    <li className="nav-item make-active">
                        <a className="nav-link" href="#">Military</a>
                        <div className="" />
                    </li>
                    <li className="nav-item make-active">
                        <a className="nav-link" href="#">Contact</a>
                        <div className="" />
                    </li>
                    <li className="nav-item make-active">
                        <a className="nav-link" href="#">Login</a>
                        <div className="" />
                    </li>
                </ul>
            </div>
        </nav>
    
        )
    }
}

export default Nav;