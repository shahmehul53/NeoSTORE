import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,FlatList,Image,AsyncStorage,ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import R from '../R';
import Api from '../components/Api'

export default class MyOrderScreen extends Component {
    constructor(){
        super()
        this.state = {
            datasource: [],
            access_token: "",
            isLoading: true  
        }
    }

    
    componentDidMount() {
         this.listOrder()
     }

    listOrder(){
        return Api('orderList','GET',null)
        .then((responseJson)=>{
            console.log(responseJson)
            if(responseJson.status == 200){
                this.setState(
                    {
                        datasource: responseJson.data.reverse(),
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
        else {
            return(
                 <View style={styles.container}>
                    <FlatList
                    data={this.state.datasource}
                    renderItem = {({item})=>(
                        <View style={{color: 'dark grey'}}>
                        <TouchableOpacity 
                        onPress={()=> this.props.navigation.navigate("OrderDetails", {
                        OrderID: item.id
                        })}
                        style={{margin: 10,height: 80}}>
                        <View style={{margin: 10, flexDirection: "row"}}>
                            <View style={styles.OrderId}>
                                <Text style={styles.orderIDText}>Order ID: {item.id}</Text>
                                <View style={styles.lineStyle} />
                                <Text style={styles.createdText}>Order Date: {item.created}</Text>
                            </View>
                        <View style={styles.costView}> 
                            <Text style={styles.costText}>Rs.{item.cost}</Text>  
                        </View> 
                        </View>
                        </TouchableOpacity>
                        <View style={{borderWidth:1,width:"100%",borderColor: '#a9a9a9'}}/>
                        </View>
                        
                        
                        
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />        
                </View>
                ) 
            }  
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    spinnerTextStyle: {
        color: '#FFF'
      },
    OrderId:{
        flex: 1,
        justifyContent: 'flex-start',
    },
    orderIDText:{
        fontSize: 16,
        color: '#1C1C1C',
        paddingBottom: 10, 
        fontWeight: '600'
    },
    lineStyle:{
        borderWidth: 1,
        borderColor:'#4f4f4f',
        width: 165
    },
    createdText:{
        fontSize: 13,
        color: '#4f4f4f',
        paddingTop: 10,
        fontWeight: '500'
    },
    costView:{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        

    },
    costText:{
        alignItems: "flex-end",
        justifyContent: 'flex-end',
        fontSize: 20,
        color: '#333333',
        fontWeight: 'bold',
        paddingLeft: 10
    }
})