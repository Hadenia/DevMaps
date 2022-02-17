import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Button, Alert, StyleSheet, Text, TextInput, View, Dimensions, KeyboardAvoidingView } from 'react-native';

export default function AddMarkerScreen() {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function addmark() {

    const token = 'vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF'

    const response = await fetch("https://mobile.ect.ufrn.br:3003/markers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        latitude: latitude,
        longitude: longitude,
        title: title,
        description: description,
      }),
    })
    
    if (response.status === 200){
      Alert.alert(
        "Marcador adicionado",
        "Foi adicionado um marcador no mapa",
        [         
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );      
    }
    setDescription('');
    setTitle('');

  }

  return (
    <View style={styles.container}>

      <MapView style={styles.map}
      initialRegion={{
        latitude: -5.843803,
        longitude: -35.199649,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
       onPress={(event) => {
        setLatitude(event.nativeEvent.coordinate.latitude)
        setLongitude(event.nativeEvent.coordinate.longitude)
      }}>
        <Marker
          coordinate={{latitude: latitude, longitude: longitude}}
          title={title}
          description={description}
        />
      
      </MapView>      

      <KeyboardAvoidingView style={styles.inputContainer} behavior='padding'>
        <Text style={styles.label}>Título</Text>
        <TextInput style={styles.inputTitulo} value={title} onChangeText={setTitle} ></TextInput>
        <Text style={styles.label}>Descrição</Text>
        <TextInput style={styles.inputDesc} value={description} onChangeText={setDescription} ></TextInput>
        <Button
          title="Adicionar"
          color="#3CB371"
          onPress={() => addmark()} />
      </KeyboardAvoidingView>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  map: {
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').height) - 200,
  },

  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 25,
    backgroundColor: 'black',
  },

  inputTitulo: {
    width: (Dimensions.get('window').width) - 30,
    borderWidth: 1,
    borderColor: '#3CB371',
    marginBottom: 7,
    backgroundColor: '#C0C0C0'
  },

  inputDesc: {
    width: (Dimensions.get('window').width) - 30,
    borderWidth: 1,
    borderColor: '#3CB371',
    marginBottom: 12,
    backgroundColor: '#C0C0C0'
  },

  label: {
    color: '#98FB98'
   }


});