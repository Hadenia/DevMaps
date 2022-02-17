import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeMapScreen from './screens/HomeMapScreen';
import AddMarkerScreen from './screens/AddMarkerScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>  
        <Stack.Screen name="Home" component={HomeMapScreen} options={{headerShown: false}}/>   
        <Stack.Screen name="AddMarkerScreen" component={AddMarkerScreen} options={{ title: 'Voltar' }}/>  
      </Stack.Navigator>
    </NavigationContainer>
  );
}


