import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import ExportPlayerReport from './Charts/ExportPlayerReport';
import Footer from './Footer';

let brainRegions = {};
brainRegions['principal-max-strain'] = {};
brainRegions['principal-min-strain'] = {};
brainRegions['axonal-strain-max'] = {};
brainRegions['csdm-max'] = {};
brainRegions['masXsr-15-max'] = {};

class TeamStats extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            
        };
    }
   
    componentDidMount() {
        // Scrolling winddow to top when user clicks on about us page
        window.scrollTo(0, 0)
    }

    render() {
       return (
            <React.Fragment>
                 
                <div className="container dashboard UserDashboarForAdmin-page-navigation brain-simlation-details" style={{marginBottom : '50px'}}>
                    <div className="container">
                        <div className="backbutton" style={{position : 'relative'}}>
                            <Link to="">&lt; Back To Team</Link>
                        </div>
                        <div className="row">
                            <div className="col-md-12 col-lg-12">
                                <ExportPlayerReport brainRegions={brainRegions} />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        isMilitaryVersionActive: state.militaryVersion
    };
}

export default connect(mapStateToProps)(TeamStats);
