import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

export default function Pin() {
    // const [latitude, longitude, host] = useState(0);

    // useEffect(() => {
    //     //update states here
    // });

    return (
        <View style={styles.container}>
        <Image style={styles.image} source={require('./assets/skateboard_pin.png')}/>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 30,
        height: 30,    
        aspectRatio: 1,
    },
  });
