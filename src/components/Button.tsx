import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {addFav, removeFav} from '../store/features/artSlice';
import {useAppDispatch, useAppSelector} from '../store/store';

type MyComponentProps = {
  item: {[key: string]: any};
};

const FloatingHeartButton: React.FC<MyComponentProps> = ({item}) => {
  const dispatch = useAppDispatch();
  const favArts = useAppSelector(state => state.art.favArts);
  const isItemInStore =
    item && favArts.length > 0 && favArts.some(obj => obj.id === item.id);
  console.log(isItemInStore);
  const handlePress = () => {
    !isItemInStore ? dispatch(addFav(item)) : dispatch(removeFav(item.id));
  };

  return (
    <TouchableOpacity
      style={[
        styles.floatingButton,
        {backgroundColor: isItemInStore ? 'pink' : 'gray'},
      ]}
      onPress={handlePress}>
      <FontAwesomeIcon icon={faHeart} color="white" size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    zIndex: 999,
  },
});

export default FloatingHeartButton;
