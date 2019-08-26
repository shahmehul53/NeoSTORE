import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,Image,AsyncStorage,KeyboardAvoidingView,ActivityIndicator } from 'react-native';
import R from '../R';
import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import style from '../Styles'
import Api from '../components/Api';



export default class MyAccountScreen extends Component {
    constructor(){
        super()
        this.state = {
            datasource: [], 
            access_token: "",
            id: "",
            isLoading: true
        }
    }

    componentDidMount() {
        this.myAccountDetails()
    }

    myAccountDetails(){
        return Api('users/getUserData','GET',null)
        .then((responseJson)=>{
            console.log(responseJson)
            if(responseJson.status == 200){
                this.setState(
                    {
                        datasource: responseJson.data.user_data,
                        isLoading: !this.state.isLoading
                    }
                )   
            }
                  
        }).catch((err)=> {
            console.error(err)
        })
    }
        
    render(){
        if (this.state.isLoading){
            return(
                <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator
                    size= "large"
                    color= "#E91C1A"
                     >
                    </ActivityIndicator>
                </View>
            );
        }
        else{
            return(
                <View style={style.container}>
                    <KeyboardAvoidingView  behavior="padding" enabled>
                        <View style={styles.imgView}>
                        <Image style={styles.imgStyle} source={R.images.user_male}/>
                        </View>
        
                        <View style={styles.textProfile}>
                            <View style={styles.textIcon}>
                                <Image source={R.images.username_icon}/>
                            </View>
                            <View style={styles.textInput}>
                                <Text style={styles.textInputText}>{this.state.datasource.first_name}</Text>
                            </View>
                        </View>
        
                        <View style={styles.textProfile}>
                            <View style={styles.textIcon}>
                                <Image source={R.images.username_icon}/>
                            </View>
                            <View style={styles.textInput}>
                                <Text style={styles.textInputText}>{this.state.datasource.last_name}</Text>
                            </View>
                        </View>
        
                        <View style={styles.textProfile}>
                            <View style={styles.textIcon}>
                                <Image source={R.images.email_icon}/>
                            </View>
                            <View style={styles.textInput}>
                                <Text style={styles.textInputText}>{this.state.datasource.email}</Text>
                            </View>
                        </View>
        
                        <View style={styles.textProfile}>
                            <View style={styles.textIcon}>
                                <Image source={R.images.cellphone}/>
                            </View>
                            <View style={styles.textInput}>
                                <Text style={styles.textInputText}>{this.state.datasource.phone_no}</Text>
                            </View>
                        </View>
        
                        <View style={styles.textProfile}>
                            <View style={styles.textIcon}>
                                <Image source={R.images.dob_icon}/>
                            </View>
                            <View style={styles.textInput}>
                                <Text style={styles.textInputText}>{this.state.datasource.dob}</Text>
                            </View>
                        </View>
                        
                        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                        <CustomButton title="EDIT PROFILE"
                        onPress={()=> this.props.navigation.navigate('EditProfile')}/>
                         </View>
                        
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', justifyContent: 'flex-end'}}>
        
                        <View style={{backgroundColor: R.color.textInputBorderColor, height: 52, width: 400}}>
                            <TouchableOpacity style={styles.button} onPress={()=> this.props.navigation.navigate('ResetPassword')}>
                                <Text style={styles.resetPasswordText}>RESET PASSWORD</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </KeyboardAvoidingView>
                </View>
            )
        }
        
    }

}

const styles = StyleSheet.create({
    imgView:{
        flex:1,
        justifyContent: 'center',
        paddingVertical: 10,
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
        borderRadius: 8,
        backgroundColor: R.color.textInputBorderColor
    },
    textProfile:{
        marginTop: 10,
        marginHorizontal: 30,
        flexDirection: "row",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#ffffff"
    },
    textIcon:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8
    },
    textInput:{
        flex: 5,
        paddingVertical: 8
    },
    textInputText:{
        color: "#ffffff",
        fontSize: 20,
        fontStyle: "normal"
    }

})