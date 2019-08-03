import React, {Component} from 'react';
import {View, StyleSheet, Image, TextInput, ActivityIndicator} from 'react-native';;
import style from '../Styles'
import R from '../R';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';

const CustomActivityIndicator = () => {
    return(
        // <View style={{padding: 20,alignItems: 'center', justifyContent: 'center'}}>
        //    <ActivityIndicator size={"large"} color="white" />
        //  </View>
        <View style={{height:80,width:80,borderRadius:10,alignItems:'center', justifyContent:'center'}}>   
            <SkypeIndicator color='white'/>
        </View>
    );
};

export default CustomActivityIndicator