import { configureStore } from '@reduxjs/toolkit'
import transformReducer from './transformSlice'

export default configureStore({
  reducer: {
      transform: transformReducer
  },
})