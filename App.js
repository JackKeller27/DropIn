import * as React from 'react';
import { Button, Text, View, StyleSheet, TextInput, Dimensions, Image, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import Pin from './Pin.js';

//Home Screen

function HomeScreen({ navigation }) {
  return (
    <View style={styles.view}>
      <Image source={require('./assets/logo_ss.png')} style={styles.image} />
      <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable style={styles.buttonSignUp} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonTextSignUp}>Sign Up</Text>
      </Pressable>
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
  // const [pinCoord, setPinCoord] = React.useState(0);
  const [pins, setPins] = React.useState([]);
  const [isPressed, setIsPressed] = React.useState(false);

  // const pin = {
  //   coordinates: pinCoord
  // }

  const culcLocation = {
    latitude: 33.7749,
    longitude: -84.3964,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }

  const dropPin = (e) => { //handles dropping a pin
    if (isPressed) {
      setPins([...pins, e.nativeEvent.coordinate])
      setIsPressed(false);
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={culcLocation} //initial map location set to CULC
        onPress={(e) => dropPin(e)}
      >
        {
          pins.map((pin, i) => (<Marker coordinate={pin} key={i}>
            <Pin />
          </Marker>))
        }
      </MapView>
      <View
        style={{
          position: 'absolute', //maintain absolute button position
          top: '7%',
          alignSelf: 'flex-start'
        }}
      >
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.mapButtonText}>Back</Text>
        </Pressable>
      </View>
      <View
        style={{
          position: 'absolute', //maintain absolute button position
          top: '90%',
          alignSelf: 'flex-end'
        }}
      >
        <Pressable style={styles.buttonPlacePin} onPress={() => setIsPressed(true)}>
          <Text style={styles.mapButtonText}>Place Pin</Text>
        </Pressable>
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginLeft: '8%',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  buttonPlacePin: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: '8%',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'teal',
  },
  mapButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '3%',
    marginTop: '4%',
    width: '60%',
    borderRadius: 40,
    elevation: 20,
    backgroundColor: 'white',
  },
  buttonSignUp: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '3%',
    marginTop: '4%',
    width: '60%',
    borderRadius: 40,
    elevation: 20,
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 28,
    fontWeight: 'bold',
    letterSpacing: 0.21,
    color: 'black',
  },
  buttonTextSignUp: {
    fontSize: 16,
    lineHeight: 28,
    fontWeight: 'bold',
    letterSpacing: 0.21,
    color: 'white',
  },
})

export default App;