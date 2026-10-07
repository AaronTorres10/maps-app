import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import { LatLng } from "../../../core/actions/location/lat-lng";
import { useLocationStore } from "../../store/useLocationStore";
import FAB from "../shared/FAB";

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

  const [isFollowingUser, setIsFollowingUser] = useState(true);
  const [isShowPolyline, setIsShowPolyline] = useState(true);

  const {
    watchLocation,
    clearWatchLocation,
    lastKnowLocation,
    getLocation,
    userLocationlist,
  } = useLocationStore();

  useEffect(() => {
    watchLocation();
    return () => {
      clearWatchLocation();
    };
  }, []);

  useEffect(() => {
    if (lastKnowLocation && isFollowingUser) {
      moveCamaraToLocation(lastKnowLocation);
    }
  }, [lastKnowLocation, isFollowingUser]);

  const moveCamaraToLocation = (LatLng: LatLng) => {
    if (!mapRef.current) return;
    mapRef.current.animateCamera({
      center: LatLng,
    });
  };
  const moveToCurrentLocation = async () => {
    if (!lastKnowLocation) {
      moveCamaraToLocation(initialLocation);
    } else {
      moveCamaraToLocation(lastKnowLocation);
    }
    const Location = await getLocation();
    if (!location) return;
    moveCamaraToLocation(Location);
  };

  return (
    <View {...rest}>
      <MapView
        ref={mapRef}
        onTouchStart={() => setIsFollowingUser(false)}
        showsUserLocation={showUserLocation}
        style={styles.map}
        initialRegion={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
      >
        {isShowPolyline && (
          <Polyline
            coordinates={userLocationlist}
            strokeColor={"black"}
            strokeWidth={6}
          />
        )}
      </MapView>
      <FAB
        iconName={isShowPolyline ? "eye-outline" : "eye-off-outline"}
        onPress={() => setIsShowPolyline(!isShowPolyline)}
        style={{
          bottom: 140,
          right: 20,
        }}
      />
      <FAB
        iconName={isFollowingUser ? "walk-outline" : "accessibility-outline"}
        onPress={() => setIsFollowingUser(!isFollowingUser)}
        style={{
          bottom: 80,
          right: 20,
        }}
      />
      <FAB
        iconName="compass-outline"
        onPress={moveToCurrentLocation}
        style={{
          bottom: 20,
          right: 20,
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
