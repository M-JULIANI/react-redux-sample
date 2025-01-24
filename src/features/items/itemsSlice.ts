import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchItems } from './itemsApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { ProductItem } from '../../types';

export const getItems = createAsyncThunk('items/getItems', async () => {
  const response = await fetchItems();
  return response;
});

interface ItemsState {
  items: ProductItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  status: 'idle',
  error: null,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getItems.fulfilled, (state, action: PayloadAction<ProductItem[] | null>) => {
        state.status = 'succeeded';
        state.items = action.payload || [];
      })
      .addCase(getItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});

export default itemsSlice.reducer;
