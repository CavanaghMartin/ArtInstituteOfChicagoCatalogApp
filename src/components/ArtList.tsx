import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

type ArtWork = {
  title: string;
  author: string;
  img: string;
};

type MyComponentProps = {
  artWorks: ArtWork;
};

const ArtList: React.FC<MyComponentProps> = ({artWorks}) => {
  const img = artWorks.img
    ? `https://www.artic.edu/iiif/2/${artWorks.img}/full/150,/0/color.jpg`
    : 'https://cdn.vectorstock.com/i/preview-1x/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg';

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{
            uri: img,
          }}
          style={styles.thumbnail}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{artWorks.title}</Text>
          <Text style={styles.detail}>{artWorks.author}</Text>
        </View>
      </View>
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
  card: {
    flexDirection: 'row',
    margin: 16,
    backgroundColor: '#ffffff',
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
  thumbnail: {
    width: '33%',
    aspectRatio: 1,
    marginRight: 16,
    borderRadius: 4,
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
  },
  detail: {
    fontSize: 14,
    color: '#555',
    textAlign: 'left',
  },
});

export default ArtList;
