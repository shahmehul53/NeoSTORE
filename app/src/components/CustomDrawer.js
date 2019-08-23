import React, { Component } from 'react';
import {StyleSheet, Text, View,FlatList, Dimensions, TouchableOpacity, Image,AsyncStorage} from 'react-native';
import R from '../R';
import style from '../Styles'
//import { FlatList } from 'react-native-gesture-handler';

const DEVICE_WIDTH = Dimensions.get("window").width
const DEVICE_HEIGHT = Dimensions.get("window").height


export default class CustomDrawer extends Component{
    constructor(){
        super()
        this.state = 
        {
            datasource: [], 
            access_token: "",
            cartCount: "",
            drawerData:[
                {image:R.images.shopping_cart,title: 'My Cart', action:'MyCart'},
                {image: R.images.table, title: 'Tables', action: 'Tables', id: 1},
                {image: R.images.sofa, title: 'Sofas', action: 'Sofas', id: 3},
                {image: R.images.chair, title: 'Chairs', action: 'Chairs', id: 2},
                {image: R.images.cupboard, title: 'Cupboards', action: 'Cupboards', id: 4},
                {image:R.images.username_icon,title: 'My Account', action:'MyAccount'},
                {image:R.images.storelocator_icon,title: 'Store Locator', action:'StoreLoactor'},
                {image:R.images.myorders_icon,title: 'My Orders', action:'MyOrder'},
                {image:R.images.logout_icon,title: 'Logout', action:'Login'}
            ]
        }
    }

    componentDidMount(){
        this.fetchData()
    }   

   async fetchData(){
       const token = await AsyncStorage.getItem("@storage_Key_token");
       this.setState({ access_token: token });
       console.log(token);
       fetch('http://staging.php-dev.in:8844/trainingapp/api/users/getUserData',{
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
                   datasource: responseJson.data.user_data,
                   cartCount: responseJson.data.total_carts
               }
           ) 
       }).catch((err)=> {
           console.error(err)
       })
   }

   render(){
       return(
           <View style={styles.container}>
                <View style={styles.topLinks}>
                    <View style={styles.profile}>
                      <Image style={styles.img} source={R.images.profile} />
                      <Text style={styles.name}>{this.state.datasource.first_name} {this.state.datasource.last_name}</Text>
                      <Text style={{fontSize: 15, paddingBottom: 5, color: 'white'}}>{this.state.datasource.email}</Text>
                    </View>
                </View>
               {/* <View style={styles.imgView}>
                   <Image style={styles.img} source={R.images.profile}/>
                   <Text style={styles.name}>{this.state.datasource.first_name} {this.state.datasource.last_name}</Text>
                   <Text style={{fontSize: 15, paddingBottom: 5, color: 'white'}}>{this.state.datasource.email}</Text>
               </View> */}
               <FlatList
               data={this.state.drawerData}
               renderItem={({item})=>
               <View style={styles.bottomLinks}>
                   <View style= {styles.SectionStyle}>
               <TouchableOpacity style={styles.drawerView} key={item.image}
                onPress={()=>this.props.navigation.navigate(item.action,{id: item.id})}>
                
                {/* <View style= {styles.SectionStyle}> */}
                <Image style={{height: 35,width: 35}} source={item.image}/>
                <Text style={styles.textData}>{item.title}</Text>
                {/* </View> */}
                
            </TouchableOpacity>
            </View>
           </View>
        }
        keyExtractor={(item, index) => index.toString()}
        />

        </View>
       )
   }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        //height: DEVICE_HEIGHT,
        //width: DEVICE_WIDTH
    },
    imgView:{
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img:{
        height: 100,
        width: 100,
        borderRadius: 50
    },
    name: {
        fontSize: 20,
        justifyContent: 'center',
        color: 'white',
        paddingTop: 10
    },
    profile: {
        //flex: 1,
        //flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#777777'
    },
    topLinks:{
        //flex:2,
        //height: DEVICE_HEIGHT/2,
        backgroundColor: 'black'
    },
    drawerView:{
        marginLeft: 10,
        flexDirection: 'row',
        //paddingLeft: 30,
        marginTop: 25
    },
    textData:{
        //flex: 1,
        fontSize: 20,
        padding: 6,
        //paddingLeft: 14,
       // margin: 5,
        textAlign: 'center',
        color: 'white'
    },
    bottomLinks:{
        flex: 2,
        backgroundColor: 'black',
        paddingTop: 10,
        //paddingBottom: 450,
    },
    SectionStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 1,
        paddingLeft: 16,
    },
})

