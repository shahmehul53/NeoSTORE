import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, TouchableOpacity, Image} from 'react-native';
import R from '../R';
import style from '../Styles'
import { withOrientation } from 'react-navigation';

// const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;


export default class MenuDrawer extends Component{
    navLink(nav, text) {
        return(
        <TouchableOpacity style={{height: 50}} onPress={() => this.props.navigation.navigate(nav)}>
        <Text style={styles.links}>{text}</Text>
        </TouchableOpacity>
        )
    }

    render(){
        return(
        <View style={{flex: 1, backgroundColor: 'gray'}}> 
            <View style={styles.topLinks}>

                <View style={styles.profile}>
                    <View style={styles.imgView}>
                        <Image style={styles.img} source={R.images.user_male} />
                    </View>
                    <View style={styles.profileText}>
                        <Text style={styles.name}>Mehul Shah</Text>
                        <Text style={{fontSize: 15, paddingBottom: 5, color: 'white', textAlign: 'left'}}>shahmehul53@gmail.com</Text>
                    </View>
                </View>
            </View>

            <View style={styles.bottomLinks}>
                <View style={styles.SectionStyle}>
                    <Image style={styles.imgIcon} source={R.images.shopping_cart}/>
                    {this.navLink('MyCart', 'My Cart')}
                    
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
                    {this.navLink('Cupboard', 'Cupboards')}
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
                    {this.navLink('Logout', 'Logout')}
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
        paddingTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#777777'
    },
    profileText:{
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    name: {
        fontSize: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        color: 'white'
    },
    imgView: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        
        
    },
    img:{
        height: 70,
        width: 70,
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
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 10,
        paddingBottom: 450
    },
    links:{
        flex: 1,
        fontSize: 20,
        padding: 6,
        paddingLeft: 14,
        margin: 5,
        textAlign: 'left',
        color: 'white'
    }


})
