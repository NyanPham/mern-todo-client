import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface toastState {
    isOpen: boolean
    onClose: () => void
    onOpen: () => void

    title: string
    subtitle?: string
    type: 'success' | 'error' | 'warning'

    autoClose?: boolean | true

    needsConfirm: boolean
    confirmCancel: string
    confirmText: string
    confirmCallback?: () => any
}

interface toastInfo {
    title: string
    subtitle?: string
    type: 'success' | 'error' | 'warning'

    needsConfirm?: boolean
    autoClose?: boolean
    confirmCallback?: () => any
}

const initialState: toastState = {
    isOpen: false,
    title: '',
    subtitle: '',
    type: 'warning',
    onClose: () => {},
    onOpen: () => {},
    needsConfirm: false,
    confirmCancel: 'No',
    confirmText: 'Yes',
    autoClose: true,
}

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        open: (state) => {
            state.isOpen = true
        },
        close: (state) => {
            state.isOpen = false
        },
        setToastInfo: (state, action: PayloadAction<toastInfo>) => {
            state.type = action.payload.type
            state.title = action.payload.title
            state.subtitle = action.payload.subtitle

            state.needsConfirm = typeof action.payload.needsConfirm === 'boolean' ? action.payload.needsConfirm : false
            state.autoClose = typeof action.payload.autoClose === 'boolean' ? action.payload.autoClose : true
            state.confirmCallback = action.payload.confirmCallback
        },
    },
})

export const { open, close, setToastInfo } = toastSlice.actions
export const isOpen = (state: RootState) => state.toast.isOpen

export default toastSlice.reducer
