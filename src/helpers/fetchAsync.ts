import { useAppDispatch } from '../hooks/reduxHooks'
import { hideLoading, showLoading } from '../redux/loadingLayerSlice'
import { open as openToast, setToastInfo } from '../redux/toastSlice'
import { ResponseData } from '../types'

export default async function fetchAsync(url: string, options: RequestInit) {
    console.log('here')

    const dispatch = useAppDispatch()
    dispatch(showLoading())

    console.log(dispatch)
    try {
        const res = await fetch(url, options)

        const data: ResponseData = await res.json()
        console.log(data)

        return data
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
