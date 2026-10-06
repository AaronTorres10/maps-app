import { View } from "react-native";
import { ThemedText } from "../../../presentation/components/shared/themed-text";
import ThemedPressable from "../../../presentation/components/shared/ThemedPressable";
import { usePermissionsStore } from "../../../presentation/store/usePermissions";

const PermissonsScreen = () => {
  const { locationStatus, requestLocationPermission } = usePermissionsStore();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedPressable onPress={requestLocationPermission}>
        Habilitar Ubicación
      </ThemedPressable>
      <ThemedText>Estado Actual: {locationStatus}</ThemedText>
    </View>
  );
};

export default PermissonsScreen;
