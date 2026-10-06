import { Pressable, Text, View } from "react-native";
import { ThemedText } from "../../../presentation/components/shared/themed-text";
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
      <Pressable onPress={requestLocationPermission}>
        <Text>Habilitar Ubicación</Text>
      </Pressable>
      <ThemedText>Estado Actual: {locationStatus}</ThemedText>
    </View>
  );
};

export default PermissonsScreen;
