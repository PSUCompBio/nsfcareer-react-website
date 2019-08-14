import React from 'react';
import { Link, matchPath, withRouter } from 'react-router-dom';
class Nav extends React.Component {
    constructor(props) {
        super();
        this.state = {
            onScrollChangeBackground: 'navbar-bg'
        }
        
    }
    render() {
        return (
                <nav  className={`navbar navbar-light  navbar-expand-lg navbar-padding ${(this.props.currentPage > 1) ? this.state.onScrollChangeBackground : ''}${ (this.props.location.pathname!='/Home' && this.props.location.pathname!='/' )? 'navbar-bg-change': ''}`}>
                    <Link className="navbar-brand" to={'/Home'}><img src="img/BannerImg/logo.png" alt="" /></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item make-active active">
                                <Link className="nav-link" to={'/Home'}>Home <span className="sr-only">(current)</span></Link>
                                <div className="active-link" />
                            </li>
                            <li className="nav-item make-active active">
                                <Link className="nav-link" to={'/About'}>About <span className="sr-only">(current)</span></Link>
                                <div className="" />
                            </li>
                            <li className="nav-item make-active">
                                <Link className="nav-link" to={'/Military'}>Military</Link>
                                <div className="" />
                            </li>
                            <li className="nav-item make-active">
                                <Link className="nav-link" to={'/Contact'}>Contact</Link>
                                <div className="" />
                            </li>
                            <li className="nav-item make-active">
                                <Link className="nav-link" to={'/Login'}>Login</Link>
                                <div className="" />
                            </li>
                        </ul>
                </div>
                </nav>
        )
    }
}

export default withRouter(Nav);