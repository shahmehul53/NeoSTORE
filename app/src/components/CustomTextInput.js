import React, {Component} from 'react';
import {View, StyleSheet, Image, TextInput} from 'react-native';;
import style from '../Styles'
import R from '../R'

const CustomTextInput=({sourceImage,placeholderValue})=>{
    return(
    <View style={style.textInputStyle}>
        <View style={{flex:1}}>
          <Image source={sourceImage}/>
          </View>
        <View style={{flex:5}}>
         <TextInput placeholderTextColor={R.color.textInputBorderColor}  placeholder={placeholderValue}>

         </TextInput> 
        </View>  
    </View>
    )
}

export default CustomTextInput