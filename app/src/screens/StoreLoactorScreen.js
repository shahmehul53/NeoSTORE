import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,Dimensions,Image } from 'react-native';
import * as Font from 'expo-font';
import R from '../R';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class StoreLocatorScreen extends Component {
    constructor() {  
        super();  
        this.state = { screenWidth: "", screenHeight: "" }  
        }

        getScreenSize = () => {  
            const screenWidth = Math.round(Dimensions.get('window').width);  
            const screenHeight = Math.round(Dimensions.get('window').height);  
            this.setState({ screenWidth: screenWidth, screenHeight: screenHeight })  
            }

    render(){
        return(
            <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
                {/* <View style={{flex:1}}> */}
                    <Image source={R.images.storelocator1} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}/>
                {/* </View> */}
                {/* <Text style={{fontSize: 30}}>Store Locator Screen</Text> */}
            </View>
        )
    }

}