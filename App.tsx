/* eslint-disable react/no-unstable-nested-components */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import {Home, Details, Favs} from './screens';
import {store} from './store/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart, faHouse, faBars} from '@fortawesome/free-solid-svg-icons';

const Stack = createNativeStackNavigator<RootStackParamList>();
const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_bottom',
    }}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Details" component={Details} />
  </Stack.Navigator>
);

const FavsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_bottom',
    }}>
    <Stack.Screen name="Favs" component={Favs} />
    <Stack.Screen name="Details" component={Details} />
  </Stack.Navigator>
);

function App(): React.JSX.Element {
  let persisitor = persistStore(store);
  const Tab = createBottomTabNavigator();

  return (
    <Provider store={store}>
      <PersistGate persistor={persisitor}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              headerShown: false,
              tabBarIcon: ({color, size}) => {
                let iconName = faBars;

                if (route.name === 'Home') {
                  iconName = faHouse;
                } else if (route.name === 'Favorites') {
                  iconName = faHeart;
                }
                return (
                  <FontAwesomeIcon icon={iconName} size={size} color={color} />
                );
              },
              tabBarActiveTintColor: 'red',
              tabBarInactiveTintColor: 'gray',
              tabBarSwipeEnabled: false,
            })}>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Favorites" component={FavsStack} />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
