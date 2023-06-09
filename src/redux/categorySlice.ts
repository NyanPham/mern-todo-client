import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'
import {
    CategoryData,
    CategoryToUpdate,
    DeleteCategoryData,
    ResponseData,
    UpdateCategoryData,
    UpdateOrder,
} from '../types'
import { hideLoading, showLoading } from './loadingLayerSlice'
import { setToastInfo, open as openToast } from './toastSlice'

export const createCategoryAsync = createAsyncThunk('categories/create', async (body: CategoryData, { dispatch }) => {
    dispatch(showLoading())
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/me/myCategories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
            },
            credentials: 'include',
            body: JSON.stringify(body),
        })

        const data: ResponseData = await response.json()
        return data
    } catch (error: any) {
        dispatch(
            setToastInfo({
                title: 'Error',
                subtitle: 'Failed to update category',
                type: 'error',
            })
        )

        dispatch(openToast())
    } finally {
        dispatch(hideLoading())
    }
})

export const deleteCategoryAsync = createAsyncThunk(
    'categories/deleteCategory',
    async (body: DeleteCategoryData, { dispatch }) => {
        try {
            const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/me/myCategories/${body.categoryId}`
            await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
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
    }
)

export const updateCategoryAsync = createAsyncThunk(
    'categoryies/updateCategory',
    async (body: UpdateCategoryData, { dispatch }) => {
        const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/me/myCategories/${body.categoryId}`

        const categoryToUpdate: CategoryToUpdate = {
            title: body.title,
            description: body.description,
        }

        dispatch(showLoading())
        try {
            const res = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(categoryToUpdate),
            })

            const data: ResponseData = await res.json()
            return data
        } catch (error) {
            dispatch(
                setToastInfo({
                    title: 'Error',
                    subtitle: 'Failed to update category',
                    type: 'error',
                })
            )

            dispatch(openToast())
        } finally {
            dispatch(hideLoading())
        }
    }
)

export const changeCategoryOrdersAsync = createAsyncThunk(
    'categories/updateCategoryOrder',
    async (body: UpdateOrder[], { dispatch }) => {
        const promises = body.map((info) => {
            return fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/me/myCategories/${info.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ displayOrder: info.displayOrder }),
            })
        })

        try {
            const responses = await Promise.all(promises)
            const data: ResponseData[] = await Promise.all(responses.map((res) => res.json()))

            dispatch(setCategoriesFromOrders(body))
            return data
        } catch (error: any) {}
    }
)

interface CategoryState {
    categories: any[]
    currentCategoryId: string
    isLoading: boolean
    error: string | null | undefined
    message: string | null
    isHighlighted: boolean
}

const initialState: CategoryState = {
    categories: [],
    currentCategoryId: '',
    isLoading: false,
    error: '',
    message: '',
    isHighlighted: false,
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        addCategoryToStore: (state, { payload }) => {
            state.categories.push(payload.category)
        },
        setCategoriesFromUser: (state, { payload }) => {
            state.categories = payload.categories

            if (
                state.currentCategoryId &&
                state.categories?.some((category) => category._id === state.currentCategoryId)
            ) {
                return
            }

            if (state.categories?.length > 0) {
                state.currentCategoryId = state.categories[0]._id
            }
        },
        removeCategories: (state) => {
            state.categories = []
        },
        selectCategory: (state, { payload }) => {
            state.currentCategoryId = payload.categoryId
        },
        removeCategory: (state, { payload }) => {
            state.categories = state.categories.filter((category) => category._id !== payload.categoryId)
        },
        updateCategory: (state, { payload }) => {
            const category = state.categories.find((category) => category._id === payload.categoryId)
            if (category == null) return

            category.title = payload.title
            category.description = payload.description
        },
        setHighlighted: (state, { payload }: { payload: boolean }) => {
            state.isHighlighted = payload
        },
        setCategoriesFromOrders: (state, { payload }: { payload: UpdateOrder[] }) => {
            state.categories = payload.map((orderInfo) =>
                state.categories.find((category) => category._id === orderInfo.id)
            )
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createCategoryAsync.pending, (state) => {
            state.isLoading = true
            state.error = ''
            state.message = ''
        })
        builder.addCase(createCategoryAsync.fulfilled, (state, { payload }) => {
            state.isLoading = false

            if (payload?.status === 'success') {
                state.categories.push(payload.data.data)
                state.currentCategoryId = payload.data.data._id
            } else {
                state.error = payload?.message
            }
        })
        builder.addCase(createCategoryAsync.rejected, (state) => {
            state.isLoading = false

            state.error = 'Something went so wrong!'
        })
        builder.addCase(deleteCategoryAsync.pending, (state) => {
            state.isLoading = true
            state.error = ''
            state.message = ''
        })
        builder.addCase(deleteCategoryAsync.fulfilled, (state) => {
            state.isLoading = false
        })
        builder.addCase(deleteCategoryAsync.rejected, (state) => {
            state.isLoading = false
            state.error = 'Something went wrong when deleting the category'
        })
        builder.addCase(updateCategoryAsync.pending, (state) => {
            state.isLoading = true
            state.error = ''
            state.message = ''
        })
        builder.addCase(updateCategoryAsync.fulfilled, (state, { payload }) => {
            state.isLoading = false

            if (payload?.status === 'success') {
                const category = state.categories.find((category) => category._id === payload.data.data._id)
                if (category == null) return

                category.title = payload.data.data.title
                category.description = payload.data.data.description
            } else {
                state.error = payload?.message
            }
        })

        builder.addCase(updateCategoryAsync.rejected, (state) => {
            state.isLoading = false
            state.error = 'Something went wrong when updating the category'
        })
        builder.addCase(changeCategoryOrdersAsync.pending, (state) => {
            state.isLoading = true
            state.error = ''
            state.message = ''
        })
        builder.addCase(changeCategoryOrdersAsync.fulfilled, (state) => {
            state.isLoading = false
        })
        builder.addCase(changeCategoryOrdersAsync.rejected, (state) => {
            state.isLoading = false
            state.error = 'Something went wrong when updating the category'
        })
    },
})
export const {
    setCategoriesFromUser,
    removeCategories,
    selectCategory,
    updateCategory,
    removeCategory,
    setHighlighted,
    setCategoriesFromOrders,
} = categorySlice.actions
export const categories = (state: RootState) => state.category.categories
export const currentCategoryId = (state: RootState) => state.category.currentCategoryId

export default categorySlice.reducer
