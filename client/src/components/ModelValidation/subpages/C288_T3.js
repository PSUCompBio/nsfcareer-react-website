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
    const { DisplacementData, val_x } = this.state;
    let lable_1 = "X-Disp(mm)";
    let lable_2 = "Y-Disp(mm)";
    let lable_3 = "Z-Disp(mm)";

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
                <Col sm={12} style={{'display': 'flex'}}>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-0'].x : ''}} label={lable_1} title={"NDTx1"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-1'].x : ''}} label={lable_1} title={"NDTx2"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-2'].x : ''}} label={lable_1} title={"NDTx3"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-3'].x : ''}} label={lable_1} title={"NDTx4"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-4'].x : ''}} label={lable_1} title={"NDTx5"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-5'].x : ''}} label={lable_1} title={"NDTx6"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-6'].x : ''}} label={lable_1} title={"NDTx7"}/>
                    </Col>
                </Col>
                <Col sm={12} style={{'display': 'flex'}}>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-7'].x : ''}} label={lable_1} title={"NDTx8"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-8'].x : ''}} label={lable_1} title={"NDTx9"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-9'].x : ''}} label={lable_1} title={"NDTx10"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-10'].x : ''}} label={lable_1} title={"NDTx11"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-11'].x : ''}} label={lable_1} title={"NDTx12"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-12'].x : ''}} label={lable_1} title={"NDTx13"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-13'].x : ''}} label={lable_1} title={"NDTx14"}/>
                    </Col>
                </Col>

                <Col sm={12} style={{'display': 'flex'}}>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-0'].y : ''}} label={lable_2} title={"NDTx1"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-1'].y : ''}} label={lable_2} title={"NDTx2"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-2'].y : ''}} label={lable_2} title={"NDTx3"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-3'].y : ''}} label={lable_2} title={"NDTx4"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-4'].y : ''}} label={lable_2} title={"NDTx5"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-5'].y : ''}} label={lable_2} title={"NDTx6"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-6'].y : ''}} label={lable_2} title={"NDTx7"}/>
                    </Col>
                </Col>
                <Col sm={12} style={{'display': 'flex'}}>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-7'].y : ''}} label={lable_2} title={"NDTx8"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-8'].y : ''}} label={lable_2} title={"NDTx9"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-9'].y : ''}} label={lable_2} title={"NDTx10"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-10'].y : ''}} label={lable_2} title={"NDTx11"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-11'].y : ''}} label={lable_2} title={"NDTx12"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-12'].y : ''}} label={lable_2} title={"NDTx13"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-13'].y : ''}} label={lable_2} title={"NDTx14"}/>
                    </Col>
                </Col>

                <Col sm={12} style={{'display': 'flex'}}>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-0'].z : ''}} label={lable_3} title={"NDTx1"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-1'].z : ''}} label={lable_3} title={"NDTx2"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-2'].z : ''}} label={lable_3} title={"NDTx3"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-3'].z : ''}} label={lable_3} title={"NDTx4"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-4'].z : ''}} label={lable_3} title={"NDTx5"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-5'].z : ''}} label={lable_3} title={"NDTx6"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-6'].z : ''}} label={lable_3} title={"NDTx7"}/>
                    </Col>
                </Col>
                <Col sm={12} style={{'display': 'flex'}}>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-7'].z : ''}} label={lable_3} title={"NDTx8"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-8'].z : ''}} label={lable_3} title={"NDTx9"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-9'].z : ''}} label={lable_3} title={"NDTx10"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-10'].z : ''}} label={lable_3} title={"NDTx11"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-11'].z : ''}} label={lable_3} title={"NDTx12"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-12'].z : ''}} label={lable_3} title={"NDTx13"}/>
                    </Col>
                    <Col sm={3} style={{'flex': '0 0 14%','max-width': '14%',margin: 'auto'}}>
                      {/*eslint-disable-next-line*/}
                      <C288_T3_chart data={{val_x: val_x, val_y : DisplacementData ? DisplacementData.['nodal-displacement-13'].z : ''}} label={lable_3} title={"NDTx14"}/>
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
