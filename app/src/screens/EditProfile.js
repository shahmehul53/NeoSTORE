import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,Image } from 'react-native';
import R from '../R';
import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import style from '../Styles'

export default class EditProfleScreen extends Component {
    render(){
        return(
        <View style={style.container}>
            {/* <View style={{flex: 9, paddingBottom: 20}}> */}
                <View style={styles.imgView}>
                <Image style={styles.imgStyle} source={R.images.user_male}/>
                </View>
                
                <View style={{flex: 5, alignItems: 'center'}}>
                <CustomTextInput sourceImage={R.images.username_icon} placeholderValue='First Name'/>
                <CustomTextInput sourceImage={R.images.username_icon} placeholderValue='Last Name'/>
                <CustomTextInput sourceImage={R.images.email_icon} placeholderValue='Email'/>
                <CustomTextInput sourceImage={R.images.cellphone} placeholderValue='Mobile No.'/>
                <CustomTextInput sourceImage={R.images.dob_icon} placeholderValue='DOB'/>

                {/* <View style={{ justifyContent: 'center', alignItems: 'center'}}> */}
                <CustomButton title="SUBMIT"/>
                </View>
           
         </View>
        )
    }
}

const styles = StyleSheet.create({
    imgView:{
        flex: 1,
        justifyContent: 'center',
        marginTop: 30,
        alignItems: 'center'
    },
    imgStyle:{
        height: 100,
        width: 100,
        padding: 20,
        borderRadius: 100
    },
    resetPasswordText:{
        fontSize: 17,
        color: '#333333',
        fontWeight: 'bold'
    },
    button:{
        marginHorizontal: 30,
        marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    }

})