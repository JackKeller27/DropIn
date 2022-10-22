import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './Login';
import SplashScreen from './SplashScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          options={{animationEnabled: false, header: () => null}}
          component={SplashScreen}
        />
        <Stack.Screen
          name="Login"
          options={{animationEnabled: true, header: () => null}}
          component={Login}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
