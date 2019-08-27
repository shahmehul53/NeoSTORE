import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,FlatList,Image,AsyncStorage,Dimensions,ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import R from '../R';
import CustomButtom from '../components/CustomButton';
import CustomRedButton from '../components/CustomRedButton';
import Swipeout from 'react-native-swipeout';
import NumericInput from 'react-native-numeric-input'
import Api from '../components/Api';
import MyContext from '../context/MyContext'

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
            cartCount: "",
            isLoading: true
        }
    }


    componentDidMount() {
        this.listCart()
    }

    listCart(){
        return Api('cart','GET',null)
        .then((responseJson)=>{
            if(responseJson.status == 200){
                this.setState(
                    {
                        datasource: responseJson.data,
                        total: responseJson.total, 
                        //quantity: responseJson.data.quantity
                        cartCount: responseJson.count,
                        isLoading: !this.state.isLoading                  
                    },
                )   
            }   
        }).catch((err)=> {
            console.error(err)
        })
    }



    editCart(value,id){
        const qty = value;
        const pid = id;
        console.log(pid + ' ' + qty);
        return Api('editCart','POST',`product_id=${pid}&quantity=${qty}`)
        .then((responseJson)=>{
            if (responseJson.status == 200) {
                this.setState(
                    {
                        isLoading: !this.state.isLoading                  
                    },
                );
            }
            this.listCart(); 
        })
        .catch(error => {
            console.error(error);
          });
    }

    deleteItem(id){
        const product_id = id;
        console.log("id is" +product_id+''+id)
        return Api('deleteCart','POST',`product_id=${product_id}`)
        .then((responseJson)=>{
            if (responseJson.status == 200) {
                this.setState(
                    {
                        isLoading: !this.state.isLoading                  
                    },
                );
                this.listCart();     
            }
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
            if(this.state.cartCount!=null){
                return(
                    <View style={{flex: 1}}>
                        <View style={{flex:1,width: '100%'}}>
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
                                           <View style={{paddingTop: 10, flexDirection: 'row'}}>
                                           <NumericInput  
                                             onChange={value => this.editCart(value,item.product.id)}
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
                                            />  
                                            <Text style={{fontSize: 15,color: '#333333',marginLeft: 30,fontWeight: 'bold'}}>र {item.product.cost}</Text>
                                            
                                            {/* <View style={{flex: 1,justifyContent: 'flex-end',flexDirection: 'row',alignItems: 'flex-end',paddingHorizontal: 30}}> */}
                                            <MyContext.Consumer>
                                                {contextValue=>(
                                                    <View style={{flex: 1,justifyContent: 'flex-end',flexDirection: 'row',alignItems: 'flex-end'}}>
                                                        <TouchableOpacity style={{paddingLeft: 40}} onPress={()=>{this.deleteItem(this.state.pid);
                                                        contextValue.minusCount();}}>
                                                            <Image style={{height: 50, width: 50}} source={R.images.delete}/>
                                                         </TouchableOpacity>
                                                    </View>
                                                )}
                                            {/* <TouchableOpacity style={{paddingLeft: 40,paddingBottom: 50}} onPress={()=>this.deleteItem(this.state.pid)}>
                                                 <Image style={{height: 50, width: 50}} source={R.images.delete}/>
                                            </TouchableOpacity> */}
                                            </MyContext.Consumer>
                                            {/* </View> */}
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
}

