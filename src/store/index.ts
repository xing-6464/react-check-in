import { configureStore,  } from '@reduxjs/toolkit'
import { useDispatch, useSelector as useReduxSelector, useSelector } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import type { TypedUseSelectorHook } from 'react-redux'
import type { AnyAction, Reducer } from '@reduxjs/toolkit'
import type { PersistPartial } from 'redux-persist/es/persistReducer'

import usersReducer from './modules/users'
import signsReducer from './modules/signs'
import type { SignsState } from './modules/signs'
import type { UsersState } from './modules/users'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['token']
}

const store = configureStore({
  reducer: {
    users: persistReducer(persistConfig, usersReducer) as Reducer<UsersState & PersistPartial, AnyAction>,
    signs: signsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false 
  })
})

persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
