import React, {Component} from 'react';
import {View,StyleSheet, Button, Image, TextInput, Text, ActivityIndicator,AsyncStorage,Alert,TouchableHighlight} from 'react-native';
import R from '../R'
import style from '../Styles'
import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomActivityIndicator from '../components/CustomActivityIndicator';

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
            console.log(responseJson)
            this.setState({
                datasource: responseJson
            },
                 function(){});
                 //console.log(this.state.datasource)   
                 console.log(responseJson)     
          this.loginSuccessfully()
        })
    }

    loginSuccessfully(){
        const { navigate } = this.props.navigation;
        if (this.state.datasource.status == 200) {
            this.setState({
                isLoading: !this.state.isLoading
            }),setTimeout(function(){
                navigate("Home");
            },2000);
        } else if (this.state.datasource.status == 401) {
            alert(this.state.datasource.user_msg);
        } else if (this.state.datasource.status == 400) {
            alert(this.state.datasource.user_msg);
        } else if (this.state.datasource.status == 404){
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
                <View style={{flex: 9, justifyContent: 'center',alignItems: 'center'}}>
                  <Text style={style.headerTitleStyle}>{R.strings.AppName}</Text> 
                  <CustomTextInput sourceImage={R.images.username_icon} placeholderValue='Username' keyboardType="email-address" onChangeText={(username)=>this.setState({username})}></CustomTextInput>
                  <CustomTextInput sourceImage={R.images.password_icon} placeholderValue='Password' secureTextEntry = {true} onChangeText={(password)=>this.setState({password})}></CustomTextInput>
                  <CustomButton title='LOGIN' 
                     onPress={()=> this.props.navigation.navigate('Home')}
                      // onPress={()=> this.loginUser(this.state.username,this.state.password)}
                   ></CustomButton>
                  <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ForgotPassword')}}>
                      <Text style={style.forgotBtn}>Forgot Password?</Text>
                  </TouchableOpacity>
                  {this.loadingView()}
                </View>
                <View style={{flex: 1}}>
                    <TouchableHighlight 
                    disabled={this.state.isLoading}
                    underlayColor="transparent"
                    onPress={()=>{this.props.navigation.navigate('Register')}}>
                        
                        <View style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'flex-start',marginRight: 30}}>
                            <View style={{alignItems: 'flex-start',justifyContent: 'center'}} >
                               <Text style={styles.regAccountText}>DONT HAVE AN ACCOUNT?</Text> 
                            </View>
                            <View style={{ justifyContent: 'flex-end',alignItems: 'flex-start'}}>
                               <Image source={R.images.Plus} style={{height: 20, width: 20}} ></Image>
                             </View>
                        </View>
                        
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

}

const styles=StyleSheet.create({
    regAccountText: {
        color: R.color.textInputBorderColor,
        fontSize: 14,
        marginLeft: 30,
        fontWeight: 'bold',
        paddingRight: 80,
        
        
        
    },
})