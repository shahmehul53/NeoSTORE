import React, { Component} from 'react';
import { View, Text, StyleSheet, Button,Dimensions } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator, createSwitchNavigator  } from 'react-navigation';
import LoginScreen from './app/src/screens/LoginScreen'
import RegisterScreen from './app/src/screens/RegisterScreen';
import R from './app/src/R';
import ForgotPasswordScreen from './app/src/screens/ForgotPasswordScreen';
import HomeScreen from './app/src/screens/HomeScreen'
import TablesScreen from './app/src/screens/TablesScreen'
import ProductDetails from './app/src/screens/ProductDetails';
import ChairsScreen from './app/src/screens/ChairsScreen';
import SofasScreen from './app/src/screens/SofasScreen';
import CupboardScreen from './app/src/screens/CupboardScreen';
import MyCartScreen from './app/src/screens/MyCartScreen';
import MenuDrawer from './app/src/screens/MenuDrawer';
import MyAccountScreen from './app/src/screens/MyAccountScreen';
import EditProfleScreen from './app/src/screens/EditProfile';
import StoreLocatorScreen from './app/src/screens/StoreLoactorScreen';
import MyOrderScreen from './app/src/screens/MyOrderScreen';
import LogoutScreen from './app/src/screens/LogoutScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ResetPasswordScreen from './app/src/screens/ResetPasswordScreen';
import AddressScreen from './app/src/screens/AddressScreen';
import OrderDetailsScreen from './app/src/screens/OrderDetailsScreen';
import LaunchScreen from './app/src/screens/LaunchScreen';
import CustomDrawer from './app/src/components/CustomDrawer'
import ProductList from './app/src/screens/ProductList';



// const MainNavigator= createStackNavigator({
//     Login: {
//         screen: LoginScreen,
//         navigationOptions:{
//             header:null
//         }
//     },
//     Register: {
//         screen: RegisterScreen,
//         navigationOptions:{
//             title: 'Register',
//             headerStyle:{
//                 backgroundColor: R.color.backgroundColorDefault
//             },
//             headerTintColor: R.color.textInputBorderColor
//         }
//     },
//     ForgotPassword: {
//         screen: ForgotPasswordScreen,
//         navigationOptions:{
//             title: 'Forgot Password',
//             headerStyle:{
//                 backgroundColor: R.color.backgroundColorDefault
//             },
//             headerTintColor: R.color.textInputBorderColor
//         }
//     },
//     Home:{
//         screen: HomeScreen,
//         navigationOptions:{
//             title: 'Home Screen',
//             headerStyle:{
//                 backgroundColor: R.color.backgroundColorDefault
//             },
//             headerTintColor: R.color.textInputBorderColor
//         }
//     },
//     Tables:{
//         screen: TablesScreen,
//         navigationOptions:{
//             title: 'Tables',
//             headerStyle:{
//                 backgroundColor: R.color.backgroundColorDefault
//             },
//             headerTintColor: R.color.textInputBorderColor

//         }
//     },
//     Chairs:{
//         screen: ChairsScreen,
//         navigationOptions:{
//             title: 'Chairs',
//             headerStyle:{
//                 backgroundColor: R.color.backgroundColorDefault
//             },
//             headerTintColor: R.color.textInputBorderColor

//         }
//     },
//     Sofas:{
//         screen: SofasScreen,
//         navigationOptions:{
//             title: 'Sofas',
//             headerStyle:{
//                 backgroundColor: R.color.backgroundColorDefault
//             },
//             headerTintColor: R.color.textInputBorderColor

//         }
//     },
//     Cupboards:{
//         screen: CupboardScreen,
//         navigationOptions:{
//             title: 'Cupboards',
//             headerStyle:{
//                 backgroundColor: R.color.backgroundColorDefault
//             },
//             headerTintColor: R.color.textInputBorderColor

//         }
//     },
//     Details:{
//         screen: ProductDetails,
//         navigationOptions:{
            
//             headerStyle:{
//                 backgroundColor: R.color.backgroundColorDefault
//             },
//             headerTintColor: R.color.textInputBorderColor

//         }
//     },
    
// });

//Drawer Screens
// const WIDTH = Dimensions.get('window').width;
// const DrawerConfig = {
//     drawerWidth: WIDTH*0.83,
//     contentComponent: ({navigation})=>{
//         return(<MenuDrawer navigation={navigation}/>)
//     },
// }

// const defaultConfig = {
//     defaultNavigationOptions:({navigation})=> {
//         return {
//             headerLeft: (
//                 <TouchableOpacity onPress={()=> navigation.openDrawer()}>
//                     <Image source={R.images.menu_icon}/>
//                 </TouchableOpacity>

//             )
//         }
//     }
// }
 const MainNavigator= createStackNavigator({
    Home:{
        screen: HomeScreen,
    },
    List:{
        screen: ProductList
    },
    Tables:{
        screen: TablesScreen,
        navigationOptions:{
            title: 'Tables',
            headerStyle:{
                backgroundColor: R.color.backgroundColorDefault
            },
            headerTintColor: R.color.textInputBorderColor

        }
    },
    Chairs:{
        screen: ChairsScreen,
        navigationOptions:{
            title: 'Chairs',
            headerStyle:{
                backgroundColor: R.color.backgroundColorDefault
            },
            headerTintColor: R.color.textInputBorderColor

        }
    },
    Sofas:{
        screen: SofasScreen,
        navigationOptions:{
            title: 'Sofas',
            headerStyle:{
                backgroundColor: R.color.backgroundColorDefault
            },
            headerTintColor: R.color.textInputBorderColor

        }
    },
    Cupboards:{
        screen: CupboardScreen,
        navigationOptions:{
            title: 'Cupboards',
            headerStyle:{
                backgroundColor: R.color.backgroundColorDefault
            },
            headerTintColor: R.color.textInputBorderColor

        }
    },
    Details:{
            screen: ProductDetails,
            navigationOptions:{    
                headerStyle:{
                    backgroundColor: R.color.backgroundColorDefault
                },
                headerTintColor: R.color.textInputBorderColor
        
        }
    },
    MyCart: {
        screen: MyCartScreen,
        navigationOptions:{
            title: 'My Cart',
            headerStyle: {
                backgroundColor: R.color.backgroundColorDefault
            },
            headerTintColor: R.color.textInputBorderColor

        }
    },
    AddAddress: {
        screen: AddressScreen,
        navigationOptions:{
            title: 'Add Address',
            headerStyle: {
                backgroundColor: R.color.backgroundColorDefault
            },
            headerTintColor: R.color.textInputBorderColor

        }
    },
    MyAccount: {
        screen: MyAccountScreen,
        navigationOptions:{
            title: 'My Account',
            headerStyle: {
                backgroundColor: R.color.backgroundColorDefault
            },
            headerTintColor: R.color.textInputBorderColor

        }
    },
    EditProfile: {
        screen: EditProfleScreen,
        navigationOptions:{
            title: 'Edit Profile',
            headerStyle: {
                backgroundColor: R.color.backgroundColorDefault
            },
            headerTintColor: R.color.textInputBorderColor
        }
    },
    ResetPassword: {
        screen: ResetPasswordScreen,
        navigationOptions:{
            title: 'Reset Password',
            headerStyle: {
                backgroundColor: R.color.backgroundColorDefault
            },
            headerTintColor: R.color.textInputBorderColor
        }
    },
    StoreLoactor: {
        screen: StoreLocatorScreen,
        navigationOptions:{
            title: 'Store Locator',
            headerStyle: {
                backgroundColor: R.color.backgroundColorDefault
            },
            headerTintColor: R.color.textInputBorderColor

        }
    },

    MyOrder: {
        screen: MyOrderScreen,
        navigationOptions:{
            title: 'My Order',
            headerStyle: {
                backgroundColor: R.color.backgroundColorDefault
            },
            headerTintColor: R.color.textInputBorderColor

        }
    },
    OrderDetails: {
        screen: OrderDetailsScreen,
        navigationOptions:{
            headerStyle: {
                backgroundColor: R.color.backgroundColorDefault
            },
            headerTintColor: R.color.textInputBorderColor

        }
        
    },
    Logout: {
        screen: LogoutScreen,
        navigationOptions:{
            title: 'Logout',
            headerStyle: {
                backgroundColor: R.color.backgroundColorDefault
            },
            headerTintColor: R.color.textInputBorderColor

        }
    },

});

  const SessionNavigator= createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions:{
            header:null
        }
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions:{
            title: 'Register',
            headerStyle:{
                backgroundColor: R.color.backgroundColorDefault
            },
            headerTintColor: R.color.textInputBorderColor
        }
    },
    ForgotPassword: {
        screen: ForgotPasswordScreen,
        navigationOptions:{
            title: 'Forgot Password',
            headerStyle:{
                backgroundColor: R.color.backgroundColorDefault
            },
            headerTintColor: R.color.textInputBorderColor
        }
    },
    
});

const launchScreen=createStackNavigator({
    Launch:{
        screen: LaunchScreen, 
        navigationOptions:{
            header: null
        },
    }
});

const DrawerNavigator= createDrawerNavigator({
    drawer: {
        screen: MainNavigator,
    },
     
},
{
    contentComponent: MenuDrawer,
    drawerWidth: 280,
    drawerBackgroundColor: "light blue"
}
);


const SwitchNavigator= createSwitchNavigator({
    session:{screen: DrawerNavigator},
    home:{screen: SessionNavigator},
    Launcher:{screen: launchScreen}
}, {
    initialRouteName: "Launcher"
}
);

const AppNavigator=createAppContainer(SwitchNavigator);





//const AppNavigator=createAppContainer(MainNavigator)
export default AppNavigator

