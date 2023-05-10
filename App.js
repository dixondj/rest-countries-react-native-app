import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CountriesList from './src/components/CountriesList/CountriesList';
import CountryInfo from './src/components/CountryInfo/CountryInfo';
import GoogleMap from './src/components/GoogleMap/GoogleMap';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="CountriesList" component={CountriesList} />
        <Stack.Screen name="CountryInfo" component={CountryInfo} />
        <Stack.Screen name="GoogleMap" component={GoogleMap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
