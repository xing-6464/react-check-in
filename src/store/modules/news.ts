import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import http from '../../utils/http'

export type Info = {
  [index: string]: unknown
}
export type NewsState = {
  info: Info
}
type GetRmind = {
  userid: string
}
type PutRemind = {
  userid: string
  applicant?: boolean
  approver?: boolean
}

export const getRemindAction = createAsyncThunk(
  'news/getRemindAction',
  async (payload: GetRmind) => {
    const ret = await http.get('/news/remind', payload)
    return ret
  }
)
export const putRemindAction = createAsyncThunk(
  'news/putRemindAction',
  async (payload: PutRemind) => {
    const ret = await http.put('/news/remind', payload)
    return ret
  }
)

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    info: {},
  } as NewsState,
  reducers: {
    updateInfo(state, action: PayloadAction<Info>) {
      state.info = action.payload
    },
  },
})

export const { updateInfo } = newsSlice.actions

export default newsSlice.reducer
