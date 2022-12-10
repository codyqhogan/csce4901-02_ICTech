import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import { setLocation } from '../redux/LocationSlice';

export default function LocationLoader({ status, requestPermission }) {
  const dispatch = useDispatch();
  const currentLocation = useSelector((state) => state.location);

  if (status === null) {
    requestPermission();
  } else if (status.granted && !currentLocation.loaded) {
    Location.getCurrentPositionAsync({
      accuracy: Location.LocationAccuracy.Balanced,
    }).then((location) => {
      dispatch(setLocation(location));
    });
  }
}
