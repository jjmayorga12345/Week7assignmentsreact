import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Week7StackParamList } from '../navigation/types';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import AnimatedHeart from '../components/AnimatedHeart';

type DetailRoute = RouteProp<Week7StackParamList, 'PhotoDetailAnimated'>;

export default function PhotoDetailAnimatedScreen() {
  const { params } = useRoute<DetailRoute>();
  return (
    <View style={styles.container}>
      <Animated.Image
        {...({ sharedTransitionTag: `tag-${params.imageUrl}` } as any)}
        style={styles.fullImage}
        source={{ uri: params.imageUrl }}
        resizeMethod="scale"
        resizeMode="cover"
      />
      <View style={styles.heart}>
        <AnimatedHeart />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' },
  fullImage: { width: '100%', height: '100%' },
  heart: { position: 'absolute', bottom: 40, right: 24 },
});
