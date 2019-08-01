import React, {Component} from 'react';
import {View, Button, Image, TextInput, Text,ScrollView,Alert} from 'react-native';
import R from '../R'
import style from '../Styles'
import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default class RegisterScreen extends Component {

    constructor() {
        super()
        this.state = {
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
            checkButtonCondition: false,
        };   
    }

    registerUser(first_Name,last_Name,email,password,confirm_password,gender,phone_no){
        fetch('http://staging.php-dev.in:8844/trainingapp/api/users/register',{
        method:'POST',
        headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:
        `first_name=${first_Name}&last_name=${last_Name}&email=${email}&password=${password}&confirm_password=${confirm_password}&gender=${gender}&phone_no=${phone_no}`
        }).then((response)=>response.json())
        .then((responseJson)=>{
        console.log(responseJson)
        const msg = responseJson.message
        alert(msg)
        })
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
                <View style={style.RegisterView}>
                
                <Text style={style.headerTitleStyle}>{R.strings.AppName}</Text>
                <CustomTextInput sourceImage={R.images.username_icon} placeholderValue='First Name' onChangeText={(first_name)=>this.setState({first_name})}></CustomTextInput>
                <CustomTextInput sourceImage={R.images.username_icon} placeholderValue='Last Name' onChangeText={(last_name)=>this.setState({last_name})}></CustomTextInput>
                <CustomTextInput sourceImage={R.images.email_icon} placeholderValue='Email' onChangeText={(email)=>this.setState({email})}></CustomTextInput>
                <CustomTextInput sourceImage={R.images.password_icon} placeholderValue='Password' onChangeText={(password)=>this.setState({password})}></CustomTextInput>
                <CustomTextInput sourceImage={R.images.password_icon} placeholderValue='Confirm Password' onChangeText={(confirm_password)=>this.setState({confirm_password})}></CustomTextInput>
                
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
                
                <CustomTextInput sourceImage={R.images.cellphone} placeholderValue='Phone Number' onChangeText={phone_no=>this.setState({phone_no})}></CustomTextInput>
                
                <View style={{flexDirection: 'row' ,margin: 10}}>
                    <TouchableOpacity onPress={this.handleCheckBox}>
                    {this.renderImage()}
                    </TouchableOpacity>
                    <Text style={{color:R.color.textInputBorderColor, fontSize: 16, fontWeight: "bold"} } > I agree the Terms & Conditions</Text>
                </View>
                
                <CustomButton title='REGISTER' onPress={()=> 
                    // this.registeredUSer("abc","def","abc@gmail.com","abc123","abc123","M",9874563210)}/>
                 this.registerUser(this.state.first_name,this.state.last_name,this.state.email,this.state.password,this.state.confirm_password,this.state.gender,this.state.phone_no)} ></CustomButton> 
                </View>
            </View>

        )
    }
}
