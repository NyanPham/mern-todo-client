import { useState } from 'react'
import Logo from './Logo'
import SearchBar from './SearchBar'
import UserMenu from './UserMenu'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
    const [showMobileSearch, setShowMobileSearch] = useState<boolean>(false)

    const closeSearchMobile = () => setShowMobileSearch(false)

    return (
        <header className="fixed top-0 left-0 w-full z-10">
            <nav className="w-full py-4 px-7 flex flex-row items-center justify-between gap-4 shadow-md bg-white/30 backdrop-blur-lg">
                <Logo />
                <div className="hidden md:block">
                    <SearchBar />
                </div>
                {showMobileSearch ? (
                    <XMarkIcon
                        className="block md:hidden w-5 h-5 cursor-pointer hover:opacity-50 transition duration-200 text-white"
                        onClick={() => setShowMobileSearch(false)}
                    />
                ) : (
                    <MagnifyingGlassIcon
                        className="block md:hidden w-5 h-5 cursor-pointer hover:opacity-50 transition duration-200 text-white"
                        onClick={() => setShowMobileSearch(true)}
                    />
                )}

                <UserMenu onInteraction={closeSearchMobile} />
            </nav>
            <div
                className={`w-full py-4 px-7 shadow-md bg-white/30 backdrop-blur-lg block md:hidden transition duration-300 ${
                    showMobileSearch
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
            >
                <SearchBar />
            </div>
        </header>
    )
}

export default Navbar
