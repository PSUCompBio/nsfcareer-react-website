import React from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import ReactDOM from 'react-dom';
import page3 from '../pg_0003.jpg';
import header1 from '../header1.jpg';
import footer1 from '../footer1.jpg';
import header2 from '../header2.jpg';
import footer2 from '../footer2.jpg';
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
  image: {
      objectFit: 'cover'
  },
  tableRow: {
    margin : 'auto',
    flexDirection : 'row',
    marginBottom : '6px'
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
    marginLeft : '3%',
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
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page object-fit="fill" size="A4">
                    <View style={{
                      width : '100%',
                      height: '18%',
                      padding : 0,
                      backgroundColor : 'white',
                      marginBottom : 0
                    }}>
                      <Image style={styles.image}  src={header1} alt="images" />
                   </View>


                   <View style= {{
                     marginBottom : '10px'
                   }}>
                         <Text style={{
                           margin : 'auto',
                           alignItems : 'center',
                           marginTop : 0,
                           color : 'blue',
                           marginBottom : '8px'
                         }}>
                         Doe, John
                         </Text>

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
                     backgroundColor : 'white',
                     marginBottom : '10'
                   }}>
                     <Image style={styles.image}  src={footer1} alt="images" />
                  </View>

                  <View>
                    <Text style = {{
                      fontSize : 15,
                      textAlign : 'center'
                    }}>EXAMPLE OVERVIEW, NOT FOR CLINICAL USE</Text>
                  </View>
    </Page>
    <Page object-fit="fill" size="A4">

    <View style={{
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

    </Page>
    <Page object-fit="fill" size="A4">
    <View style={styles.view}>
                      <Image style={styles.image}  src={page3} alt="images" />
                  </View>
    </Page>

  </Document>
);






export default MyDocument;
