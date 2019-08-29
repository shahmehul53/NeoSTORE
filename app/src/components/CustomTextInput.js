import React, {Component} from 'react';
import {View, StyleSheet, Image, TextInput} from 'react-native';;
import style from '../Styles'
import R from '../R'

const CustomTextInput=({sourceImage,placeholderValue,onChangeText,secureTextEntry,keyboardType,autoCapitalize,defaultValue})=>{
    return(
    <View style={style.textInputStyle}>
        <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
          <Image source={sourceImage}/>
          </View>
        <View style={{flex:5}}>
         <TextInput style={styles.textInput} placeholderTextColor={R.color.textInputBorderColor}  keyboardType={keyboardType} secureTextEntry={secureTextEntry} placeholder={placeholderValue} autoCapitalize={autoCapitalize}onChangeText={onChangeText} defaultValue={defaultValue}>

         </TextInput> 
        </View>  
    </View>
    )
}

const styles = StyleSheet.create({
  textInput: {
   color: 'white',
   paddingVertical: 10,fontSize: 20
  },
 });

export default CustomTextInput