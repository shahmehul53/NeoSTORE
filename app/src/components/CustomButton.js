import React, { Component } from 'react'
import { View, Text, TouchableOpacity,TouchableHighlight,StyleSheet} from 'react-native'
import style from '../Styles'
import R from '../R'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CustomButtom = ({title, onPress} )=> {
    return(
        // <View style={styles.buttonView}>
        <TouchableOpacity style={style.buttonStyle} onPress={()=> onPress()}>
            <Text style={{fontSize: 23,fontWeight: 'bold',fontStyle: 'normal', color: R.color.backgroundColorDefault}}>{title}</Text>
        </TouchableOpacity>
        // </View>
    )

}

export default CustomButtom

const styles=StyleSheet.create({
    buttonStyle: {
        backgroundColor:'white',
        color:'red',
        //marginHorizontal:30,
        //marginVertical: 10,
        //marginTop: 20,
        //marginBottom: 2,
        //paddingHorizontal:10,
        //marginRight:30,
        //marginLeft: 30, 
        //width: 300,
        //height:51,
        alignItems:'center',
        justifyContent:'center',
        //textAlign:'center',
        borderRadius:8,
        //padding: 15
        //fontSize:20
    },
    buttonView: {
        //backgroundColor:'white',
        //color:'red',
        //marginHorizontal:30,
        //marginVertical: 10,
        //marginTop: 10,
        marginBottom: 2,
        //paddingHorizontal:10,
        //marginRight:30,
        //marginLeft: 30, 
        width: wp("60%"),
        height:51,
        alignItems:'center',
        justifyContent:'center',
        //textAlign:'center',
        //borderRadius:8,
        //padding: 15
        //fontSize:20
    },
})