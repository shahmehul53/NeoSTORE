import React, {Component} from 'react';
import {View, Button, Image, TextInput, Text,ScrollView} from 'react-native';
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
            gender: 'M',
            M: R.images.chkn,
            F: R.images.chkn
            
        }
          
    }
    
    handleCheckBox = () => this.setState({ checked: !this.state.checked})
    renderImage(){
        if(this.state.checked){
            return<Image source={R.images.checked_icon}></Image>
        }
        else{
            return<Image source={R.images.uncheck_icon}></Image>
        }
    }

    changeRadioButton(n) {
        switch(n) {
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
    }

         
    render() {
        //console.log(this.state.checked)
        return (
            <View style={style.container}>
                <View style={style.RegisterView}>
                
                <Text style={style.headerTitleStyle}>{R.strings.AppName}</Text>
                <CustomTextInput sourceImage={R.images.username_icon} placeholderValue='First Name'></CustomTextInput>
                <CustomTextInput sourceImage={R.images.username_icon} placeholderValue='Lase Name'></CustomTextInput>
                <CustomTextInput sourceImage={R.images.email_icon} placeholderValue='Email'></CustomTextInput>
                <CustomTextInput sourceImage={R.images.password_icon} placeholderValue='Password'></CustomTextInput>
                <CustomTextInput sourceImage={R.images.password_icon} placeholderValue='Confirm Password'></CustomTextInput>
                
                <View style={style.genderStyleContainer}>
                    <Text style={style.genderText}>Gender</Text>
                    
                    <View style={{flexDirection: 'row',margin: 5}}> 
                    <TouchableOpacity style={{ justifyContent: 'center'}} onPress={this.changeRadioButton(0)}>
                        <Image source={this.state.M}></Image>
                    </TouchableOpacity>
                    <Text style={style.maleFemaleText} >Male</Text>
                    </View>
                    
                    <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{ justifyContent: 'center'}} onPress={this.changeRadioButton(1)} >
                        <Image source={this.state.F}></Image>
                    </TouchableOpacity>
                    <Text style={style.maleFemaleText}>Female</Text>
                    
                    </View>
                </View>
                
                <CustomTextInput sourceImage={R.images.cellphone} placeholderValue='Phone Number'></CustomTextInput>
                
                <View style={{flexDirection: 'row' ,margin: 10}}>
                    <TouchableOpacity onPress={this.handleCheckBox}>
                    {this.renderImage()}
                    </TouchableOpacity>
                    <Text style={{color:R.color.textInputBorderColor, fontSize: 16, fontWeight: "bold"}} > I agree the Terms & Conditions</Text>
                </View>
                
                <CustomButton title='REGISTER' ></CustomButton>
                </View>
            </View>

        )
    }
}
