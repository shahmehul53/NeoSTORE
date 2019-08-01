import React, {Component} from 'react';
import {View, Button, Image, TextInput, Text} from 'react-native';
import R from '../R'
import style from '../Styles'
import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class LoginScreen extends Component {
   constructor(){
       super()
       this.state = {
           username: "",
           password: "",
           isLoading: false,
           datasource: []
       }
   } 

   loginUser(username,password){
       fetch('http://staging.php-dev.in:8844/trainingapp/api/users/login',{
           method: 'POST',
           headers:{
            'access_token': "5d2eb4b6ca059",
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:
            `email=${username}&password=${password}`
        }).then((response)=>response.json())
        .then((responseJson)=>{
            this.setState({datasource: responseJson});
            if (this.state.datasource.status == 200) {
                this.setState({
                    isLoading: !this.state.isLoading
                })
            } else if (this.state.dataSource.status == 401) {
                alert("" + this.state.dataSource.user_msg);
            } else if (this.state.dataSource.status == 400) {
                alert("" + this.state.dataSource.user_msg);
            } else {
                alert("Something Went Wrong");
            }
        console.log(responseJson)
        const msg = responseJson.message
        alert(msg)
        })
    }
   

render(){
    return(
    <View style={style.container}>
        <View style={{flex:5, alignItems: 'center', justifyContent: 'center'}}>

         <Text style={style.headerTitleStyle}>{R.strings.AppName}</Text>
          
        <CustomTextInput sourceImage={R.images.username_icon} placeholderValue='Username' onChangeText={(username)=>this.setState({username})}></CustomTextInput>

        <CustomTextInput sourceImage={R.images.password_icon} placeholderValue='Password' onChangeText={(password)=>this.setState({password})}></CustomTextInput>

        <CustomButton title='LOGIN' 
        onPress={()=> this.props.navigation.navigate('Home')}
        //onPress={()=> this.loginUser(this.state.username,this.state.password)}
         >

        </CustomButton>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ForgotPassword')}}>
           <Text style={style.forgotBtn}>Forgot Password?</Text>
        </TouchableOpacity>
        </View>

        

        <View style={style.regAccount}>
            <View style={{flex:1}}>
            
            <Text style={style.regAccountText}>DONT HAVE AN ACCOUNT?</Text> 
            
            </View>
            <View style={{flex: 1}}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Register')}}>
            <Image source={R.images.Plus} style={{marginLeft: 100}} ></Image>
            </TouchableOpacity>
            </View>
        </View>
    </View>

    )
}
}