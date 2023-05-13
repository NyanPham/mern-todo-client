import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from './store'
import { IKanbanCard, ResponseData } from '../types'
import { open as openToast, setToastInfo } from './toastSlice'
import { hideLoading, showLoading } from './loadingLayerSlice'

export const createKanbanCardAsync = createAsyncThunk('kanban/create', async (body: IKanbanCard, { dispatch }) => {
    dispatch(showLoading())

    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/me/kanban`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        const data: ResponseData = await res.json()

        if (data.status === 'success') {
            // dispatch(add)
        }
    } catch (error: any) {
        dispatch(
            setToastInfo({
                title: 'Error',
                subtitle: error.message,
                type: 'error',
            })
        )

        dispatch(openToast())
    } finally {
        dispatch(hideLoading())
    }
})

interface KanbanState {
    isLoading: boolean
    kanbanColumns: any[]
}

const initialState: KanbanState = {
    isLoading: false,
    kanbanColumns: [],
}

export const kanbanSlice = createSlice({
    name: 'kanban',
    initialState,
    reducers: {
        setLoading: (state, { payload }: { payload: boolean }) => {
            state.isLoading = payload
        },
    },
})

export const { setLoading } = kanbanSlice.actions
export const kanbanColumns = (state: RootState) => state.kanban.kanbanColumns

export default kanbanSlice.reducer
