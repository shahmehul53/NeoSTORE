import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Dimensions,Image,AsyncStorage} from 'react-native'
import R from '../R';


 const Api = async(endPoint,method,body)=>{
     const commonUrl = "http://staging.php-dev.in:8844/trainingapp/api/"
     const token = await AsyncStorage.getItem("@storage_Key_token");
     console.log(token);
     console.log(method);
     console.log(endPoint);

     const url = commonUrl+endPoint
     console.log("url is"+url)
     return fetch(url,{
         method: method,
         headers:{
            access_token: token,
            'Content-Type': 'application/x-www-form-urlencoded',
         },
         body: body
     }).then((response)=>response.json())
 }

 export default Api;
