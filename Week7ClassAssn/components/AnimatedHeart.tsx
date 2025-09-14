import React from 'react';
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { StyleSheet, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function AnimatedHeart() {
  const liked = useSharedValue(0);

  const outlineStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP) },
    ],
  }));

  const fillStyle = useAnimatedStyle(() => ({
    transform: [{ scale: liked.value }],
    opacity: liked.value,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(liked.value, [0, 1], [1, 1.4], Extrapolate.CLAMP) },
    ],
    opacity: interpolate(liked.value, [0, 1], [0, 0.6], Extrapolate.CLAMP),
  }));

  const handlePress = () => {
    liked.value = withSpring(liked.value ? 0 : 1, { velocity: 10 });
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
        <FontAwesome name="heart-o" size={60} color="black" />
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFillObject, glowStyle]}>
        <FontAwesome name="heart" size={60} color="#FFCCCC" />
      </Animated.View>
      <Animated.View style={fillStyle}>
        <FontAwesome name="heart" size={60} color="red" />
      </Animated.View>
    </Pressable>
  );
}
