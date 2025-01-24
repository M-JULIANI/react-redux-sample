import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchItems } from './itemsApi';

export const getItems = createAsyncThunk('items/getItems', async () => {
  const response = await fetchItems();
  return response;
});

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // @ts-ignore
        state.items = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.status = 'failed';
        // @ts-ignore
        state.error = action.error.message;
      });
  },
});

export default itemsSlice.reducer;
