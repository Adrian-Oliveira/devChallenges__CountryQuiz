import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppDispatch } from '../store';

import api from '../../core/api';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
}>()

interface Country{
  name:{common:string},
}

interface CountriesState{
  countriesData:Country[]
} 

const initialState:CountriesState = {
  countriesData: [],
}


export const fetchCountriesData = createAppAsyncThunk(
  'quotes/fetchCountriesData',
  async () => {
    const response = await api.getCountriesData()
    return response
  }
)

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchCountriesData.fulfilled, (state, action: PayloadAction<[]>) => {
      state.countriesData = action.payload
    })
  },
})

// Action creators are generated for each case reducer function
export const { } = countriesSlice.actions

export default countriesSlice.reducer;
