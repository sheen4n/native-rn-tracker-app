import React, { useContext } from "react";
import { StyleSheet, Text, ActivityIndicator } from "react-native";
import { Context as LocationContext } from "../context/LocationContext";
import MapView, { Polyline, Circle } from "react-native-maps";

const Map = () => {
  const {
    state: { currentLocation, locations }
  } = useContext(LocationContext);

  if (!currentLocation) {
    return (
      <ActivityIndicator
        size="large"
        style={{ marginTop: 200 }}
      ></ActivityIndicator>
    );
  }
  // let points = [];
  // for (let i = 0; i < 20; i++) {
  //   if (i % 3 === 0) {
  //     points.push({
  //       latitude: 37.33233 + i * 0.001,
  //       longitude: -122.03121 + i * 0.001
  //     });
  //   } else {
  //     points.push({
  //       latitude: 37.33233 + i * 0.003,
  //       longitude: -122.03121 + i * 0.002
  //     });
  //   }
  // }

  console.log(locations);

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...currentLocation.coords,
        // latitude: 37.33233,
        // longitude: -122.03121,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
    >
      {/* <Polyline coordinates={points}></Polyline> */}
      <Circle
        center={currentLocation.coords}
        radius={30}
        strokeColor="rgba(158, 158, 255, 1.0)"
        fillColor="rgba(158, 158, 255, 0.3)"
      ></Circle>
      <Polyline coordinates={locations.map(loc => loc.coords)}></Polyline>
    </MapView>
  );
};

const styles = StyleSheet.create({ map: { height: 300 } });

export default Map;
