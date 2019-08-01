import React, { Component } from 'react'
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import style from '../Styles'
import R from '../R';


const CustomRedButton = ({title, onPress} )=> {
    return(
    <View style={styles.buttonStyle1}>
        <TouchableOpacity onPress={()=> onPress()}>
            <Text style={{fontSize: 23, color: R.color.textInputBorderColor,fontWeight: 'bold'}}>{title}</Text>
        </TouchableOpacity>
       
    </View>
    )

}

const styles=StyleSheet.create({
    buttonStyle1: {
        backgroundColor:'red',
        color:'red',
        marginTop:21,
        width:300,
        height:51,
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center',
        borderRadius:5,
        fontSize:20
    },
})

export default CustomRedButton