import React, {Component} from 'react';
import {View,Dimensions,StyleSheet,KeyboardAvoidingView, Button, Image, TextInput, Text, ActivityIndicator,AsyncStorage,Alert,TouchableHighlight} from 'react-native';
import R from '../R'
import style from '../Styles'
import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomActivityIndicator from '../components/CustomActivityIndicator';

let winSize = Dimensions.get('window');
console.log(winSize);


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

   loginUser(){
       const username = this.state.username
       const password = this.state.password
       fetch('http://staging.php-dev.in:8844/trainingapp/api/users/login',{
           method: 'POST',
           headers:{
            //'access_token': "5d2eb4b6ca059",
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
            }),
            this.saveData(
                "" + this.state.datasource.data.first_name,
                "" + this.state.datasource.data.last_name,
                "" + this.state.datasource.data.email,
                "" + this.state.datasource.data.access_token
            ),
            setTimeout(function(){
                navigate("Home");
            },1000);
        } else if (this.state.datasource.status == 401) {
            alert(this.state.datasource.user_msg);
        } else if (this.state.datasource.status == 400) {
            alert(this.state.datasource.user_msg);
        } else if (this.state.datasource.status == 404){
            alert(this.state.datasource.user_msg);
        }
    }

    async saveData(val1,val2,val3,val4){
        const fname = ["@storage_Key_fname", val1];
        const lname = ["@storage_Key_lname", val2];
        const email = ["@storage_Key_email", val3];
        const access_token = ["@storage_Key_token",val4];
        try{
            await AsyncStorage.multiSet([fname,lname,email,access_token])
        } catch(e){
            console.log("Failed to retrieve data"+error)
        }
        console.log("Done")
    }

    loadingView(){
        if(this.state.isLoading){
            return <CustomActivityIndicator />;
        }
    }
    
    render(){
        return(
            <View style={style.container}>
                 <KeyboardAvoidingView  behavior="padding" enabled>
                <View style={{flex: 9, justifyContent: 'center',alignItems: 'center'}}>
                  <Text style={style.headerTitleStyle}>{R.strings.AppName}</Text> 
                  <CustomTextInput sourceImage={R.images.username_icon} placeholderValue='Username' keyboardType="email-address" autoCapitalize="none" onChangeText={(username)=>this.setState({username})}></CustomTextInput>
                  <CustomTextInput sourceImage={R.images.password_icon} placeholderValue='Password' secureTextEntry = {true} autoCapitalize="none" onChangeText={(password)=>this.setState({password})}></CustomTextInput>
                  <CustomButton title='LOGIN' 
                     //onPress={()=> this.props.navigation.navigate('Home')}
                       onPress={()=> this.loginUser()}
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
                </KeyboardAvoidingView>
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
