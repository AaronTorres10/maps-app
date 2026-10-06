import { useEffect, useRef } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import MapView from "react-native-maps";
import { LatLng } from "../../../core/actions/location/lat-lng";
import { useLocationStore } from "../../store/useLocationStore";

interface Props extends ViewProps {
  showUserLocation?: boolean;
  initialLocation: LatLng;
}

const CustomMap = ({
  initialLocation,
  showUserLocation = true,
  ...rest
}: Props) => {
  const mapRef = useRef<MapView>(null);
  const { watchLocation, clearWatchLocation, lastKnowLocation } =
    useLocationStore();

  useEffect(() => {
    watchLocation();
    return () => {
      clearWatchLocation();
    };
  }, []);

  useEffect(() => {
    if (lastKnowLocation) {
      moveCamaraToLocation(lastKnowLocation);
    }
  }, [lastKnowLocation]);

  const moveCamaraToLocation = (LatLng: LatLng) => {
    if (!mapRef.current) return;
    mapRef.current.animateCamera({
      center: LatLng,
    });
  };

  return (
    <View {...rest}>
      <MapView
        ref={mapRef}
        showsUserLocation={showUserLocation}
        style={styles.map}
        initialRegion={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default CustomMap;
