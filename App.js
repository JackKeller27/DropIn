import * as React from 'react';
import { Button, Text, View, StyleSheet, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.view}>
      <Text style={styles.titleText}>DropIn.</Text>

      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />

    </View>
  );
}

const LoginScreen = ({ navigation }) => {
  const [text, onChangeText] = React.useState(null);

  return (
    <View
      style={styles.view}>

      <Text style={styles.titleText}>Login</Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Username"
      />

      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Password"
        secureTextEntry={true}
      />
    </View>
  )
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gold",
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  button: {

  },

  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },

  baseText: {

  },
})

export default App;