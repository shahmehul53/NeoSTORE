import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './app/src/screens/LoginScreen'
import RegisterScreen from './app/src/screens/RegisterScreen';
import R from './app/src/R';
import ForgotPasswordScreen from './app/src/screens/ForgotPasswordScreen';
import HomeScreen from './app/src/screens/HomeScreen'
import TablesScreen from './app/src/screens/TablesScreen'


const MainNavigator= createStackNavigator({
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
    Home:{
        screen: HomeScreen,
        navigationOptions:{
            title: 'Home Screen',
            headerStyle:{
                backgroundColor: R.color.backgroundColorDefault
            },
            headerTintColor: R.color.textInputBorderColor
        }
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
    }
});

const AppNavigator=createAppContainer(MainNavigator)
export default AppNavigator

