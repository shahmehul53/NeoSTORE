import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,FlatList,Image,AsyncStorage, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import R from '../R';
import Api from '../components/Api';

export default class OrderDetailsScreen extends Component {
    constructor(){
        super()
        this.state = {
            datasource: [],
            cost: "",
            address: "",
            access_token: ""
        }
    }
    static navigationOptions = ({ navigation }) => ({
        title: "OrderID: " + navigation.getParam("OrderID", "2031")
      });

   componentDidMount() {
       this.OrderDetails()
   }
   
    OrderDetails(){
        const { navigation } = this.props;
        const order_id = navigation.getParam("OrderID","2031");
        // const token = await AsyncStorage.getItem("@storage_Key_token");
        // fetch(`http://staging.php-dev.in:8844/trainingapp/api/orderDetail?order_id=${order_id}`,{
        //    method: 'GET',
        //    headers:{
        //     //'access_token': "5d2eb4b6ca059",
        //     access_token: token,
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        // }).then((response)=>response.json())
        return Api(`orderDetail?order_id=${order_id}`,'GET',null)
        .then((responseJson)=>{
            console.log(responseJson)
            this.setState(
                {
                    datasource: responseJson.data.order_details,
                    cost: responseJson.data.cost,
                    address: responseJson.data.address
                }
            )       
        }).catch((err)=> {
            console.error(err)
        })
    }
        
    

    render(){
        console.log(this.state.datasource)
        return(
            <View style={styles.container}>
                
                <FlatList
                data={this.state.datasource}
                renderItem = {({ item })=>(
                    <View style={{flexDirection: 'row', margin: 10}}>
                        <View style={{flex: 1}}>
                            <Image 
                            source={{uri: item.prod_image}}
                            style={{height: 70, width: 70}} />
                        </View>
                        <View style={{flex: 2, paddingLeft: 15}}>
                            <Text style={styles.prodName}>{item.prod_name}</Text>
                            <Text style={styles.categoryText}>({item.prod_cat_name})</Text>
                            <Text style={{paddingTop: 10}}>QTY: {item.quantity}</Text>
                        </View>
                        <View style={{flex: 1, paddingTop: 44}}>
                            <Text style={styles.amtText}>Rs.{item.total}</Text>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                />
                <View style={{flex: 3, flexDirection: 'row'}}>
                    <View style={{flex:4, paddingLeft: 20}}>
                        <Text style={styles.totalText}>TOTAL</Text>
                    </View>
                    <View style={{flex: 2, paddingLeft: 20}}>
                        <Text style={styles.costText}>र {this.state.cost}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        // width: Dimensions.get('window').width;
        // height: Dimensions.get('window').height
    },
    
    prodName:{
        fontSize: 15,
        fontWeight: 'bold'
    },
    categoryText:{
        fontStyle: "italic"
    },
    amtText:{
        fontSize: 15,
        fontWeight: 'bold'
    },
    totalText:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    costText:{
        fontSize: 20,
        fontWeight: 'bold'
    }

})