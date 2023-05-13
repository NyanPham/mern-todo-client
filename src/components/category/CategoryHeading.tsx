import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { deleteCategoryAsync, removeCategory, setHighlighted } from '../../redux/categorySlice'
import { openCategoryModal } from '../../redux/editCategoryModalSlice'
import Heading from '../Heading'
import CategoryButtons from './CategoryButtons'
import { setToastInfo, open as openToast } from '../../redux/toastSlice'

const CategoryHeading = () => {
    const currentCategoryId = useAppSelector((state) => state.category.currentCategoryId)
    const categories = useAppSelector((state) => state.category.categories)
    const isHighlighted = useAppSelector((state) => state.category.isHighlighted)
    const currentCategory = categories?.find((category) => category._id === currentCategoryId)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isHighlighted === true) {
            setTimeout(() => {
                dispatch(setHighlighted(false))
            }, 2000)
        }
    }, [isHighlighted])

    const handleOpenEdit = () => {
        dispatch(openCategoryModal())
    }

    const handleDeleteCategory = () => {
        dispatch(
            setToastInfo({
                title: `Are you sure you want to delete the category?`,
                type: 'warning',
                autoClose: false,
                needsConfirm: true,
                confirmCallback: () => {
                    dispatch(removeCategory({ categoryId: currentCategoryId }))
                    dispatch(deleteCategoryAsync({ categoryId: currentCategoryId }))
                },
            })
        )

        dispatch(openToast())
    }

    return (
        <div
            className={`p-4 flex flex-row items-center justify-between transition ${
                isHighlighted ? 'bg-yellow-500 duration-200 text-white' : 'duration-500'
            }`}
        >
            <Heading title={currentCategory?.title || 'Tasks'} subtitle={currentCategory?.description || null} />
            {currentCategory && <CategoryButtons onOpenEdit={handleOpenEdit} onDelete={handleDeleteCategory} />}
        </div>
    )
}

export default CategoryHeading
