import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,Dimensions } from 'react-native';

export default class LogoutScreen extends Component {
    render(){
        return(
            <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 30}}>Logout Screen</Text>
            </View>
        )
    }

}