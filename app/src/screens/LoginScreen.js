import React, {Component} from 'react';
import {View,Dimensions,StyleSheet,KeyboardAvoidingView, Button, Image, TextInput, Text, ActivityIndicator,AsyncStorage,Alert,TouchableHighlight} from 'react-native';
import R from '../R'
import style from '../Styles'
import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import Api from '../components/Api';
import MyContext from '../context/MyContext';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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

   loginUser(contextValue){
       const username = this.state.username
       const password = this.state.password
    return Api('users/login','POST',`email=${username}&password=${password}`)
        .then((responseJson)=>{
            if(responseJson.status==200){
                contextValue.displayData()   
            }
            console.log(responseJson)
            this.setState({
                datasource: responseJson
            },
                 function(){});   
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
                "" + this.state.datasource.data.access_token,
                "" + this.state.datasource.data.phone_no
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

    async saveData(val1,val2,val3,val4,val5){
        const fname = ["@storage_Key_fname", val1];
        const lname = ["@storage_Key_lname", val2];
        const email = ["@storage_Key_email", val3];
        const access_token = ["@storage_Key_token",val4];
        const phoneNo = ["@storage_Key_phoneNo",val5]
        try{
            await AsyncStorage.multiSet([fname,lname,email,access_token,phoneNo])
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
                <ScrollView contentContainerStyle={style.container}>
                <View style={{flex: 8, justifyContent: 'center',alignItems: 'center',width: '100%'}}>
                    <View style={{width: '100%',paddingHorizontal: 20,alignItems: 'center',justifyContent: 'center'}}>
                    <Text style={style.headerTitleStyle}>{R.strings.AppName}</Text>
                    </View>
                   
                  <CustomTextInput sourceImage={R.images.username_icon}  placeholderValue='Username' keyboardType="email-address" autoCapitalize="none" onChangeText={(username)=>this.setState({username})}></CustomTextInput>
                  <CustomTextInput sourceImage={R.images.password_icon}  placeholderValue='Password' secureTextEntry = {true} autoCapitalize="none" onChangeText={(password)=>this.setState({password})}></CustomTextInput>
                  <MyContext.Consumer>
                    {contextValue=><CustomButton title='LOGIN' 
                     onPress={()=> this.props.navigation.navigate('Home')}
                    //onPress={()=> this.loginUser(contextValue)}
                   ></CustomButton>}
                  </MyContext.Consumer>
                  
                  <TouchableOpacity style={{}}onPress={()=>{this.props.navigation.navigate('ForgotPassword')}}>
                      <Text style={style.forgotBtn}>Forgot Password?</Text>
                  </TouchableOpacity>
                  {this.loadingView()}
                </View>
                <View style={{flex: 1,alignItems: 'center', justifyContent: 'center',}}>
                    <TouchableHighlight 
                    disabled={this.state.isLoading}
                    underlayColor="transparent"
                    onPress={()=>{this.props.navigation.navigate('Register')}}>
                        
                        <View style={{flexDirection: 'row'}}>
                            <View style={{paddingLeft: 10}} >
                               <Text style={styles.regAccountText}>DONT HAVE AN ACCOUNT?</Text> 
                            </View>
                            <View style={{ }}>
                               <Image source={R.images.Plus} style={{height: 20, width: 20}} ></Image>
                             </View>
                        </View>    
                    </TouchableHighlight>
                </View>
                
                </ScrollView>
            </View>
        );
    }
}


const styles=StyleSheet.create({
    regAccountText: {
        color: R.color.textInputBorderColor,
        fontSize: 16,
        //marginLeft: 30,
        paddingRight: 80,
        paddingLeft: 10, 
        fontWeight: 'bold',
        fontStyle: 'normal',
         
    },
})
