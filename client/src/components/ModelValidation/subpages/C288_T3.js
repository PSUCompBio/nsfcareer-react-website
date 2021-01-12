import React from 'react';
// import SignatureCanvas from 'react-signature-canvas'
import C288_T3_chart from '../charts/C288_T3_chart'
import Spinner from '../../Spinner/Spinner';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {
  modalValidationOutput,
} from '../../../apis';
class C288_T3 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoaded: false,
        DisplacementData: ''
    }
  }


  componentDidMount() {
    // API to get the details of user whose consent is being approves
    modalValidationOutput()
    .then(res =>{
        console.log('res',res)
        if(res.data.status === 'success'){
            this.setState({
                isLoaded: true,
                DisplacementData: res.data.data,
                DisplacementData_2: res.data.data_2,
                val_x : res.data.data.time,
            })
        }else{
            alert(res.data.message);
            this.setState({
                isLoaded: true,
            })
        }
    }).catch(err=>{
        console.log('err',err)
        this.setState({
            isLoaded: true
        })
        alert('Failed to fetch C288_T3 output file.')
    })
  }



  render() {
    console.log("Props are - ", this.props);
    if (!this.state.isLoaded) return <Spinner />;
    const { DisplacementData, DisplacementData_2, val_x } = this.state;
    let lable_1 = "X-Disp amd (mm)";
    let lable_2 = "Y-Disp and (mm)";
    let lable_3 = "Z-Disp and (mm)";

    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col sm={12} className="text-center mt-4">
              <h1>C288-T3</h1>
            </Col>

          </Row>
          <Row className=" mt-4">
            <Col sm={3}>
              <p><b>Cora</b> (CORrelation and Analysis) <b>Biofidelic Scale:</b></p>
            </Col>
            <Col sm={9} className="Hardy_et_al-buttons">
              <Button variant="danger">Unacceptable</Button>
              <Button variant="warning">Marginal</Button>
              <Button className="orange">Fair</Button>
              <Button className="good">Good</Button>
              <Button variant="success">Excellent</Button>
            </Col>
          </Row>
        </Container>
        {/*============== Chats section start here ===============*/}
        <Row className="Hardy_et_al-card-Chart" style={{ 'width': '96%','margin': 'auto','margin-top': '50px'}}>
            {DisplacementData && 
                <>
                <Col md={6} style={{'display': 'flex'}} className="no-padding">
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-0'].x : ''}} data_2={{val_x: DisplacementData_2.time_x_0, val_y: DisplacementData_2.dis_x_0}} label={lable_1} title={"NDTx1"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-0'].y : ''}} data_2={{val_x: DisplacementData_2.time_y_0, val_y: DisplacementData_2.dis_y_0}} label={lable_2} title={"NDTx1"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-0'].z : ''}} data_2={{val_x: DisplacementData_2.time_z_0, val_y: DisplacementData_2.dis_z_0}} label={lable_3} title={"NDTx1"}/>
                    </Col>

                  </Col>
                  <Col md={6} style={{'display': 'flex'}} className="no-padding">
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-1'].x : ''}} data_2={{val_x: DisplacementData_2.time_x_1, val_y: DisplacementData_2.dis_x_1}} label={lable_1} title={"NDTx2"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-1'].y : ''}} data_2={{val_x: DisplacementData_2.time_y_1, val_y: DisplacementData_2.dis_y_1}} label={lable_2} title={"NDTx2"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-1'].z : ''}} data_2={{val_x: DisplacementData_2.time_z_1, val_y: DisplacementData_2.dis_z_1}} label={lable_3} title={"NDTx2"}/>
                    </Col>
                </Col>

                 <Col md={6} style={{'display': 'flex'}} className="no-padding">
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-2'].x : ''}} data_2={{val_x: DisplacementData_2.time_x_2, val_y: DisplacementData_2.dis_x_2}} label={lable_1} title={"NDTx3"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-2'].y : ''}} data_2={{val_x: DisplacementData_2.time_y_2, val_y: DisplacementData_2.dis_y_2}} label={lable_2} title={"NDTx3"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-2'].z : ''}} data_2={{val_x: DisplacementData_2.time_z_2, val_y: DisplacementData_2.dis_z_2}} label={lable_3} title={"NDTx3"}/>
                    </Col>
                  </Col>
                  <Col md={6} style={{'display': 'flex'}} className="no-padding">
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-3'].x : ''}} data_2={{val_x: DisplacementData_2.time_x_3, val_y: DisplacementData_2.dis_x_3}} label={lable_1} title={"NDTx4"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-3'].y : ''}} data_2={{val_x: DisplacementData_2.time_y_3, val_y: DisplacementData_2.dis_y_3}} label={lable_2} title={"NDTx4"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-3'].z : ''}} data_2={{val_x: DisplacementData_2.time_z_3, val_y: DisplacementData_2.dis_z_3}} label={lable_3} title={"NDTx4"}/>
                    </Col>
                </Col>

                <Col md={6} style={{'display': 'flex'}} className="no-padding">
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-4'].x : ''}} data_2={{val_x: DisplacementData_2.time_x_4, val_y: DisplacementData_2.dis_x_4}} label={lable_1} title={"NDTx5"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-4'].y : ''}} data_2={{val_x: DisplacementData_2.time_y_4, val_y: DisplacementData_2.dis_y_4}} label={lable_2} title={"NDTx5"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-4'].z : ''}} data_2={{val_x: DisplacementData_2.time_z_4, val_y: DisplacementData_2.dis_z_4}} label={lable_3} title={"NDTx5"}/>
                    </Col>
                  </Col>
                  <Col md={6} style={{'display': 'flex'}} className="no-padding">

                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-5'].x : ''}} data_2={{val_x: DisplacementData_2.time_x_5, val_y: DisplacementData_2.dis_x_5}} label={lable_1} title={"NDTx6"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-5'].y : ''}} data_2={{val_x: DisplacementData_2.time_y_5, val_y: DisplacementData_2.dis_y_5}} label={lable_2} title={"NDTx6"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-5'].z : ''}} data_2={{val_x: DisplacementData_2.time_z_5, val_y: DisplacementData_2.dis_z_5}} label={lable_3} title={"NDTx6"}/>
                    </Col>
                </Col>
                
                <Col md={6} style={{'display': 'flex'}} className="no-padding">
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-6'].x : ''}} data_2={{val_x: DisplacementData_2.time_x_6, val_y: DisplacementData_2.dis_x_6}} label={lable_1} title={"NDTx7"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-6'].y : ''}} data_2={{val_x: DisplacementData_2.time_y_6, val_y: DisplacementData_2.dis_y_6}} label={lable_2} title={"NDTx7"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-6'].z : ''}} data_2={{val_x: DisplacementData_2.time_z_6, val_y: DisplacementData_2.dis_z_6}} label={lable_3} title={"NDTx7"}/>
                    </Col>
                  </Col>
                  <Col md={6} style={{'display': 'flex'}} className="no-padding">
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-7'].x : ''}} data_2={{val_x: DisplacementData_2.time_x_7, val_y: DisplacementData_2.dis_x_7}} label={lable_1} title={"NDTx8"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-7'].y : ''}} label={lable_2} data_2={{val_x: DisplacementData_2.time_y_7, val_y: DisplacementData_2.dis_y_7}} title={"NDTx8"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-7'].z : ''}} data_2={{val_x: DisplacementData_2.time_z_7, val_y: DisplacementData_2.dis_z_7}} label={lable_3} title={"NDTx8"}/>
                    </Col>
                </Col>

                <Col md={6} style={{'display': 'flex'}} className="no-padding">
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-8'].x : ''}} data_2={{val_x: DisplacementData_2.time_x_8, val_y: DisplacementData_2.dis_x_8}} label={lable_1} title={"NDTx9"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-8'].y : ''}} data_2={{val_x: DisplacementData_2.time_y_8, val_y: DisplacementData_2.dis_y_8}} label={lable_2} title={"NDTx9"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-8'].z : ''}} label={lable_3} data_2={{val_x: DisplacementData_2.time_z_8, val_y: DisplacementData_2.dis_z_8}} title={"NDTx9"}/>
                    </Col>
                  </Col>
                  <Col md={6} style={{'display': 'flex'}} className="no-padding">
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-9'].x : ''}} data_2={{val_x: DisplacementData_2.time_x_9, val_y: DisplacementData_2.dis_x_9}} label={lable_1} title={"NDTx10"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-9'].y : ''}} data_2={{val_x: DisplacementData_2.time_y_9, val_y: DisplacementData_2.dis_y_9}} label={lable_2} title={"NDTx10"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-9'].z : ''}} data_2={{val_x: DisplacementData_2.time_z_9, val_y: DisplacementData_2.dis_z_9}} label={lable_3} title={"NDTx10"}/>
                    </Col>
                </Col>

                <Col md={6} style={{'display': 'flex'}} className="no-padding">
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-10'].x : ''}} data_2={{val_x: DisplacementData_2.time_x_10, val_y: DisplacementData_2.dis_x_10}} label={lable_1} title={"NDTx11"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-10'].y : ''}} data_2={{val_x: DisplacementData_2.time_y_10, val_y: DisplacementData_2.dis_y_10}} label={lable_2} title={"NDTx11"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-10'].z : ''}} data_2={{val_x: DisplacementData_2.time_z_10, val_y: DisplacementData_2.dis_z_10}} label={lable_3} title={"NDTx11"}/>
                    </Col>
                  </Col>
                  <Col md={6} style={{'display': 'flex'}} className="no-padding">
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-11'].x : ''}} data_2={{val_x: DisplacementData_2.time_x_11, val_y: DisplacementData_2.dis_x_11}} label={lable_1} title={"NDTx12"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-11'].y : ''}} data_2={{val_x: DisplacementData_2.time_y_11, val_y: DisplacementData_2.dis_y_11}} label={lable_2} title={"NDTx12"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-11'].z : ''}} data_2={{val_x: DisplacementData_2.time_z_11, val_y: DisplacementData_2.dis_z_11}} label={lable_3} title={"NDTx12"}/>
                    </Col>
                </Col>

                <Col md={6} style={{'display': 'flex'}} className="no-padding">
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-12'].x : ''}} data_2={{val_x: DisplacementData_2.time_x_12, val_y: DisplacementData_2.dis_x_12}} label={lable_1} title={"NDTx13"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-12'].y : ''}} data_2={{val_x: DisplacementData_2.time_y_12, val_y: DisplacementData_2.dis_y_12}} label={lable_2} title={"NDTx13"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-12'].z : ''}} data_2={{val_x: DisplacementData_2.time_z_12, val_y: DisplacementData_2.dis_z_12}} label={lable_3} title={"NDTx13"}/>
                    </Col>
                  </Col>
                  <Col md={6} style={{'display': 'flex'}} className="no-padding">
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-13'].x : ''}} data_2={{val_x: DisplacementData_2.time_x_13, val_y: DisplacementData_2.dis_x_13}} label={lable_1} title={"NDTx14"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-13'].y : ''}} data_2={{val_x: DisplacementData_2.time_y_13, val_y: DisplacementData_2.dis_y_13}} label={lable_2} title={"NDTx14"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 33%','max-width': '33%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData['nodal-displacement-13'].z : ''}} data_2={{val_x: DisplacementData_2.time_z_13, val_y: DisplacementData_2.dis_z_13}} label={lable_3} title={"NDTx14"}/>
                    </Col>
                </Col>
                </>
            }

        </Row>
        {/*============== Chats section end ===============*/}
      </React.Fragment>
    );
  }
}

export default C288_T3;
