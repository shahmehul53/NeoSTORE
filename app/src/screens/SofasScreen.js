import React, {Component} from 'react';
import {View, Button, Image, TextInput, Text,ScrollView,TouchableOpacity,FlatList} from 'react-native';
import R from '../R'
import { Font } from 'expo';
import StarsFilled from '../components/StarsFilled'
import StarsUnfilled from '../components/StarsUnfilled'



export default class Sofas extends Component {

    state = {
       // error: false,
        posts: []
    }
    
    


    componentDidMount() {
        //console.log('COMPONENT DID MOUNT')
        categoryId=2
        // ${categoryId}
        fetch("http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=3")
        .then((response)=> response.json())
        .then((responseJson)=>{
            console.log(responseJson)
            this.setState({
                posts: responseJson.data
            })
        })
        .catch((err)=> {
            console.error(err)
        })
    }

    // renderItems(){
    //     return(
    //       this.state.items.map((item)=>
    //       <ScrollView>
    //         <TouchableOpacity>
    //         //onPress={()=>{
    //           //this.props.navigation.navigate('Detail',{productId:item.id})
    //           }}>  
    //          <ItemDetail itemImage={item.product_images} itemName={item.name} itemProducer={item.producer} itemCost={item.cost} itemRating={item.rating} />
    //          </TouchableOpacity>
    //       </ScrollView>
    //       )
    //     )
    //   }

    render(){
        

        console.log(this.state.posts);
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
                                        {/* <View style={{margin: 10,flexDirection: 'row'}}> */}
                                        <View style={{flexDirection: 'row'}}>
                                           <Text style={{color:"#FE4040",fontSize: 20, fontWeight: 'bold'}}>Rs.{item.cost}</Text>
                                           
                                           <Text style={{paddingLeft: 140}}>{item.rating}</Text>
                                        </View>
                                           {/* <View style={{flexDirection: 'row', marginLeft: 150}}></View> */}
                                        {/* </View> */}
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

function renderRating(){
    var elements=[]
    for(i=0; i<count;i++){
        elements.push(<StarsFilled/>)
    }

    for(j=0;j<5;j++){
        elements.push(<StarsUnfilled/>)
    }

}