import React, {Component} from 'react';
import {View, Button, Image, TextInput, Text,ScrollView} from 'react-native';
import R from '../R'
import style from '../Styles'

const StarsFilled = () => {
    return (
        <View>
            <Image source={R.images.star_check}  />
        </View>
    );
}

export default StarsFilled