import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,FlatList,Image,AsyncStorage,Dimensions,ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import R from '../R';
import CustomButtom from '../components/CustomButton';
import CustomRedButton from '../components/CustomRedButton';
import Swipeout from 'react-native-swipeout';
import NumericInput from 'react-native-numeric-input'
import Api from '../components/Api';
import MyContext from '../context/MyContext';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
                        <View style={{flex:8,height: "80%"}}>
                            <FlatList
                            data={this.state.datasource}
                            renderItem={({item})=>(
                                <View>
                                <View style={{flexDirection: 'row',marginLeft: 10,width: "100%"}}>
                                    <View style={{flex: 1}}>
                                        <Image
                                        style={{width: wp('20%'),height: hp('12%'),margin: 8}}
                                        source={{uri: item.product.product_images}}
                                        />
                                    </View>
                                    <View style={{flex:3,marginTop: 10}}>
                                        <View >
                                            <Text style={{fontSize: hp("2.5%"), fontWeight: 'bold', color: '#1C1C1C'}}>{item.product.name}</Text>
                                            <Text style={{fontSize: hp('2%')}}>({item.product.product_category})</Text>
                                        </View>
                                        <View style={{flex:1,paddingTop: 10, flexDirection: 'row'}}>
                                        <NumericInput  
                                             onChange={value => this.editCart(value,item.product.id)}
                                             totalWidth={hp("10%")} 
                                             totalHeight={hp("4%")} 
                                             iconSize={25}
                                             minValue={1}
                                             maxValue={8}
                                             step={1}
                                             initValue={item.quantity}
                                             valueType='integer'
                                             rounded 
                                             textColor='#E91C1A' 
                                             iconStyle={{ color: 'black' }} 
                                             borderColor='black'
                                            rightButtonBackgroundColor='#E91C1A' 
                                            leftButtonBackgroundColor='#E91C1A'
                                            /> 
                                            <Text style={{fontSize: 15,color: '#333333',paddingLeft: 20,fontWeight: 'bold',paddingTop:8}}>र {item.product.cost}</Text>
                                            <MyContext.Consumer>
                                                {contextValue=>(
                                                        <TouchableOpacity style={{flex:1,}} onPress={()=>{this.deleteItem(this.state.pid);
                                                        contextValue.minusCount();}}>
                                                            
                                                            <Image style={{paddingLeft: 20,height: 40, width: 40,marginLeft:40,}} source={R.images.delete}/>
                                                            
                                                         </TouchableOpacity>
                                
                                                )}
                                            </MyContext.Consumer>
                                        </View>
                            
                                       
                                    </View>
                                   
                                </View>
                                <View style={{borderWidth:1,width:"100%",borderColor: '#a9a9a9'}}/>
                            </View>
                                
                                 
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            
                            />
                        </View>
                        <View style={{flex: 2,marginLeft: 20,width: "100%",height: "20%",justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{ flex: 1,flexDirection: 'row',paddingTop: 10}}>
                            <View style={{ width:"70%"}}>
                                <Text style={{fontSize: 20, fontWeight: 'bold'}}>TOTAL:</Text>
                                
                            </View>
                            <View style={{paddingRight: 30}}>
                              <Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.state.total}</Text>
                            </View> 
                            
                        </View>
                        <View style={{justifyContent: 'center',alignItems: 'center',marginBottom: 20,marginRight: 30}}>
                               <CustomRedButton 
                               title="ORDER NOW"
                               onPress={()=>this.props.navigation.navigate("AddAddress")}>
                               </CustomRedButton>
                        </View>
                    </View>

                    </View>
                )} else {
                return(
                    <View style={{flex: 1, alignItems: 'center',justifyContent: 'center'}}>
                        {/* <Image  source={R.images.cartEmpty}/> */}
                        <Text style={{fontSize: 25, color: R.color.backgroundColorDefault,fontWeight: 'bold', paddingTop: 20}}>Cart is Empty</Text>
                    </View>
                )   
        }
    }
  } 
}

