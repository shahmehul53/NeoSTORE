import React, {Component} from 'react';
import {View, StyleSheet, Image, TextInput} from 'react-native';;
import style from '../Styles'
import R from '../R'


export default class UserRatings extends Component{
    render(){
        let ratingObj = this.props.ratings
        console.log("ratings:"+ratingObj)
        let stars = []
        for(i=1;i<=5;i++){
            let path=R.images.star_check
            if(ratingObj<i){
                path=R.images.star_unchek
            }
            stars.push((<Image style={styles.imgView} source={path} key={i}/>))
        }
        return(
            <View style={styles.container}>
                {stars}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems: 'center',
        marginRight: 8
    },
    imgView:{
        width: 15, 
        height: 15
    }
})