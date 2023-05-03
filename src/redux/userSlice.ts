import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { CurrentUser, ResponseData } from '../types'
import { getStorageValue, removeStorageValue, setStorageValue } from '../helpers/storageHelper'

export const signOut = createAsyncThunk('users/signOut', async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })

    const data: ResponseData = await res.json()

    return data
})
export const CURRENT_USER_LOCAL_KEY = 'currentUser'

interface UserState {
    userInfo: CurrentUser | null
    isLoading: boolean
    errors?: string
    message?: string
}

const initialState: UserState = {
    userInfo: getStorageValue<CurrentUser>(CURRENT_USER_LOCAL_KEY, null),
    isLoading: false,
    errors: '',
    message: '',
}

export const userSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
            state.userInfo = action.payload
            setStorageValue(CURRENT_USER_LOCAL_KEY, action.payload)
        },
        removeCurrentUser: (state) => {
            state.userInfo = null
            removeStorageValue(CURRENT_USER_LOCAL_KEY)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signOut.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(signOut.fulfilled, (state, { payload }) => {
            if (payload.status === 'success') {
                state.userInfo = null
                removeStorageValue(CURRENT_USER_LOCAL_KEY)
            } else {
                state.errors = payload.message || ''
            }
        })
        builder.addCase(signOut.rejected, (state) => {
            state.isLoading = false
            state.errors = 'Something went so wrong when logging you out!'
        })
    },
})

export const { setCurrentUser, removeCurrentUser } = userSlice.actions
export const currentUser = (state: RootState) => state.currentUser.userInfo

export default userSlice.reducer
