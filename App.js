import * as React from 'react';
import { useState } from 'react';
import { Button, Text, View, StyleSheet, TextInput, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';

//Home Screen

function HomeScreen({ navigation }) {
  return (
    <View style={styles.view}>
      <Text style={styles.titleText}>DropIn.</Text>

      <Button
        title="Login"
        color="white"
        onPress={() => navigation.navigate('Login')}
      />

    </View>
  );
}

//Login Screen

function LoginScreen({ navigation }) {
  const [username, onChangeTextUsr] = React.useState(null);
  const [password, onChangeTextPsw] = React.useState(null);

  return (
    <View
      style={styles.login}>

      <Text style={styles.titleText}>Login</Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeTextUsr}
        value={username}
        placeholder="Username"
      />

      <TextInput
        style={styles.input}
        onChangeText={onChangeTextPsw}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
      />

      <Button
        title="Submit"
        color="white"
        onPress={() => navigation.navigate('Map')}
      />
    </View>
  );
}

//Map Screen

function MapScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        provider={PROVIDER_GOOGLE} 
        initialRegion={{ //initial coordinates set to CULC
          latitude: 33.7749,
          longitude: -84.3964,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />
    </View>
  );
}

//Navigation

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//Style Sheet

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gold",
  },

  login: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "gold",
  },

  input: {
    height: 40,
    margin: 6,
    borderWidth: 1,
    padding: 10,
    fontSize: 15,
    backgroundColor: "white"
  },

  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 25
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})

export default App;