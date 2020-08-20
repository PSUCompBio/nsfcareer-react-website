import React from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import ReactDOM from 'react-dom';
import page3 from '../pg_0003.jpg';
import header1 from './header1.png';
import footer1 from '../footer1.jpg';
import header2 from '../header2.jpg';
import footer2 from '../footer2.jpg';
import ClinicalReportHeader from './Clinical-Report-Header.png';
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
    rowHeadBorder:{
        width:'100%',
        backgroundColor:'#4472C4',
        marginTop: '10px',
        height: '3px',
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
    rowHead2Text:{
        marginTop: '5px',
        color:'#686868',
        fontSize: 16,
        display: 'inline-block'
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
    }
});

class Report extends React.Component {
    constructor(props) {
        super(props);
        console.log('props are ', this.props.jsonData);
        this.state = {
            jsonData : this.props.jsonData[0].jsonOutputFile
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
        console.log(this.state.jsonData)
        var csdm;
        if(this.state.jsonData){
            if(this.state.jsonData['csdm-15']){
                csdm = this.state.jsonData['csdm-15'];
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
                                {this.props.data.player['first-name'] +' '+this.props.data.player['last-name']}
                            </Text>

                            <View style={styles.tableRow}>



                                <Text style={styles.tableColLeft}> DOB : {this.props.user.dob ? this.props.user.dob : "N/A"} </Text>
                                <Text style={styles.tableColRight}> Referring physician : Dr. Jane Doctor </Text>

                            </View>
                            <View style={styles.tableRow}>

                                <Text style={styles.tableColLeft}> Sex : {this.props.user.gender ? this.props.user.gender.toUpperCase() : "N/A"} </Text>

                                <Text style={styles.tableColRight}> Organization : {this.props.team != undefined ? this.props.team.organization : this.props.user.organization ? this.props.user.organization : "N/A" } </Text>

                            </View>
                           
                            <View style={styles.col12}>
                                 <View style={styles.rowHeadBorder}><Text  style={styles.rowHead2Text}></Text></View>
                                <View style={styles.rowHead2}>
                                    {/*<Text  style={styles.rowHead2Text}>10% of brain tissue has exceeded MASxSR</Text>*/}
                                    {/*<Text style={styles.rowHead2TextSub}>7.5</Text>*/}
                                    {/* <Text  style={styles.rowHead2Text2}>(maximum axonal strain times strain-rate of elements that exeed 7.5 s   )</Text>*/}
                                    {/* <Text style={styles.rowHead2Text2Sub}>-1</Text>*/}
                                    <Text  style={styles.rowHead2Text}>{csdm ? csdm : '0'}% of brain tissue has exceeded CSDM_15</Text>
                                    <Text  style={styles.rowHead2Text2}>(Cumulative Strain Damage Measure is the volume of tissue that experiences tensile strains over 15%)</Text>
                                </View>
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



                                            <Text style={styles.tableColLeft}> DOB : {this.props.user.dob ? this.props.user.dob : "N/A"} </Text>
                                            <Text style={styles.tableColRight}> Referring physician : Dr. Jane Doctor </Text>

                                        </View>
                                        <View style={styles.tableRow}>

                                            <Text style={styles.tableColLeft}> Sex : {this.props.user.gender ? this.props.user.gender.toUpperCase() : "N/A"} </Text>

                                            <Text style={styles.tableColRight}> Organization : {this.props.team != undefined ? this.props.team.organization : this.props.user.organization ? this.props.user.organization : "N/A" } </Text>

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
