import React, {Component} from 'react';
import {View, Button, Image, TextInput, Text,ScrollView,Alert,Dimensions,StyleSheet,KeyboardAvoidingView} from 'react-native';
import R from '../R'
import style from '../Styles'
import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import EStyleSheet from 'react-native-extended-stylesheet';
import Api from '../components/Api';

//  widthScreen: Dimensions.get('window').width;
//  heightScreen: Dimensions.get('window').height
//const { width, height } = Dimensions.get('window');
 let entireScreenWidth = Dimensions.get('window').width;

 EStyleSheet.build({$rem: entireScreenWidth / 380});

export default class RegisterScreen extends Component {
   

    constructor() {
        super()    
        this.state = {
            datasource: [],
            checked: false,
            image: R.images.uncheck_icon,
            gender: "M",
            M: R.images.chkn,
            F: R.images.chkn,
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm_password: "",
            phone_no: "",
            datasource: [],
            //checkButtonCondition: false,
            isLoading: false
        };   
    }

    registerUser(first_Name,last_Name,email,password,confirm_password,gender,phone_no){
        return Api('users/register','POST',`first_name=${first_Name}&last_name=${last_Name}&email=${email}&password=${password}&confirm_password=${confirm_password}&gender=${gender}&phone_no=${phone_no}`)
        .then((responseJson)=>{
        this.setState({datasource: responseJson}, function(){});
        console.log(responseJson)
        this.registeredSuccessfully()
        }).catch((err)=> {
            console.error(err)
        })
    }

    registeredSuccessfully(){
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
                navigate("Login");
            },2000);
        } else if (this.state.datasource.status == 401) {
            alert(this.state.datasource.user_msg);
        } else if (this.state.datasource.status == 400) {
            alert(this.state.datasource.user_msg);
        } else if (this.state.datasource.status == 422){
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
            console.log("Failed to retrieve data")
        }
        console.log("Done")
    }

    loadingView(){
        if(this.state.isLoading){
            return <CustomActivityIndicator />;
        }
    }
    


    handleCheckBox = () => this.setState({ checked: !this.state.checked})
    renderImage() {
        if(this.state.checked){
            return<Image source={R.images.checked_icon}></Image>
        }
        else{
            return<Image source={R.images.uncheck_icon}></Image>
        }
    }

    changeRadioButton(n) {
        switch (n) {
          case 0:
            this.setState({
              gender: "M",
              M: R.images.chky,
              F: R.images.chkn
            });
            break;
          case 1:
            this.setState({
              gender: "F",
              M: R.images.chkn,
              F: R.images.chky
            });
            break;
          default:
            this.setState({
              gender: "M",
              M: R.images.chky,
              F: R.images.chkn
            });
        }
        console.log(n);
        console.log(this.state.gender);
    }
    

         
    render() {
        //console.log(this.state.checked)
        console.log(this.state.datasource)
        return (
            <View style={style.container}>
                {/* <KeyboardAvoidingView  behavior="padding" enabled> */}<ScrollView>
                <View style={style.RegisterView}>
                
                <Text style={style.headerTitleStyle}>{R.strings.AppName}</Text>
                <CustomTextInput sourceImage={R.images.username_icon} placeholderValue='First Name' autoCapitalize="none" onChangeText={(first_name)=>this.setState({first_name})}></CustomTextInput>
                <CustomTextInput sourceImage={R.images.username_icon} placeholderValue='Last Name' autoCapitalize="none" onChangeText={(last_name)=>this.setState({last_name})}></CustomTextInput>
                <CustomTextInput sourceImage={R.images.email_icon} placeholderValue='Email' autoCapitalize="none" onChangeText={(email)=>this.setState({email})}></CustomTextInput>
                <CustomTextInput sourceImage={R.images.password_icon} placeholderValue='Password' secureTextEntry={true} autoCapitalize="none" onChangeText={(password)=>this.setState({password})}></CustomTextInput>
                <CustomTextInput sourceImage={R.images.password_icon} placeholderValue='Confirm Password' secureTextEntry={true} autoCapitalize="none" onChangeText={(confirm_password)=>this.setState({confirm_password})}></CustomTextInput>
                
                <View style={style.genderStyleContainer}>
                    <Text style={style.genderText}>Gender</Text>
                    
                    <View style={{flexDirection: 'row',margin: 5}}> 
                    <TouchableOpacity style={{ justifyContent: 'center'}} onPress={()=>this.changeRadioButton(0)}>
                        <Image source={this.state.M}></Image>
                    </TouchableOpacity>
                    <Text style={style.maleFemaleText} >Male</Text>
                    </View>
                    
                    <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{ justifyContent: 'center'}} onPress={()=>this.changeRadioButton(1)} >
                        <Image source={this.state.F}></Image>
                    </TouchableOpacity>
                    <Text style={style.maleFemaleText}>Female</Text>
                    
                    </View>
                </View>
                
                <CustomTextInput sourceImage={R.images.cellphone} placeholderValue='Phone Number' keyboardType="numeric" onChangeText={phone_no=>this.setState({phone_no})}></CustomTextInput>
                
                <View style={{flexDirection: 'row' ,margin: 10}}>
                    <TouchableOpacity onPress={this.handleCheckBox}>
                    {this.renderImage()}
                    </TouchableOpacity>
                    <Text style={{color:R.color.textInputBorderColor, fontSize: 16, fontWeight: "bold"} } > I agree the Terms & Conditions</Text>
                </View>
                
                <CustomButton title='REGISTER' onPress={()=> 
                    // this.registeredUSer("abc","def","abc@gmail.com","abc123","abc123","M",9874563210)}/>
                 this.registerUser(this.state.first_name,this.state.last_name,this.state.email,this.state.password,this.state.confirm_password,this.state.gender,this.state.phone_no)} ></CustomButton> 
                 {this.loadingView()}
                </View>
                {/* </KeyboardAvoidingView> */}
                </ScrollView>
                
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 8
    },
        
    
    RegisterView:{
        width: "100%",
        //aspectRatio: 2,
        //flexDirection: "row",
        borderWidth: 1,
        borderColor: '#d6d7da',
        backgroundColor: "white",
    }
})
    
