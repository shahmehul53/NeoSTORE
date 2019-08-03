import React, {Component} from 'react';
import {View, StyleSheet, Image, TextInput} from 'react-native';;
import style from '../Styles'
import R from '../R'

const CustomTextInput=({sourceImage,placeholderValue, onChangeText,secureTextEntry,keyboardType})=>{
    return(
    <View style={style.textInputStyle}>
        <View style={{flex:1}}>
          <Image source={sourceImage}/>
          </View>
        <View style={{flex:5}}>
         <TextInput placeholderTextColor={R.color.textInputBorderColor} keyboardType={keyboardType} secureTextEntry={secureTextEntry} placeholder={placeholderValue} onChangeText={onChangeText}>

         </TextInput> 
        </View>  
    </View>
    )
}

export default CustomTextInput