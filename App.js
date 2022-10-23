import * as React from 'react';
import { Button, Text, View, StyleSheet, TextInput, Dimensions, Image, Pressable, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import Pin from './Pin.js';
import mapStyle from './mapStyle.json'
import UploadImage from './UploadImage';

//Home Screen

function HomeScreen({ navigation }) {
  return (
    <View style={styles.view}>
      <Image source={require('./assets/logo_ss.png')} style={styles.image} />
      <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable style={styles.buttonSignUp} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.buttonTextSignUp}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

//Login Screen
//**implement POST request, change onPress

function LoginScreen({ navigation }) {
  const [username, onChangeTextUsr] = React.useState(null);
  const [password, onChangeTextPsw] = React.useState(null);
  const [isValid, setIsValid] = React.useState("False");

  const login = () => {
    //POST request
    fetch('https://mywebsite.com/endpoint/', { //IMPORTANT edit this link
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Username: { username },
        Password: { password }
      })
    });

    if (isValid === "True") {
      navigation.navigate('Map')
    } else {
      alert("Username/password does not exist!");
    }
  }

  //await fetch
  const verifyUser = async () => {
    try {
      const response = await fetch(
        'https://reactnative.dev/movies.json' //IMPORTANT edit this link
      );
      setIsValid(response);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    verifyUser();
  });

  return (
    <View
      style={styles.login}>

      <Text style={styles.titleText}>Gatekeepin' Shuvs.</Text>

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
      {/* <Pressable style={styles.buttonSignUp} onPress={() => login()}> */}
      <Pressable style={styles.buttonSignUp} onPress={() => navigation.navigate('Map')}>
        <Text style={styles.buttonTextSignUp}>Let's Ride</Text>
      </Pressable>
    </View>
  );
}

//Signup Screen
//**implement POST request

function SignupScreen({ navigation }) {
  const [username, onChangeTextUsr] = React.useState(null);
  const [password, onChangeTextPsw] = React.useState(null);

  const signup = () => {
    //POST request
    fetch('https://mywebsite.com/endpoint/', { //IMPORTANT edit this link
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Username: { username },
        Password: { password }
      })
    });

    alert("Congrats, you did it!")
    navigation.navigate('Login')
  }

  return (
    <View
      style={styles.login}>

      <Text style={styles.titleText}>Join the fam :)</Text>

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
      <Pressable style={styles.buttonSignUp} onPress={() => signup()}>
        <Text style={styles.buttonTextSignUp}>Drop In!</Text>
      </Pressable>
    </View>
  );
}

//Map Screen
//**implement fetch request

function MapScreen({ navigation }) {
  const [pins, setPins] = React.useState([]);
  const [isPressed, setIsPressed] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  //await fetch
  // const getPins = async () => {
  //   try {
  //     const response = await fetch('https://reactnative.dev/movies.json'); //IMPORTANT edit this link
  //     const json = await response.json();
  //     setPins(json.pins);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // React.useEffect(() => {
  //   getPins();
  // }, []);

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
        customMapStyle={mapStyle}
      >
        {
          pins.map((pin, i) => (
            <Marker coordinate={pin} key={i} onPress={() => setModalVisible(true)}>
              <Pin />
            </Marker>
          ))
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

      <Modal //popup
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Check out this spot!</Text>
          <UploadImage/>
          <View
            style={{
              position: 'absolute', //maintain absolute button position
              top: '97%',
              alignSelf: 'center'
            }}
          >
            <Pressable
              style={styles.exitModalButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.mapButtonText}>Exit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
        <Stack.Screen name="Signup" component={SignupScreen} />
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
    height: '7%',
    width: '68%',
    margin: '4%',
    borderWidth: 3,
    borderRadius: 21,
    padding: 15,
    fontSize: 15,
    backgroundColor: "white"
  },

  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: '21%'
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

  modalView: {
    marginTop: '25%',
    marginLeft: '10%',
    marginRight: '10%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: '75%',
    height: '75%',
    alignItems: "center",
    justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },

  exitModalButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
})

export default App;