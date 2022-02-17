import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, } from 'react-native';
import ActionButton from 'react-native-action-button';

import AddMarkerScreen from './AddMarkerScreen.js';

export default function HomeMapScreen({ navigation }) {

  const [marcs, setMarcs] = useState([]);

  async function loginMarks() {

    const token = "vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF";

    const response = await fetch("https://mobile.ect.ufrn.br:3003/markers", {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    const marcs = await response.json();
    setMarcs(marcs);

  }

  loginMarks();

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        initialRegion={{
          latitude: -5.843803,
          longitude: -35.199649,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>

        {marcs.map((mark) => (
          <Marker
            key={mark.id}
            title={mark.title}
            description={mark.description}
            coordinate={{
              latitude: mark.latitude,
              longitude: mark.longitude,
            }}
          >
          </Marker>
        ))}

      </MapView>
      <ActionButton
        buttonColor='#3CB371'
        onPress={() => { navigation.navigate(AddMarkerScreen) }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

});