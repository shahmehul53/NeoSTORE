import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class LogoutScreen extends Component {
    render(){
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}></TouchableOpacity>
        )
    }

}