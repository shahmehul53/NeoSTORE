import { StyleSheet } from 'react-native';
import R from './R';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const style=StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: R.color.backgroundColorDefault,
        width: '100%',
        height: '100%'
    },
    
    textInputStyle: {
        borderWidth:1.5,
        borderColor:R.color.textInputBorderColor,
        width: wp("83%"),
        height:hp("7"),
        //margin: 5,
        marginTop: 10,
        marginHorizontal: 30,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:R.color.backgroundColorDefault,
        paddingHorizontal:10,
        //paddingVertical: 10
    },
    headerTitleStyle: {
        fontSize:60,fontWeight: 'bold',
        color:'#FFFFFF',
        marginBottom: 43,
        //alignItems: 'center',
        
    },
    
    buttonStyle: {
        backgroundColor:'white',
        color:'red',
        marginHorizontal:30,
        //marginVertical: 10,
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal:10,
        //marginRight:30,
        //marginLeft: 30, 
        width: wp("83%"),
        height:hp("7.8%"),
        alignItems:'center',
        justifyContent:'center',
        //textAlign:'center',
        borderRadius:8,
        padding: 15
        //fontSize:20
    },
    forgotBtn: {
        marginTop: 10,
        color: R.color.textInputBorderColor,
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'normal'
    },
    regAccount:{
        flex: 1,
        flexDirection: 'row',
        alignItems:'flex-start',
        justifyContent: "flex-end",
        fontWeight: 'bold',
        marginTop: 70,
        bottom: 20
        
        
    },
    regAccountText: {
        color: R.color.textInputBorderColor,
        fontSize: 14,
        marginLeft: 30,
        fontWeight: 'bold',
        paddingLeft: 20
        
    },
    RegisterView:{
        backgroundColor: R.color.backgroundColorDefault,
        justifyContent: 'center',
        alignItems: 'center'
    },
    genderStyleContainer:{
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    genderText: {
        color:R.color.textInputBorderColor,
        margin: 10,
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 14
    },
    maleFemaleText:{
        margin: 5,
        justifyContent: 'center',
        color: R.color.textInputBorderColor,
        alignItems: 'center',
        fontSize: 14,
        fontWeight: 'bold'
    } ,
    buyNow:{
        backgroundColor: 'red',
        width: 100,
        height: 51,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 10, 
        borderWidth: 1,borderColor: '#fff'
    },
    buyNowText:{
         fontWeight: 'bold', 
         color: 'white',
         justifyContent: 'center',
         alignItems: 'center',
         textAlign: 'center',
    },
    box: {
        flex: 0,
        width: 420,
        backgroundColor: '#ffffff',
        marginBottom: 10,
    },
    boxmid: {
        flex: 0,
        width: 400,
        height: 425,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        
    },
    bigImage: {
        alignItems: "center",
    },
    boxend: {
        flex: 1,
        width: '100%',
        height: 60,
        backgroundColor: '#ffffff',
        position: 'absolute',
        bottom: 0,
    },
    button: {
        width: 190,
        height: 45,
        backgroundColor: '#e91c1a',
        borderRadius: 10,
        },
    buttonRate: {
        marginLeft: 10,
        width: 190,
        height: 45,
        backgroundColor: '#9c908f',
        borderRadius: 10,
        alignContent: "center",
    },
    Textbutton: {
        fontSize: 18,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center',
        paddingVertical: 10,
    },
    TextbuttonRate: {
        fontSize: 18,
        fontWeight: '500',
        color: '#5c5858',
        textAlign: 'center',
        paddingVertical: 10,
    }, 

})

export default style