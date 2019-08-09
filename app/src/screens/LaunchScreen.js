import React, {Component} from 'react';
import {View, StyleSheet,Button, Image, TextInput, Text, ActivityIndicator,AsyncStorage,Alert} from 'react-native';
import R from '../R'
import style from '../Styles'
import CustomActivityIndicator from '../components/CustomActivityIndicator';
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


export default class LaunchScreen extends Component {
    constructor(){
        super()
        this.state ={
            isLoading: false
        }
    }
    

    componentDidMount(){
        const { navigate } = this.props.navigation;
        this.setState({
            isLoading: !this.state.isLoading
        }),setTimeout(function(){
            navigate("Login");
        },5000);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to {"\n"}NEOSTORE</Text>
                <View style={{height:80,width:80,borderRadius:10,alignItems:'center', justifyContent:'center'}}>   
                    <SkypeIndicator color='white'/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: R.color.backgroundColorDefault
    },
    title:{
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white'
    }


})