import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import Footer from '../Footer';
import DragMod from './dragDropModule/dragModule';
import TableMod from './table/table'
import {
    submitBrainsimulationJobs,
    checkSensorDataExistsSimulationjsonData,
    getAllSensorBrands,
    createJoblogs
} from '../../apis';
import $ from 'jquery';
import { Sensor, Email } from '../Authentication/getAuthanticatUserData';
import Select from 'react-select';
const style = {
    heading: {
        "widht": '100%',
        "text-align": 'center',
        'font-weight': '600',
        'margin-top': '24px'
    }
}
let options = [];
class BrainSubmitPortal extends React.Component {
    constructor(props) {
        super(props);
        // console.log('data',this.props)
        this.state = {
            isMobile: true,
            isDragMod: false,
            files: '',
            list: [],
            meshType: 'coarse',
            isUploaded: false,
            isCalledExists: false,
            isError: false,
            countDown: 5,
            selectedOption: null,
            sensors: [],
            sensor: '',
            loadingSensorList: true,
            organization: this.props.organization,
            team: this.props.team,
            listJobs: []
        };
    }
    componentDidMount = () => {
        console.log('Sensor -------------------------\n', Sensor)
        var values = [];
        /* if(!Sensor || Sensor === undefined || Sensor === null){*/
        getAllSensorBrands()
            .then(data => {
                console.log('Sensor', data)
                if (data.data.message === "success") {
                    this.setState({
                        sensors: data.data.data,
                        loadingSensorList: false
                    })
                }
            }).catch(err => {
                this.setState({
                    loadingSensorList: false
                })
                console.log('err', err)
            })
        /* }*/
    }

    handleUpLoadedFiles = (files) => {
        console.log('handleUpLoadedFiles', files);
        // console.log('files',files);
        this.setState({ files: [], isDragMod: false, isCalledExists: false })
        for (var i = 0; i < files.length; i++) {
            let file = this.getUploadFileExtension3(files[i].path);
            // console.log('file',file)
            if (file === 'json' || file === 'csv' || file === 'NAP1transf') {
                this.setState(prevState => ({
                    files: prevState.files.concat(files[i])
                }))
                this.handleFileSelect(files[i], file, i)
            } else {
                alert(file);
            }
        }
    }

    /**
    * # Handeling simulation image upload event...
    */

    handleSimulationImageUpload = (file, key, image) => {
        console.log('file,key', file, key);
        var list = this.state.list;
        if (file) {
            var newList = [];
            this.setState({ list: [] });
            for (var i = 0; i < list.length; i++) {
                if (i === key) {
                    list[i].image = image;
                    list[i].imageFile = file;
                    newList.push(list[i]);
                } else {
                    newList.push(list[i]);
                }
            }
            this.setState({ list: newList })
        }
    }

    getUploadFileExtension3 = (url) => {
        if (new RegExp(".json").test(url)) {
            return "json";
        } else if (new RegExp(".csv").test(url)) {
            return "csv";
        } else if (new RegExp(".NAP1transf").test(url)) {
            return "NAP1transf";
        } else {
            return `${url.split('.').pop()} file not supported`;
        }
    }

    handleFileSelect = (file, fileType, key) => {
        const { sensor } = this.state;
        let reader = new FileReader();
        let the = this;
        let jobs = [];
        reader.onload = function (e) {
            if (fileType === 'json') {
                let data = JSON.parse(e.target.result);
                data = data[0]
                console.log('data', data)
                if (data && data.player) {
                    the.setState(prevState =>
                    ({
                        list: prevState.list.concat({
                            key: key,
                            name: data.player['first-name'] + ' ' + data.player['last-name'],
                            position: data.player['organization'],
                            team: data.player['team'],
                            image: '',
                            imageFile: '',
                            isExists: false,
                            isfetched: true,
                        })
                    })
                    );
                    // if (!the.state.isCalledExists) the.checkSimulationExists({ 'impact_id': data.player['impact-id'], 'sensor_id': data.player['sensor-id'], 'key': key });
                    jobs.push({ sensor_id: data.player['sensor-id'], impact_id: data.player['impact-id'] });
                } else {
                    alert(`${file.name} file data farmat invalid.`);
                }
            } else {
                the.setState(prevState =>
                ({
                    list: prevState.list.concat({
                        key: key,
                        name: 'unknown',
                        position: 'unknown',
                        team: 'unknown',
                        image: '',
                        imageFile: '',
                        isExists: false,
                        isfetched: true,
                    })
                })
                );
                var filename = file.name;
                if (!the.state.isCalledExists) {
                    if (sensor === 'BioCore') {
                        var impact_id = filename.split('.')[0];
                        impact_id = impact_id.replace(/_/g, '');
                        impact_id = impact_id.replace(/-/g, '');
                        console.log('impact_id', impact_id)
                        // the.checkSimulationExists({ 'impact_id': impact_id, 'sensor_id': filename.split("-")[0], 'key': key });
                        jobs.push({sensor_id:  filename.split("-")[0],impact_id: impact_id });
                    } else if (sensor === 'Athlete Intelligence') {
                        var impact_id = filename.split("-").slice(2, 7).join(" ").split(' ')[0];
                        // the.checkSimulationExists({ 'impact_id': impact_id, 'sensor_id': '1', 'key': key });
                        jobs.push({sensor_id:  '1', impact_id: impact_id });
                    } else if (sensor.toLowerCase() === 'hybrid3') {
                        var impact_id = filename.split("_")[1];
                        console.log('impact_id', impact_id)
                        // the.checkSimulationExists({ 'impact_id': impact_id, 'sensor_id': filename.split("_")[0], 'key': key });
                        jobs.push({sensor_id: filename.split("_")[0], impact_id: impact_id });
                    } else {
                        // the.checkSimulationExists({ 'impact_id': filename.split("-")[1], 'sensor_id': filename.split("-")[0].split("MG")[1], 'key': key });
                        jobs.push({sensor_id: filename.split("-")[0].split("MG")[1], impact_id: filename.split("-")[1] });
                    }
                }

            }
            the.setState(prevState =>
                ({
                    listJobs: prevState.listJobs.concat(jobs)
                })
            )

            // that.displayData(e.target.result);
        };
        reader.readAsText(file);
    }

    /**
    *   #Called simulation eixists api To check simulation already exits or not ...
    */
    checkSimulationExists = (data) => {
        $('#submit').prop('disabled', true);
        console.log('this.state.list', this.state.list);
        // $("#status_"+data.key).html('<div class="spinner-border text-success"></div>');
        this.setListSimulationStatus('loading', data.key, false);

        checkSensorDataExistsSimulationjsonData(data)
            .then(res => {
                if (res.data.isExists === true) {
                    this.setListSimulationStatus('exsits', res.data.key, true);
                } else {
                    this.setListSimulationStatus(false, res.data.key, true);
                }
                $('#submit').prop('disabled', false);
                console.log('exists', res);
            }).catch(err => {
                console.log('err', err)
            })
    }

    setListSimulationStatus = (status, key, isfetched) => {
        key = parseInt(key);
        console.log('setListSimulationStatus', status, key, isfetched);
        let list = this.state.list;
        var newList = [];
        this.setState({ list: [] });
        for (var i = 0; i < list.length; i++) {
            if (i === key) {
                list[i].isExists = status;
                list[i].isfetched = isfetched;
                newList.push(list[i]);
                // this.setState(prevState => ({
                //     files: prevState.files.concat(file[i])
                // }))
            } else {
                newList.push(list[i]);
            }
        }
        this.setState({ list: newList })

    }


    handleRemoveFile = (key) => {
        // key = key.toString();
        let file = this.state.files;
        var newfile = [];
        this.setState({ files: [], isCalledExists: true })
        for (var i = 0; i < file.length; i++) {
            if (i !== key) {
                newfile.push(file[i]);
            } else {
                console.log('file deleted')
            }
        }
        console.log('remove file', newfile);
        this.setState({ files: newfile })

        //set list
        let list = this.state.list;
        var newList = [];
        this.setState({ list: [] })
        var j = 0;
        for (var i = 0; i < list.length; i++) {
            if (i !== key) {
                list[i].key = j;
                newList.push(list[i]);
                j++;
            } else {
                console.log('file deleted');
            }
        }
        console.log('remove list', newList);
        this.setState({ list: newList })
    }
    setList = () => {
        const { files } = this.state;
        console.log('files', files)
        this.setState({ list: [] })
        for (var i = 0; i < files.length; i++) {
            this.handleFileSelect(files[i], files[i].name.split('.').pop(), i)
        }
    }

    handleSensorChange = (selectedOption) => {
        console.log(selectedOption);
        if (selectedOption != null) {
            this.setState({ sensor: selectedOption.value });
        } else {
            this.setState({ sensor: '' });
        }
        this.setState({ selectedOption });
    }

    enableDragmode = () => {
        const { sensor } = this.state;
        if (!sensor || sensor === undefined || sensor === null) {
            alert('Please select sensor company first.')
        } else {
            this.setState({ isDragMod: true });
        }
    }

    handelSubmit = (e) => {
        e.preventDefault();
        $('#submit').prop('disabled', true);//#disable submit button on submit click...
        let userData = localStorage.getItem("state");
        userData = JSON.parse(userData);
        const { files, list, meshType, sensor, team, organization, listJobs } = this.state;
        // Create jobs log and send mail to user ...
        createJoblogs({email: Email, listJobs: listJobs })
        .then(res=>{
            console.log('res',res);
        }).catch(err=>{
            console.log('err',err)
        })

        const user = userData['userInfo']['email'];
        const reloadPage = () => {
            setInterval(() => {
                this.setState(prevState => ({
                    countDown: prevState.countDown - 1
                }))
            }, 1000)
        }
        // console.log('listJobs',Email, listJobs);
        let count = 0;
        if (files[0]) {
            for (var i = 0; i < files.length; i++) {
                this.setListSimulationStatus('loading', i, 0);
                console.log('file', files[i]);
                var formdata = new FormData();
                formdata.append("user", user);
                formdata.append("filename", files[i]);
                formdata.append("overwrite", "true");
                formdata.append("fileNum", i);
                formdata.append("mesh", meshType);
                formdata.append("sensor", sensor);
                formdata.append("organization", organization);
                formdata.append("team", team);

                if (list[i].imageFile) {
                    formdata.append("selfie", list[i].imageFile);
                }
                //# creating new jobs...
                submitBrainsimulationJobs(formdata)
                    .then(res => {
                        console.log('res', res)
                        if (res.data.message === "success") {
                            this.setListSimulationStatus('uploaded', res.data.fileNum, 1);
                        } else {
                            this.setListSimulationStatus(0, res.data.fileNum, 1);
                            this.setState({ isError: 'Failed to submit jobs. Please try again.' });
                        }
                        count++;
                        if (count === files.length) {
                            if (!this.state.isError) {
                                reloadPage();
                                this.setState({
                                    isUploaded: true,
                                })
                            }

                        }
                    }).catch(err => {
                        alert('failed to create jobs');
                    });
            }
        }

    }
    render() {
        console.log('team =---------------------', this.props.team)
        const { isDragMod, list, files, meshType, isUploaded, isError, countDown, loadingSensorList } = this.state;
        let estimatedCost = 0;
        if (countDown < 1) {
            window.location.reload();
        }
        if (this.state.sensors) {
            options = this.state.sensors.map(function (sensors, index) {
                return { value: sensors.sensor, label: sensors.sensor }
            });
        }
        if (list[0]) {
            if (meshType === 'coarse') {
                estimatedCost = list.length * 0.23;
                estimatedCost = estimatedCost.toFixed(2);
            } else if (meshType === 'fine') {
                estimatedCost = list.length * 1.06;
                estimatedCost = estimatedCost.toFixed(2);
            }
        }

        return (
            <>
                <div
                    ref="rosterContainer"
                    className={this.state.isMobile ? "container t-roster container_1200 animated1 zoomIn1 team-admin-page-navigation bottom-margin" : "container t-roster container_1200 animated1 zoomIn1 team-admin-page-navigation"}
                >
                    <div className="row" >
                        <div className="col-md-12">
                            {/*-- heading --*/}
                            <h1 style={style.heading}>Brain Simulation Portal</h1>
                            <Row>
                                <Col md={2}>
                                    {/*-- Back button --*/}
                                    <Button onClick={() => this.props.isbrainSubmitPortalDisplay(false)} >&lt; Back</Button>
                                    {/*-- Back button end --*/}
                                </Col>
                                <Col md={8} className="simulation-portal-subheading">
                                    {!list[0] &&
                                        <>
                                            <p>Upload CSV or JSON files and submit brain simulations right from the web browser.</p>
                                            <p>(Requires Admin permissions)</p>
                                        </>
                                    }
                                </Col>
                                <Col md={2}>

                                </Col>

                            </Row>
                            {/*-- Body --*/}
                            <Row>
                                {!isDragMod && !list[0] ?
                                    <Col sm={12} className="upload-sensor-data-button">
                                        <Col sm={6}
                                            style={{
                                                'margin': 'auto',
                                                'text-align': 'center',
                                                'padding': '19px'
                                            }}
                                        >

                                            {loadingSensorList ?
                                                <div>
                                                    <i className="fa fa-spinner fa-spin"
                                                        style={{
                                                            "font-size": "34px",
                                                            "padding": "10px",
                                                            "color": "rgb(15, 129, 220)"
                                                        }}
                                                    >
                                                    </i>
                                                    <p>Loading sensor list ...</p>
                                                </div>
                                                :
                                                <div class="input-group">
                                                    <Select
                                                        className="custom-profile-select"
                                                        value={this.state.selectedOption}
                                                        defaultValue={this.state.selectedOption}
                                                        name="sensor"
                                                        placeholder="Select sensor brand"
                                                        onChange={this.handleSensorChange}
                                                        options={options}
                                                        isClearable={true}
                                                    />
                                                </div>
                                            }
                                        </Col>
                                        <Button onClick={this.enableDragmode}>Upload Sensor Data</Button>
                                    </Col>
                                    : ''
                                }
                                <Col sm={12}>
                                    {isDragMod &&
                                        <p style={{
                                            'text-align': 'center',
                                            'padding': '37px 0px 12px',
                                            'color': '#534e4e'
                                        }}>
                                            Check Format Requirements
                                            </p>
                                    }
                                    {/*-- Drop Zone --*/}
                                    {isDragMod &&
                                        <div className="drag-drop-component">

                                            <DragMod handleUpLoadedFiles={this.props.handleUpLoadedFiles ? this.props.handleUpLoadedFiles : this.handleUpLoadedFiles} />
                                        </div>
                                    }
                                    {/*-- Drop Zone end--*/}

                                    {/*-- File List table --*/}
                                    {list[0] &&
                                        <div style={{ 'width': '80%', 'margin': 'auto' }}>
                                            <div className="simulation-file-list-header">
                                                <p>{files.length} simulations uploaded</p>
                                                <p>Would you like to use the coarse mesh or fine mesh? &nbsp;&nbsp;&nbsp;&nbsp; <Form.Check type="checkbox" checked={this.state.meshType === "coarse" ? true : false} onClick={() => this.setState({ meshType: "coarse" })} inline value="coarse" name="mesh" label="Coarse" disabled />  <Form.Check type="checkbox" checked={this.state.meshType === "fine" ? true : false} onClick={() => this.setState({ meshType: "fine" })} value="fine" name="mesh" inline label="Fine" disabled /></p>
                                                <p>Email notification when simulations are complete ? &nbsp;&nbsp;&nbsp;&nbsp; <Form.Check type="radio" value="yes" inline name="emailnotification" label="Yes" checked />  <Form.Check type="radio" value="no" name="emailnotification" inline label="No" disabled /></p>
                                                {/*<p>Estimated Cost: ${estimatedCost}</p>*/}
                                            </div>
                                            {/*-- Table --*/}
                                            <div>
                                                {isUploaded &&
                                                    <div className="alert alert-success">
                                                        <strong>Success!</strong> Jobs has been created. Going back to team page in <span style={{ 'color': 'red' }}>{countDown}</span>
                                                    </div>
                                                }
                                                {isError &&
                                                    <div className="alert alert-danger">
                                                        <strong>Failed!</strong> {isError}
                                                    </div>
                                                }
                                                <h3 style={{ 'text-align': 'center' }}>Remove any unwanted simulations</h3>
                                                <TableMod list={list} handleRemoveFile={this.props.handleRemoveFile ? this.props.handleRemoveFile : this.handleRemoveFile} handleSimulationImageUpload={this.props.handleSimulationImageUpload ? this.props.handleSimulationImageUpload : this.handleSimulationImageUpload} />
                                            </div>
                                            <div style={{ 'text-align': 'center' }}>
                                                <Button id="submit" variant="success" onClick={this.handelSubmit}> Submit </Button>
                                            </div>
                                        </div>
                                    }
                                    {/*-- File List end --*/}
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
                    <Footer />
                </div>
            </>
        );
    }
}

export default BrainSubmitPortal;
