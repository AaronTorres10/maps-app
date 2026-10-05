import { router } from "expo-router";
import { PropsWithChildren, useEffect } from "react";
import { PermissionStatus } from "../../../infrastructure/interfaces/location";
import { usePermissionsStore } from "../usePermissions";

const PermissionsCheckerProvider = ({ children }: PropsWithChildren) => {
  const { locationStatus, checkLocationPermission } = usePermissionsStore();

  useEffect(() => {
    if (locationStatus === PermissionStatus.GRANTED) {
      router.replace("/map");
    } else if (locationStatus === PermissionStatus.DENIED) {
      router.replace("/permissions");
    }
  }, [locationStatus]);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  return <>{children}</>;
};

export default PermissionsCheckerProvider;
