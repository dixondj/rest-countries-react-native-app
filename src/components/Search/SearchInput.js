/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, TextInput, useWindowDimensions} from 'react-native';
import DebounceHooks from './DebounceHooks';

const SearchInput = ({
  styles,
  inputText,
  setInputText,
  getCountryByName,
  getAllCountries,
}) => {
  const debounceSearch = DebounceHooks(inputText, 500);

  const {width} = useWindowDimensions();
  const smallScreenWidth = width < 400;

  useEffect(() => {
    if (debounceSearch) {
      getCountryByName();
      console.log('debounce');
    } else if (inputText === '') {
      getAllCountries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch]);
  return (
    <View>
      <TextInput
        allowFontScaling={false}
        style={[styles.inputText, {width: smallScreenWidth ? 200 : 300}]}
        placeholder="Search the Country Here"
        placeholderTextColor={'#8A663F'}
        value={inputText}
        onChangeText={val => setInputText(val)}
        enablesReturnKeyAutomatically={true}
        textContentType="none"
      />
    </View>
  );
};

export default SearchInput;
