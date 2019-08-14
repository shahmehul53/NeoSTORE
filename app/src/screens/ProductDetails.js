import React, {Component} from 'react';
import {View,KeyboardAvoidingView, Button, Image, TextInput, Text,ScrollView,TouchableOpacity,Modal, AsyncStorage,StyleSheet} from 'react-native';
import R from '../R';
import style from '../Styles'
import { TouchableHighlight } from 'react-native-gesture-handler';
import UserRatings from '../components/UserRatings';
import InputSpinner from "react-native-input-spinner";


export default class ProductDetails extends Component{
    constructor(){
        super()
        this.state = {
            datasource: [],
            productImages: [],
           // product_category_id: 1,
            category: "Tables",
            largeImage: "",
            quantityModalVisible: false,
            ratingModalVisible: false,
            quantity: null,
            access_token: "",
            user_Ratings: "",
            defaultRating: 1,
            maxRating: 5,
            status: "",
            user_msg: "",
            isLoading: false
        };
    }

    async addToCart(){
        const token = await AsyncStorage.getItem("@storage_Key_token")
        const { navigation } = this.props;
        const quantity = this.state.quantity;
        console.log(this.state.quantity);
        const product_id = navigation.getParam("productID", "1");
        fetch('http://staging.php-dev.in:8844/trainingapp/api/addToCart',{
           method: 'POST',
           headers:{
            //'access_token': "5d2eb4b6ca059",
            access_token: token,
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:
            `product_id=${product_id}&quantity=${quantity}`
        }).then((response)=>response.json())
        .then((responseJson)=>{
        console.log(responseJson)
        }).catch(error => {
            console.error(error);
          });
    }


     setRatings(){
        //const token = await AsyncStorage.getItem("@storage_Key_token")
        const { navigation } = this.props;
        const product_id = navigation.getParam("productID", "1");
        const userRating = this.state.user_Ratings;
        fetch('http://staging.php-dev.in:8844/trainingapp/api/products/setRating',{
           method: 'POST',
           headers:{
            //'access_token': "5d2eb4b6ca059",
            //access_token: this.state.access_token,
            //access_token: token,
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `product_id=${product_id}&rating=${userRating}`
        }).then((response)=>response.json())
        .then((responseJson)=>{
            console.log(responseJson)
        })
        .catch(error => {
            console.error(error);
          });
    }
    
    onButtonClick(){
        this.setQuantityModalVisible(!this.state.quantityModalVisible);
        this.addToCart();
    }

    onRatingButtonClick(){
        this.setRatingModalVisible(!this.state.ratingModalVisible);
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
        fetch(`http://staging.php-dev.in:8844/trainingapp/api/products/getDetail?product_id=${product_id}`)
        .then((response)=> response.json())
        .then((responseJson)=>{
            this.setState({
                datasource: responseJson.data,
                productImages: responseJson.data.product_images,
                largeImage: responseJson.data.product_images[0].image
            })
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
                    <Image style={{width: 80, height: 70, marginTop: 20,margin: 5,borderColor: 'black',borderWidth: 1}} source= {{uri: item.image}}/>
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
        console.log(this.state.datasource)
        console.log(this.state.largeImage)
        console.log(this.state.product_id)

        let RatingBar = []
          for(i=1;i<=this.state.maxRating;i++){
          RatingBar.push(
            <TouchableOpacity activeOpacity={0.7} key={i} onPress={this.updateRating.bind(this,i)}>
               <Image style={{height: 50,width: 50,resizeMode: 'cover'}} source={i<=this.state.defaultRating?R.images.star_check:R.images.star_unchek}/>
           </TouchableOpacity>
           )
        } 
        
        return(
            // <KeyboardAvoidingView  behavior="padding" enabled>
            <View style={{flex: 1}}>
                <ScrollView nestedScrollEnabled>
                <Text style={{fontSize: 25, paddingLeft: 20, marginTop: 10, fontWeight: 'bold',color: '#262626'}}>{this.state.datasource.name}</Text>
                <Text style={{fontSize: 20, color: '#4f4f4f',fontWeight: 'bold',paddingLeft: 20}}>{this.categoryChange()}</Text>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex:3}}>
                      <Text style={{fontSize: 14, color: '#4f4f4f',fontWeight: 'bold',paddingLeft: 20}}>{this.state.datasource.producer}</Text>
                      </View>
                   
                      {/* <Text style={{paddingLeft: 280}}>{this.state.datasource.rating}</Text> */}
                      <View style={{flex: 1,marginLeft: 30, marginRight: 10}}>
                      <UserRatings ratings={this.state.datasource.rating}/>
                      </View>
                    </View>

                   
                        <View style={{ flexDirection: 'row',justifyContent: 'space-around',marginTop: 14}}>
                            <Text style={{color: '#FE4040',fontSize:25,paddingRight: 60}}>Rs.{this.state.datasource.cost}</Text>
                            <TouchableOpacity style={{paddingLeft: 90}}>
                                <Image source={R.images.share} />
                            </TouchableOpacity>
                        </View>
                

                        <View style={{justifyContent: 'center',alignItems: 'center'}}>
                          {this.renderLargeImage()}
                          </View>
                          <View style={{paddingLeft: 20}}>
                          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={true} nestedScrollEnabled>
                            {this.renderImages()}
                          </ScrollView>
                          
                        </View>

                        <View style={{marginTop: 20, marginRight: 20}}>
                          <Text style={{color: "#111111",fontWeight: 'bold',fontSize: 18, marginLeft: 20}}>DESCRIPTION:</Text>
                          <ScrollView nestedScrollEnabled> 
                          <Text style={{marginTop: 5, paddingLeft: 10,fontWeight: 'bold', color: '#333333',fontSize: 14, marginLeft: 10}}>{this.state.datasource.description}</Text>
                          </ScrollView>
                        </View>
                        </ScrollView>

                        {/* <KeyboardAvoidingView  behavior="padding" enabled> */}
                        <View style={{opacity: 0.5, backgroundColor: '#000'}}>
                                <TouchableOpacity onPress={()=>this.setQuantityModalVisible(!this.state.quantityModalVisible)}/>        
                        </View>

                        <View style={{flex:2,flexDirection: 'row',marginTop: 26,marginRight: 14,marginBottom:26,marginLeft: 14}}>
                        {/* <KeyboardAvoidingView  behavior="padding" enabled> */}
                        {/* <View style={{opacity: 0.5, backgroundColor: '#000'}}>
                                <TouchableOpacity onPress={()=>this.setQuantityModalVisible(!this.state.quantityModalVisible)} style={{flex:1}}/>        
                        </View> */}
                            <Modal 
                            animationType="fade"
                            transparent={true}
                            visible={this.state.quantityModalVisible}>
                                {/* <View style={{opacity: 0.5, backgroundColor: '#000'}}>
                                    <TouchableOpacity onPress={()=>this.setQuantityModalVisible(!this.state.quantityModalVisible)} style={{flex:1}}/>
                                </View> */}
                            
                            <View style={{flex: 1,backgroundColor: '#a9a9a9'}}>
                            {/* <KeyboardAvoidingView  behavior="padding" enabled> */}
                                <View style={modalStyles.modal}>
                                <Text style={{fontSize: 20,fontWeight:'bold',color: '#2C2B2B', paddingTop: 20 }}>{this.state.datasource.name}</Text>
                                <View style={{padding: 40}}>{ this.renderLargeImage()}</View>
                                <Text style={{fontSize: 18, fontWeight: 'bold', paddingHorizontal: 100}}>Enter Quantity</Text>
                                <View style={{justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
                                {/* <TextInput style={{fontSize: 20,paddingBottom: 10,paddingTop: 10,borderWidth: 3,borderRadius: 10,borderColor:'#000000', width: 120,height: 50, textAlign: 'center'}} 
                                    onChangeText={quantity=>
                                    this.setState({quantity: quantity})} /> */}
                                <InputSpinner
	                              max={8}
	                              min={1}
	                              step={1}
	                              colorMax={"#E91C1A"}
	                              colorMin={"#E91C1A"}
	                              value={this.state.quantity}
	                              onChange={quantity=>
                                  this.setState({quantity: quantity})}
                               />
                                </View>
                                {/* <View > */}
                                <TouchableOpacity 
                                  style={{backgroundColor: 'red',height: 42, width: 176,justifyContent: 'center'}}
                                    onPress={()=> this.onButtonClick()}>
                                        <Text style={{color: 'white',fontSize: 23, fontWeight: 'bold', textAlign: 'center',borderRadius: 8}}>SUBMIT</Text>
                                    </TouchableOpacity>
                                {/* </View> */}
                                
                                </View>
                                {/* </KeyboardAvoidingView> */}
                            </View>
                                
                            </Modal>
                            {/* </KeyboardAvoidingView> */}
                            <View style={{flex: 1,marginLeft: 20}}>
                            <TouchableOpacity style={{width: 160, height: 45,backgroundColor: '#E91C1A', borderRadius: 10}}
                            onPress={()=>{
                                this.setQuantityModalVisible(true);
                           }}>
                            
                                <Text style={{fontSize: 18, fontWeight: '500', color: '#FFFFFF', textAlign: 'center', paddingVertical: 10}}>BUY NOW</Text>
                            </TouchableOpacity>
                            </View>
                            
                            <Modal 
                            animationType="fade"
                            transparent={true}
                            visible={this.state.ratingModalVisible}>
                            
                            <View style={{flex: 1,backgroundColor: '#a9a9a9'}}>
                                                           
                            <View style={modalStyles.modal}>
                                    
                                    <Text style={{fontSize: 20,fontWeight:'bold',color: '#2C2B2B', paddingTop: 20 }}>{this.state.datasource.name}</Text>
                                    <View style={{padding: 40}}>{ this.renderLargeImage()}</View> 
                                     
                                    {/* <TextInput style={{fontSize: 20,padding: 20 }} placeholder="Enter Quantity" /> */}
                                    {/* <Text>{this.state.datasource.rating}</Text> */}
                                    <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 10,flexDirection: 'row'}}>{RatingBar}</View>
                                    
                                    <View style={{backgroundColor: 'red',height: 42, width: 176,justifyContent: 'center'}}>
                                    <TouchableOpacity 
                                    //onPress={()=> {this.setRatingModalVisible(!this.state.ratingModalVisible);}}>
                                    onPress={()=> this.onRatingButtonClick()}>
                                        <Text style={{color: 'white',fontSize: 23, fontWeight: 'bold', textAlign: 'center',borderRadius: 8}}>RATE NOW</Text>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                                
                            </Modal>

                            <View style={{flex: 1,marginRight: 30}}>
                            <TouchableOpacity style={{ width: 160, height: 45, backgroundColor: '#9C908F',borderRadius: 10,alignContent: 'center', marginRight: 10,marginLeft: 20}}
                            onPress={()=>{
                                this.setRatingModalVisible(true);
                           }}>
                                <Text style={{fontSize: 18, fontWeight: '500',color: '#5C5858', textAlign: 'center', paddingVertical: 10}}>RATE</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                        {/* </KeyboardAvoidingView> */}
             </View>   
            //  </KeyboardAvoidingView>             
        )
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
       borderColor: '#4f4f4f'
    }
    

})