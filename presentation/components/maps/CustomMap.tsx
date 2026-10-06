import { StyleSheet, View, ViewProps } from "react-native";
import MapView from "react-native-maps";
import { LatLng } from "../../../core/actions/location/lat-lng";

interface Props extends ViewProps {
  showUserLocation?: boolean;
  initialLocation: LatLng;
}

const CustomMap = ({
  initialLocation,
  showUserLocation = true,
  ...rest
}: Props) => {
  return (
    <View {...rest}>
      <MapView
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
