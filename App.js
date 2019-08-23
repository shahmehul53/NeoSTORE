import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './Routes';
import CartProvider from './app/src/context/CartProvider'


const App = () => {
  return (
    <CartProvider>
    <AppNavigator/>
    </CartProvider>
  )
}

export default App;