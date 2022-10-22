import * as React from 'react';
import { Button, Text, View, StyleSheet, TextInput, Dimensions, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';

//Home Screen

function HomeScreen({ navigation }) {
  return (
    <View style={styles.view}>
      <Image source={require('./assets/logo_actual.png')} style={styles.image} />
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
      <View
        style={{
          position: 'absolute',//use absolute position to show button on top of the map
          top: '7%', //for center align
          alignSelf: 'flex-start' //for align to right
        }}
      >
        <Button
          title="Back"
          color="red"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}

//Navigation

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          headerShown: false
        }}
      >
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
  image: {
    width: '50%',
    height: '50%',
    aspectRatio: 1,
  },
})

export default App;