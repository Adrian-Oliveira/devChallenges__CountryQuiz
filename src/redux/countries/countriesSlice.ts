import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppDispatch } from '../store';

import api from '../../core/api';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
}>()

const questionsTypes:("flag"|"capital")[] = ["flag","capital"];

interface Country{
  name:{common:string},
  capital:string[],
  flag:string
}

interface CountriesState{
  countriesData:Country[]
  currentCountry:Country,
  options:Country[],
  questionType: "flag"|"capital",
  currentGuess: string,
  guessed: boolean,
  gaveWrongAnswer: boolean,
  currentScore: number

} 

const initialState:CountriesState = {
  countriesData: [],
  currentCountry:{
                  name:{common:''},
                  capital:[''], 
                  flag:''
                },
  options:[],
  questionType:"capital",
  currentGuess:'',
  guessed: false,
  gaveWrongAnswer: false,
  currentScore: 0
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
  reducers: {
    generateRandomQuestion:(state)=>{

      state.gaveWrongAnswer = false;
      state.guessed = false
      state.currentGuess = ''
      const numberOfCountries:number = state.countriesData.length
      state.currentCountry = state.countriesData[Math.floor(Math.random() *numberOfCountries)]
      
      state.currentCountry.capital ===undefined?
      state.questionType='flag':
      state.questionType = questionsTypes[Math.floor(Math.random() * questionsTypes.length)];

      const copy = [...state.countriesData];
      const options: Country[] = [state.currentCountry as Country];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * copy.length);
        const [item] = copy.splice(randomIndex, 1);
        options.push(item);
      }
      state.options = options
                      .sort((c1, c2)=>
                      c1.name.common<c2.name.common?-1:
                      c1.name.common>c2.name.common?1:0)

    },
    guessAnswer:(state, action:PayloadAction<Country>)=>{

      state.guessed = true
      state.currentGuess = action.payload.name.common

      if(state.currentCountry.name.common !== action.payload.name.common){
        state.gaveWrongAnswer = true; 
      }
      else{
        state.currentScore++; 
      }
    },
    newGame:(state)=>{
      state.guessed = initialState.guessed;
      state.currentCountry = initialState.currentCountry;
      state.currentGuess = initialState.currentGuess;
      state.gaveWrongAnswer = initialState.gaveWrongAnswer;
      state.currentScore = 0;
      state.options = initialState.options;

      countriesSlice.caseReducers.generateRandomQuestion(state);
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchCountriesData.fulfilled, (state, action: PayloadAction<[]>) => {
      state.countriesData = action.payload

      countriesSlice.caseReducers.generateRandomQuestion(state);
    })
  },
})

// Action creators are generated for each case reducer function
export const { generateRandomQuestion, guessAnswer, newGame } = countriesSlice.actions

export default countriesSlice.reducer;
