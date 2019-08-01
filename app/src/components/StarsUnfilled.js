import React, {Component} from 'react';
import {View, Button, Image, TextInput, Text,ScrollView} from 'react-native';
import R from '../R'
import style from '../Styles'

const StarsUnfilled = () => {
    return (
        <View>
            <Image source={R.images.star_unchek}  />
        </View>
    );
}

export default StarsUnfilled