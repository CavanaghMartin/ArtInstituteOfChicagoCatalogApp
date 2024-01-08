/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {FlatList, ActivityIndicator, Pressable, StyleSheet, View} from 'react-native';
import axios from 'axios';
import ArtList from '../components/ArtList';
import Header from '../components/Header';
import {useNavigation} from '@react-navigation/native';
import {RootStackProps} from '../../types';

const Home: React.FC = () => {
  interface ArtWork {
    id: number;
    title: string;
    author: string;
    img: string;
  }

  const [artWorks, setArtWorks] = useState<ArtWork[]>([]);
  const [page, setpage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<RootStackProps>();

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.artic.edu/api/v1/artworks?page=${page}&limit=20`,
      );
      const newArray: ArtWork[] = response.data.data.map((element: any) => ({
        id: element.id,
        title: element.title,
        author: element.artist_title,
        img: element.image_id,
      }));
      setArtWorks([...artWorks, ...newArray]);
      setpage(page + 1);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onPress = (item: ArtWork) => {
    (navigation as any).navigate('Details', {
      id: item.id.toString(),
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({item}: {item: ArtWork}) => (
    <Pressable onPress={() => onPress(item)}>
      <ArtList artWorks={item} />
    </Pressable>
  );

  return (
    <>
      <Header title={'Home'} isHome />
      <View style={styles.container}> 

      <FlatList
        data={artWorks}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={fetchData}
      />
      {loading && <ActivityIndicator size="large" color="#00ff00" />}
    </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
});
export default Home;
