import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, TouchableOpacity, Image,AsyncStorage} from 'react-native';
import R from '../R';
import style from '../Styles'
import { withOrientation } from 'react-navigation';
import Api from '../components/Api';

// const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;


export default class MenuDrawer extends Component{
    constructor(){
        super()
        this.state = {
            datasource: [], 
            access_token: "",
            cartCount: ""
        }
    }

    navLink(nav, text) {
        return(
        <TouchableOpacity style={{height: 50}} onPress={() => this.props.navigation.navigate(nav)}>
        <Text style={styles.links}>{text}</Text>
        </TouchableOpacity>
        )
    }

     componentDidMount(){
         this.fetchData()
     }   

    fetchData(){
        return Api('users/getUserData','GET',null)
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
        <View style={{flex: 1}}> 
            <View style={styles.topLinks}>

                <View style={styles.profile}>
                    <View style={styles.imgView}>
                        <Image style={styles.img} source={R.images.profile} />
                        <Text style={styles.name}>{this.state.datasource.first_name} {this.state.datasource.last_name}</Text>
                        <Text style={{fontSize: 15, paddingBottom: 5, color: 'white'}}>{this.state.datasource.email}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.bottomLinks}>
                <View style={styles.SectionStyle}>
                    <Image style={styles.imgIcon} source={R.images.shopping_cart}/>
                    {this.navLink('MyCart', 'My Cart')}
                    <Text style={{fontSize: 25,color: "white",paddingLeft: 100}} >{this.state.cartCount}</Text> 
                    
                </View>
                <View style= {styles.SectionStyle}>
                    <Image style= {styles.imgIcon} source={R.images.table}/>
                    {this.navLink('Tables', 'Tables')}
                </View>
                <View style= {styles.SectionStyle}>
                    <Image style= {styles.imgIcon} source={R.images.sofa}/>
                    {this.navLink('Sofas', 'Sofas')}
                </View>
                <View style= {styles.SectionStyle}>
                    <Image style= {styles.imgIcon} source={R.images.chair}/>
                    {this.navLink('Chairs', 'Chairs')}
                </View>
                <View style= {styles.SectionStyle}>
                    <Image style= {styles.imgIcon} source={R.images.cupboard}/>
                    {this.navLink('Cupboards', 'Cupboards')}
                </View>
                <View style= {styles.SectionStyle}>
                    <Image style= {styles.imgIcon} source={R.images.username_icon}/>
                    {this.navLink('MyAccount', 'My Account')}
                </View>
                <View style= {styles.SectionStyle}>
                    <Image style= {styles.imgIcon} source={R.images.storelocator}/>
                    {this.navLink('StoreLoactor', 'Store Locator')}
                </View>
                <View style= {styles.SectionStyle}>
                    <Image style= {styles.imgIcon} source={R.images.myorders_icon}/>
                    {this.navLink('MyOrder', 'My Orders')}
                </View>
                <View style= {styles.SectionStyle}>
                <Image style= {styles.imgIcon} source={R.images.logout_icon}/>
                <TouchableOpacity style={{height: 50}} 
                //onPress={() => this.userLogout()}
                onPress={() => this.props.navigation.navigate("Login")}
                >
                    <Text style={styles.links}>Logout</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    SectionStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 0,
        paddingLeft: 16,
    },
    profile: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#777777'
    },
    profileText:{
        justifyContent: 'center'
    },
    name: {
        fontSize: 20,
        justifyContent: 'center',
        color: 'white',
        paddingTop: 10
    },
    imgView: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'center'  
    },
    img:{
        height: 100,
        width: 100,
        borderRadius: 50,    
    },
    imgIcon:{
        height: 25,
        width: 25
    },
    topLinks:{
        height: 200,
        backgroundColor: 'black'
    },
    bottomLinks:{
        //flex: 1,
        backgroundColor: 'black',
        paddingTop: 10,
        paddingBottom: 450,
    },
    links:{
        flex: 1,
        fontSize: 20,
        padding: 6,
        paddingLeft: 14,
        margin: 5,
        textAlign: 'center',
        color: 'white'
    }
})
