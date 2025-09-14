import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Week7StackParamList } from './navigation/types';
import PhotoGalleryAnimatedScreen from './screens/PhotoGalleryAnimated';
import PhotoDetailAnimatedScreen from './screens/PhotoDetailAnimated';

const Stack = createNativeStackNavigator<Week7StackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PhotoGalleryAnimated"
          component={PhotoGalleryAnimatedScreen}
          options={{ title: 'Photo Grid' }}
        />
        <Stack.Screen
          name="PhotoDetailAnimated"
          component={PhotoDetailAnimatedScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
