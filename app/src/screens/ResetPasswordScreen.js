import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,Image, AsyncStorage } from 'react-native';
import R from '../R';
import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton';
import style from '../Styles'
import CustomActivityIndicator from '../components/CustomActivityIndicator';

export default class ResetPasswordScreen extends Component{
    constructor(){
        super()
        this.state = {
            access_token: "",
            isLoading: false,
            datasource: [],
            oldPassword: "",
            password: "",
            confirmPassword: ""
        }
    } 

    async resetPassword(oldPassword,password,confirmPassword){
        const token = await AsyncStorage.getItem("@storage_Key_token");
        console.log(token)
        fetch('http://staging.php-dev.in:8844/trainingapp/api/users/change',{
        method:'POST',
        headers:{
        access_token: token,
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:
        `old_password=${oldPassword}&password=${password}&confirm_password=${confirmPassword}`
        }).then((response)=>response.json())
        .then((responseJson)=>{
        this.setState({datasource: responseJson}, function(){});
        console.log(responseJson)
        this.passwordResetSuccessfully()
        }).catch((err)=> {
            console.error(err)
        })
    }

    passwordResetSuccessfully(){
        const { navigate } = this.props.navigation;
        if (this.state.datasource.status == 200) {
            this.setState({
                isLoading: !this.state.isLoading
            }),
            setTimeout(function(){
                navigate("MyAccount");
            },2000);
        } else if (this.state.datasource.status == 401) {
            alert(this.state.datasource.user_msg);
        } else if (this.state.datasource.status == 400) {
            alert(this.state.datasource.user_msg);
        } else if (this.state.datasource.status == 402){
            alert(this.state.datasource.user_msg);
        }
    }

    loadingView(){
        if(this.state.isLoading){
            return <CustomActivityIndicator />;
        }
    }
    render(){
        return(
    <View style={style.container}>
         <View style={{flex: 1,marginTop: 10, paddingTop: 10, justifyContent: 'flex-start'}}>

             <Text style={style.headerTitleStyle}>{R.strings.AppName}</Text>
        </View>
        <View style={{flex: 5, alignItems: 'center'}}>
           <CustomTextInput sourceImage={R.images.password_icon} placeholderValue='Current Password' 
            onChangeText={(oldPassword)=>this.setState({oldPassword})}
            autoCapitalize="none"
            secureTextEntry = {true}
          />

         <CustomTextInput sourceImage={R.images.password_icon} placeholderValue='New Password' 
            onChangeText={(password)=>this.setState({password})}
            autoCapitalize="none"
            secureTextEntry = {true}
         />

         <CustomTextInput sourceImage={R.images.password_icon} placeholderValue='Confirm Password' 
            onChangeText={(confirmPassword)=>this.setState({confirmPassword})}
            autoCapitalize="none"
            secureTextEntry = {true}
         />

         <CustomButton title='RESET PASSWORD' 
         //onPress={()=> this.props.navigation.navigate('Home')}
         onPress={()=> this.resetPassword(this.state.oldPassword,this.state.password,this.state.confirmPassword)}
          >

          </CustomButton>
          {this.loadingView()}
         </View>
        
    </View>
        )
    }
}