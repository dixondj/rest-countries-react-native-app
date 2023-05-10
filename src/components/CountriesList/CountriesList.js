/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import LottieView from 'lottie-react-native';
import SearchInput from '../Search/SearchInput';
import {apiURL} from '../utils/api';
import Search from '../assets/search.png';
import Close from '../assets/close.png';
import Globe from '../assets/globe.json';
import styles from './styles';

const CountriesList = ({navigation}) => {
  const isFocused = useIsFocused();
  const [inputText, setInputText] = useState(null);

  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllCountries = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${apiURL}/all`);
      const data = await res.json();
      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  const getCountryByName = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${apiURL}/name/${inputText}`);
      const data = await res.json();
      setCountries(data);
      DelayLoading();
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  const DelayLoading = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    getAllCountries();
  }, [isFocused]);

  return (
    <TouchableWithoutFeedback
      style={{flex: 1}}
      onPress={Keyboard.dismiss}
      accessible={false}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.headerWrapper}>
            <Text allowFontScaling={false} style={styles.headerText}>
              The Countries
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 20,
            }}>
            <View style={styles.searchInputWrapper}>
              <Image
                source={Search}
                style={[styles.inputLogo, {marginLeft: 7}]}
              />

              <SearchInput
                styles={styles}
                inputText={inputText}
                setInputText={setInputText}
                getAllCountries={getAllCountries}
                getCountryByName={getCountryByName}
              />
              <TouchableOpacity
                onPress={() => {
                  setInputText('');
                  Keyboard.dismiss;
                }}>
                <Image
                  source={Close}
                  style={[styles.inputLogo, {marginRight: 7}]}
                />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView>
            {!isLoading && (
              <View style={styles.countriesListContainer}>
                {countries.length > 0 ? (
                  countries &&
                  countries?.map(country => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('CountryInfo', {
                            countryName: country.name.common,
                          });
                          setInputText('');
                        }}
                        style={styles.countriesListWrapper}>
                        <Image
                          source={{uri: country.flags.png}}
                          style={{width: 230, height: 130, borderRadius: 20}}
                        />
                        <Text
                          allowFontScaling={false}
                          style={styles.countriesListText}>
                          {country.name.common}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <Text style={styles.errorText} allowFontScaling={false}>
                    No such country exist. Kindly try again!
                  </Text>
                )}
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
    </TouchableWithoutFeedback>
  );
};

export default CountriesList;
