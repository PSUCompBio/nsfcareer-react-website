import React from 'react';
import {  Page, Text, View } from '@react-pdf/renderer';

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
