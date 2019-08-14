import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,FlatList,Image,AsyncStorage,Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import R from '../R';
import CustomButtom from '../components/CustomButton';
import CustomRedButton from '../components/CustomRedButton';
import Swipeout from 'react-native-swipeout';
import NumericInput from 'react-native-numeric-input'

width: Dimensions.get('window').width;
height: Dimensions.get('window').height


export default class MyCartScreen extends Component {
    constructor(){
        super()
        this.state = {
            datasource: [],
            total: "",
            pid: null, 
            access_token: "",
            cartCount: ""
        }
    }


    componentDidMount() {
        this.listCart()
    }

    async listCart(){
        const token = await AsyncStorage.getItem("@storage_Key_token");
        this.setState({ access_token: token });
        console.log(token);
        fetch('http://staging.php-dev.in:8844/trainingapp/api/cart',{
           method: 'GET',
           headers:{
            //'access_token': "5d2eb4b6ca059",
            access_token: token,
            'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((response)=>response.json())
        .then((responseJson)=>{
            console.log(responseJson)
            this.setState(
                {
                    datasource: responseJson.data,
                    total: responseJson.total, 
                    //quantity: responseJson.data.quantity
                    cartCount: responseJson.count                   
                },
            )       
        }).catch((err)=> {
            console.error(err)
        })
    }
        



    editCart(value,id){
        const qty = value;
        const pid = id;
        // console.log(product_id+''+quantity)
        console.log(pid + ' ' + qty);
        fetch(`http://staging.php-dev.in:8844/trainingapp/api/editCart`,{
           method: 'POST',
           headers:{
            //'access_token': "5d2eb4b6ca059",
            access_token: this.state.access_token,
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `product_id=${pid}&quantity=${qty}`
        }).then((response)=>response.json())
        .then((responseJson)=>{
            console.log(responseJson)
            if (responseJson.status == 200) {
                console.log("status is" +responseJson.status);
                this.listCart();
            }
        })
        .catch(error => {
            console.error(error);
          });
    }

    deleteItem(id){
        const product_id = id;
        console.log("id is" +product_id+''+id)
        fetch('http://staging.php-dev.in:8844/trainingapp/api/deleteCart',{
           method: 'POST',
           headers:{
            //'access_token': "5d2eb4b6ca059",
            access_token: this.state.access_token,
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:
            `product_id=${product_id}`
        }).then((response)=>response.json())
        .then((responseJson)=>{
            //if (responseJson.status == 200) {
                console.log(responseJson.status);
                //console.log("tok"+ token)
                console.log("token is"+ this.state.access_token)
                this.listCart();
            //}
        
        console.log("deleted item"+ responseJson)
        }).catch(error => {
            console.error(error);
          });
    }

    onSwipeOpen(pid){
        this.setState({
            pid: pid
       })
    }

    onSwipeClose(pid){
        this.setState({
            pid: null
        })
    }

    render(){
        const swipeoutBtns = [
            {
              backgroundColor: '#fff',
              
              component: (
                <View style={{ alignItems: 'center', marginTop: 20}}>
                <TouchableOpacity  onPress={()=>this.deleteItem(this.state.pid)}>
                    <Image style={{height: 50, width: 50}} source={R.images.delete}/>
                </TouchableOpacity>
                </View>
              ),
            }
          ]

        if(this.state.cartCount!=null){
        return(
            <View style={{flex: 1}}>
                <View style={{flex:1}}>
                    <FlatList
                      data={this.state.datasource}
                      renderItem={({ item }) => (
                        <Swipeout right={swipeoutBtns}
                        onOpen={()=>this.onSwipeOpen(item.product.id)}
                        onClose={()=>this.onSwipeClose(item.product.id)}
                        autoClose={true}
                        backgroundColor="transparent">

                        <View style={{flexDirection: 'row', margin: 10}}>
                            <View style={{flex: 1}}>
                                <Image 
                                style={{width: 75, height: 75}}
                                source={{uri: item.product.product_images}}
                                />
                            </View>
                                <View style={{flex: 3}} >
                                   <Text style={{fontSize: 20, fontWeight: 'bold', color: '#1C1C1C'}}>
                                    {item.product.name}
                                   </Text>
                                   <Text>({item.product.product_category})</Text>
                                   {/* <Text style={{paddingTop: 10}}>Qty: {item.quantity}</Text> */}
                                   <View style={{paddingTop: 10, flexDirection: 'row'}}>
                                   <NumericInput 
                                     
                                     //value={this.state.value} 
                                     onChange={value => this.editCart(value,item.product.id)}
                                     //onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                                     totalWidth={100} 
                                     totalHeight={25} 
                                     iconSize={25}
                                     minValue={1}
                                     maxValue={8}
                                     step={1}
                                     initValue={item.quantity}
                                     valueType='integer'
                                     rounded 
                                     textColor='#E91C1A' 
                                     iconStyle={{ color: 'white' }} 
                                     borderColor='black'
                                    rightButtonBackgroundColor='#E91C1A' 
                                    leftButtonBackgroundColor='#E91C1A'
                                    //upDownButtonsBackgroundColor = '#E91C1A'
                                    />  
                                    <Text style={{fontSize: 15,color: '#333333',marginLeft: 100,fontWeight: 'bold'}}>र {item.product.cost}</Text>
                                    </View>
                                    {/* <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                                        <Text style={{fontSize: 15,color: '#333333',alignItems: "flex-end",justifyContent: 'flex-end',paddingBottom: 10,fontWeight: 'bold'}}>र {item.product.cost}</Text>
                                    </View> */}
                                </View>
                        </View>
                        </Swipeout>
                         )}                        
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={{flex: 0.5}}>
                <View style={{ flexDirection: 'row'}}>
                    <View style={{flex: 3, paddingLeft: 20}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>TOTAL</Text>
                        
                    </View>
                    <View style={{flex: 1, paddingLeft: 20}}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.state.total}</Text>
                    </View> 
                    
                </View>
                <View style={{flex: 1,alignItems: 'center'}}>
                       <CustomRedButton 
                       title="ORDER NOW"
                       onPress={()=>this.props.navigation.navigate("AddAddress")}>
                       </CustomRedButton>
                </View>
            </View>
            </View>
        )
    } else {
        return(
            <View style={{flex: 1, alignItems: 'center'}}>
                {/* <Image  source={R.images.cartEmpty}/> */}
                <Text style={{fontSize: 25, color: R.color.backgroundColorDefault,fontWeight: 'bold', paddingTop: 20}}>Cart is Empty</Text>
            </View>
        )   
    }
  } 
}

