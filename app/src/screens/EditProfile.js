import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,Image,AsyncStorage,KeyboardAvoidingView,ActivityIndicator,ScrollView } from 'react-native';
import R from '../R';
import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import style from '../Styles'
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import Api from '../components/Api';
import MyContext from '../context/MyContext';

export default class EditProfleScreen extends Component {
    constructor(){
        super()
        this.state = {
            access_token: "",
            isLoading: false,
            datasource: [],
            first_name: "",
            last_name: "",
            email: "",
            phone_no: "",
            dob: "",
            isLoading: false,
            
        }
        this.getUserData();
    } 

    async getUserData(){
        try{
            this.setState({
                access_token: await AsyncStorage.getItem("@storage_Key_token"),
                first_name: await AsyncStorage.getItem("@storage_Key_fname"),
                last_name: await AsyncStorage.getItem("@storage_Key_lname"),
                email: await AsyncStorage.getItem("@storage_Key_email"),
                phone_no: await AsyncStorage.getItem("@storage_Key_phoneNo"),
                dob: await AsyncStorage.getItem("@storage_Key_dob")
            })
        }catch(error){
            console.log(error)
        }
    }
    
    updateProfile(first_Name,last_Name,email,phone_no,dob,contextValue){
        return Api('users/update','POST',`first_name=${first_Name}&last_name=${last_Name}&email=${email}&profile_pic=${"abc.jpg"}&phone_no=${phone_no}&dob=${dob}`)
        .then((responseJson)=>{
        console.log("edit profile status"+responseJson.status)
        console.log("response"+responseJson)
        this.setState({datasource: responseJson}, function(){});
        
        contextValue.updateData()
        this.profileEditedSuccessfully()
        }).catch((err)=> {
            console.error(err)
        })
    }

    profileEditedSuccessfully(){
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
            <ScrollView contentContainerStyle={style.container}>
                <View style={styles.imgView}>
                <Image style={styles.imgStyle} source={R.images.profile}/>
                </View>
                
                <View style={{flex: 5, alignItems: 'center'}}>
                <CustomTextInput sourceImage={R.images.username_icon} autoCapitalize="none" defaultValue={this.state.first_name} onChangeText={(first_name)=>this.setState({first_name})} placeholderValue='First Name'/>
                <CustomTextInput sourceImage={R.images.username_icon} autoCapitalize="none" defaultValue={this.state.last_name} onChangeText={(last_name)=>this.setState({last_name})} placeholderValue='Last Name'/>
                <CustomTextInput sourceImage={R.images.email_icon} autoCapitalize="none" keyboardType="email-address" defaultValue={this.state.email} onChangeText={(email)=>this.setState({email})} placeholderValue='Email'/>
                <CustomTextInput sourceImage={R.images.cellphone} autoCapitalize="none" defaultValue={this.state.phone_no} onChangeText={phone_no=>this.setState({phone_no})} placeholderValue='Mobile No.'/>
                <CustomTextInput sourceImage={R.images.dob_icon} autoCapitalize="none" defaultValue={this.state.dob} onChangeText={dob=>this.setState({dob})} placeholderValue='DOB'/>

                {/* <View style={{ justifyContent: 'center', alignItems: 'center'}}> */}
                <MyContext.Consumer>
                {contextValue=>
                <CustomButton title="SUBMIT" 
                onPress={()=> 
                    
                 this.updateProfile(this.state.first_name,this.state.last_name,this.state.email,this.state.phone_no,this.state.dob,contextValue)}
                />}
                
                </MyContext.Consumer>
                {this.loadingView()}
                </View>
                </ScrollView>
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