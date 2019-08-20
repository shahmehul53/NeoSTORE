import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,FlatList,Image, TextInput,Alert,AsyncStorage } from 'react-native';
import R from '../R';
import CustomButtom from '../components/CustomButton';
import CustomRedButton from '../components/CustomRedButton';
import CustomTextInput from '../components/CustomTextInput';
import Api from '../components/Api'

export default class AddressScreen extends Component{
    constructor(){
        super()
        this.state = {
            datasource: [],
            address: "",
            access_token: ""
        }
    }

    placeOrder(){
        const address = this.state.address;
        const { navigate } = this.props.navigation;
        return Api('order','POST',`address=${address}`)
         .then((responseJson)=>{
             this.setState({datasource: responseJson})
             if(this.state.datasource.status == 200){
                 setTimeout(function(){
                     navigate("Home");
                 }, 2000);
                 alert(this.state.datasource.user_msg)
             } 
             else if(this.state.datasource.status == 401){
                alert(this.state.datasource.user_msg)
             } 
             console.log(responseJson)
         }).catch(error => {
            console.error(error);
        });
    }
    

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.addressContent}>
                    <Text style={styles.addresText} >ADDRESS:</Text>
                
                    <TextInput style={styles.textInputStyle}
                     onChangeText={address => this.setState({ address })}
                     multiline={true}
                     numberOfLines={4}/>  
                <CustomRedButton 
                       title="PLACE ORDER"
                       onPress={()=>this.placeOrder()}
                       >
                           
                       </CustomRedButton>
                </View>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        //justifyContent:'center',
    },
    addressContent:{
        //justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    addresText:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    shipAddress:{
        paddingTop: 20,
        borderWidth: 1,
        height: 60,
        width: 100
    },
    buttonStyle:{
        flex: 5,
        //justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    RegisterView:{
        
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInputStyle:{
        borderWidth:1.5,
        borderColor: 'black',
        height:100,
        width:300,
        margin: 5,
        marginLeft: 10,
        marginRight: 10,
        flexDirection:'row',
        alignItems:'center',
        //justifyContent:'center',
        //backgroundColor:R.color.backgroundColorDefault,
        paddingHorizontal:10
    }


})