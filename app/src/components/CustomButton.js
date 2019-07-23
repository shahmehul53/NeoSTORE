import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import style from '../Styles'
import R from '../R'

const CustomButtom = ({title, onPress} )=> {
    return(
    <View style={style.buttonStyle}>
        <TouchableOpacity onPress={()=> onPress()}>
            <Text style={{fontSize: 23, color: R.color.backgroundColorDefault}}>{title}</Text>
        </TouchableOpacity>
       
    </View>
    )

}

export default CustomButtom