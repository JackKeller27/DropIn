import React from 'react';
import { StyleSheet, TextInput, Header, View } from 'react-native';

const Login = () => {
    const [text, onChangeText] = React.useState(null);

    return (
        <View
            style={styles.view}>

            <Header>Login</Header>

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

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "cadetblue",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default Login;