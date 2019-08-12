import React, { Component } from 'react'
import { View, Text, TouchableOpacity,TouchableHighlight } from 'react-native'
import style from '../Styles'
import R from '../R'

const CustomButtom = ({title, onPress} )=> {
    return(
    
        <TouchableOpacity style={style.buttonStyle} onPress={()=> onPress()}>
            <Text style={{fontSize: 23, color: R.color.backgroundColorDefault}}>{title}</Text>
        </TouchableOpacity>
       
    )

}

export default CustomButtom