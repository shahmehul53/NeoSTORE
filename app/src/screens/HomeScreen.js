import React, {Component} from 'react';
import {View, Button, Image, TextInput, Text,ScrollView,TouchableOpacity,FlatList} from 'react-native';
import R from '../R';
import {BackgroundCarousel} from "../components/BackgroundCarousel";

//import style from '../Styles'


const gridData = [ 
    { id: R.images.tableicon, text: 'Tables'},
    { id: R.images.sofaicon, text: 'Sofas'},
    { id: R.images.chairsicon, text: 'Chairs'},
    { id: R.images.cupboardicon, text: 'Cupboards'}
]



export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state={
            sliderImgs:[
                {key: R.images.slider_img1},
                {key: R.images.slider_img2},
                {key: R.images.slider_img3},
                {key: R.images.slider_img4}
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
                    {/* <ScrollView 
                    horizontal 
                    pagingEnabled
                    snapToAlignment={"center"}
                    showsHorizontalScrollIndicator={true}>
                        <Image style={{width: 393, height: "100%"}} source={R.images.slider_img1}/>
                        <Image style={{width: 393, height: "100%"}} source={R.images.slider_img2}/>
                        <Image style={{width: 393, height: "100%"}} source={R.images.slider_img3}/>
                        <Image style={{width: 393, height: "100%"}} source={R.images.slider_img4}/>
                    </ScrollView> */}
                </View>

                <View style={{flex: 3,justifyContent: 'center', alignItems: 'center'}}>
                    <FlatList
                      data={gridData}
                      renderItem={({ item }) =>
                        <View>
                         <TouchableOpacity
                          
                            style={{padding: 8}}
                            onPress={() => this.props.navigation.navigate(item.text)}>

                            <Image source= {item.id}/>
                            
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