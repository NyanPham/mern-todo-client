import { defaultUser } from '../assets/images'

interface AvatarProps {
    imageSrc: string
    large?: boolean
    medium?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ imageSrc, large, medium }) => {
    const imgSrc = imageSrc == null || imageSrc === 'default.jpg' ? defaultUser : imageSrc

    let avatarSize = 'w-7 h-7'
    if (medium) avatarSize = 'w-16 h-16'
    if (large) avatarSize = 'w-24 h-24'

    return (
        <div className={`rounded-full border-[1px] border-gray-300 overflow-hidden ${avatarSize}`}>
            <img src={imgSrc} alt="Avatar" className="w-full h-full" />
        </div>
    )
}

export default Avatar
