import React, {Component} from 'react';
import Api from '../components/Api'
import { StyleSheet, View, ScrollView, Dimensions,Image,AsyncStorage} from 'react-native'
import MyContext from './MyContext';

export default class CartProvider extends Component{
    constructor(){
        super();
        this.state = {
            count: 0,
            userName: '',
            userEmail: ''
        };
        //this.updateData();
    }

    componentDidMount(){
        this.listCart()
    }

    listCart(){
        return Api('cart','GET',null)
        .then((responseJson)=>{
        console.log("cart Provider"+responseJson)
        this.setState(
        {
            count: responseJson.count                   
        },
        )       
        }).catch((err)=> {
            console.error(err)
        })
    }
    

    updateData=()=> {
        return Api('users/getUserData','GET',null)
        .then((responseJson)=>{
            console.log("cart Provider"+responseJson)
            this.setState(
                {
                    userEmail: responseJson.data.user_data.email,
                    userName: ''+responseJson.data.user_data.first_name + ''+responseJson.data.user_data.last_name,
                    count: responseJson.data.total_carts
                }
            ) ; 
            console.log("username is:"+ this.state.userName)       
        //console.log("data is:"+this.state.datasource)
        }).catch((err)=> {
            console.error(err)
        })
    }

    increaseCount=()=>{
        this.setState({count:this.state.count+1})
    }

    decreaseCount=()=>{
        this.setState({count:this.state.count-1})
    }
    


    render(){
        return(
        <MyContext.Provider value={
            {
                state: this.state,
                plusCount:this.increaseCount,
                minusCount: this.decreaseCount,
                updateData: this.updateData
            }
        }>
            {this.props.children}
        </MyContext.Provider>)
    }
}
