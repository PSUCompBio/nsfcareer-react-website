import React from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';

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
    
   
});

class page_3 extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
       
        return (
            <Page object-fit="fill" size="A4">
                <View>
                    <Text >{'                   PAGE 2 of 2'} </Text>
                </View>
            </Page>
           
        );

    }

}
export default page_3
