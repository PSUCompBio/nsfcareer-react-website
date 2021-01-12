import React from 'react';
import { Table } from 'react-bootstrap';
import cencel from './cencel-icon.png'

class table extends React.Component {
    constructor(props) {
        super(props);
        // console.log('data',this.props)
        this.state = {
            values: [],
            files: [],
        };
    }

    
    render() {
        console.log('props are ---\n', this.props.list)
        const { list } = this.props;
        return (
            <>  
                <Table bordered hover>
                  <tbody>
                    {list && 
                        list.map((res)=>{
                            return (
                                <tr>
                                    <td>{res.name}</td>
                                    <td>{res.position}</td>
                                    <td>{res.team}</td>
                                    <td><span onClick={() => this.props.handleRemoveFile(res.key)} style={{'cursor': 'pointer'}}> <img src={cencel} id={res.key} style={{'width': '26px'}} alt="img"/></span></td>
                                    <td id={'status_'+res.key}> -- </td>
                                    
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
