import React from 'react';
import {  Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
// import ReactDOM from 'react-dom';
// import page3 from '../pg_0003.jpg';
// import header1 from './header1.png';
// import footer1 from '../footer1.jpg';
// import header2 from '../header2.jpg';
// import footer2 from '../footer2.jpg';
// import trangle from './trangle.png';
import trangle_gray from './trangle_gray.png';
import trangle_green from './trangle_green.png';
import trangle_orange from './trangle_orange.png';
import trangle_red from './trangle_red.png';
import arrow_left from './arrow_left.png'
import arrow_right from './arrow_right.png'

import ClinicalReportHeader from './Clinical-Report-Header.png';
import taxture1  from './taxture1.png';
import branImages_1 from './branImages_1.png';
import brainimage_2 from './brainimage_2.png';
import PageFooter_3 from './3rdPageFooter.jpg';
// import page_3 from './sub_component/page_3';
import styleOfpage3 from './sub_component/styleOfpage3.json'
// import logo 
// Create styles

// let innerWidth = window.innerWidth;


class Report extends React.Component {
    constructor(props) {
        super(props);
        console.log('innerWidth ------------------------\n',styleOfpage3 )
        console.log('Rports props are report', this.props);
		
		
        if(this.props.jsonData){
            this.state = {
                jsonData : this.props.jsonData[0].jsonOutputFile,
                data: this.props.data.player,
				data1: this.props.data ? this.props.data: '',
                metric: ''
            }
        }else if(this.props.data){
            var sensor_data = this.props.data.sensor_data ? this.props.data.sensor_data : '';
            var impact_time = '';
            var  time = '';
            if (sensor_data && sensor_data['impact-time']) {
                let split = sensor_data['impact-time'].split(":");
                impact_time = split.slice(0, split.length - 1).join(":");
            }

            if (sensor_data && sensor_data['time']) {

                let split = sensor_data['time'].toString();
                console.log(split)
                split = split.replace(".", ":");
                split = split.split(":");
                time = split.slice(0, split.length - 1).join(":");
            }
            this.state = {
                jsonData : this.props.jsonfile,
                data: this.props.data.sensor_data.player ? this.props.data.sensor_data.player : '',
				data1: this.props.data ? this.props.data: '',
                metric: this.props.Metric,
                impact_time: impact_time ? this.tConvert(impact_time) : this.tConvert(time) ,
                impact_date : sensor_data['impact-date'] ? this.getDate(sensor_data['impact-date'].replace(/:|-/g, "/")) : sensor_data['date'] ? this.getDate(sensor_data['date'].replace(/:|-/g, "/")) : 'Unknown Date',
            }
        }else{
            this.state = {
                jsonData : '',
                data: '',
                data1: '',
                metric: ''
            } 
        }
        console.log('imagedata CSDM15', this.state.jsonData['imagedata'][0].CSDM15);
        console.log('imagedata PMS', this.state.jsonData['imagedata'][1].PMS);
		
    }
    tConvert = (time) => {
        console.log(time)
        if(time === 0){
          return 'Unknown Time'
        }else{
           // Check correct time format and split into components
          time = time.toString().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        
          if (time.length > 1) { // If time format correct
            time = time.slice (1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
          }
          return time.join (''); // return adjusted time or original string
        }
      }
    getDateInFormat(){
        var today = new Date();
        var dd = today.getDate();

        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        if(dd<10)
        {
            dd='0'+dd;
        }
        if(mm<10)
        {
            mm='0'+mm;
        }
        return today = mm+'/'+dd+'/'+yyyy;
    }

    getDate = (timestamp) => {

      const plus0 = num => `0${num.toString()}`.slice(-2)
    
      const d = new Date(timestamp)
    
      const year = d.getFullYear()
      const monthTmp = d.getMonth() + 1
      const month = plus0(monthTmp)
      const date = plus0(d.getDate())
      
      return `${month}/${date}/${year}`
    }
    getTrangle =(strain_Val)=>{
        if (strain_Val <= 0) {
            return trangle_gray;
        } else if (strain_Val > 0 && strain_Val <= 15) {
            return trangle_green;
        } else if (strain_Val > 15 && strain_Val <= 25) {
            return trangle_orange;
        } else if (strain_Val > 25) {
            return trangle_red;
        }
    }

    render() {
        var csdm;
        var mps;
        let ScaleWidth = 295;
        let mpstrangleScale = "0px";
        let csdmtrangleScale = "0px";
        let mpsFrontaltrangleScale = "0px";
        let mpsParietaltrangleScale = "0px";
        let mpsOccipitaltrangleScale = "0px";
        let mpsTemporaltrangleScale = "0px";
        let mpsCerebellumtrangleScale = "0px";
        let mpsMotortrangleScale = "0px";
        let csdmFrontaltrangleScale = "0px";
        let csdmParietaltrangleScale = "0px";
        let csdmOccipitaltrangleScale = "0px";
        let csdmTemporaltrangleScale = "0px";
        let csdmCerebellumtrangleScale = "0px";
        let csdmMotortrangleScale = "0px";
        let mpsTrangle1 = trangle_gray;
        let mpsTrangle2 = trangle_gray;
        let mpsTrangle3 = trangle_gray;
        let mpsTrangle4 = trangle_gray;
        let mpsTrangle5 = trangle_gray;
        let mpsTrangle6 = trangle_gray;
        let csdmTrangle1 = trangle_gray;
        let csdmTrangle2 = trangle_gray;
        let csdmTrangle3 = trangle_gray;
        let csdmTrangle4 = trangle_gray;
        let csdmTrangle5 = trangle_gray;
        let csdmTrangle6 = trangle_gray;
        if(this.state.jsonData){
            if(this.state.jsonData['CSDM-15']){
                var num1 = this.state.jsonData['CSDM-15'].cerebellum ? this.state.jsonData['CSDM-15'].cerebellum.value : "0.0000";
                var num2 = this.state.jsonData['CSDM-15'].frontal ? this.state.jsonData['CSDM-15'].frontal.value : "0.0000";
                var num3 = this.state.jsonData['CSDM-15'].occipital ? this.state.jsonData['CSDM-15'].occipital.value : "0.0000";
                var num4 = this.state.jsonData['CSDM-15'].parietal ? this.state.jsonData['CSDM-15'].parietal.value : "0.0000";
                var num5 = this.state.jsonData['CSDM-15'].temporal ? this.state.jsonData['CSDM-15'].temporal.value : "0.0000";
                var num6 = this.state.jsonData['CSDM-15'].msc ? this.state.jsonData['CSDM-15'].msc.value : "0.0000";
				if(num1 !== undefined){
					csdm = this.state.jsonData['CSDM-15'].value ? this.state.jsonData['CSDM-15'].value.toFixed(2) : 0.00;
					var csdm_val1 = "0.0000";
					var csdm_val2 = "0.0000";
					var csdm_val3 = "0.0000";
					var csdm_val4 = "0.0000";
					var csdm_val5 = "0.0000";
					var csdm_val6 = "0.0000";
					if (num1 !== undefined) { csdm_val1 = num1;}else{ csdm_val1 = "0.0000";}
					if (num2 !== undefined) { csdm_val2 = num2;}else{ csdm_val2 = "0.0000";}
					if (num3 !== undefined) { csdm_val3 = num3;}else{ csdm_val3 = "0.0000";}
					if (num4 !== undefined) { csdm_val4 = num4;}else{ csdm_val4 = "0.0000";}
					if (num5 !== undefined) { csdm_val5 = num5;}else{ csdm_val5 = "0.0000";}
					if (num6 !== undefined) { csdm_val6 = num6;}else{ csdm_val6 = "0.0000";}
					var left1 = csdm_val1 * ScaleWidth / 38;
					var left2 = csdm_val2 * ScaleWidth / 38;
					var left3 = csdm_val3 * ScaleWidth / 38;
					var left4 = csdm_val4 * ScaleWidth / 38;
					var left5 = csdm_val5 * ScaleWidth / 38;
					var left6 = csdm_val6 * ScaleWidth / 38;
					//**Round up the value....
					csdmCerebellumtrangleScale = ''+left1.toFixed(0)+'px';
					csdmFrontaltrangleScale = ''+left2.toFixed(0)+'px';
					csdmOccipitaltrangleScale = ''+left3.toFixed(0)+'px';
					csdmParietaltrangleScale = ''+left4.toFixed(0)+'px';
					csdmTemporaltrangleScale = ''+left5.toFixed(0)+'px';
					csdmMotortrangleScale = ''+left6.toFixed(0)+'px';
                    csdmTrangle1 = this.getTrangle(csdm_val1);
                    csdmTrangle2 = this.getTrangle(csdm_val2);
                    csdmTrangle3 = this.getTrangle(csdm_val3);
                    csdmTrangle4 = this.getTrangle(csdm_val4);
                    csdmTrangle5 = this.getTrangle(csdm_val5);
                    csdmTrangle6 = this.getTrangle(csdm_val6);
				}
            }
            if(this.state.jsonData['principal-max-strain']){               
			//eslint-disable-next-line
				var num1 = this.state.jsonData['principal-max-strain'].cerebellum !== undefined ? this.state.jsonData['principal-max-strain'].cerebellum.value : "0.0000";
                var num2 = this.state.jsonData['principal-max-strain'].frontal !== undefined ? this.state.jsonData['principal-max-strain'].frontal.value : "0.0000";
                var num3 = this.state.jsonData['principal-max-strain'].occipital !== undefined ? this.state.jsonData['principal-max-strain'].occipital.value : "0.0000";
                var num4 = this.state.jsonData['principal-max-strain'].parietal !== undefined ? this.state.jsonData['principal-max-strain'].parietal.value : "0.0000";
                var num5 = this.state.jsonData['principal-max-strain'].temporal !== undefined ? this.state.jsonData['principal-max-strain'].temporal.value : "0.0000";
                var num6 = this.state.jsonData['principal-max-strain'].msc !== undefined ? this.state.jsonData['principal-max-strain'].msc.value : "0.0000";	
				if(num1 !== undefined){
					mps =  this.state.jsonData['CSDM-15'].value ? this.state.jsonData['CSDM-15'].value.toFixed(2) : 0.00;
					var mps_val1 = "0.0000";
					var mps_val2 = "0.0000";
					var mps_val3 = "0.0000";
					var mps_val4 = "0.0000";
					var mps_val5 = "0.0000";
					var mps_val6 = "0.0000";
					if (num1 !== undefined) { mps_val1 = num1;}else{ mps_val1 = "0.0000";}
					if (num2 !== undefined) { mps_val2 = num2;}else{ mps_val2 = "0.0000";}
					if (num3 !== undefined) { mps_val3 = num3;}else{ mps_val3 = "0.0000";}
					if (num4 !== undefined) { mps_val4 = num4;}else{ mps_val4 = "0.0000";}
					if (num5 !== undefined) { mps_val5 = num5;}else{ mps_val5 = "0.0000";}
					if (num6 !== undefined) { mps_val6 = num6;}else{ mps_val6 = "0.0000";}
					var left1 = mps_val1 * ScaleWidth / 38;
					var left2 = mps_val2 * ScaleWidth / 38;
					var left3 = mps_val3 * ScaleWidth / 38;
					var left4 = mps_val4 * ScaleWidth / 38;
					var left5 = mps_val5 * ScaleWidth / 38;
					var left6 = mps_val6 * ScaleWidth / 38;
					//**Round up the value....
					mpsCerebellumtrangleScale = ''+left1.toFixed(0)+'px';
					mpsFrontaltrangleScale = ''+left2.toFixed(0)+'px';
					mpsOccipitaltrangleScale = ''+left3.toFixed(0)+'px';
					mpsParietaltrangleScale = ''+left4.toFixed(0)+'px';
					mpsTemporaltrangleScale = ''+left5.toFixed(0)+'px';
					mpsMotortrangleScale = ''+left6.toFixed(0)+'px';
                    mpsTrangle1 = this.getTrangle(mps_val1);
                    mpsTrangle2 = this.getTrangle(mps_val2);
                    mpsTrangle3 = this.getTrangle(mps_val3);
                    mpsTrangle4 = this.getTrangle(mps_val4);
                    mpsTrangle5 = this.getTrangle(mps_val5);
                    mpsTrangle6 = this.getTrangle(mps_val6);
				}
            }
        }
        const styles = StyleSheet.create({
            page: {
                flexDirection: 'row',
                backgroundColor: 'white'
            },
            section: {
                margin: 10,
                padding: 10,
                flexGrow: 1
            },
            view: {
                width: '100%',
                height: '100%',
                padding: 0,
                backgroundColor: 'white',
            },
            col12: {
                width: '100%',
                paddingLeft : '5%',
                paddingRight : '5%',
            },
            Image: {
                objectFit: 'cover'
            },
            tableRow: {
                flex: 1,
                marginLeft : '5%',
                flexDirection : 'row',
                marginBottom : '6px'
            },
            tableRow1: {
                flex: 1,
                flexDirection : 'row',
                marginBottom : '6px',
				backgroundColor: 'gray',
            },
            tableRowCenter: {
                flex: 1,
                marginLeft : '5%',
                flexDirection : 'row',
                marginBottom : '6px'
            },
            rowHeadBorder:{
                width:'100%',
                backgroundColor:'#4472C4',
                marginTop: '10px',
                height: '3px',
                textAlign: 'center'
            },
            tableFootBorder:{
                width:'100%',
                backgroundColor:'grey',
                marginTop: '14px',
                height: '2px',
                textAlign: 'center'
            },
            rowHead2:{
                width:'100%',
                backgroundColor:'#DAE3F3',
                borderTop:'1px solid',
                marginTop: '0px',
                padding: '10px',
                textAlign: 'center'
            },
            rowHead2subHead:{
                flex:1,
                width:'100%',
                borderTop:'1px solid',
                marginTop: '0px',
                padding: '10px',
                flexDirection:'row'
            },
            rowHead2Text:{
                marginTop: '5px',
                color:'#686868',
                fontSize: 16,
                display: 'inline-block'
            },
            rowHead2_2Text:{
                marginTop: '5px',
                color:'#686868',
                fontSize: 16,
                flex: 1,
                display: 'inline-block',
                flexDirection : 'column',

            },
            rowHead2TextSub: {
                marginTop: '22px',
                marginRight: '75px',
                position: 'absolute',
                 color:'#686868',
                fontSize: 12,
                textAlign: 'right',
                display: 'inline-block'
            },
            rowHead2Text2Sub:{
                marginTop: '40px',
                marginRight: '65px',
                position: 'absolute',
                 color:'#686868',
                fontSize: 9,
                textAlign: 'right',
                display: 'inline-block' 
            },
            rowHead2Text2:{
                marginTop: '7px',
                color:'#686868',
                fontSize: 9
            },
            rowHead2Text21:{
                marginTop: '12px',
				marginRight: '14px',
                color: '#000000',
                fontSize: 14,
                textAlign: 'center',
            },
            rowHead2Text2subHead:{
                marginTop: '7px',
                color:'#686868',
                fontSize: 15,
                display : 'inline-block',
                width : '50%',
                float : 'left',
                flexDirection : 'column',
                textAlign : 'right',
            },
            rowHead2Text2subHead_center:{
                marginTop: '7px',
                color:'#686868',
                fontSize: 15,
                display : 'inline-block',
                width : '100%',
                textAlign: 'center',
                float : 'left',
                flexDirection : 'column',
                marginBottom:'0',
                padding:'0'
            },
            rowHead2Text2subHead_2:{
                marginTop: '7px',
                color:'#686868',
                fontSize: 15,
                display : 'inline-block',
                width : '40%',
                float : 'left',
                flexDirection : 'column',
                textAlign : 'left',
            },
            tableHead:{
                flex: 1,
                flexDirection : 'row',
                marginTop : '0',
                textAlign:'center',
                position:'absolute',
            },
            logo: {
                textAlign:'center',
                width: '100%',
            },
            trangle_scale : {
                width: '100%',
                zIndex: 4
            },			
            trangle_scale1: {
                width: '50%',
                zIndex: 4,
				marginLeft:'25%',
				marginRight:'25%',
            },
            point_scale: {
                width: '14px',
                marginLeft: mpstrangleScale
            },
			csdmFrontal_point_scale: {
                width: '14px',
                marginLeft: csdmFrontaltrangleScale
            },
			csdmParietal_point_scale: {
                width: '14px',
                marginLeft: csdmParietaltrangleScale
            },
			csdmOccipital_point_scale: {
                width: '14px',
                marginLeft: csdmOccipitaltrangleScale
            },
			csdmTemporal_point_scale: {
                width: '14px',
                marginLeft: csdmTemporaltrangleScale
            },
			csdmCerebellum_point_scale: {
                width: '14px',
                marginLeft: csdmCerebellumtrangleScale
            },
			csdmMotor_point_scale: {
                width: '14px',
                marginLeft: csdmMotortrangleScale
            },
			mpsFrontal_point_scale: {
                width: '14px',
                marginLeft: mpsFrontaltrangleScale
            },
			mpsParietal_point_scale: {
                width: '14px',
                marginLeft: mpsParietaltrangleScale
            },
			mpsOccipi_point_scale: {
                width: '14px',
                marginLeft: mpsOccipitaltrangleScale
            },
			mpsTemporal_point_scale: {
                width: '14px',
                marginLeft: mpsTemporaltrangleScale
            },
			mpsCerebelluml_point_scale: {
                width: '14px',
                marginLeft: mpsCerebellumtrangleScale
            },
			mpsMotor_point_scale: {
                width: '14px',
                marginLeft: mpsMotortrangleScale
            },
             tableColRight_scale:{
                display : 'inline-block',
                width : '309px',
                marginLeft: '7px',
                float : 'left',
                flexDirection : 'column',
                fontSize : 12,
                marginTop: '5px',
            },
            tableRowHeadtitle: {
                flex: 1,
                width : '100%',
                flexDirection : 'row',
                marginTop : '75px',
                textAlign: 'center',
            },
            title:{
                fontSize:25,
                display : 'inline-block',
                color: 'white'
            },
            tableRowHead: {
                flex: 1,
                marginLeft : '5%',
                flexDirection : 'row',
                marginTop : '6px'
            },
            tableColLeft: {
                borderStyle: "solid",
                borderWidth: 0,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                display : 'inline-block',
                width : '30%',
                float : 'left',
                flexDirection : 'column',
                color : 'grey',
                fontSize : 10,
                textAlign : 'left'
            },
            tableColLeft1: {
                borderStyle: "solid",
                borderWidth: 0,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                display : 'inline-block',
                width : '30%',
                float : 'left',
                flexDirection : 'column',
                color : 'black',
                fontSize : 10,
                textAlign : 'left'
            },
            tableColLeftfull: {
                borderStyle: "solid",
                borderWidth: 0,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                display : 'inline-block',
                width : '50%',
                float : 'left',
                flexDirection : 'column',
                color : 'grey',
                fontSize : 10,
                textAlign : 'left'
            },
            tableColRight: {
                borderStyle: "solid",
                borderWidth: 0,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                display : 'inline-block',
                width : 'auto',
                float : 'left',
                flexDirection : 'column',
                color : 'grey',
                fontSize : 10,
                marginRight : '3%',
                textAlign : 'left'
            },
            tableColRight1: {
                borderStyle: "solid",
                borderWidth: 0,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                display : 'inline-block',
                width : 'auto',
                float : 'left',
                flexDirection : 'column',
                color : 'black',
                fontSize : 10,
                marginRight : '3%',
                textAlign : 'left'
            },
            tableColRightHead: {
                borderStyle: "solid",
                borderWidth: 0,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                display : 'inline-block',
                float : 'right',
                flexDirection : 'column',
                color : 'grey',
                fontSize : 10,
                marginLeft : 'auto'
            },
            column1:{
                width:'25%',
                marginTop: '25px',
                fontSize: 10,
                color : 'grey',
                borderBottom: 1,
                borderBottomColor: 'grey',
                display:'inline-block',
                float:'left'

            },
            column2:{
                width:'10%',
                marginTop: '25px',
                fontSize: 10,
                color : 'grey',
                borderBottom: 1,
                borderBottomColor: 'grey',
                display:'inline-block',
                float:'left'
            },
             tableColRight4: {
                display : 'inline-block',
                width : '75%',
                float : 'left',
                flexDirection : 'column',
                color : '#686868',
                fontSize : 16,
                textAlign : 'right',
                marginTop: '5px'
            },
            tableColLeft4: {
                display : 'inline-block',
                width : '20%',
                float : 'left',
                flexDirection : 'column',
                color : '#686868',
                fontSize : 10,
                textAlign : 'left',
                marginTop: '13px'
            },
            tableColLeft4_2: {
                display : 'inline-block',
                width : '3%',
                float : 'left',
                flexDirection : 'column',
                color : '#686868',
                fontSize : 10,
                textAlign : 'left',
                marginTop: '13px'
            },
             tableColLeft2: {
                borderBottom: 1,
                borderBottomColor: 'grey',
                display : 'inline-block',
                width : '20%',
                float : 'left',
                flexDirection : 'column',
                color : 'grey',
                fontSize : 12,
                textAlign : 'left',
                marginRight: '15px',
                marginTop: '5px'
            },
            tableTd1: {
                display : 'inline-block',
                width : '20%',
                float : 'left',
                flexDirection : 'column',
                color : 'grey',
                fontSize : 12,
                textAlign : 'left',
                marginRight: '0px',
                marginTop: '6px'
            },
            tableColRight2: {
                borderBottom: 1,
                borderBottomColor: 'grey',
                display : 'inline-block',
                width : '10%',
                float : 'left',
                flexDirection : 'column',
                color : 'grey',
                fontSize : 12,
                marginTop: '5px',
                textAlign : 'center'
            },
            tableColRight2_2: {
                display : 'inline-block',
                width : '10%',
                float : 'left',
                flexDirection : 'column',
                color : 'grey',
                fontSize : 12,
                marginTop: '4px',
                marginLeft:'15px',
                textAlign : 'center'
            },
           
            tableColRight3: {
                borderBottom: 1,
                borderBottomColor: 'grey',
                display : 'inline-block',
                width : '19%',
                float : 'right',
                flexDirection : 'column',
                color : 'grey',
                fontSize : 12,
                marginLeft: '10px',
                marginTop: '5px',
                textAlign : 'center'
            },
            footer_ST_1:{
                display : 'inline-block',
                width : '30%',
                float : 'left',
                flexDirection : 'column',
                color : 'black',
                fontSize : 12,
                marginTop: '8px',
                marginLeft: '38%',
                textAlign : 'center'
            },
            hLine : {
                width : '2px',
                float : 'left',
                flexDirection : 'column',
                backgroundColor: 'grey',
                height: '11px',
                marginTop: '5px'
            },
             trangle: {
                textAlign:'center',
                width: '22%',				
                padding: 0,		
                paddingTop: 0,		
                marginLeft: '31%',
				height: '184.5px'
            },
            taxture1_div: {
                width: '79%',
                marginLeft: '22%',
                position: 'absolute',
                marginTop: '372px'
            },
            taxture2_div: {
                width: '79%',
                marginLeft: '22%',
                position: 'absolute',
                marginTop: '380px'
            },
            taxture3_div: {
                width: '79%',
                marginLeft: '22%',
                position: 'absolute',
                marginTop: '151px'
            },
            taxture1: {
                width: '100%',
                textAlign:'center'
            },
            p1_footer_arrow_right: {
                display : 'inline-block',
                width : '8%',
                float : 'left',
                flexDirection : 'column',
                marginTop: '4px',
                textAlign : 'right',
                marginLeft:'42%'
            },
            arrow_right: {
                width: '80%',
            },
            P1_footer_t:{
                display : 'inline-block',
                width : '14%',
                float : 'left',
                flexDirection : 'column',
                color : 'black',
                fontSize : 12,
                marginTop: '2px',
                marginLeft: '5px',
                textAlign : 'center'
            },
            P1_footer_t2:{
                display : 'inline-block',
                width : '4%',
                float : 'left',
                flexDirection : 'column',
                color : 'grey',
                fontSize : 8,
                marginTop: '1px',
                marginLeft: '0px',
                textAlign : 'left'
            },
            p1_footer_arrow_left: {
                display : 'inline-block',
                width : '8%',
                float : 'left',
                flexDirection : 'column',
                marginTop: '4px',
                textAlign : 'left',
                marginLeft:'0%'
            },
            arrow_left: {
                width: '80%',
            },
            bottomView: {
              width: '100%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              color : 'grey',
              position: 'absolute', //Here is the trick
              marginTop : '800',
            }
        });
        const styleCsdm = StyleSheet.create({
            point_scale: {
                width: '14px',
                marginLeft: csdmCerebellumtrangleScale
            },			
        });

        const stylepage3 = StyleSheet.create({
            HeaderHeading: {
                width: '100%',
                textAlign: 'center',
                color: "#2F5597",
                marginTop: '40px',
                marginBottom: '40px'

            },
            col12:{
                width:'100%',
                display: 'inline-block',
                flexDirection : 'column',
            },
            col6:{
                width:'50%',
                float: 'left',
                display: 'inline-block',
                
            },
            col6Left:{
                width:'49%',
                float: 'right',
                display: 'inline-block',
            },
            blueLine:{
                width: '100%',
                height: '1px',
                backgroundColor: '#2F5597',
                marginTop: '20px',
                marginBottom: '15px'
            },
            tableRow: {
                flex: 1,
                flexDirection : 'row',
            },
            tableColLeft: {
                borderStyle: "solid",
                borderWidth: 0,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                display : 'inline-block',
                width : '50%',
                float : 'left',
                flexDirection : 'column',
                color : 'grey',
                fontSize : 12,
                textAlign : 'left'
            },				
            tableRowBody: {
                display: 'flex',
                flexDirection: 'row',
                marginTop: '3px'
            },	
            tableHead:{
                backgroundColor: '#C3C3C3',
                color: 'black',
                marginTop: '5px',
                marginBottom: '5px'
            },
			tableColLeft1: {
                borderStyle: "solid",
                borderWidth: 0,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                display : 'inline-block',
                width : '30%',
                float : 'left',
                flexDirection : 'column',
                fontSize : 12,
                textAlign : 'left',
                color: '#000000',
                fontWeight: 600,
                padding: '5px'
            },
            tableColLeft2: {
                borderStyle: "solid",
                borderWidth: 0,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                display : 'inline-block',
                width : '30%',
                float : 'left',
                flexDirection : 'column',
                fontSize : 12,
                textAlign : 'left',
                color: '#000000',
                fontWeight: 600,				
                padding: '5px'
            },
            tableRow1: {
                flex: 1,
                flexDirection : 'row',
                marginBottom : '6px',
				backgroundColor: 'gray',
            },
            tableColLeftfull: {
                borderStyle: "solid",
                borderWidth: 0,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                display : 'inline-block',
                width : '100%',
                float : 'left',
                flexDirection : 'column',
                color : 'grey',
                fontSize : 12,
                textAlign : 'left'
            },
            tableColRight: {
                borderStyle: "solid",
                borderWidth: 0,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                display : 'inline-block',
                width : '50%',
                float : 'right',
                flexDirection : 'column',
                color : 'grey',
                fontSize : 12,
                textAlign : 'right'
            },
            brainimage_2:{
                width: '100%',
                marginTop: '20px',
            },
            FooterImg: {
                width: '100%',
                marginTop: '30px',
            },
            styleOfpage3: {
                width: '50%'
            },
            FooterSection:{
                width: '100%',
                display : 'inline-block',
                flexDirection : 'column',
                float:'left',
                textAlign: 'center'
            }
        })
        return (
            <Document>

                {/*==========================
                            PAGE 1
                =======================*/}
                <Page object-fit="fill" size="A4">
                    <View style= {{
                        }}>
                        <View style= {styles.tableHead}>
                            <Image  style={styles.logo} src={ClinicalReportHeader} alt="head"/>
                        </View>
                        <View style= {styles.tableRowHeadtitle}>
                            <Text style={styles.title}>Prediction Overview</Text>
                        </View>
                        <View style= {styles.tableRowHead}>
                            <Text style={styles.tableColLeft}>Report Date : </Text>
                            <Text style={styles.tableColRightHead}>{'                   PAGE 1 of 2'} </Text>
                        </View>
                        <View style= {styles.tableRowHead}>
                            <Text style={styles.tableColLeft}><Text style={{color:'#2d549a'}}>{this.getDateInFormat()} </Text></Text>
                        </View>
                        <Text style={{
                                margin : 'auto',
                                alignItems : 'center',
                                marginTop : '3%',
                                color : 'blue',
                                marginBottom : '2%',
                                fontSize : 26,
                            }}>
                            {this.state.data['first-name'] +' '+this.state.data['last-name']}
                        </Text>

                        <View style={styles.tableRow}>
                            <Text style={styles.tableColLeft}> DOB : <Text style={{color:'#2d549a'}}>{this.state.jsonData['playerdata'].dob?this.state.jsonData['playerdata'].dob:"N/A"} </Text></Text>
                            <Text style={styles.tableColLeftfull}> Impact Date: <Text style={{color:'#2d549a'}}>{this.state.impact_date}</Text></Text>
                        </View>
                        <View style={styles.tableRow}>

                            <Text style={styles.tableColLeft}> Sex : <Text style={{color:'#2d549a'}}>{this.state.jsonData['playerdata'].gender?this.state.jsonData['playerdata'].gender:"N/A"} </Text></Text>
                            <Text style={styles.tableColLeft}> Impact Time : <Text style={{color:'#2d549a'}}> {this.state.impact_time} </Text> </Text>
                            <Text style={styles.tableColRight}> Organization : <Text style={{color:'#2d549a'}}>{this.state.data['organization']?this.state.data['organization']:this.state.data1.organization}</Text></Text>

                        </View>

                        {/*============= For CSDM 15 data ====================*/}
                            {this.state.metric.csdm_15 === 'on'? 
                                <>
                                    <View style={styles.col12}>
                                        <View style={styles.rowHeadBorder}><Text  style={styles.rowHead2Text}></Text></View>
                                        <View style={styles.rowHead2}>
                                             <View style={styles.tableRowCenter}>
                                                <Text style={styles.tableColRight4}>{csdm ? csdm : '0'}% of brain tissue has exceeded CSDM</Text>
                                                <Text style={styles.tableColLeft4}>15</Text>
                                            </View>
                                            <Text  style={styles.rowHead2Text2}>(Cumulative Strain Damage Measure is the volume of tissue that experiences tensile strains over 15%)</Text>
                                        </View>
                                    </View>
                                    <View style={styles.col12}>
                                        <View style={styles.rowHead2subHead}>
                                            <Text  style={styles.rowHead2Text2subHead}>
                                                Maximum CSDM
                                            </Text>
                                            <Text style={styles.tableColLeft4_2}>15</Text>
                                            <Text  style={styles.rowHead2Text2subHead_2}>
                                                in Each Brain Region
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableColLeft2}>BRAIN REGIONS</Text>
                                        <Text style={styles.tableColRight2}>0-7.5</Text>
                                        <Text style={styles.hLine}></Text>
                                        <Text style={styles.tableColRight2}>7.5-15</Text>
                                        <Text style={styles.hLine}></Text>
                                        <Text style={styles.tableColRight2}>15-25</Text>
                                        <Text style={styles.hLine}></Text>
                                        <Text style={styles.tableColRight2}>25-30</Text>
                                        <Text style={styles.hLine}></Text>
                                        <Text style={styles.tableColRight2}>30-50</Text>
                                        <Text style={styles.tableColRight3}>NOTES</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableTd1}>Frontal Lobe</Text>
                                        <View style={styles.tableColRight_scale}>
                                            <View style={styles.csdmFrontal_point_scale}>
                                                <Image  style={styleCsdm.trangle_scale} src={csdmTrangle1} alt="trangle"/>
                                            </View>
                                        </View>
                                        <Text style={styles.tableColRight2_2}></Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableTd1}>Parietal Lobe</Text>
                                        <View style={styles.tableColRight_scale}>
                                            <View style={styles.csdmParietal_point_scale}>
                                                <Image  style={styleCsdm.trangle_scale} src={csdmTrangle2} alt="trangle"/>
                                            </View>
                                        </View>
                                        <Text style={styles.tableColRight2_2}></Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableTd1}>Occipital Lobe</Text>
                                        <View style={styles.tableColRight_scale}>
                                            <View style={styles.csdmOccipital_point_scale}>
                                                <Image  style={styleCsdm.trangle_scale} src={csdmTrangle3} alt="trangle"/>
                                            </View>
                                        </View>
                                        <Text style={styles.tableColRight2_2}></Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableTd1}>Temporal Lobe</Text>
                                        <View style={styles.tableColRight_scale}>
                                            <View style={styles.csdmTemporal_point_scale}>
                                                <Image  style={styleCsdm.trangle_scale} src={csdmTrangle4} alt="trangle"/>
                                            </View>
                                        </View>
                                        <Text style={styles.tableColRight2_2}></Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableTd1}>Cerebellum</Text>
                                         <View style={styles.tableColRight_scale}>
                                            <View style={styles.csdmCerebellum_point_scale}>
                                                <Image  style={styleCsdm.trangle_scale} src={csdmTrangle5} alt="trangle"/>
                                            </View>
                                        </View>
                                        <Text style={styles.tableColRight2_2}></Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableTd1}>Motor Sensory Cortex</Text>
                                        <View style={styles.tableColRight_scale}>
                                            <View style={styles.csdmMotor_point_scale}>
                                                <Image  style={styleCsdm.trangle_scale} src={csdmTrangle6} alt="trangle"/>
                                            </View>
                                        </View>
                                        <Text style={styles.tableColRight2_2}></Text>
                                    </View>
                                    <View style={styles.col12}>
                                        <View style={styles.tableFootBorder}><Text  style={styles.rowHead2Text}></Text></View>
                                    </View>
                                    <View style={styles.taxture1_div}>
                                        <Image  style={styles.trangle} src={taxture1} alt="region"/>
                                    </View>
                                {/*=============== page 1 footer sections start ===============*/}
                                    <View style={styles.tableRow}>
                                       
                                        <Text style={styles.footer_ST_1}>MAY BE FUNTIONALLY</Text>
                                    </View>
                                   
                                    <View style={styles.tableRow}>
                                        <View style={styles.p1_footer_arrow_right}>
                                            <Image  style={styles.arrow_right} src={arrow_right} alt="arrow_right"/>
                                        </View>
                                        <Text style={styles.P1_footer_t}>SIGNIFICANT</Text>
                                        <Text style={styles.P1_footer_t2}>1,2,3</Text>
                                        <View style={styles.p1_footer_arrow_left}>
                                            <Image  style={styles.arrow_left} src={arrow_left} alt="arrow_right"/>
                                        </View>
                                    </View>
									<View style={styles.tableRow}>
										{this.state.jsonData['imagedata'][0].CSDM15 ?
											<Image style={styles.trangle_scale1} src={this.state.jsonData['imagedata'][0].CSDM15} alt="trangle" />
											:
											<Text style={styles.rowHead2Text21}>No summary brain strain maps available yet. Please contact an administrator at support@nsfcareer.io</Text>
										}
									</View>
                                </>
                                :
                                null
                            }
                        {/*=========================
                            For CSDM 15 data end 
                        ============================*/}


                        {/*============= For mps 15 data ====================*/}

                            {this.state.metric.csdm_15 !== 'on' && this.state.metric.mps_95 === 'on' ? 
                                <>
                                    <View style={styles.col12}>
                                        <View style={styles.rowHeadBorder}><Text  style={styles.rowHead2Text}></Text></View>
                                        <View style={styles.rowHead2}>
                                             <View style={styles.tableRowCenter}>
                                                <Text style={styles.tableColRight4}>{mps ? mps : '0'}% of brain tissue has exceeded  15% MPS</Text>
                                                <Text style={styles.tableColLeft4}></Text>
                                            </View>
                                            <Text  style={styles.rowHead2Text2}>Maximum Principal Strain (MPS) is a measurement of how much the brain tissue stretches or is compressed. This reports the volume of tissue with MPS value above 15% strain. In other words the issue is stretched 15%.</Text>
                                        </View>
                                    </View>
                                    <View style={styles.col12}>
                                        <View style={styles.rowHead2subHead}>
                                            <Text  style={styles.rowHead2Text2subHead_center}>
                                               Maximum Principal Strain In Each Region
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableColLeft2}>BRAIN REGIONS</Text>
                                        <Text style={styles.tableColRight2}>0-7.5</Text>
                                        <Text style={styles.hLine}></Text>
                                        <Text style={styles.tableColRight2}>7.5-15</Text>
                                        <Text style={styles.hLine}></Text>
                                        <Text style={styles.tableColRight2}>15-25</Text>
                                        <Text style={styles.hLine}></Text>
                                        <Text style={styles.tableColRight2}>25-30</Text>
                                        <Text style={styles.hLine}></Text>
                                        <Text style={styles.tableColRight2}>30-50</Text>
                                        <Text style={styles.tableColRight3}>NOTES</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableTd1}>Frontal Lobe</Text>
                                        {/*=== 0-7.5 ===*/}
                                        <View style={styles.tableColRight_scale}>
                                            <View style={styles.mpsFrontal_point_scale}>
                                                <Image  style={styles.trangle_scale} src={mpsTrangle1} alt="trangle"/>
                                            </View>
                                        </View>
                                        <Text style={styles.tableColRight2_2}></Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableTd1}>Parietal Lobe</Text>
                                         {/*=== 0-7.5 ===*/}
                                        <View style={styles.tableColRight_scale}>
                                            <View style={styles.mpsParietal_point_scale}>
                                                <Image  style={styles.trangle_scale} src={mpsTrangle2} alt="trangle"/>
                                            </View>
                                        </View>
                                        <Text style={styles.tableColRight2_2}></Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableTd1}>Occipital Lobe</Text>
                                         {/*=== 0-7.5 ===*/}
                                        <View style={styles.tableColRight_scale}>
                                            <View style={styles.mpsOccipi_point_scale}>
                                                <Image  style={styles.trangle_scale} src={mpsTrangle3} alt="trangle"/>
                                            </View>
                                        </View>
                                        <Text style={styles.tableColRight2_2}></Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableTd1}>Temporal Lobe</Text>
                                        {/*=== 0-7.5 ===*/}
                                        <View style={styles.tableColRight_scale}>
                                            <View style={styles.mpsTemporal_point_scale}>
                                                <Image  style={styles.trangle_scale} src={mpsTrangle4} alt="trangle"/>
                                            </View>
                                        </View>
                                        <Text style={styles.tableColRight2_2}></Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableTd1}>Cerebellum</Text>
                                        <View style={styles.tableColRight_scale}>
                                            <View style={styles.mpsCerebelluml_point_scale}>
                                                <Image  style={styleCsdm.trangle_scale} src={csdmTrangle5} alt="trangle"/>
                                            </View>
                                        </View>
                                        <Text style={styles.tableColRight2_2}></Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableTd1}>Motor Sensory Cortex</Text>
                                        <View style={styles.tableColRight_scale}>
                                            <View style={styles.mpsMotor_point_scale}>
                                                <Image  style={styleCsdm.trangle_scale} src={csdmTrangle6} alt="trangle"/>
                                            </View>
                                        </View>
                                        <Text style={styles.tableColRight2_2}></Text>
                                    </View>
                                    <View style={styles.col12}>
                                        <View style={styles.tableFootBorder}><Text  style={styles.rowHead2Text}></Text></View>
                                    </View>
                                    <View style={styles.taxture2_div}>
                                        <Image  style={styles.trangle} src={taxture1} alt="trangle"/>
                                    </View>
                                {/*=============== page 1 footer sections start ===============*/}
                                    <View style={styles.tableRow}>
                                       
                                        <Text style={styles.footer_ST_1}>MAY BE FUNTIONALLY</Text>
                                    </View>
                                   
                                    <View style={styles.tableRow}>
                                        <View style={styles.p1_footer_arrow_right}>
                                            <Image  style={styles.arrow_right} src={arrow_right} alt="arrow_right"/>
                                        </View>
                                        <Text style={styles.P1_footer_t}>SIGNIFICANT</Text>
                                        <Text style={styles.P1_footer_t2}>1,2,3</Text>
                                        <View style={styles.p1_footer_arrow_left}>
                                            <Image  style={styles.arrow_left} src={arrow_left} alt="arrow_right"/>
                                        </View>
                                    </View>									
									<View style={styles.tableRow}>
										{this.state.jsonData['imagedata'][1].PMS ?
											<Image style={styles.trangle_scale1} src={this.state.jsonData['imagedata'][1].PMS} alt="trangle" />
											:
											<Text style={styles.rowHead2Text21}>No summary brain strain maps available yet. Please contact an administrator at support@nsfcareer.io</Text>
										}
									</View>
                                    <View style={styles.tableRow}>                          
                                        <Image  style={styles.trangle_scale} src={branImages_1} alt="trangle"/>
                                    </View>
                                </>
                                : null
                            }
                        
                        {/*==========================

                            For mps 15 data end

                         =======================*/}
                        {/*=============== page 1 footer sections end ===============*/}


                        {/*====================Footer heading ==============================*/}
                        <View style={styles.bottomView}>
                            <Text>NOT FOR CLINICAL USE</Text>
                        </View>
                        {/*====================Footer heading end ==============================*/}

                    </View>
                </Page>

                {/*==========================
                            PAGE 2
                =======================*/}
                {this.state.metric.csdm_15 === 'on' && this.state.metric.mps_95 === 'on' ? 
                    <Page object-fit="fill" size="A4">
                        <View>
                            
                                <>
                                    <View style={styles.col12}>
                                        <View style={styles.rowHeadBorder}><Text  style={styles.rowHead2Text}></Text></View>
                                        <View style={styles.rowHead2}>
                                             <View style={styles.tableRowCenter}>
                                                <Text style={styles.tableColRight4}>{mps ? mps : '0'}% of brain tissue has exceeded MPS-15</Text>
                                                {/*<Text style={styles.tableColLeft4}>95</Text>*/}
                                            </View>
                                            <Text  style={styles.rowHead2Text2}>Maximum Principal Strain (MPS) is a measurement of how much the brain tissue strethes or is compressed. This reports the volume of tissue with MPS value above 15% strain. In other words the issue is stretched 15%.</Text>
                                        </View>
                                    </View>
                                    <View style={styles.col12}>
                                        <View style={styles.rowHead2subHead}>
                                            <Text  style={styles.rowHead2Text2subHead_center}>
                                                Maximum Principal Strain In Each Region
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableColLeft2}>BRAIN REGIONS</Text>
                                        <Text style={styles.tableColRight2}>0-7.5</Text>
                                        <Text style={styles.hLine}></Text>
                                        <Text style={styles.tableColRight2}>7.5-15</Text>
                                        <Text style={styles.hLine}></Text>
                                        <Text style={styles.tableColRight2}>15-25</Text>
                                        <Text style={styles.hLine}></Text>
                                        <Text style={styles.tableColRight2}>25-30</Text>
                                        <Text style={styles.hLine}></Text>
                                        <Text style={styles.tableColRight2}>30-50</Text>
                                        <Text style={styles.tableColRight3}>NOTES</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableTd1}>Frontal Lobe</Text>
                                         {/*=== 0-7.5 ===*/}
                                        <View style={styles.tableColRight_scale}>
                                            <View style={styles.mpsFrontal_point_scale}>
                                                <Image  style={styles.trangle_scale} src={mpsTrangle1} alt="trangle"/>
                                            </View>
                                        </View>
                                        <Text style={styles.tableColRight2_2}></Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableTd1}>Parietal Lobe</Text>
                                         {/*=== 0-7.5 ===*/}
                                        <View style={styles.tableColRight_scale}>
                                            <View style={styles.mpsParietal_point_scale}>
                                                <Image  style={styles.trangle_scale} src={mpsTrangle2} alt="trangle"/>
                                            </View>
                                        </View>
                                        <Text style={styles.tableColRight2_2}></Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableTd1}>Occipital Lobe</Text>
                                        {/*=== 0-7.5 ===*/}
                                        <View style={styles.tableColRight_scale}>
                                            <View style={styles.mpsOccipi_point_scale}>
                                                <Image  style={styles.trangle_scale} src={mpsTrangle3} alt="trangle"/>
                                            </View>
                                        </View>
                                        <Text style={styles.tableColRight2_2}></Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableTd1}>Temporal Lobe</Text>
                                        {/*=== 0-7.5 ===*/}
                                        <View style={styles.tableColRight_scale}>
                                            <View style={styles.mpsTemporal_point_scale}>
                                                <Image  style={styles.trangle_scale} src={mpsTrangle4} alt="trangle"/>
                                            </View>
                                        </View>
                                        <Text style={styles.tableColRight2_2}></Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableTd1}>Cerebellum</Text>
                                        <View style={styles.tableColRight_scale}>
                                            <View style={styles.mpsCerebelluml_point_scale}>
                                                <Image  style={styles.trangle_scale} src={mpsTrangle5} alt="trangle"/>
                                            </View>
                                        </View>
                                        <Text style={styles.tableColRight2_2}></Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableTd1}>Motor Sensory Cortex</Text>
                                        <View style={styles.tableColRight_scale}>
                                            <View style={styles.mpsMotor_point_scale}>
                                                <Image  style={styles.trangle_scale} src={mpsTrangle6} alt="trangle"/>
                                            </View>
                                        </View>
                                        <Text style={styles.tableColRight2_2}></Text>
                                    </View>
                                    <View style={styles.col12}>
                                        <View style={styles.tableFootBorder}><Text  style={styles.rowHead2Text}></Text></View>
                                    </View>
                                    <View style={styles.taxture3_div}>
                                        <Image  style={styles.trangle} src={taxture1} alt="trangle"/>
                                    </View>
                                {/*=============== page 1 footer sections start ===============*/}
                                    <View style={styles.tableRow}>
                                       
                                        <Text style={styles.footer_ST_1}>MAY BE FUNTIONALLY</Text>
                                    </View>
                                   
                                    <View style={styles.tableRow}>
                                        <View style={styles.p1_footer_arrow_right}>
                                            <Image  style={styles.arrow_right} src={arrow_right} alt="arrow_right"/>
                                        </View>
                                        <Text style={styles.P1_footer_t}>SIGNIFICANT</Text>
                                        <Text style={styles.P1_footer_t2}>1,2,3</Text>
                                        <View style={styles.p1_footer_arrow_left}>
                                            <Image  style={styles.arrow_left} src={arrow_left} alt="arrow_right"/>
                                        </View>
                                    </View>																		
									<View style={styles.tableRow}>
										{this.state.jsonData['imagedata'][1].PMS ?
											<Image style={styles.trangle_scale1} src={this.state.jsonData['imagedata'][1].PMS} alt="trangle" />
											:
											<Text style={styles.rowHead2Text21}>No summary brain strain maps available yet. Please contact an administrator at support@nsfcareer.io</Text>
										}
									</View>
                                    <View style={styles.tableRow}>                          
                                        <Image  style={styles.trangle_scale} src={branImages_1} alt="trangle"/>
                                    </View>
                                    {/*====================Footer heading ==============================*/}
                                    <View style={styles.bottomView}>
                                        <Text>NOT FOR CLINICAL USE</Text>
                                    </View>
                                    {/*====================Footer heading end ==============================*/}
                                </>
                                 
                        </View>
                    </Page>
                    : null
                }
                {/*==========================
                            PAGE 3
                =======================*/}

                <Page object-fit="fill" size="A4">
                    <View style={styles.col12}>

                        {/*=========== Header section start here ============*/}
						<Text style={stylepage3.HeaderHeading}>NSFCAREER OVERVIEW</Text>

                        <View style={stylepage3.tableRow}>
                            <Text style={stylepage3.tableColLeft}> DATE : {this.getDateInFormat()}</Text>
                            <Text style={stylepage3.tableColRight}> PAGE : {this.state.metric.csdm_15 === 'on' && this.state.metric.mps_95 === 'on' ?  '3 of 3' : '2 of 2'}</Text>
                        </View>
                        {/*========== Land scape blue line =============*/}
							{/*<View style={stylepage3.blueLine}></View>*/}
						
                         {/*-- Table start --*/}
                       
						{this.state.metric.csdm_15 === 'on' ?
                             <View style={[stylepage3.tableRow,stylepage3.tableHead]}>
                            {/*-- Table head --*/}
                              <Text style={[stylepage3.tableColLeft1]}>Rank</Text>
                              <Text style={[stylepage3.tableColLeft1]}>Impact Date</Text>
                              <Text style={[stylepage3.tableColLeft2]}>CSDM-15 Value</Text>
                            {/*-- Table head end--*/}

                        </View>
                            : null
                        }
                        {/*-- Table body start --*/}
						
						 {this.state.metric.csdm_15 === 'on' ? 
                            <View style={stylepage3.tableRowBody}>
                                <Text style={[stylepage3.tableColLeft1]}>1</Text>
                                <Text style={[stylepage3.tableColLeft1]}>{this.state.impact_date}</Text>
								<Text style={[stylepage3.tableColLeft2]}>{this.state.jsonData['CSDM-15'].value.toFixed(3) }</Text>
                            </View>
							 : null
						 }
						 {this.state.metric.mps_95 === 'on' ? 
                             <View style={[stylepage3.tableRow,stylepage3.tableHead]}>
                            {/*-- Table head --*/}
                              <Text style={[stylepage3.tableColLeft1]}>Rank</Text>
                              <Text style={[stylepage3.tableColLeft1]}>Impact Date</Text>
                              <Text style={[stylepage3.tableColLeft2]}>MPS-15 Value</Text>
                            {/*-- Table head end--*/}

                        </View>
                            : null
                        }
						{this.state.metric.mps_95 === 'on' ? 
                            <View style={stylepage3.tableRowBody}>
                                <Text style={[stylepage3.tableColLeft1]}>1</Text>
                                <Text style={[stylepage3.tableColLeft1]}>{this.state.impact_date}</Text>
                                <Text style={[stylepage3.tableColLeft2]}>{this.state.jsonData['principal-max-strain'].value.toFixed(3) }</Text>
                            </View>
							 : null
						  }
						  
						{/*this.state.metric.csdm_15 === 'on' && this.state.metric.mps_95 === 'on' ? 
							<>
							   <View style={[stylepage3.tableRowBody]}>
									<Text style={[stylepage3.tableColLeft1]}>1</Text>
									<Text style={[stylepage3.tableColLeft1]}>{this.getDateInFormat()}</Text>
									<Text style={[stylepage3.tableColLeft2]}>{this.state.jsonData['CSDM-15'].value}</Text>
								</View>
								<View style={stylepage3.tableRowBody}>
									<Text style={[stylepage3.tableColLeft1]}>2</Text>
									<Text style={[stylepage3.tableColLeft1]}>{this.getDateInFormat()}</Text>
									<Text style={[stylepage3.tableColLeft2]}>{this.state.jsonData['principal-max-strain'].value }</Text>
								</View>
							</>
							 : null
						   */}
						  
                        {/*=========== Customer details ===============*/}
                        <View style={stylepage3.col12}>
                            <Text 
                                style={{
                                    width: '100%',
                                    textAlign: 'center',
                                    color: '#2F5597',
                                    fontSize : 25,
                                    fontWeight: 800,
                                    marginBottom: '15px',
                                }}
                            >
                                {this.state.data['first-name'] +' '+this.state.data['last-name']}
                            </Text>
                        </View>

                         <View style={stylepage3.tableRow}>

                            <Text style={stylepage3.tableColLeft}> DOB : <Text style={{color:'#2d549a'}}>{"N/A"} </Text></Text>
                            <Text style={stylepage3.tableColRight}>Referring physician : <Text style={{color:'#2d549a'}}>Unknown</Text> </Text>
                        </View>
                         <View style={stylepage3.tableRow}>

                            <Text style={stylepage3.tableColLeft}> Patient ID : <Text style={{color:'#2d549a'}}>{"N/A"} </Text></Text>
                            <Text style={stylepage3.tableColRight}>Organization : <Text style={{color:'#2d549a'}}>{this.props.data.sensor_data ? this.props.data.sensor_data.organization : 'Unknown'}</Text> </Text>
                        </View>
                        <View style={stylepage3.blueLine}></View>

                        {/*=========== Header section end ============*/}

                        {/*============== Body section start ==================*/}
                        <View style={stylepage3.tableRow}>                          
                            <Image  style={stylepage3.brainimage_2} src={brainimage_2} alt="trangle"/>
                        </View>
                        <View style={stylepage3.FooterSection}> 
                            <Image  style={stylepage3.FooterImg} src={PageFooter_3} alt="trangle"/>
                        </View>
                    </View>
                </Page>
            </Document>
        );

    }

}
export default Report;
