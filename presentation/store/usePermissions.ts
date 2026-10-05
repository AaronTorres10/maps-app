import { create } from "zustand";
import {
    checkLocationPermission,
    requestLocationPermission,
} from "../../core/actions/permission/location";
import { PermissionStatus } from "../../infrastructure/interfaces/location";

interface PermissionsStatus {
  locationStatus: PermissionStatus;
  requestLocationPermission: () => Promise<PermissionStatus>;
  checkLocationPermission: () => Promise<PermissionStatus>;
}
export const usePermissionsStore = create<PermissionsStatus>()((set) => ({
  locationStatus: PermissionStatus.CHECKING,
  requestLocationPermission: async () => {
    const status = await requestLocationPermission();
    set({ locationStatus: status });
    return status;
  },
  checkLocationPermission: async () => {
    const status = await checkLocationPermission();
    set({ locationStatus: status });
    return status;
  },
}));
