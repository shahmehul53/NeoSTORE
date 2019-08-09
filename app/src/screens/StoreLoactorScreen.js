import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,Dimensions } from 'react-native';
import * as Font from 'expo-font';
import R from '../R';

export default class StoreLocatorScreen extends Component {

    render(){
        return(
            <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 30}}>Store Locator Screen</Text>
            </View>
        )
    }

}