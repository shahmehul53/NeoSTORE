import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Dimensions,Image} from 'react-native'

const DEVICE_WIDTH = Dimensions.get("window").width

class BackgroundCarousel extends Component{
    scrollRef = React.createRef();
    constructor(props){
        super(props)
        this.state = {
            selectedIndex: 0
        }
    }

    componentDidMount(){
        setInterval(()=>{
            this.setState(
                prev => ({
                    selectedIndex:
                    prev.selectedIndex === this.props.images.length - 1 ? 0 : prev.selectedIndex + 1
                }),
                ()=> {
                    this.scrollRef.current.scrollTo({
                        animated: true,
                        y: 0,
                        x: DEVICE_WIDTH *this.state.selectedIndex
                    });
                }
            )
        },2000);
    }

    setSelectedIndex = event => {
        //width of the viewSize
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        //get current position of the scrollview
        const contentOffset = event.nativeEvent.contentOffset.x;

        const selectedIndex = Math.floor(contentOffset / viewSize);
        this.setState( {selectedIndex});
    }

    render(){
        const {images} = this.props
        const {selectedIndex} = this.state
        //console.log(images)
        return(
            <View style={{height: "100%",width: "100%"}}>
                <ScrollView
                 horizontal
                pagingEnabled
                onMomentumScrollEnd={this.setSelectedIndex}
                ref={this.scrollRef}>

                 {images.map(image => (
                    <Image
                     style={styles.backgroundImage}
                      // source={{ uri: image }}
                     source={image.key}
                     key={image.key}
                    />
                   ))}   
                </ScrollView>
                <View style={styles.circleDiv}>
                    {images.map((image,i)=>(
                        <View 
                        key={image.key}
                        style={[styles.whiteCircle, {opacity:i === selectedIndex ? 0.5:1}]}
                        />
                    ))}
                </View>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    backgroundImage:{
        height: '100%',
        width: DEVICE_WIDTH
    },
    circleDiv:{
        position: 'absolute',
        bottom: 15,
        height: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    whiteCircle:{
        width: 6,
        height: 6,
        borderRadius: 3,
        margin: 5,
        backgroundColor: '#fff'
    }
})

export {BackgroundCarousel};