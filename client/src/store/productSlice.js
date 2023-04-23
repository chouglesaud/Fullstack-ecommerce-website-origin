import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../config';

export const getProduct = createAsyncThunk('product/getProduct', async (payload, thunkAPI) => {
  let url = `${API_BASE_URL}/api/products`;
  if (payload.cat) {
    url = `${API_BASE_URL}/api/products/?cat=${payload.cat}`;
  } else if (payload.price.priceL) {
    url = `${API_BASE_URL}/api/products/?pricel=${payload.price.priceL}&priceh=${payload.price.priceH}`;
  } else if (payload.search) {
    url = `${API_BASE_URL}/api/products/?search=${payload.search}`;
  }
  const res = await fetch(url, { signal: payload.signal });
  const data = await res.json();
  return data;
});

export const searchProduct = createAsyncThunk('product/search', async (payload, thunkAPI) => {
  let url = `${API_BASE_URL}/api/products?search=${payload.search}`;

  const res = await fetch(url, { signal: payload.signal });
  const data = await res.json();
  return data;
});

export const asyncFav = createAsyncThunk('product/asyncFav', async ({ id, token }) => {
  await fetch(`${API_BASE_URL}/api/products/fav/${id}`, {
    method: 'POST',
    headers: {
      token: token,
    },
  });
});

export const asyncFavGet = createAsyncThunk('product/asyncFavGet', async (token) => {
  const res = await fetch(`${API_BASE_URL}/api/wishlist`, {
    headers: {
      token: token,
    },
  });
  const data = await res.json();
  return data;
});

export const asyncSingleProduct = createAsyncThunk('product/asyncSingleProduct', async (id, thunkApi) => {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
  const data = await res.json();
  return data;
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    allProduct: [],
    product: [],
    singleProduct: {},
    loading: false,
    allFavProduct: [],
  },
  reducers: {
    sortProduct: (state, { payload }) => {
      if (payload === 'default') {
        state.product = state.allProduct;
      } else if (payload === 'nameAsc') {
        state.product.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else return 1;
        });
      } else if (payload === 'nameDesc') {
        state.product.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          } else return 1;
        });
      } else if (payload === 'priceAsc') {
        state.product.sort((a, b) => {
          if (a.price < b.price) {
            return -1;
          } else return 1;
        });
      } else if (payload === 'priceDesc') {
        state.product.sort((a, b) => {
          if (a.price > b.price) {
            return -1;
          } else return 1;
        });
      }
    },
  },
  extraReducers: {
    [getProduct.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getProduct.fulfilled]: (state, { payload }) => {
      state.allProduct = payload;
      state.product = payload;
      state.loading = false;
    },
    [asyncSingleProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [asyncSingleProduct.fulfilled]: (state, { payload }) => {
      state.singleProduct = payload;
      state.loading = false;
    },
    [asyncFavGet.pending]: (state, action) => {
      state.loading = true;
    },
    [asyncFavGet.fulfilled]: (state, { payload }) => {
      state.allFavProduct = payload;
      state.loading = false;
    },
    [getProduct.rejected]: (state, payload) => {
      state.loading = false;
    },
    [asyncSingleProduct.rejected]: (state, payload) => {
      state.loading = false;
    },
    [asyncFavGet.rejected]: (state, payload) => {
      state.loading = false;
    },
  },
});

export const { sortProduct } = productSlice.actions;
export default productSlice;
