import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import LoginPage from "./screens/LoginPage";
import RegistrationPage from "./screens/RegistrationPage";
import HomePage from "./screens/HomePage";
import NFCPage from "./screens/NFCPage";
import MLPage from "./screens/MLPage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let IconComponent = Ionicons; // default is Ionicons
        let iconName;

        if (route.name === 'MY QR') {
          iconName = focused ? 'qr-code' : 'qr-code-outline';
        } else if (route.name === 'Skill gap analysis tool') {
          iconName = focused ? 'podium' : 'podium-outline';
        } else if (route.name === 'NFC') {
          iconName = focused ? 'nfc' : 'nfc';
          IconComponent = MaterialIcons;
        }

        return <IconComponent name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'black',
      tabBarStyle: { display: 'flex', backgroundColor: '#3b808a' },
      headerStyle: { backgroundColor: '#3b808a', },
      headerTintColor: 'white',
      headerTitleAlign: 'center',
    })}
  >
    <Tab.Screen name="MY QR" component={HomePage} />
    <Tab.Screen name="Skill gap analysis tool" component={MLPage} />
    <Tab.Screen name="NFC" component={NFCPage} />
  </Tab.Navigator>
);

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="LoginPage"
              component={LoginPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegistrationPage"
              component={RegistrationPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TabNavigator"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};

export default App;
