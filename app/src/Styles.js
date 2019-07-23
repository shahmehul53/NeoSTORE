import { StyleSheet } from 'react-native';
import R from './R';

const style=StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: R.color.backgroundColorDefault,
    },
    
    textInputStyle: {
        borderWidth:1.5,
        borderColor:R.color.textInputBorderColor,
        height:41,
        width:300,
        margin: 5,
        marginLeft: 10,
        marginRight: 10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:R.color.backgroundColorDefault,
        paddingHorizontal:10
    },
    headerTitleStyle: {
        fontSize:45,
        color:'#FFFFFF',
        marginBottom: 43,
        alignItems: 'center',
        
    },
    
    buttonStyle: {
        backgroundColor:'white',
        color:'red',
        marginTop:21,
        width:300,
        height:51,
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center',
        borderRadius:5,
        fontSize:20
    },
    forgotBtn: {
        marginTop: 10,
        color: R.color.textInputBorderColor,
        fontSize: 20
    },
    regAccount:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
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
    } 
})

export default style