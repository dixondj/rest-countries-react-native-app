import React from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Back from '../assets/back.png';
import styles from './styles';

const GoogleMap = ({navigation, route}) => {
  const lat = route.params.lat;
  const lng = route.params.lng;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.headerWrapper}>
          <Text allowFontScaling={false} style={styles.headerText}>
            The Countries
          </Text>
        </View>

        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={styles.backButtonWrapper}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image source={Back} style={styles.backLogo} />
            <Text style={styles.backButtonText} allowFontScaling={false}>
              Back to Country Info Page
            </Text>
          </TouchableOpacity>
        </View>

        {lat && lng && (
          <View style={styles2.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles2.mapStyle}
              region={{
                latitude: lat,
                longitude: lng,
                latitudeDelta: 10,
                longitudeDelta: 10,
              }}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles2 = StyleSheet.create({
  mapContainer: {
    // ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default GoogleMap;
