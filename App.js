import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"; 

import HomePage from "./component/HomePage/HomePage";
import Register from "./component/Register/Register";
import ForgetPassword from "./component/Register/FogetPassword";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

      <Stack.Screen
          name="Register"
          component={Register}
          // options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          // options={{ headerShown: false }}
        />

      <Stack.Screen
          name="Home"
          component={HomePage}
          // options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
