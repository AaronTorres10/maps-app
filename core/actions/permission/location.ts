import * as Location from "expo-location";
import { Alert, Linking } from "react-native";
import { PermissionStatus } from "../../../infrastructure/interfaces/location";

export const requestLocationPermission =
  async (): Promise<PermissionStatus> => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      if (status === "denied") {
        manualPermissionRequest();
      }

      return PermissionStatus.DENIED;
    }

    return PermissionStatus.GRANTED;
  };

export const checkLocationPermission = async () => {
  const { status } = await Location.getForegroundPermissionsAsync();

  switch (status) {
    case "granted":
      return PermissionStatus.GRANTED;

    case "denied":
      return PermissionStatus.DENIED;

    default:
      return PermissionStatus.UNDETERMINED;
  }
};

const manualPermissionRequest = async () => {
  Alert.alert(
    "Permiso de ubicación necesario",
    "Para continuar debe habilitar el permiso de Localizacion en los ajustes de la app",
    [
      {
        text: "Abrir ajustes",
        onPress: () => {
          Linking.openSettings();
        },
      },
      {
        text: "Canecel",
        style: "destructive",
      },
    ],
  );
};
