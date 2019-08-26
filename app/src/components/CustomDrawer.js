import React, { Component } from 'react';
import {StyleSheet, Text, View,FlatList, Dimensions, TouchableOpacity, Image,AsyncStorage} from 'react-native';
import R from '../R';
import style from '../Styles'
import MyContext from '../context/MyContext';
//import { FlatList } from 'react-native-gesture-handler';

const DEVICE_WIDTH = Dimensions.get("window").width
const DEVICE_HEIGHT = Dimensions.get("window").height


export default class CustomDrawer extends Component{
    constructor(){
        super()
        this.state = 
        {
            datasource: [],
            userName: '', 
            userEmail: '',
            access_token: "",
            cartCount: 0,
            drawerData:[
                {image:R.images.shopping_cart,title: 'My Cart', screen:'MyCart',cartCount: 1},
                {image: R.images.table, title: 'Tables', screen: 'List',productType: 'Tables', id: 1,cartCount: 0},
                {image: R.images.sofa, title: 'Sofas', screen: 'List',productType: 'Sofas', id: 3,cartCount: 0},
                {image: R.images.chair, title: 'Chairs', screen: 'List',productType: 'Chairs', id: 2, cartCount: 0},
                {image: R.images.cupboard, title: 'Cupboards', screen: 'List',productType: 'Cupboards', id: 4, cartCount: 0},
                {image:R.images.username_icon,title: 'My Account', screen:'MyAccount',cartCount: 0},
                {image:R.images.storelocator_icon,title: 'Store Locator', screen:'StoreLoactor',cartCount: 0},
                {image:R.images.myorders_icon,title: 'My Orders', screen:'MyOrder',cartCount: 0},
                {image:R.images.logout_icon,title: 'Logout', screen:'Login',cartCount: 0}
            ]
        }
    }

    displayCount(count){
        if(count==1){
            return(
                <MyContext.Consumer>
                    {contextValue=><Text style={{color: 'white',paddingLeft: 100,fontSize: 25}}>{contextValue.state.count}</Text>}
                </MyContext.Consumer>
            )
        }
    }

    displayData = async()=>{
        try{
            const fname = await AsyncStorage.getItem("@storage_Key_fname")
            const lname = await AsyncStorage.getItem("@storage_Key_lname")
            const userEmail = await AsyncStorage.getItem("@storage_Key_email")
            this.setState({
                userName: fname+ " " + lname,
                userEmail: userEmail
            })
        }catch(error){
            console.log(error)
        }
    }

    componentDidMount(){
        //this.fetchData()
        this.displayData()
    }   

//    async fetchData(){
//        const token = await AsyncStorage.getItem("@storage_Key_token");
//        this.setState({ access_token: token });
//        console.log(token);
//        fetch('http://staging.php-dev.in:8844/trainingapp/api/users/getUserData',{
//           method: 'GET',
//           headers:{
//            //'access_token': "5d2eb4b6ca059",
//            access_token: token,
//            'Content-Type': 'application/x-www-form-urlencoded',
//            },
//        }).then((response)=>response.json())
//        .then((responseJson)=>{
//            console.log(responseJson)
//            this.setState(
//                {
//                    datasource: responseJson.data.user_data,
//                    cartCount: responseJson.data.total_carts
//                }
//            ) 
//        }).catch((err)=> {
//            console.error(err)
//        })
//    }

   render(){
       this.displayData()
       return(
           <View style={styles.container}>
                    <View style={{alignItems: 'center', paddingTop: 30}}>
                      <Image style={styles.img} source={R.images.profile} />
                      <MyContext.Consumer>
                          {contextValue=><View style={{justifyContent: 'center',alignItems: 'center'}}>
                          <Text style={styles.name}>{contextValue.state.userName}</Text>
                          <Text style={{fontSize: 15, paddingBottom: 5, color: 'white'}}>{contextValue.state.userEmail}</Text>
                          </View>}
                      </MyContext.Consumer>
                    </View>
               <FlatList
               data={this.state.drawerData}
               renderItem={({item})=>
               <TouchableOpacity style={styles.drawerView} key={item.image}
                onPress={()=>this.props.navigation.navigate(item.screen,{id: item.id, productCategory: item.productType})}>
                
                <View style={{flexDirection: 'row',alignItems:'center'}}>
                <Image style={{height: 35,width: 35}} source={item.image}/>
                <Text style={styles.textData}>{item.title}</Text>
                {this.displayCount(item.cartCount)}
                </View>
                
            </TouchableOpacity>
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
        backgroundColor: 'black'
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
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#777777'
    },
    topLinks:{
        backgroundColor: 'black'
    },
    drawerView:{
        marginLeft: 10,
        flexDirection: 'row',
        marginTop: 25
    },
    textData:{
        fontSize: 20,
        padding: 6,
        textAlign: 'center',
        color: 'white'
    },
    bottomLinks:{
        flex: 2,
        backgroundColor: 'black',
        paddingTop: 10,
    },
    SectionStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 1,
        paddingLeft: 16,
    },
})

