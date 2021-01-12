import React from 'react';
import { Line } from 'react-chartjs-2';
import Dropzone from 'react-dropzone';
import upload_icon from './upload-icon.png';
import { Button } from 'react-bootstrap';

class dragModule extends React.Component {
    constructor(props) {
        super(props);
        // console.log('data',this.props)
        this.state = {
            values: [],
            files: [],
        };
    }
    componentDidMount=()=>{
        var values = [];
    }
    onDrop=(files)=>{
        this.props.handleUpLoadedFiles(files)
        // console.log('files',);
    }

   

    
    render() {
        

        return (
            <>  
                <Dropzone onDrop={this.onDrop}>
                  {({getRootProps, getInputProps}) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="Dropzone-mod">
                            <div className="dropzone-content">
                                <img src={upload_icon} alt="img"/>
                                <p>Drag and drop Files Here to Upload</p>   
                                <Button>Or Select Files to Upload</Button>
                            </div>
                        </div>
                      </div>
                    </section>
                  )}
                </Dropzone>
            </>
        );
    }
}

export default dragModule;
