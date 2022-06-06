import React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ShoppingCartScreen from './src/screens/ShoppingCartScreen';

const Stack = createStackNavigator();
LogBox.ignoreLogs([
  'Warning: Async Storage has been extracted from react-native core',
]);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{header: () => null}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="ShoppingCart" component={ShoppingCartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
