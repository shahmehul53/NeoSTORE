import React, {Component} from 'react';
import {View, Button, Image, TextInput, Text,ScrollView,TouchableOpacity,FlatList,Dimensions} from 'react-native';
import R from '../R';
import BackgroundCarousel from "../components/BackgroundCarousel";



const DEVICE_WIDTH = Dimensions.get("window").width
const DEVICE_HEIGHT = Dimensions.get("window").height






export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state={
            sliderImgs:[
                {key: R.images.slider_img1},
                {key: R.images.slider_img2},
                {key: R.images.slider_img3},
                {key: R.images.slider_img4}
            ],
            gridData : [ 
                { id: R.images.tableicon, text: 'Tables',value: 1},
                { id: R.images.sofaicon, text: 'Sofas',value: 3},
                { id: R.images.chairsicon, text: 'Chairs',value: 2},
                { id: R.images.cupboardicon, text: 'Cupboards',value: 4}
            ]
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Home Screen',
            headerStyle:{
                backgroundColor: R.color.backgroundColorDefault
            },
            headerLeft:(
                <TouchableOpacity style={{paddingLeft: 20}} onPress={()=>navigation.toggleDrawer()}>
                    <Image source={R.images.menu_icon} />
                </TouchableOpacity>
            ),
            headerRight:(
                <TouchableOpacity style={{paddingRight: 10}}>
                    <Image source={R.images.search_icon} />
                </TouchableOpacity>
            ),
            headerTintColor: R.color.textInputBorderColor,
            
      });
        
    
    render(){
        return(
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{flex: 2.2}}>
                    <BackgroundCarousel images={this.state.sliderImgs}/>
                </View>

                <View style={{flex: 3,justifyContent: 'center', alignItems: 'center'}}>
                    <FlatList
                      data={this.state.gridData}
                      renderItem={({ item }) =>
                        <View>
                         <TouchableOpacity  
                            style={{padding: 8}}
                            key={item.key}
                            //onPress={() => this.props.navigation.navigate(item.text)}
                            onPress={() => this.props.navigation.navigate('List',{id: item.value,navTitle: item.text})}

                            >
                            <Image style={{borderRadius: 10}} source= {item.id}/>   
                        </TouchableOpacity>
                        </View>
                    }  
                      keyExtractor={(item, index) => index.toString()}
                       numColumns={2}
                    />
                </View>
            </View>
        )
    }
}