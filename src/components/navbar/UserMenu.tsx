import { useEffect, useRef } from 'react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import Avatar from '../Avatar'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { open as openRegisterModal } from '../../redux/registerModalSlice'
import { open as openLoginModal } from '../../redux/loginModalSlice'
import { checkLoggedIn, setCurrentUser, signOut } from '../../redux/userSlice'
import { Link } from 'react-router-dom'
import useClickOutside from '../../hooks/useClickOutside'

interface UserMenuProps {
    onInteraction: () => void
}

const UserMenu: React.FC<UserMenuProps> = ({ onInteraction }) => {
    const currentUser = useAppSelector((state) => state.currentUser.userInfo)
    const categories = useAppSelector((state) => state.category.categories)
    const tasks = useAppSelector((state) => state.task.tasks)

    const dispatch = useAppDispatch()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const userMenuRef = useRef<HTMLDivElement>(null)
    // @ts-ignore
    useClickOutside(userMenuRef, () => setIsOpen(false))

    useEffect(() => {
        dispatch(checkLoggedIn())
    }, [])

    useEffect(() => {
        if (currentUser == null) return

        const newCurrentUser = {
            ...currentUser,
            categories,
        }

        setCurrentUser(newCurrentUser)
    }, [categories])

    useEffect(() => {
        if (currentUser == null) return

        const newCurrentUser = {
            ...currentUser,
            tasks,
        }

        setCurrentUser(newCurrentUser)
    }, [tasks])

    function toggleMenu() {
        setIsOpen((value) => !value)
    }

    function handleOpenRegister() {
        setIsOpen(false)
        return dispatch(openRegisterModal())
    }

    function handleOpenLogin() {
        setIsOpen(false)
        return dispatch(openLoginModal())
    }

    function handleLogOut() {
        setIsOpen(false)
        return dispatch(signOut())
    }

    return (
        <div className="relative" onClick={onInteraction} ref={userMenuRef}>
            <div
                className="py-1 px-1 rounded-full border-[1px] border-white-900/30 flex flex-row items-center gap-1 cursor-pointer select-none hover:shadow-md hover:-translate-y-[2px] transition duration-250"
                onClick={toggleMenu}
            >
                <Avatar imageSrc={currentUser?.imageSrc || 'default.jpg'} />
                <Bars3Icon className="h-5 w-5 text-white" />
            </div>
            {currentUser == null ? (
                <>
                    <div
                        className={`z-10 w-max transition duration-300 absolute top-[120%] right-0 bg-white shadow-md rounded-lg overflow-hidden ${
                            isOpen
                                ? 'translate-y-0 opacity-100 pointer-events-auto'
                                : '-translate-y-2 opacity-0 pointer-events-none'
                        }`}
                    >
                        <div className="py-2 px-5 cursor-pointer hover:bg-sky-500/70" onClick={handleOpenRegister}>
                            Register
                        </div>
                        <hr />
                        <div className="py-2 px-5 cursor-pointer hover:bg-sky-500/70" onClick={handleOpenLogin}>
                            Login
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div
                        className={`z-10 w-max transition duration-300 absolute top-[120%] right-0 bg-white shadow-md rounded-lg overflow-hidden ${
                            isOpen
                                ? 'translate-y-0 opacity-100 pointer-events-auto'
                                : '-translate-y-2 opacity-0 pointer-events-none'
                        }`}
                    >
                        <Link to="/myAccount" onClick={() => setIsOpen(false)}>
                            <div className="py-2 px-5 cursor-pointer hover:bg-sky-500/70">My Account</div>
                        </Link>
                        <hr />
                        <Link to="/kanban" onClick={() => setIsOpen(false)}>
                            <div className="py-2 px-5 cursor-pointer hover:bg-sky-500/70">Kanban board</div>
                        </Link>
                        <hr />
                        <div className="py-2 px-5 cursor-pointer hover:bg-sky-500/70" onClick={() => {}}>
                            Notebook
                        </div>
                        <hr />
                        <div className="py-2 px-5 cursor-pointer hover:bg-sky-500/70" onClick={handleLogOut}>
                            Logout
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default UserMenu
