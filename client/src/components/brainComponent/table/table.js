import React from 'react';
import { Table } from 'react-bootstrap';
import cencel from './cencel-icon.png'
import upload_icon from '../dragDropModule/upload-icon.png';

class table extends React.Component {
    constructor(props) {
        super(props);
        // console.log('data',this.props)
        this.state = {
            values: [],
            files: [],
            key: 0
        };
    }

    handleUploadImage =(e)=>{
        let key = this.state.key;
        console.log('key',key)
        let file = e.target.files[0]
        let reader = new FileReader();
        let the  = this;
        reader.onload = function(e) {
            the.props.handleSimulationImageUpload(file,key,e.target.result);
        }
        reader.readAsDataURL(file);
    }
    handleSetKey=(key)=>{
        console.log('key',key)
        this.setState({key: key})
    }
    
    render() {
        console.log('props are ---\n', this.props.list)
        const { list } = this.props;
        return (
            <>  
                <Table bordered hover className="uploading-simulation-list">
                    <thead>
                        <tr>
                          <th>File Name</th>
                          <th>Name</th>
                          <th>Organization</th>
                          <th>Team</th>
                          <th>Profile Image</th>
                          <th>Overwrite<br/>Simulation</th>
                          <th>Cancel<br/>Simulation</th>
                        </tr>
                    </thead>
                    <tbody>
                    {list && 
                        list.map((res)=>{
                            return (
                                <tr>
                                    <td>{res.filename}</td>
                                    <td>{res.name}</td>
                                    <td>{res.position}</td>
                                    <td>{res.team}</td>
                                    <td style={{'text-align':'center'}} id={'uploadedimg_'+res.key}>
                                        {/*-- image upload --*/}
                                        {res.image ? 
                                            <img src={res.image} style={{'width': '44px'}} />
                                            :
                                            <>
                                                <input type="file" style={{'display':'none'}} id="simulation_image_upload"  onChange={(e)=>{this.handleUploadImage(e)}} accept="image/*"/>
                                                <label className="simulation-image-upload-icon" for="simulation_image_upload" onClick={()=>this.handleSetKey(res.key)}><img src={upload_icon} /></label>
                                            </>

                                        }
                                    </td>
                                    <td id={'status_'+res.key} style={{"text-align":'center'}}> {res.isExists === 'exsits' ? <p class="text-primary" style={{'font-size': '28px'}}><i class="fa fa-check" aria-hidden="true"></i></p> : res.isExists === 'loading' ? <div class="spinner-border text-success"></div> : res.isExists === 'uploaded' ? <p class="text-success" style={{'font-size': '28px'}}><i class="fa fa-check" aria-hidden="true"></i></p> : '--'} </td>
                                     <td className={"simulationCencel"} style={res.isfetched ? {'opacity': '1','pointer-events': 'inherit'} : {}} >
                                        <span onClick={() => this.props.handleRemoveFile(res.key)} style={{'cursor': 'pointer'}}> 
                                            <img src={cencel} id={res.key} style={{'width': '26px'}} alt="img"/>
                                        </span>
                                    </td>
                                </tr>
                            )
                        })
                        
                    }
                    
                  </tbody>
                </Table>
            </>
        );
    }
}

export default table;
