import { createSlice } from '@reduxjs/toolkit'

export const transformSlice = createSlice({
  name: 'transform',
  initialState: {
    scale: 1.0,
    disableTransform: false
  },
  reducers: {
    setScale: (state, newScale) => {
      state.scale = newScale.payload
    },
    setDisableTransform: (state, shouldDisable) => {
      state.disableTransform = shouldDisable.payload
    }
  },
})

export const { setScale, setDisableTransform } = transformSlice.actions

export default transformSlice.reducer