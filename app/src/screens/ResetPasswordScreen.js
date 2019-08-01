import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,Image } from 'react-native';
import R from '../R';
import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton';
import style from '../Styles'

export default class ResetPasswordScreen extends Component{
    render(){
        return(
    <View style={style.container}>
         <View style={{flex: 1,marginTop: 10, paddingTop: 10, justifyContent: 'flex-start'}}>

             <Text style={style.headerTitleStyle}>{R.strings.AppName}</Text>
        </View>
        <View style={{flex: 5, alignItems: 'center'}}>
           <CustomTextInput sourceImage={R.images.password_icon} placeholderValue='Current Password' 
          //onChangeText={(username)=>this.setState({username})}
          />

         <CustomTextInput sourceImage={R.images.password_icon} placeholderValue='New Password' 
         //onChangeText={(password)=>this.setState({password})}
         />

         <CustomTextInput sourceImage={R.images.password_icon} placeholderValue='Confirm Password' 
         //onChangeText={(username)=>this.setState({username})}
         />

         <CustomButton title='RESET PASSWORD' 
         //onPress={()=> this.props.navigation.navigate('Home')}
         //onPress={()=> this.loginUser(this.state.username,this.state.password)}
          >

          </CustomButton>
         </View>
        
    </View>
        )
    }
}