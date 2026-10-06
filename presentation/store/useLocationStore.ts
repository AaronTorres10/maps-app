import { LocationSubscription } from "expo-location";
import { create } from "zustand";
import {
    getCurrentLocation,
    watchCurrentPosition,
} from "../../core/actions/location/location";
import { LatLng } from "./../../core/actions/location/lat-lng";

interface LocationState {
  lastKnowLocation: LatLng | null;
  userLocationlist: LatLng[];
  watchSubScriptionID: LocationSubscription | null;

  getLocation: () => Promise<LatLng>;
  watchLocation: () => void;
  clearWatchLocation: () => void;
}
export const useLocationStore = create<LocationState>()((set, get) => ({
  lastKnowLocation: null,
  userLocationlist: [],
  watchSubScriptionID: null,

  getLocation: async () => {
    const location = await getCurrentLocation();
    set({ lastKnowLocation: location });
    return location;
  },
  watchLocation: async () => {
    const oldSubscription = get().watchSubScriptionID;
    if (oldSubscription !== null) {
      get().clearWatchLocation();
    }
    const watchSubscription = await watchCurrentPosition((LatLng) => {
      set({
        lastKnowLocation: LatLng,
        userLocationlist: [...get().userLocationlist, LatLng],
      });
    });
    set({ watchSubScriptionID: watchSubscription });
  },
  clearWatchLocation: () => {
    const subscription = get().watchSubScriptionID;
    if (subscription !== null) {
      subscription.remove();
    }
  },
}));
