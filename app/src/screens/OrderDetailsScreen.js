import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,FlatList,Image,AsyncStorage, Dimensions,ActivityIndicator } from 'react-native';
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
            access_token: "",
            isLoading: true
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
        return Api(`orderDetail?order_id=${order_id}`,'GET',null)
        .then((responseJson)=>{
            console.log(responseJson)
            if(responseJson.status == 200){
                this.setState(
                    {
                        datasource: responseJson.data.order_details,
                        cost: responseJson.data.cost,
                        address: responseJson.data.address,
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
        } else {
            return(
                <View style={styles.container}>
                    <View style={{height: "80%"}}>
                    <FlatList
                    data={this.state.datasource}
                    renderItem = {({ item })=>(
                        <View>
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
                        <View style={{borderWidth:1,width:"100%",borderColor: '#a9a9a9'}}/>
                    </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    />
                    </View>
                    <View style={{height: "20%", flexDirection: 'row'}}>
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