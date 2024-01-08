import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {RootStackProps} from '../../types';

type MyComponentProps = {
  title: string;
  isHome?: boolean;
};
const Header: React.FC<MyComponentProps> = ({title, isHome}) => {
  const navigation = useNavigation<RootStackProps>();

  const handleGoBack = () => {
    (navigation as any).goBack();
  };

  return (
    <View style={styles.header}>
      {!isHome && (
        <TouchableOpacity onPress={handleGoBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    backgroundColor: 'white',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Header;
