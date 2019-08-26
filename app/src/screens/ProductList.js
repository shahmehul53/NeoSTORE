import React, {Component} from 'react';
import {View, Button, Image, TextInput, Text,ScrollView,TouchableOpacity,FlatList,ActivityIndicator} from 'react-native';
import R from '../R'
import { Font } from 'expo';
import StarsFilled from '../components/StarsFilled'
import StarsUnfilled from '../components/StarsUnfilled'
import UserRatings from '../components/UserRatings'
import Api from '../components/Api';



export default class ProductList extends Component {

    static navigationOptions=({navigation})=>({
        title: navigation.getParam('navTitle',"Table"),
        headerStyle:{
            backgroundColor: R.color.backgroundColorDefault
        },
        headerStyle:{
            backgroundColor: R.color.backgroundColorDefault
        },
        headerTintColor: R.color.textInputBorderColor
    })

    constructor(){
        super()
        this.state={
            posts:[],
            isLoading: true
        }
    }
    
    componentDidMount() {
        categoryId=this.props.navigation.getParam("id",1)
        return Api(`products/getList?product_category_id=${categoryId}`,'GET',null)
        .then((responseJson)=>{
            console.log(responseJson)
            if(responseJson.status == 200){
                this.setState({
                    posts: responseJson.data,
                    isLoading: !this.state.isLoading
                })
            }
        })
        .catch((err)=> {
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
                <View style={{flexDirection: 'row', margin: 10}}>
                    <FlatList
                      data={this.state.posts}
                      renderItem={({ item })=> (
                        //  <View>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate("Details", {
                            productID: item.id,
                            productName: item.name
                        })}>
                                <View style={{flex: 1, flexDirection: "row", padding: 10}}>
                                    {/* <View style={{flex: 1}}> */}
                                        <Image source = {{uri: item.product_images}} style={{width: 70, height: 70}} />
                                    {/* </View> */}
                                    <View style={{flex: 5, marginHorizontal: 30}}>
                                        <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.name}</Text> 
                                        <Text>{item.producer}</Text>
                                        {/* <View style={{flex: 1, flexDirection: "row", margin: 10}}> */}
                                        <View style={{flexDirection: 'row'}}>
                                            <View style={{flex: 3}}>
                                               <Text style={{color:"#FE4040",fontSize: 20, fontWeight: 'bold'}}>Rs.{item.cost}</Text>
                                               </View>
                                               
                                               {/* <Text style={{paddingLeft: 140}}>{item.rating}</Text> */}
                                               <View style={{flex: 1,marginLeft: 30, marginRight: 10}}> 
                                               <UserRatings ratings={item.rating}/>
                                               </View>
                                        </View>
                                        {/* </View> */}
                                    </View>
    
                                </View>
                            </TouchableOpacity>
                        //  </View>
                      )}
                      keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            );
        }   
    }
}
