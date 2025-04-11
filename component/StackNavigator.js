// StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import MainPage from './Main/MainPage';
import MealPage from './Category/MealPage';
import AppetizersPage from './/Category/AppetizersPage';
import MealDetailPage from './Category/Detail/MealDetailPage';
import AppetizersDetailPage from './Category/Detail/AppetizersDetailPage';
import DessertPage from './Category/DessertPage';
import DessertDetailPage from './Category/Detail/DessertDetailPage';
import SaladPage from './Category/SaladPage';
import SaladDetailPage from './Category/Detail/SaladDetailPage';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen 
          name="MainPage" 
          component={MainPage} 
          options={{ headerShown: false }} />
        <Stack.Screen 
          name="MealPage" 
          component={MealPage} 
          options={{ title: 'Meal', headerShown: false }} />
        <Stack.Screen 
          name="MealDetail"
          component={MealDetailPage}
          options={{ title: 'ชื่อเมนู', headerShown: false }} />
        <Stack.Screen 
          name="AppetizersPage" 
          component={AppetizersPage}  
          options={{ title: 'Appetizers', headerShown: false }} />
        <Stack.Screen 
          name="AppetizersDetail"
          component={AppetizersDetailPage}
          options={{ title: 'ชื่อเมนู', headerShown: false }} />
        <Stack.Screen 
          name="DessertPage" 
          component={DessertPage} 
          options={{ title: 'Dessert', headerShown: false }} />
        <Stack.Screen 
          name="DessertDetail"
          component={DessertDetailPage}
          options={{ title: 'ชื่อเมนู', headerShown: false }} />
          <Stack.Screen 
          name="SaladPage" 
          component={SaladPage} 
          options={{ title: 'Dessert', headerShown: false }} />
        <Stack.Screen 
          name="SaladDetail"
          component={SaladDetailPage}
          options={{ title: 'ชื่อเมนู', headerShown: false }} />
      </Stack.Navigator>  
    </NavigationContainer>
  );
}
