import React from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import ReactDOM from 'react-dom';
import page3 from '../pg_0003.jpg';
import header1 from './header1.png';
import footer1 from '../footer1.jpg';
import header2 from '../header2.jpg';
import footer2 from '../footer2.jpg';
import trangle from './trangle.png'
import ClinicalReportHeader from './Clinical-Report-Header.png';
import taxture1  from './taxture1.jpg'
// import logo 
// Create styles
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
        marginTop: '10px',
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
    trangle: {
        textAlign:'center',
        width: '25%',
        marginLeft: '30%'
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
        width : '60%',
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
        marginTop: '25px'
    },
    tableTd1: {
        display : 'inline-block',
        width : '20%',
        float : 'left',
        flexDirection : 'column',
        color : 'grey',
        fontSize : 12,
        textAlign : 'left',
        marginRight: '15px',
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
        marginTop: '25px',
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
        marginTop: '25px',
        textAlign : 'center'
    },
    hLine : {
        width : '1.5px',
        float : 'left',
        flexDirection : 'column',
        backgroundColor: 'grey',
        height: '11px',
        marginTop: '25px'
    },
    taxture1_div:{
        width: '79%',
        marginLeft: '22%',
        position: 'absolute',
        marginTop: '63%'
    },
    taxture1: {
        width: '100%',
        textAlign:'center'
    }
});

class Report extends React.Component {
    constructor(props) {
        super(props);
        console.log('Rports props are ', this.props);
        console.log('metric ', this.props.Metric);

        if(this.props.jsonData){
            this.state = {
                jsonData : this.props.jsonData[0].jsonOutputFile,
                data: this.props.data.player,
                metric: ''
            }
        }else if(this.props.data){
            this.state = {
                jsonData : this.props.jsonfile,
                data: this.props.data.sensor_data.player ? this.props.data.sensor_data.player : '',
                metric: this.props.Metric,
            }
        }else{
            this.state = {
                jsonData : '',
                data: '',
                metric: ''
            } 
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


    render() {
        var csdm;
        if(this.props.jsonData){
            if(this.props.jsonData['csdm-15']){
                csdm = this.props.jsonData['csdm-15'];
            }
        }
        return (
            <Document>
                <Page object-fit="fill" size="A4">
                    {/*<View style={{
                        width : '100%',
                        height: '18%',
                        padding : 0,
                        backgroundColor : 'white',
                        marginBottom : 0
                        }}>
                        <Image style={styles.image}  src={header1} alt="images" />
                        </View>
                        */}
                        <View style= {{
                            }}>
                            <View style= {styles.tableHead}>
                                <Image  style={styles.logo} src={ClinicalReportHeader} alt="head"/>
                            </View>
                            <View style= {styles.tableRowHeadtitle}>
                                <Text style={styles.title}>Prediction Overview</Text>
                            </View>
                            <View style= {styles.tableRowHead}>
                                <Text style={styles.tableColLeft}> Date : {this.getDateInFormat()} </Text>
                                <Text style={styles.tableColRightHead}>{'                   PAGE 1 of 2'} </Text>
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



                                <Text style={styles.tableColLeft}> DOB : {"N/A"} </Text>
                                <Text style={styles.tableColRight}> Referring physician : Unknown </Text>

                            </View>
                            <View style={styles.tableRow}>

                                <Text style={styles.tableColLeft}> Sex : {"N/A"} </Text>

                                <Text style={styles.tableColRight}> Organization : {"N/A" } </Text>

                            </View>
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
                                        <View style={styles.tableColRight2_2}>
                                            <Image  style={styles.trangle} src={trangle} alt="trangle"/>
                                        </View>
                                        <Text style={styles.tableColRight2_2}></Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableTd1}>Parietal Lobe</Text>
                                        <View style={styles.tableColRight2_2}>
                                            <Image  style={styles.trangle} src={trangle} alt="trangle"/>
                                        </View>
                                        <Text style={styles.tableColRight2_2}></Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableTd1}>Occipital Lobe</Text>
                                        <View style={styles.tableColRight2_2}>
                                            <Image  style={styles.trangle} src={trangle} alt="trangle"/>
                                        </View>
                                        <Text style={styles.tableColRight2_2}></Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableTd1}>Temporal Lobe</Text>
                                        <View style={styles.tableColRight2_2}>
                                            <Image  style={styles.trangle} src={trangle} alt="trangle"/>
                                        </View>
                                        <Text style={styles.tableColRight2_2}></Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableTd1}>Cerebellum</Text>
                                        <View style={styles.tableColRight2_2}>
                                            
                                        </View>
                                        <Text style={styles.tableColRight2_2}></Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableTd1}>Motor Sensor Cortex</Text>
                                        <View style={styles.tableColRight2_2}>
                                            
                                        </View>
                                        <Text style={styles.tableColRight2_2}></Text>
                                    </View>
                                    <View style={styles.col12}>
                                        <View style={styles.tableFootBorder}><Text  style={styles.rowHead2Text}></Text></View>
                                    </View>
                                    <View style={styles.taxture1_div}>
                                        <Image  style={styles.trangle} src={taxture1} alt="trangle"/>
                                    </View>
                        </View>

                        {/* <View style={{
                            width : '100%',
                            padding : 0,
                            backgroundColor : 'white',
                            marginBottom : '10'
                            }}>
                            <Image style={styles.image}  src={footer1} alt="images" />
                            </View>
                            */}


                        </Page>
                        <Page object-fit="fill" size="A4">
                            <View>
                                <View style= {styles.tableRowHead}>

                                    <Text style={styles.tableColRightHead}>{'                   PAGE 2 of 2'} </Text>
                                </View>
                                <Text style = {{
                                        fontSize : 15,
                                        textAlign : 'center',
                                        color : "#0E263D",
                                        marginTop : '2%',
                                        marginBottom : '2%'
                                    }}>NSFCAREER OVERVIEW</Text>
                                    <View style= {{

                                        }}>


                                        <View style={styles.tableRow}>



                                            <Text style={styles.tableColLeft}> DOB :  {"N/A"} </Text>
                                            <Text style={styles.tableColRight}> Referring physician : Dr. Jane Doctor </Text>

                                        </View>
                                        <View style={styles.tableRow}>

                                            <Text style={styles.tableColLeft}> Sex : { "N/A"} </Text>

                                            <Text style={styles.tableColRight}> Organization : {"N/A" } </Text>

                                        </View>
                                    </View>
                                </View>

                                {/*<View style={{
                                    width : '100%',
                                    height: '18%',
                                    padding : 0,
                                    backgroundColor : 'white',
                                    marginBottom : 0
                                    }}>

                                    <Image style={styles.image}  src={header2} alt="images" />
                                    </View>


                                    <View style= {{
                                    marginBottom : '12px'
                                    }}>
                                    <View style={styles.tableRow}>

                                    <Text style={styles.tableColLeft}> DOB: 14/82/1264 </Text>


                                    <Text style={styles.tableColRight}> Referring physician : Dr. Jane Doctor </Text>

                                    </View>
                                    <View style={styles.tableRow}>

                                    <Text style={styles.tableColLeft}> Patient ID : 1452462 </Text>

                                    <Text style={styles.tableColRight}> Organization : York Technical High School </Text>

                                    </View>
                                    </View>
                                    <View style={{
                                    width : '100%',
                                    padding : 0,
                                    backgroundColor : 'white'
                                    }}>
                                    <Image style={styles.image}  src={footer2} alt="images" />
                                    </View>
                                    */}

                                </Page>
                            </Document>
                        );

                    }

                }








                export default Report;
