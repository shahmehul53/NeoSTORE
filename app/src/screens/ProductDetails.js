import React, {Component} from 'react';
import {View,KeyboardAvoidingView, Button, Image, TextInput, Text,ScrollView,TouchableOpacity,Modal, AsyncStorage,StyleSheet,ActivityIndicator} from 'react-native';
import R from '../R';
import style from '../Styles'
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import UserRatings from '../components/UserRatings';
import InputSpinner from "react-native-input-spinner";
import Api from '../components/Api';
import MyContext from '../context/MyContext';
import {scale} from 'react-native-size-matters';



export default class ProductDetails extends Component{
    constructor(){
        super()
        this.state = {
            datasource: [],
            productImages: [],
            category: "Tables",
            largeImage: "",
            quantityModalVisible: false,
            ratingModalVisible: false,
            modalVisible: false,
            quantity: null,
            access_token: "",
            user_Ratings: "",
            defaultRating: 1,
            maxRating: 5,
            status: "",
            user_msg: "",
            isLoading: true,
            transparent: false,
        };
    }

    addToCart(){
        const { navigation } = this.props;
        const { navigate } = this.props.navigation;
        const quantity = this.state.quantity;
        console.log(this.state.quantity);
        const product_id = navigation.getParam("productID", "1");
        return Api('addToCart','POST', `product_id=${product_id}&quantity=${quantity}`)
        .then((responseJson)=>{
        console.log(responseJson)
        if(responseJson.status == 200){
            alert(responseJson.user_msg),
            //this.setQuantityModalVisible(!this.state.quantityModalVisible);
        setTimeout(function(){
            navigate("Home");
        },1000);
    } else if(responseJson.status == 401){
        alert(responseJson.user_msg)
    } 
    }).catch(error => {
            console.error(error);
        });
    }


     setRatings(){
        const { navigation } = this.props;
        const { navigate } = this.props.navigation;
        const product_id = navigation.getParam("productID", "1");
        const userRating = this.state.user_Ratings;
        return Api('products/setRating','POST',`product_id=${product_id}&rating=${userRating}`)
        .then((responseJson)=>{
            if(responseJson.status == 200){
                alert(responseJson.user_msg),
                //this.setQuantityModalVisible(!this.state.quantityModalVisible);
            setTimeout(function(){
                navigate("Home");
            },1000);
        }
        })
        .catch(error => {
            console.error(error);
          });
    }

    hideModal(bool){
        this.setState({
            modalVisible: bool
        })
    }
    
    onButtonClick(){
            //this.setQuantityModalVisible(!this.state.quantityModalVisible);
            this.addToCart();
    }

    onRatingButtonClick(){
        //this.setRatingModalVisible(!this.state.ratingModalVisible);
        this.setRatings();
    }

    updateRating(rate){
        this.setState({defaultRating: rate})
    }

    

    setQuantityModalVisible(visible){
        this.setState({quantityModalVisible: visible});
    }

    setRatingModalVisible(visible){
        this.setState({ratingModalVisible: visible});
    }
    
    
    id =  1

     static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam("productName", "Center Coffee Table")
      });

    componentDidMount(){
        this.productDetail()
    }

    productDetail(){
        const { navigation } = this.props;
        const product_id = navigation.getParam("productID", "1")
        return Api(`products/getDetail?product_id=${product_id}`,'GET',null)
        .then((responseJson)=>{
            if(responseJson.status == 200){
                this.setState({
                    datasource: responseJson.data,
                    productImages: responseJson.data.product_images,
                    largeImage: responseJson.data.product_images[0].image,
                    isLoading: !this.state.isLoading
                })
            }    
        })
        .catch((error)=> {
            console.error(error)
        })
    }
   
    categoryChange(){
        
        if(this.state.datasource.product_category_id == 1) {
            return <Text>Category - Tables</Text>
        } else if (this.state.datasource.product_category_id == 2){
            return<Text>Category - Chairs</Text>
        } else if (this.state.datasource.product_category_id == 3) {
            return <Text>Category - Sofas</Text>
        }
    }

    renderImages(){
        return this.state.productImages.map(item=> {
            return(
                <TouchableOpacity onPress={()=>this.setState({largeImage: item.image})} key={item.image}>
                    <Image style={{width: 80, height: 70,margin: 5,borderColor: 'black',borderWidth: 1}} source= {{uri: item.image}}/>
                </TouchableOpacity>
            );
        }); 
    }

    renderLargeImage(){
        if (this.state.largeImage.length > 1) {
            return ( 
                <Image style={{width: 257, height: 178,alignItems: 'center', padding: 50}}
                source={{uri: this.state.largeImage}} />
            )
        }
    }
    
    render(){
        let RatingBar = []
          for(i=1;i<=this.state.maxRating;i++){
          RatingBar.push(
            <TouchableOpacity activeOpacity={0.7} key={i} onPress={this.updateRating.bind(this,i)}>
               <Image style={{height: 50,width: 50,resizeMode: 'cover'}} source={i<=this.state.defaultRating?R.images.star_check:R.images.star_unchek}/>
           </TouchableOpacity>
           )
        } 
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
                <View style={{flex: 1,backgroundColor: '#e8e4e3',width: '100%'}}>
                    
                        <View style={{flex: 1.5,backgroundColor: 'white',width: '100%'}}>
                        <Text style={{fontSize: 25, paddingLeft: 20, marginTop: 10, fontWeight: 'bold',color: '#262626'}}>{this.state.datasource.name}</Text>
                        <Text style={{fontSize: 20, color: '#4f4f4f',fontWeight: 'bold',paddingLeft: 20}}>{this.categoryChange()}</Text>
                        <View style={{flexDirection: 'row'}}>
                           <Text style={{fontSize: 14, color: '#4f4f4f',fontWeight: 'bold',paddingLeft: 20}}>{this.state.datasource.producer}</Text>
                           <View style={{flex:1,justifyContent: 'flex-end',alignItems: 'flex-end',marginRight: 20}}>
                                <UserRatings ratings={this.state.datasource.rating}/>
                           </View>
                        </View>
                        </View>
                     
                     
                   
                    <View style={{flex: 7,borderRadius: 10,backgroundColor: 'white',marginTop: 10,borderBottomColor: 'grey',marginLeft: 10,marginBottom:10,marginRight: 10}}>
                    <ScrollView>
                    {/* <View style={{flex: 7}}> */}
                        {/* <View style={{borderRadius: 10,backgroundColor: 'white',marginTop: 10,borderBottomColor: 'grey',marginLeft: 10,marginBottom:10,marginRight: 10}}> */}
                       <View style={{flexDirection:'row',marginTop: 5,marginBottom: 10}}>
                            <Text style={{color: '#FE4040',fontSize:25,paddingLeft: 20}}>Rs.{this.state.datasource.cost}</Text>
                            <View style={{flex: 1,justifyContent: 'center',alignItems: 'flex-end',marginRight: 20}}>
                            <TouchableOpacity >
                                <Image source={R.images.share} />
                            </TouchableOpacity> 
                            </View>
                        </View>
                        <View style={{justifyContent: 'center',alignItems: 'center'}}>{this.renderLargeImage()}</View>
                        <View style={{paddingLeft: 20,paddingTop: 8,paddingRight: 20}}>
                            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={true} nestedScrollEnabled>
                                {this.renderImages()}
                            </ScrollView>
                        </View>
                        <Text style={{color: "#111111",fontWeight: 'bold',fontSize: 18, marginLeft: 20}}>DESCRIPTION:</Text>
                        <ScrollView nestedScrollEnabled> 
                            <Text style={{marginTop: 1, paddingLeft: 10,fontWeight: 'bold', color: '#333333',fontSize: 14, marginLeft: 10,marginRight: 20 }}>{this.state.datasource.description}</Text>
                        </ScrollView>
                        </ScrollView>
                        {/* </Vi ew> */}
                    </View>
                    
                    
                    
                    <View style={{flex: 1, flexDirection:'row',justifyContent:'center',alignItems: 'center',paddingVertical: 10,backgroundColor: 'white'}}>
                        <View style={{marginLeft: 20}}>
                            <TouchableOpacity style={{width: 160, height: 45,backgroundColor: '#E91C1A', borderRadius: 10}}
                               onPress={()=>{
                               this.setQuantityModalVisible(true);
                            }}>
                                <Text style={{fontSize: 18, fontWeight: '500', color: '#FFFFFF', textAlign: 'center',padding: 10}}>BUY NOW</Text>                           
                            </TouchableOpacity>
                        </View>
                        <View style={{marginLeft:5}}>
                            <TouchableOpacity style={{ width: 160, height: 45, backgroundColor: '#9C908F',borderRadius: 10,alignContent: 'center', marginRight: 10,marginLeft: 20}}
                            onPress={()=>{
                            this.setRatingModalVisible(true);
                            }}>
                                <Text style={{fontSize: 18, fontWeight: '500',color: '#5C5858', textAlign: 'center',paddingVertical: 10}}>RATE</Text>
                            </TouchableOpacity>
                        </View> 
                    
                    </View> 

                    {/* <View style={{justifyContent: 'center',alignItems: 'center',opacity: 10}}> */}
                        <Modal 
                            animationType="slide"
                            transparent={true}
                            
                            visible={this.state.quantityModalVisible}>
                                
                                
                                {/* <View style={{opacity: 0.5}}>    */}
                                <TouchableOpacity
                                style={{flex: 1}}
                                activeOpacity={1}
                                onPressOut={() => {this.setQuantityModalVisible(false)}}>
                            <ScrollView >
                               
                                
                            <View style={{flex: 1,backgroundColor: '#a9a9a9'}}>    
                                <View style={modalStyles.modal}>
                                    <Text style={{fontSize: 20,fontWeight:'bold',color: '#2C2B2B', paddingTop: 20 }}>{this.state.datasource.name}</Text>
                                    <View style={{padding: 40}}>{ this.renderLargeImage()}</View>
                                    <Text style={{fontSize: 18, fontWeight: 'bold', paddingHorizontal: 100}}>Enter Quantity</Text>
                                    <View style={{justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
                                        <TextInput style={{fontSize: 20,paddingBottom: 10,paddingTop: 10,borderWidth: 3,borderRadius: 10,borderColor:'#000000', width: 120,height: 50, textAlign: 'center'}} 
                                         onChangeText={quantity=>
                                         this.setState({quantity: quantity})} />
                                    </View>
                                    <MyContext.Consumer>
                                        {contextValue=>(
                                        <View style={{marginBottom: 10}}>
                                        <TouchableOpacity 
                                        style={{backgroundColor: 'red',height: 42, width: 176,justifyContent: 'center'}}
                                        onPress={()=> {this.onButtonClick();contextValue.plusCount()}}>
                                            <Text style={{color: 'white',fontSize: 23, fontWeight: 'bold', textAlign: 'center',borderRadius: 8}}>SUBMIT</Text>
                                        </TouchableOpacity>
                                        </View>
                                        )}
                                    </MyContext.Consumer>
                                </View>    
                            </View> 
                            </ScrollView> 
                            
                            </TouchableOpacity>  
                            {/* </View> */}
                        </Modal>
                        {/* </View> */}
                        
                        <Modal 
                        animationType='fade'
                        transparent={false}
                        visible={this.state.ratingModalVisible}>
                        
                            {/* <TouchableOpacity
                                style={{flex: 1}}
                                activeOpacity={1}
                                onPressOut={() => {this.setRatingModalVisible(false)}}> */}
                               
                            <View style={{flex: 1,backgroundColor: '#a9a9a9'}}>
                                <View style={modalStyles.modal}>
                                    <Text style={{fontSize: 20,fontWeight:'bold',color: '#2C2B2B', paddingTop: 20 }}>{this.state.datasource.name}</Text>
                                    <View style={{padding: 40}}>{ this.renderLargeImage()}</View> 
                                     <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 10,flexDirection: 'row'}}>
                                        {RatingBar}
                                    </View>
                                    <View style={{backgroundColor: 'red',height: 42, width: 176,justifyContent: 'center'}}>
                                        <TouchableOpacity
                                        onPress={()=> this.onRatingButtonClick()}>
                                        <Text style={{color: 'white',fontSize: 23, fontWeight: 'bold', textAlign: 'center',borderRadius: 8}}>RATE NOW</Text>
                                        </TouchableOpacity>
                                    </View>
                                    </View>
                                </View> 
                                {/* </TouchableOpacity>  */}
                                
                        </Modal>       
                </View>
            )
        }     
    }
}

const modalStyles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 150,
        marginBottom: 130,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 2,
        borderColor: '#4f4f4f',
     },
     innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
      },
 })
