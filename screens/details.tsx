/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import axios from 'axios';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../types';
import HTML from 'react-native-render-html';
import Header from '../components/header';
import FloatingHeartButton from '../components/favButton';

const Details: React.FC = () => {
  type RouteParams = {
    id: string;
  };
  type artData = {
    [key: string]: any;
  };
  type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'> & {
    params: RouteParams;
  };
  const [loading, setLoading] = useState<boolean>(true);
  const [art, setArt] = useState<artData>({});
  const route = useRoute<DetailsRouteProp>();
  const {id} = route.params;
  const windowDimensions = useWindowDimensions();
  const screenWidth = windowDimensions.width;
  const fetchData = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.artic.edu/api/v1/artworks/${id}`,
      );
      console.log(response.data.data);
      setArt(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header title={'Art'} />
      <FloatingHeartButton item={art} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`,
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{art.title}</Text>
            <Text style={styles.artist}>{art.artist_display}</Text>
            {art.description && (
              <HTML
                source={{html: art.description}}
                contentWidth={screenWidth}
              />
            )}
            {!art.description && (
              <HTML
                source={{html: art.on_loan_display}}
                contentWidth={screenWidth}
              />
            )}
          </View>
        </View>
        {loading && <ActivityIndicator size="large" color="#00ff00" />}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    marginBottom: 60,
    backgroundColor: '#fffffa',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textContainer: {
    padding: 16,
  },
  imageContainer: {
    backgroundColor: 'grey',
    width: '100%',
    borderRadius: 8,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    height: Dimensions.get('window').height / 2,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  artist: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  details: {
    fontSize: 16,
  },
});

export default Details;
