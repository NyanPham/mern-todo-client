import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'
import AddColumnButton from '../kanban/AddColumnButton'

const Kanban = () => {
    const currentUser = useAppSelector((state) => state.currentUser.userInfo)

    if (currentUser == null) return <Navigate to="/" />

    return (
        <div className="px-7 grid grid-cols-3">
            <div className="">
                <AddColumnButton />
            </div>
            <div className=""></div>
            <div className=""></div>
        </div>
    )
}

export default Kanban
