import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface favArtWorks {
  [key: string]: any;
}
export interface id {
  id: number;
}

interface favArtWorksState {
  favArts: favArtWorks[];
}
const initialState: favArtWorksState = {
  favArts: [],
};
export const ArtSlice = createSlice({
  name: 'art',
  initialState,
  reducers: {
    addFav: (state, action: PayloadAction<favArtWorks>) => {
      state.favArts.push(action.payload);
    },
    removeFav: (state, action: PayloadAction<id>) => {
      state.favArts = state.favArts.filter(item => item.id !== action.payload);
    },
  },
});
export default ArtSlice.reducer;
export const {addFav, removeFav} = ArtSlice.actions;
