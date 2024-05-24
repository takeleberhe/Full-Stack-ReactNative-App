import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import * as Location from "expo-location";

const GoogleMap = () => {
  const [mylocation, setMylocation] = useState(initialLocation);
  const [pin, setPin] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const initialLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
  };
  const RegionChange = (region) => {
    console.log(region);
  };

  return (
    <View>
      <MapView
        style={styles.map}
        onRegionChange={RegionChange}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
      >
        <Marker
          coordinate={pin}
          draggable={true}
          onDragStart={(e) => {
            console.log("drag start", e.nativeEvent.coordinate);
          }}
          onDragEnd={(e) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
          pinColor="blue"
        >
          <Callout>
            <Text>I am Here!</Text>
          </Callout>
        </Marker>
        <Circle center={pin} radius={1000} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").height,
    height: Dimensions.get("window").height,
  },
});

export default GoogleMap;
