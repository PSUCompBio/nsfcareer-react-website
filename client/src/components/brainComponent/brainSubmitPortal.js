import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Footer from '../Footer';
import DragMod  from './dragDropModule/dragModule'

const style = {
    heading: {
        "widht": '100%',
        "text-align": 'center',
        'font-weight': '600',
        'margin-top': '24px'
    }
} 

class BrainSubmitPortal extends React.Component {
    constructor(props) {
        super(props);
        // console.log('data',this.props)
        this.state = {
            isMobile: true,
        };
    }
    componentDidMount=()=>{
        var values = [];
    }

    render() {

        return (
            <> 
                <div
                    ref="rosterContainer"
                    className={this.state.isMobile ? "container t-roster container_1200 animated1 zoomIn1 team-admin-page-navigation bottom-margin" : "container t-roster container_1200 animated1 zoomIn1 team-admin-page-navigation"}
                >
                    <div className="row" >
                        <div className="col-md-12"> 
                            {/*-- heading --*/}
                                <h1 style={ style.heading }>Brain Simulation Portal</h1>
                            {/*-- Back button --*/}
                                <Button onClick={() => this.props.makeVisible(false)} >&lt; Back</Button>
                            {/*-- Back button end --*/}
                            
                            {/*-- Body --*/}
                                <Row>
                                    <Col sm={12} className="upload-sensor-data-button">
                                        <Button>Upload Sensor Data</Button>
                                    </Col>
                                    <Col sm={12}>
                                        <div className="drag-drop-component">
                                            <DragMod />
                                        </div>
                                    </Col>
                                </Row>
                            {/*-- Body end --*/}
                        </div>
                    </div>
                </div>

                <div style={this.state.isMobile ? {
                    position: "absolute",
                    width: "100%",
                    bottom: '0'
                } : {}}>
                    <Footer/>
                </div>
            </>
        );
    }
}

export default BrainSubmitPortal;
