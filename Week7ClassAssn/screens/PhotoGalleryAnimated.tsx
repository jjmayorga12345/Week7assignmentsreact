import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Week7StackParamList } from '../navigation/types';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type PhotoGalleryScreenNavigationProp = NativeStackNavigationProp<
  Week7StackParamList,
  'PhotoGalleryAnimated'
>;

type ImageData = { id: number; url: string };
type ScrollEvt = { contentOffset: { y: number } };

const imageData: ImageData[] = [];
for (let i = 1; i < 70; i++) imageData.push({ id: i, url: `https://picsum.photos/id/${i}/200` });

export default function PhotoGalleryAnimatedScreen() {
  const navigation = useNavigation<PhotoGalleryScreenNavigationProp>();
  const [searchString, setSearchString] = useState('');

  const marginVertical = useSharedValue(2);
  const rotation = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event: ScrollEvt) => {
    const newMargin = 2 + event.contentOffset.y / 30;
    rotation.value = event.contentOffset.y / 5;
    if (newMargin < 2) marginVertical.value = 2;
    else if (newMargin > 20) marginVertical.value = 20;
    else marginVertical.value = newMargin;
  });

  const animatedStyle = useAnimatedStyle(() => ({
    marginVertical: marginVertical.value,
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const filteredImageData = imageData.filter((image) => image.url.includes(searchString));

  const handleThumbnailPress = (imageUrl: string) => {
    navigation.navigate('PhotoDetailAnimated', { imageUrl });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchString}
        onChangeText={setSearchString}
        placeholder="Search..."
      />
      <Animated.FlatList
        contentContainerStyle={{ alignItems: 'center', paddingTop: 20 }}
        numColumns={3}
        onScroll={scrollHandler}
        data={filteredImageData}
        renderItem={({ item }: { item: ImageData }) => (
          <TouchableOpacity activeOpacity={0.9} onPress={() => handleThumbnailPress(item.url)}>
            <Animated.Image
              {...({ sharedTransitionTag: `tag-${item.url}` } as any)}
              style={[styles.thumbnail, animatedStyle]}
              source={{ uri: item.url }}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item: ImageData) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  input: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginTop: 10,
    height: 40,
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
  },
  thumbnail: {
    marginHorizontal: 2,
    borderRadius: 10,
    width: 100,
    height: 100,
  },
});
