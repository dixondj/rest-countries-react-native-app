/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {apiURL} from '../utils/api';
import Back from '../assets/back.png';
import Globe from '../assets/globe.json';
import styles from './styles';

const CountryInfo = ({navigation, route}) => {
  const countryName = route.params.countryName;
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCountryByName = async () => {
      try {
        const res = await fetch(`${apiURL}/name/${countryName}`);
        const data = await res.json();
        setCountries(data[0]);
        DelayLoading();
      } catch (error) {
        setIsLoading(false);
        console.log(error.message);
      }
    };
    getCountryByName();
  }, [countryName]);

  const DelayLoading = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const {width} = useWindowDimensions();
  const smallScreenWidth = width < 400;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
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
              Back
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {!isLoading && (
            <View style={styles.countryInfoContainer}>
              <Image
                source={{uri: countries.flags.png}}
                style={{width: 230, height: 130, borderRadius: 20}}
              />
              <View style={styles.countryNameWrapper}>
                <Text allowFontScaling={false} style={styles.countryNameText}>
                  {countries.name.common}
                </Text>
              </View>

              <View
                style={[
                  styles.inforContainer,
                  {
                    width:
                      smallScreenWidth && Platform.OS === 'android'
                        ? '43%'
                        : '50%',
                  },
                ]}>
                <View style={styles.inforLeftWrap}>
                  <View style={styles.inforTextWrapper}>
                    <Text
                      style={styles.inforTextStyle}
                      allowFontScaling={false}>
                      Population:{' '}
                    </Text>
                  </View>
                  <View style={styles.inforTextWrapper}>
                    <Text
                      style={styles.inforTextStyle}
                      allowFontScaling={false}>
                      Region:{' '}
                    </Text>
                  </View>
                  <View style={styles.inforTextWrapper}>
                    <Text
                      style={styles.inforTextStyle}
                      allowFontScaling={false}>
                      Sub-Region:{' '}
                    </Text>
                  </View>
                  <View style={styles.inforTextWrapper}>
                    <Text
                      style={styles.inforTextStyle}
                      allowFontScaling={false}>
                      Capital:{' '}
                    </Text>
                  </View>
                  <View style={styles.inforTextWrapper}>
                    <Text
                      style={styles.inforTextStyle}
                      allowFontScaling={false}>
                      Currency:{' '}
                    </Text>
                  </View>
                </View>

                <View style={styles.inforRightWrap}>
                  <View style={styles.inforTextWrapper}>
                    <Text
                      style={styles.inforTextStyle}
                      allowFontScaling={false}>
                      {countries.population}
                    </Text>
                  </View>
                  <View style={styles.inforTextWrapper}>
                    <Text
                      style={styles.inforTextStyle}
                      allowFontScaling={false}>
                      {countries.region}
                    </Text>
                  </View>
                  <View style={styles.inforTextWrapper}>
                    <Text
                      style={styles.inforTextStyle}
                      allowFontScaling={false}>
                      {countries.subregion}
                    </Text>
                  </View>
                  <View style={styles.inforTextWrapper}>
                    <Text
                      style={styles.inforTextStyle}
                      allowFontScaling={false}>
                      {countries.capital}
                    </Text>
                  </View>
                  <View style={styles.inforTextWrapper}>
                    <Text
                      style={styles.inforTextStyle}
                      allowFontScaling={false}>
                      {
                        countries.currencies?.[
                          Object.keys(countries.currencies)[0]
                        ].name
                      }{' '}
                      {`(${
                        countries.currencies?.[
                          Object.keys(countries.currencies)[0]
                        ].symbol
                      })`}
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={styles.buttonGoogleMapWrapper}
                onPress={() => {
                  navigation.navigate('GoogleMap', {
                    lat: countries.latlng[0],
                    lng: countries.latlng[1],
                  });
                }}>
                <Text
                  style={styles.buttonGoogleMapText}
                  allowFontScaling={false}>
                  View in Google Maps
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {isLoading && (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <LottieView
                source={Globe}
                style={{
                  width: 350,
                }}
                autoPlay
                loop
              />
              <Text allowFontScaling={false} style={styles.loadingTextStyle}>
                Loading...
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CountryInfo;
