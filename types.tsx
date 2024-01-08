import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Details: {id: string};
  Favs: undefined;
};

export type RootStackProps = NativeStackScreenProps<
  RootStackParamList,
  'Home' | 'Details' | 'Favs'
>;
