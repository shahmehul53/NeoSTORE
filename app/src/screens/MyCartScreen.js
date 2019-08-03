import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,FlatList,Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import R from '../R';
import CustomButtom from '../components/CustomButton';
import CustomRedButton from '../components/CustomRedButton';
import { SwipeableFlatList} from 'react-native-swipeable-flat-list';
//import Spinner from 'react-native-number-spinner-v2';

export default class MyCartScreen extends Component {
    constructor(){
        super()
        this.state = {
            datasource: [],
            total: ""
        }
    }

    

    componentDidMount() {
        fetch('http://staging.php-dev.in:8844/trainingapp/api/cart',{
           method: 'GET',
           headers:{
            'access_token': "5d2eb4b6ca059",
            'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((response)=>response.json())
        .then((responseJson)=>{
            console.log(responseJson)
            this.setState(
                {
                    datasource: responseJson.data,
                    total: responseJson.total
                }
            )
            
        }).catch((err)=> {
            console.error(err)
        })
    }

    editCart(id){
        const product_id = id;
        const quantity = quantity
        fetch('http://staging.php-dev.in:8844/trainingapp/api/deleteCart',{
           method: 'POST',
           headers:{
            'access_token': "5d2eb4b6ca059",
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:
            `product_id=${product_id}&quantity=${quantity}`
        }).then((response)=>response.json())
        .then((responseJson)=>{
            this.componentDidMount()
        console.log(responseJson)
        }).catch(error => {
            console.error(error);
          });
    }

    deleteItem(id){
        const product_id = id;
        fetch('http://staging.php-dev.in:8844/trainingapp/api/deleteCart',{
           method: 'POST',
           headers:{
            'access_token': "5d2eb4b6ca059",
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:
            `product_id=${product_id}`
        }).then((response)=>response.json())
        .then((responseJson)=>{
            this.componentDidMount()
        console.log(responseJson)
        }).catch(error => {
            console.error(error);
          });
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <View style={{flex:1}}>
                    <FlatList
                      data={this.state.datasource}
                      renderItem={({ item }) => (
                        <View style={{flexDirection: 'row', margin: 10}}>
                            <View style={{flex: 1}}>
                                <Image 
                                style={{width: 75, height: 75}}
                                source={{uri: item.product.product_images}}
                                />
                            </View>
                                <View style={{flex: 2, paddingLeft: 15}} >
                                   <Text style={{fontSize: 20, fontWeight: 'bold', color: '#1C1C1C'}}>
                                    {item.product.name}
                                   </Text>
                                   <Text>({item.product.product_category})</Text>
                                   <Text style={{paddingTop: 10}}>Qty: {item.quantity}</Text>
                                   {/* <Spinner max={10}
                                    min={2}
                                    default={5}
                                    color="#f60"
                                    numColor="#f60"
                                    width= '40'
                                    height= '40'
                                    onNumChange={(item)=>this.editCart(item.product.id)}
                                    style={{paddingTop: 10}}/> */}

                                </View>
                                    <View style={{flex: 2, paddingTop: 45, alignItems: 'flex-end'}}> 
                                    {/* renderRight={({ item }) => ( */}
                                       <TouchableOpacity  onPress={()=>this.deleteItem(item.product.id)}>
                                         <Image style={{height: 40, width: 40}} source={R.images.delete}/>
                                       </TouchableOpacity> 
                                    

                                       {/* */}
                                     </View>     
                        </View>
                         )}      
                    
                        // //  renderRight={({ item }) => (
                        // // <View style={{height:30,width: 80}}> 
                        // //  <TouchableOpacity style={{height: 30, width: 60, alignItems: 'center'}} onPress={()=>this.deleteItem(item.product.id)}>
                        // //     <Image  style={{height:30, width: 30}}source={R.images.delete}/>
                        // //   </TouchableOpacity> 
                        // // </View>
                        //  )}                    
                     
                    />
                </View>
                <View style={{flex: 1}}>
                 <View style={{ flexDirection: 'row'}}>
                    <View style={{flex: 3, paddingLeft: 20}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>TOTAL</Text>
                        
                    </View>
                    <View style={{flex: 1, paddingLeft: 20}}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.state.total}</Text>
                    </View> 
                    
                  </View>
                <View style={{flex: 1, justifyContent: 'flex-start ',alignItems: 'center'}}>
                       <CustomRedButton 
                       title="ORDER NOW"
                       onPress={()=>this.props.navigation.navigate("AddAddress")}>
                       </CustomRedButton>
                </View>
            </View>
            </View>
        )
    }

}