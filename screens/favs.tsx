import React from 'react';
import {View, StyleSheet, FlatList, Pressable} from 'react-native';
import Header from '../components/header';
import {useAppSelector} from '../store/store';
import ArtList from '../components/artList';
import {useNavigation} from '@react-navigation/native';
import {RootStackProps} from '../types';

const Favs: React.FC = () => {
  interface ArtWork {
    id: number;
    title: string;
    author: string;
    img: string;
  }
  const favArts = useAppSelector(state => state.art.favArts);
  const newFavArts: ArtWork[] = favArts.map((element: any) => ({
    id: element.id,
    title: element.title,
    author: element.artist_title,
    img: element.image_id,
  }));
  const navigation = useNavigation<RootStackProps>();
  const onPress = (item: ArtWork) => {
    (navigation as any).navigate('Details', {
      id: item.id.toString(),
    });
    console.log('navigate to: ', item.title);
  };
  const renderItem = ({item}: {item: ArtWork}) => (
    <Pressable onPress={() => onPress(item)}>
      <ArtList artWorks={item} />
    </Pressable>
  );
  return (
    <View style={styles.container}>
      <Header title={'Favorites'} />
      <FlatList
        data={newFavArts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 100,
    fontWeight: 'bold',
  },
});

export default Favs;
