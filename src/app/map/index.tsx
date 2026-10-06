import { View } from "react-native";
import CustomMap from "../../../presentation/components/maps/CustomMap";

const MapScreen = () => {
  return (
    <View>
      <CustomMap
        initialLocation={{
          latitude: 21.1391,
          longitude: -98.4194,
        }}
      />
    </View>
  );
};

export default MapScreen;
